import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().min(1).max(120),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s()-]{7,20}$/),
  source: z.enum(["booking-modal", "quiz", "booking-band", "sticky-bar"]),
  page: z.string().max(200).optional(),
  doctor: z.string().max(120).optional(),
  time: z.string().max(120).optional(),
  quizAnswers: z.record(z.string(), z.string().max(60)).optional(),
  utm: z.record(z.string(), z.string().max(200)).optional(),
  website: z.literal(""), // honeypot: bots that fill it get rejected
});

// Simple in-memory throttle: max 5 leads per IP per minute. Enough to stop
// naive floods on a single-instance deployment.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function formatLead(lead: z.infer<typeof leadSchema>): string {
  const lines = [
    "🦷 Yangi lead — Creative Stom",
    `Ism: ${lead.name}`,
    `Telefon: ${lead.phone}`,
    `Manba: ${lead.source}`,
  ];
  if (lead.page) lines.push(`Sahifa: ${lead.page}`);
  if (lead.doctor) lines.push(`Shifokor: ${lead.doctor}`);
  if (lead.time) lines.push(`Qulay vaqt: ${lead.time}`);
  if (lead.quizAnswers) {
    lines.push("So'rovnoma:");
    for (const [key, value] of Object.entries(lead.quizAnswers)) {
      lines.push(`  ${key}: ${value}`);
    }
  }
  if (lead.utm) {
    lines.push("UTM:");
    for (const [key, value] of Object.entries(lead.utm)) {
      lines.push(`  ${key}: ${value}`);
    }
  }
  return lines.join("\n");
}

async function deliverToTelegram(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
  return res.ok;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(ip)) {
    return Response.json({ ok: false }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const text = formatLead(parsed.data);
  const delivered = await deliverToTelegram(text).catch(() => false);
  if (!delivered) {
    // No Telegram credentials configured (or delivery failed): keep the lead
    // visible in server logs so nothing is silently lost.
    console.log(`[lead]\n${text}`);
  }

  return Response.json({ ok: true });
}
