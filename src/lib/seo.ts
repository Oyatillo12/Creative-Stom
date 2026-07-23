import { localePrefix, type Locale } from "@/content";

/** Canonical + hreflang alternates for a route rendered in every locale. */
export function alternatesFor(path: string, locale: Locale) {
  const p = path === "/" ? "" : path;
  return {
    canonical: `${localePrefix(locale)}${p}` || "/",
    languages: {
      uz: p || "/",
      ru: `/ru${p}`,
      "x-default": p || "/",
    },
  };
}
