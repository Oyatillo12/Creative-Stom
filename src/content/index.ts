// Public content API. Components import from "@/content" only — never from a
// locale directory directly, so locale wiring stays in one place.

import { siteConfig, type Locale } from "@/config/site.config";
import type { SiteContent } from "./types";
import { uz } from "./uz";

export type { Locale };
export * from "./types";

const dictionaries: Record<Locale, SiteContent> = { uz };

export function getContent(locale: Locale = siteConfig.defaultLocale): SiteContent {
  return dictionaries[locale];
}

// Transitional convenience for the current single-locale phase. The i18n phase
// removes this in favor of threading a locale through getContent().
export const site = getContent();
