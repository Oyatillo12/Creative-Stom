# Creative Stom — Upgrade Plan: Landing → Client-Acquisition Platform

Goal: evolve the current one-page demo into a global-clinic-grade **platform for winning high-quality patients** in Tashkent, centered on the clinic's real positioning: **Oral-Maxillofacial Surgeon ("XIRURG-STOMATOLOG") + "Premium Tish Implantatsiyasi"**. Mobile-first, fast (Lighthouse ≥ 90 on mobile), strong SEO, configurable content.

All existing design rules in `CLAUDE.md` stay in force (tokens, Playfair/Inter, `SectionHeading` motif, no gradients/glass/emoji, content only from the content layer). This plan adds structure, motion, and pages — not a new visual language.

---

## 1. Analysis of the current state

### What exists
- Single homepage (`/`) with 11 stacked sections, one real service page (`/xizmatlar/implantatsiya`), a stub for every other service (`/xizmatlar/[slug]` → "Sahifa 1-bosqichda tayyorlanadi").
- All copy in one 550-line `src/content/site.ts`, Uzbek only (a dead `UZ / RU` toggle label exists in the TopBar).
- Static header (solid ivory, always visible), no loading state, no scroll motion beyond a `Reveal` component, hero is a plain slideshow.
- Booking form / quiz are client-side only — **submissions go nowhere** (no API route, no Telegram/CRM delivery). This is the biggest "platform" gap.
- SEO: only `title` + placeholder `description`. No per-page metadata, no OpenGraph, no JSON-LD, no sitemap, no robots, no canonical/hreflang.
- No analytics, no UTM capture, no conversion events.

### What to REMOVE / replace
| Item | Why |
|---|---|
| `servicePageStub` ("page coming in phase 1") | A platform can't show stub pages to paid traffic. Every service gets a real template. |
| Dead `UZ / RU` label in TopBar | Replace with a working locale switcher (UZ default, RU secondary). |
| `TopBar` as a separate always-on bar | Fold phone/Telegram/locale into the new smart header (mobile-first: top bars eat viewport). |
| Flat `site.ts` monolith | Split into a config + per-locale content dictionaries (see §4). |
| `pb-16 md:pb-0` hack on `<main>` for the sticky bar | Handle inside `StickyMobileBar` with safe-area insets. |
| Hero as caption slideshow only | Rebuild as cinematic hero (video/interior imagery + scroll choreography, §5). |

### What to KEEP
- Design tokens, fonts, `SectionHeading` motif, `Container`, section rhythm rules.
- Section concepts: about/positioning, services split (surgical core vs general), doctors, before/after slider, credentials, first-visit steps, reviews, FAQ, prices, quiz, booking, map. They become reusable blocks shared by all pages.
- `Reveal`, `useReducedMotion`, `useFocusTrap`, phone mask lib — extend, don't rewrite.
- Placeholder pipeline (`scripts/gen-placeholders.mjs`) and the literal-`[bracket]` rule for unknown facts.

### What to ADD (summary — details below)
1. Real multi-page architecture (services, doctors, cases, prices, about, contact + blog-ready).
2. Working lead pipeline: API route → Telegram bot, UTM + source tracking, analytics events.
3. i18n (UZ/RU) with hreflang.
4. Full technical SEO layer + JSON-LD (`Dentist`, `Physician`, `MedicalProcedure`, `FAQPage`, `Review`).
5. Motion system: brand preloader, transparent→solid smart header, hero scroll choreography, section transitions — all GPU-friendly and `prefers-reduced-motion`-safe.
6. Config layer: feature flags, contact channels, analytics IDs, locale toggles — one file to retarget the whole site.

---

## 2. Positioning & content strategy

The differentiator is **surgical authority**: the lead doctor is an oral-maxillofacial surgeon, not a general dentist doing implants. Every page reinforces this.

