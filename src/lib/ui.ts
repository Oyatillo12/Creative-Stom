// Shared class recipes for the sticker design system. Components compose these
// so buttons, chips, and cards stay identical across every section.

const btnBase =
  "sticker sticker-press inline-flex items-center justify-center rounded-full px-7 py-3.5 text-center font-body text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral";

export const btn = {
  /** Coral sticker — the one conversion CTA per view. */
  primary: `${btnBase} bg-coral text-ink`,
  /** Mint sticker — supporting actions. */
  sky: `${btnBase} bg-sky text-ink`,
  /** White sticker — actions on colored or dark surfaces. */
  light: `${btnBase} bg-card text-ink`,
  /** Sand sticker — tertiary accents. */
  lemon: `${btnBase} bg-lemon text-ink`,
} as const;

/** Small uppercase pill label — tags, focus areas, list markers. */
export const chip =
  "inline-flex items-center rounded-full border-[1.5px] border-ink/20 bg-card px-3.5 py-1.5 font-body text-xs font-medium text-ink";

/** Big rounded surface — the standard card shell. */
export const card = "rounded-[28px] card-soft";

/** Text link with an underline that thickens on hover. */
export const textLink =
  "font-body text-sm font-semibold text-ink underline decoration-2 underline-offset-4 transition-colors hover:text-violet hover:decoration-coral";
