// JSON-LD structured-data builders fed from config + content. Bracketed
// placeholder values flow through as-is until the clinic supplies real data —
// they are valid strings, just visibly unfinished.

import { getContent, localePrefix, type Doctor, type FaqItem, type Locale } from "@/content";
import { siteConfig } from "@/config/site.config";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    // eslint-disable-next-line react/no-danger
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function clinicJsonLd(locale: Locale): Record<string, unknown> {
  const site = getContent(locale);
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: site.clinic.name,
    url: `${siteConfig.siteUrl}${localePrefix(locale)}`,
    telephone: site.clinic.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.clinic.address,
      addressLocality: "Tashkent",
      addressCountry: "UZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.clinic.coordinates.lat,
      longitude: site.clinic.coordinates.lng,
    },
    openingHours: site.clinic.workHours,
    sameAs: [site.clinic.telegramUrl, site.clinic.instagramUrl],
  };
}

export function physicianJsonLd(locale: Locale, doctor: Doctor): Record<string, unknown> {
  const site = getContent(locale);
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: doctor.name,
    jobTitle: doctor.role,
    worksFor: { "@type": "Dentist", name: site.clinic.name },
    url: `${siteConfig.siteUrl}${localePrefix(locale)}/shifokorlar`,
  };
}

export function procedureJsonLd(locale: Locale, name: string, slug: string): Record<string, unknown> {
  const site = getContent(locale);
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name,
    url: `${siteConfig.siteUrl}${localePrefix(locale)}/xizmatlar/${slug}`,
    provider: { "@type": "Dentist", name: site.clinic.name },
  };
}

export function faqJsonLd(items: FaqItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbJsonLd(crumbs: { label: string; href?: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      ...(crumb.href ? { item: `${siteConfig.siteUrl}${crumb.href}` } : {}),
    })),
  };
}
