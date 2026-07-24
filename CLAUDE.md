@AGENTS.md

# Creative Stom — bold-but-clinical dental clinic demo (Tashkent)

Production demo built from a client design brief, redesigned 2026-07 into a playful "sticker" design system (chunky rounded cards, tilted elements, colored blocks) adapted for a premium dental clinic. Follow the spec exactly — do not invent visual style, and do not invent facts (prices, names, doctor bios, license data). Unknown specifics stay as literal `[bracketed]` placeholders in the content files. The only sanctioned exception: demo patient reviews, which are clearly marked `// TODO demo-content`.

## Stack

Next.js (App Router, TypeScript) + Tailwind CSS v4 (CSS-based theme, no `tailwind.config.js`). No UI kits. Animation via the `motion` package (Framer Motion successor).

## Design tokens

Defined in `src/app/globals.css` as CSS vars, mapped into Tailwind via `@theme inline` (utilities: `bg-violet`, `text-paper`, `border-sky`, etc.).

| Token | Hex | Tailwind utility | Role |
|---|---|---|---|
| paper | `#F6F7FE` | `paper` | cool white — tiles on colored cards, base bg color |
| card | `#FFFFFF` | `card` | white — card surfaces, pills |
| violet | `#5546E8` | `violet` | vivid violet — dark mega-cards, footer, primary dark |
| violet2 | `#6A5CF2` | `violet-2` | elevated surfaces on violet (inputs, tiles) |
| sky | `#D8E9FF` | `sky` | ice blue — light colored cards/blocks |
| lemon | `#FFE9A0` | `lemon` | warm lemon — alternating colored cards/blocks |
| lilac | `#E6E0FC` | `lilac` | pale lilac — PageHero band, occasional third light surface |
| coral | `#FF6752` | `coral` | accent — primary CTA, dots, slider handles |
| ink | `#211F3D` | `ink` | deep indigo ink — text, sticker borders |
| muted | `#6E718C` | `muted` | grey-indigo — rarely; prefer `ink/60` |
| line | `#E4E4F1` | `line` | cool hairline borders inside cards |

The page background is the site's **only** gradient — a soft wash `linear-gradient(170deg, #fbfcff → #f0f4fe → #edeafc)` set on `body` in globals.css. Everything else is flat fills. Do not add new colors. If a section seems to need one, it doesn't — reuse a token.

Contrast rules:
- Body copy is `text-ink` or `text-ink/70..80` on paper/card/sky/lemon/lilac; `text-paper` or `text-paper/70..85` on violet.
- Coral is never used for body text — it's a surface (with `text-ink` on top) or a decorative dot/handle only.
- On violet surfaces, borders use `border-paper/10..30`.

## The sticker system (globals.css)

- `.sticker` — 2px ink border + hard `0 4px 0 ink` offset shadow. For interactive/highlight elements: buttons, photo frames, stat cards, the mobile dock.
- `.sticker-press` — hover lift / press collapse for sticker buttons (no-ops under reduced motion).
- `.card-soft` — big soft ambient shadow for large white/colored cards.
- Shared class recipes live in `src/lib/ui.ts`: `btn.primary` (coral), `btn.sky`, `btn.light`, `btn.lemon` (all pill stickers), `chip`, `card`, `textLink`. Compose these — don't hand-roll new button styles.
- Radii: mega-cards `rounded-[36px]`, cards `rounded-[28px]`, tiles/rows `rounded-[24px]`, inputs `rounded-2xl`, everything interactive small is `rounded-full`.
- Tilts: decorative cards may rotate ±0.8–4deg (`-rotate-[1.2deg]` etc.); keep it to one or two tilted elements per section.
- Mega-card sections: full-bleed wrapper `px-4 py-10 md:px-6 md:py-14` around `mx-auto max-w-[1400px] rounded-[36px] bg-violet|sky|lemon`, with a `<Container>` inside. Footer uses the same shell.

## Fonts

- `--font-display` → Unbounded (headings, weights 400–700; usually `font-medium`/`font-semibold`) — chunky geometric display. Because it runs wide, heading sizes stay moderate (`text-4xl`/`lg:text-[2.75rem]` max for section headings).
- `--font-body` → Golos Text (everything else).
- Both loaded via `next/font/google`, subsets `["latin", "cyrillic"]`, `display: "swap"` (`src/lib/fonts.ts`, exports `displayFont`/`bodyFont`).

## Motion

- App is wrapped in `<LazyMotion features={domMax} strict>` (`src/components/MotionProvider.tsx`) — always import `{ m }` from `"motion/react"` and use `m.div` etc.; `motion.div` throws under `strict`.
- Reduced motion is handled globally by `<MotionConfig reducedMotion="user">`; scroll-linked effects must also no-op via `useReducedMotion` where transforms would break content.
- Shared primitives live in `src/components/motion/`: `RevealGroup`/`RevealItem` (staggers), `Parallax`, `AnimatedCounter`, `TextReveal`, `Marquee`, `ReviewsCarousel`. Site-wide `Reveal` is `src/components/Reveal.tsx`.
- Discipline: one orchestrated entrance per view; scroll-linked choreography is reserved for hero, manifesto, section-scrubbed rules, and image parallax. Hover states: cards lift (`hover:-translate-y-1`), sticker buttons use `.sticker-press`.

## Layout rules

- Open sections: `py-20 md:py-28` (tighter follow-on sections may use `py-14/16`). Mega-card sections use the shell above.
- Container: `max-w-[1240px]` (use the shared `<Container>` component).
- `SectionHeading` is the site's **only** heading motif: left-aligned pill eyebrow (bordered rounded-full chip with a coral dot, uppercase Golos 600) + a chunky Unbounded heading. Don't invent a second motif.
- Header is a floating white pill bar (`Header.tsx`); pages start with `pt-28 md:pt-32` heroes to clear it.
- No two adjacent sections may share a layout pattern (alternate paper sections and colored mega-cards, vary grid shapes and card colors).

## Content rule

**All visible text comes from the content layer** — no component hardcodes copy: not a label, not a placeholder string, not an alt text. The content layer is:

- `src/content/types.ts` — master `SiteContent` interface; enforces UZ/RU parity at compile time.
- `src/content/uz/*.ts` + `src/content/ru/*.ts` — per-locale dictionaries, composed in each locale's `index.ts`.
- `src/config/site.config.ts` — locale-independent facts (phone, socials, coordinates, stats) and feature flags.
- `src/content/media.ts` — every image path used by components.

If new copy is needed, add it to `types.ts` + both locale dicts first (with a `// TODO` if it's a bracketed placeholder), then consume it via `getContent(locale)`.

## Forbidden

- Color gradients (flat fills only; the palette does the work)
- Glassmorphism / blur panels
- Emoji
- Identical card grids repeated across adjacent sections (vary color cycle, tilt, or shape)
- Centered section titles (headings are left-aligned, per `SectionHeading`)
- Icon rows (no generic icon-set decoration; dots, number pills, and arrows are the only glyphs)
- Round-avatar testimonial carousels
- New colors outside the token table above
- Sharp-cornered surfaces — every box is rounded (24px+ for cards, full for interactive pills)

## Placeholders

Generated by `scripts/gen-placeholders.mjs` into `public/placeholders/` (local SVGs only — no external image services), styled to the sticker palette. Regenerate with `npm run placeholders`. Every image path referenced from components must come from `src/content/media.ts`.

## Testing

Test every feature at 390px, 768px, and 1440px viewport widths before considering it done.

## Workflow

After each feature: run `npm run dev`, verify in the browser at the three breakpoints above, then `git commit`.
