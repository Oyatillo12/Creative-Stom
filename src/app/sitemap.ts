import type { MetadataRoute } from "next";
import { getContent, localePrefix } from "@/content";
import { LOCALES, siteConfig } from "@/config/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getContent("uz");
  const paths = [
    "",
    "/xizmatlar",
    "/xizmatlar/implantatsiya",
    ...site.servicePages.map((service) => `/xizmatlar/${service.slug}`),
    "/shifokorlar",
    "/keyslar",
    ...site.cases.map((caseItem) => `/keyslar/${caseItem.slug}`),
    "/narxlar",
    "/klinika",
    "/aloqa",
  ];

  return LOCALES.flatMap((locale) =>
    paths.map((path) => ({
      url: `${siteConfig.siteUrl}${localePrefix(locale)}${path}` || siteConfig.siteUrl,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${siteConfig.siteUrl}${localePrefix(l)}${path}`]),
        ),
      },
    })),
  );
}
