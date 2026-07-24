import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "placeholders");

// Sticker design system palette (src/app/globals.css).
const INK = "#211F3D";
const PAPER = "#F6F7FE";
const VIOLET = "#5546E8";
const SKY = "#D8E9FF";
const LEMON = "#FFE9A0";
const LILAC = "#E6E0FC";
const CORAL = "#FF6752";

// Each placeholder gets a flat colored field, an offset rounded panel, and the
// label — reads as a deliberate design element until real photos arrive.
const placeholders = [
  { name: "hero-1", width: 1920, height: 1200, label: "OPERATSIYA JARAYONI", bg: VIOLET, panel: SKY },
  { name: "hero-2", width: 1920, height: 1200, label: "KLINIKA QABULXONASI", bg: SKY, panel: PAPER },
  { name: "hero-3", width: 1920, height: 1200, label: "MIKROSKOP OSTIDA ISH", bg: LEMON, panel: PAPER },
  { name: "hero-4", width: 1920, height: 1200, label: "JAMOA", bg: VIOLET, panel: LEMON },
  { name: "doctor-1", width: 800, height: 1000, label: "SHIFOKOR 1", bg: SKY, panel: PAPER },
  { name: "doctor-2", width: 800, height: 1000, label: "SHIFOKOR 2", bg: LILAC, panel: PAPER },
  { name: "about-interior", width: 1400, height: 900, label: "KLINIKA INTERYERI", bg: SKY, panel: PAPER },
  { name: "wide-process", width: 1600, height: 900, label: "JARAYON", bg: VIOLET, panel: SKY },
  { name: "case1-before", width: 800, height: 600, label: "KEYS 1 — AVVAL", bg: LEMON, panel: PAPER },
  { name: "case1-after", width: 800, height: 600, label: "KEYS 1 — KEYIN", bg: SKY, panel: PAPER },
  { name: "case2-before", width: 800, height: 600, label: "KEYS 2 — AVVAL", bg: LEMON, panel: PAPER },
  { name: "case2-after", width: 800, height: 600, label: "KEYS 2 — KEYIN", bg: SKY, panel: PAPER },
  { name: "cert-1", width: 400, height: 520, label: "SERTIFIKAT", bg: PAPER, panel: SKY },
  { name: "cert-2", width: 400, height: 520, label: "SERTIFIKAT", bg: PAPER, panel: LEMON },
  { name: "cert-3", width: 400, height: 520, label: "SERTIFIKAT", bg: PAPER, panel: LILAC },
  { name: "cert-4", width: 400, height: 520, label: "SERTIFIKAT", bg: PAPER, panel: SKY },
];

function escapeXml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildSvg({ width, height, label, bg, panel }) {
  const fontSize = Math.max(14, Math.round(Math.min(width, height) * 0.032));
  const letterSpacing = Math.round(fontSize * 0.18);
  const inset = Math.round(Math.min(width, height) * 0.08);
  const radius = Math.round(Math.min(width, height) * 0.07);
  const dotR = Math.max(5, Math.round(fontSize * 0.28));
  const textColor = bg === VIOLET ? PAPER : INK;
  const panelW = width - inset * 2;
  const panelH = height - inset * 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="${bg}" />
  <rect x="${inset}" y="${inset}" width="${panelW}" height="${panelH}" rx="${radius}" fill="${panel}" opacity="0.35" />
  <rect x="${inset}" y="${inset}" width="${panelW}" height="${panelH}" rx="${radius}" fill="none" stroke="${textColor}" stroke-opacity="0.5" stroke-width="2.5" stroke-dasharray="2 10" stroke-linecap="round" />
  <circle cx="${width / 2}" cy="${height / 2 - fontSize * 1.6}" r="${dotR}" fill="${CORAL}" />
  <text x="50%" y="52%" text-anchor="middle" dominant-baseline="middle" fill="${textColor}" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="700" letter-spacing="${letterSpacing}">${escapeXml(label)}</text>
</svg>
`;
}

mkdirSync(outDir, { recursive: true });

for (const placeholder of placeholders) {
  writeFileSync(join(outDir, `${placeholder.name}.svg`), buildSvg(placeholder), "utf8");
}

console.log(`Generated ${placeholders.length} placeholder SVGs in ${outDir}`);
