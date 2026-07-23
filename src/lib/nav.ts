import type { NavKey } from "@/content/types";

/** Route paths for nav keys — shared by Header and Footer; locale prefix is added by callers. */
export const NAV_ROUTES: Record<NavKey, string> = {
  services: "/xizmatlar",
  doctors: "/shifokorlar",
  cases: "/keyslar",
  about: "/klinika",
  prices: "/narxlar",
  contact: "/aloqa",
};
