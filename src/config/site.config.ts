// Site-wide configuration: clinic identity, locales, feature flags, and
// integration settings. This file is the single place to retarget the platform
// for a different clinic. Localized *copy* does NOT live here — see
// src/content/<locale>/. Bracketed values are placeholders from the client
// brief; keep the brackets literal until real data arrives.

export const LOCALES = ["uz"] as const; // "ru" is added in the i18n phase
export type Locale = (typeof LOCALES)[number];

export const siteConfig = {
  /** Clinic identity — locale-independent facts. */
  clinic: {
    name: "Creative Stom", // TODO
    phone: "+998 [XX] [XXX-XX-XX]", // TODO
    telegramUrl: "https://t.me/[username]", // TODO
    license: "[Litsenziya raqami]", // TODO
    coordinates: { lat: 41.3111, lng: 69.2797 },
    stats: {
      years: "6+", // TODO
      surgeries: "100+", // TODO
      doctors: 2,
    },
  },

  defaultLocale: "uz" as Locale,
  locales: LOCALES,

  /** Feature flags — flip without touching components. */
  features: {
    preloader: true,
    quiz: true,
    stickyMobileBar: true,
  },

  /** Analytics IDs — empty string disables the integration. */
  analytics: {
    gaId: "", // TODO
    yandexMetricaId: "", // TODO
  },

  /** Lead intake — wired up in the lead-pipeline phase. */
  lead: {
    endpoint: "/api/lead",
    provider: "telegram" as const,
  },
} as const;