- Hero H1 concept: "Jarrohlik darajasidagi premium implantatsiya — Toshkentda" (exact copy stays in content layer; unknown facts stay `[bracketed]`).
- Money pages (SEO landing targets, each a full template with FAQ + prices + cases + booking):
  - Premium tish implantatsiyasi (pillar page)
  - All-on-4 / All-on-6 (own pages — high-intent queries)
  - Suyak plastikasi va sinus-lifting
  - Murakkab tish olib tashlash (aql tishi)
  - Jag' kistalari / jag'-yuz jarrohligi
  - General: protezlash, terapevtik davolash, gigiena
- Trust pages: doctor profiles with regalia/certificates (E-E-A-T), case studies with narrative (problem → surgical plan → result), licenses.
- Every page ends in a conversion block (booking band or quiz) — no dead ends.

## 3. Site map (App Router)

```
/                       Home (rebuilt hero + curated blocks)
/xizmatlar              Services index (surgical core vs general)
/xizmatlar/[slug]       Real service template (replaces stub); implantatsiya = pillar
/shifokorlar            Team page
/shifokorlar/[slug]     Doctor profile (E-E-A-T, Physician JSON-LD)
/keyslar                Case gallery (filterable by service)
/keyslar/[slug]         Case study (before/after + narrative)
/narxlar                Transparent pricing + "aniq narx KT dan keyin" policy
/klinika                About: story, interior, equipment, license
/aloqa                  Contact: map, channels, hours, form
/ru/*                   Russian mirror of everything (see §6)
sitemap.ts, robots.ts, opengraph-image (per page), not-found.tsx
/api/lead               Lead intake endpoint
```

## 4. Configurability (content & config layer)

Split `src/content/` into:

```
src/config/site.config.ts    Clinic identity: name, phones, Telegram, address,
                             coordinates, hours, license, social, map links,
                             analytics IDs, feature flags (quiz on/off, locales,
                             sticky bar, preloader), lead-delivery settings
src/content/uz/*.ts          Per-domain dictionaries: common, home, services/*,
                             doctors, cases, faq, prices, reviews
src/content/ru/*.ts          Same shape (typed against shared interfaces)
src/content/index.ts         getContent(locale) accessor; components never
                             import a locale file directly
```

Rules stay: no hardcoded copy in components; unknown facts stay `[bracketed]` with `// TODO`. Adding a new service = adding one content object (template renders it automatically).

## 5. UX / motion system (mobile-first)

Library choice: **`motion` (Framer Motion successor) loaded via `LazyMotion` + `domAnimation`** (~5 kB core) for the preloader, header, hero, and page transitions; plain CSS + IntersectionObserver (existing `Reveal`) for section reveals. No smooth-scroll hijacking libs (Lenis etc.) — they hurt mobile scroll feel and CLS. Everything respects `useReducedMotion`.

1. **Brand preloader** — first visit only (sessionStorage flag): navy screen, "Creative Stom" in Playfair fills from ink-outline to gold via clip-path, then lifts to reveal the hero. Hard cap ~1.2 s, never blocks LCP content (pure overlay), skipped for reduced-motion and repeat visits.
2. **Smart header** — fixed, transparent over the hero (ivory text/logo on imagery), after scrolling past ~80% of the hero it transitions to solid ivory + border + navy text (IntersectionObserver sentinel, no scroll-event thrash). Compact height on scroll. Mobile: burger → full-screen navy menu panel with staggered nav items; phone + Telegram + locale switcher live here and in the header row.
3. **Hero** — full-viewport interior video (muted, `preload="none"`, poster, loads after LCP) or Ken-Burns still as fallback; headline lines slide in from X, sub/CTA from Y on load; on scroll the media parallaxes subtly and the text translates/fades out ahead of the next section. CT-scan-style thin gold rule motif allowed only via existing `SectionHeading` language.
4. **Section transitions** — consistent enter choreography (fade + 24 px rise, stagger children ~60 ms) via `Reveal`; alternating backgrounds (ivory/navy/white) already mandated — keep "no two adjacent sections share a layout" rule.
5. **Route transitions** — `template.tsx` with a short fade/slide (~250 ms); no full-screen wipes (perf + motion-sickness).
6. **Micro-interactions** — button hover fills (already in style), before/after slider inertia, number counters for stats, accordion FAQ with height animation.
7. **Sticky mobile conversion bar** — keep (call / Telegram / book), add safe-area padding and hide-on-scroll-down/show-on-scroll-up.

