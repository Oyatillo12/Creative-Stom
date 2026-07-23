"use client";

import { createContext, useContext, type ReactNode } from "react";
import { getContent, type Locale, type SiteContent } from "@/content";
import { siteConfig } from "@/config/site.config";

const LocaleContext = createContext<Locale>(siteConfig.defaultLocale);

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

/** Localized content for client components; server components use getContent(locale). */
export function useContent(): SiteContent {
  return getContent(useLocale());
}

export default function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}
