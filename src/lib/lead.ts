// Client-side lead capture: UTM persistence and delivery to /api/lead.

import { siteConfig } from "@/config/site.config";
import { trackEvent, type LeadSource } from "./analytics";

const UTM_KEY = "cs-utm";
const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

/** Stores first-touch UTM params for the session; call once per page view. */
export function captureUtm() {
  try {
    if (sessionStorage.getItem(UTM_KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    for (const key of UTM_PARAMS) {
      const value = params.get(key);
      if (value) utm[key] = value;
    }
    if (Object.keys(utm).length > 0) sessionStorage.setItem(UTM_KEY, JSON.stringify(utm));
  } catch {
    // Storage unavailable (private mode) — leads still work without UTM.
  }
}

export interface LeadPayload {
  name: string;
  phone: string;
  source: LeadSource;
  doctor?: string;
  time?: string;
  quizAnswers?: Record<string, string>;
}

export async function submitLead(payload: LeadPayload): Promise<boolean> {
  let utm: Record<string, string> | undefined;
  try {
    const stored = sessionStorage.getItem(UTM_KEY);
    if (stored) utm = JSON.parse(stored);
  } catch {
    // ignore
  }

  try {
    const res = await fetch(siteConfig.lead.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        page: window.location.pathname,
        utm,
        website: "", // honeypot — must stay empty
      }),
    });
    if (!res.ok) return false;
    trackEvent("lead_submit", { source: payload.source, page: window.location.pathname });
    return true;
  } catch {
    return false;
  }
}