## 6. i18n (UZ / RU)

- Path-prefix strategy: UZ at `/`, RU at `/ru/...` (best for SEO in this market; most search volume is RU + UZ mixed).
- Implement with Next.js App Router conventions — **read `node_modules/next/dist/docs/01-app` first** (AGENTS.md: this Next version has breaking changes; verify routing/i18n/metadata APIs against local docs, not memory).
- `hreflang` alternates in metadata, localized `sitemap.ts`, locale switcher preserves current path.
- RU content ships as `[bracketed]` placeholders until the client supplies translations — structure first, copy second.

## 7. SEO layer

- **Metadata**: per-page `generateMetadata` (title template "… | Creative Stom", descriptions, canonical, OG/Twitter images via `opengraph-image` generation with brand tokens).
- **JSON-LD** (`<script type="application/ld+json">`, data from config):
  - `Dentist`/`MedicalClinic` sitewide (NAP, geo, hours, priceRange)
  - `Physician` on doctor profiles
  - `MedicalProcedure` on service pages
  - `FAQPage` where FAQ blocks render
  - `BreadcrumbList` on all inner pages
- `sitemap.ts` + `robots.ts`; semantic headings (one `h1`/page); descriptive alt text from content layer; internal linking between service ↔ case ↔ doctor pages.
- Local SEO: NAP consistency, map links (Google/Yandex/2GIS already in content), landmark text.

## 8. Lead pipeline (the "platform" core)

- `POST /api/lead` (route handler): validates with **zod**, honeypot + basic rate limit, then delivers to **Telegram Bot API** (env: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`) with graceful fallback logging. Config-switchable to email/CRM webhook later.
- Every lead carries: source (booking modal / quiz / sticky bar / page CTA), page path, locale, UTM params (captured on first visit into sessionStorage).
- Quiz answers ride along with the lead → the clinic sees intent quality ("Barchasi / Tezroq" = hot lead).
- Client UX: optimistic success state, error retry, phone mask kept.
- Analytics: config-gated GA4 + Yandex Metrica snippets (Metrica matters in this market); conversion events on lead submit, call click, Telegram click. Loaded lazily post-interaction to protect page speed.

## 9. Performance budget

- Server Components by default; `"use client"` only for interactive leaves (header, hero motion, forms, sliders).
- `next/image` everywhere (current `<img>` usages migrate), AVIF/WebP, proper `sizes`, priority only on hero poster.
- Hero video: `preload="none"` + poster, loaded after hydration; ≤ 2 MB, muted loop.
- Fonts already `next/font` — add `preload` for the two critical weights only.
- Motion: only `transform`/`opacity` animations; `LazyMotion` split; zero layout-shift reveals (reserve space).
- Targets: mobile LCP < 2.5 s, CLS < 0.05, JS on `/` < 170 kB gzipped. Verify with `next build` output + Lighthouse at 390/768/1440.

## 10. Execution phases (each ends: dev-check at 390/768/1440 + commit)

1. **Foundation** — content/config split (§4), locale accessor, feature flags. Site renders identically from the new layer.
2. **Shell & motion** — smart transparent header (+ mobile menu), preloader, rebuilt hero with scroll choreography, route/section transition system, sticky-bar polish.
3. **Pages** — service template (kill the stub) + all service pages incl. All-on-4/6; doctors + profiles; cases + case studies; prices; about; contact.
4. **Lead pipeline** — `/api/lead`, Telegram delivery, UTM/source capture, booking/quiz wiring, analytics events.
5. **i18n** — `/ru` mirror, switcher, hreflang (verify against local Next docs first).
6. **SEO & perf hardening** — metadata, JSON-LD, sitemap/robots, OG images, image migration, Lighthouse pass, placeholder regeneration for any new media slots.

New dependencies (lean, trusted): `motion`, `zod`. Everything else is platform-native (Next Metadata API, route handlers, IntersectionObserver).

---

**Open items for the client** (stay `[bracketed]` until supplied): real doctor names/regalia, prices, review texts, license number, address/landmark, phone, Telegram username, implant systems, interior video/photos, RU translations.
