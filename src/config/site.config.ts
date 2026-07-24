// Site-wide configuration: clinic identity, locales, feature flags, and
// integration settings. This file is the single place to retarget the platform
// for a different clinic. Localized *copy* does NOT live here — see
// src/content/<locale>/. Bracketed values are placeholders from the client
// brief; keep the brackets literal until real data arrives.

export const LOCALES = ["uz", "ru"] as const;
export type Locale = (typeof LOCALES)[number];

export const siteConfig = {
  /** Clinic identity — locale-independent facts. */
  clinic: {
    name: "Creative Stom", // TODO
    phone: "+998 97 431-22-14", // TODO
    telegramUrl: "https://t.me/creative_stom1", // TODO
    instagramUrl: "https://instagram.com/creative_stom", // TODO
    coordinates: { lat: 41.280715, lng: 69.1797011 },
    stats: {
      years: "6+", // TODO
      surgeries: "100+", // TODO
      doctors: 2,
    },
  },

  defaultLocale: "uz" as Locale,
  locales: LOCALES,

  /** Canonical origin for metadata/sitemap; override in production. */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  /** Feature flags — flip without touching components. */
  features: {
    preloader: true,
    quiz: true,
    stickyMobileBar: true,
  },

  /** Analytics IDs — empty string disables the integration. */
  analytics: {
    gaId: "G-GPP0KXCP75", // TODO
    yandexMetricaId: "111015375", // TODO
  },

  /** Lead intake — wired up in the lead-pipeline phase. */
  lead: {
    endpoint: "/api/lead",
    provider: "telegram" as const,
  },
} as const;
