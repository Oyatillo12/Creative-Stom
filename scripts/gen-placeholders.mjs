import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "placeholders");

const NAVY = "#10263B";
const IVORY = "#F5F2EC";
const GOLD = "#C19A5B";

const placeholders = [
  { name: "hero-1", width: 1920, height: 1200, label: "OPERATSIYA JARAYONI" },
  { name: "hero-2", width: 1920, height: 1200, label: "KLINIKA QABULXONASI" },
  { name: "hero-3", width: 1920, height: 1200, label: "MIKROSKOP OSTIDA ISH" },
  { name: "hero-4", width: 1920, height: 1200, label: "JAMOA" },
  { name: "doctor-1", width: 800, height: 1000, label: "SHIFOKOR 1" },
  { name: "doctor-2", width: 800, height: 1000, label: "SHIFOKOR 2" },
  { name: "about-interior", width: 1400, height: 900, label: "KLINIKA INTERYERI" },
  { name: "wide-process", width: 1600, height: 900, label: "JARAYON" },
  { name: "case1-before", width: 800, height: 600, label: "KEYS 1 — AVVAL" },
  { name: "case1-after", width: 800, height: 600, label: "KEYS 1 — KEYIN" },
  { name: "case2-before", width: 800, height: 600, label: "KEYS 2 — AVVAL" },
  { name: "case2-after", width: 800, height: 600, label: "KEYS 2 — KEYIN" },
  { name: "cert-1", width: 400, height: 520, label: "SERTIFIKAT" },
  { name: "cert-2", width: 400, height: 520, label: "SERTIFIKAT" },
  { name: "cert-3", width: 400, height: 520, label: "SERTIFIKAT" },
  { name: "cert-4", width: 400, height: 520, label: "SERTIFIKAT" },
  { name: "map-facade", width: 1600, height: 700, label: "KLINIKA FASADI" },
  { name: "video-poster", width: 1600, height: 900, label: "VIDEO" },
];

function escapeXml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildSvg({ width, height, label }) {
  const inset = 14;
  const fontSize = Math.max(14, Math.round(Math.min(width, height) * 0.032));
  const letterSpacing = Math.round(fontSize * 0.28);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="${NAVY}" />
  <rect x="${inset}" y="${inset}" width="${width - inset * 2}" height="${height - inset * 2}" fill="none" stroke="${GOLD}" stroke-width="1.5" />
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" fill="${IVORY}" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="700" letter-spacing="${letterSpacing}">${escapeXml(label)}</text>
</svg>
`;
}

mkdirSync(outDir, { recursive: true });

for (const placeholder of placeholders) {
  writeFileSync(join(outDir, `${placeholder.name}.svg`), buildSvg(placeholder), "utf8");
}

console.log(`Generated ${placeholders.length} placeholder SVGs in ${outDir}`);
