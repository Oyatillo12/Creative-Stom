import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import BookingBand from "@/components/BookingBand";
import ServiceHero from "@/components/ServiceHero";
import { getContent, localePrefix, type Locale } from "@/content";
import { alternatesFor } from "@/lib/seo";

function getService(locale: Locale, slug: string) {
  const site = getContent(locale);
  const item = [...site.services.surgical, ...site.services.general].find((service) => service.slug === slug);
  const page = site.servicePages.find((service) => service.slug === slug);
  return item && page ? { item, page } : null;
}

export function serviceStaticParams() {
  return getContent("uz").servicePages.map((service) => ({ slug: service.slug }));
}

export function serviceMetadata(locale: Locale, slug: string): Metadata {
  const service = getService(locale, slug);
  if (!service) return {};
  return {
    title: `${service.item.title} — ${getContent(locale).clinic.name}`,
    description: service.page.intro,
    alternates: alternatesFor(`/xizmatlar/${slug}`, locale),
  };
}

export default function ServiceView({ locale, slug }: { locale: Locale; slug: string }) {
  const service = getService(locale, slug);
  if (!service) notFound();
  const site = getContent(locale);
  const prefix = localePrefix(locale);
  const { item, page } = service;
  const { serviceTemplate: t, pages } = site;

  return (
    <>
      <ServiceHero
        image={page.heroImage}
        imageAlt={item.title}
        breadcrumb={[
          { label: pages.shared.homeLabel, href: prefix || "/" },
          { label: t.breadcrumbLabel, href: `${prefix}/xizmatlar` },
          { label: item.title },
        ]}
        heading={item.title}
        intro={page.intro}
        ctaLabel={site.layout.header.ctaLabel}
      />

      {/* Overview: two-column editorial on ivory */}
      <section className="bg-ivory py-24 md:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[380px_1fr] lg:gap-20">
            <Reveal>
              <SectionHeading eyebrow={t.overviewEyebrow} heading={page.overviewHeading} />
            </Reveal>
            <Reveal>
              <p className="max-w-2xl font-body text-lg leading-relaxed text-ink">{page.overviewBody}</p>
              <div className="mt-12">
                <div className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-gold-dark">
                  {t.factsLabel}
                </div>
                <ul className="mt-4">
                  {page.facts.map((fact) => (
                    <li key={fact} className="border-t border-line py-4 font-body text-base text-ink last:border-b">
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Process: numbered steps on navy */}
      <section className="bg-navy py-24 text-ivory md:py-32">
        <Container>
          <Reveal>
            <SectionHeading eyebrow={t.processEyebrow} heading={t.processHeading} tone="dark" />
          </Reveal>
          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 md:mt-20">
            {page.steps.map((step, i) => (
              <Reveal key={step.n} delayMs={i * 70} className="border-t border-ivory/15 pt-6">
                <div className="font-body text-xs font-semibold tracking-[0.2em] text-gold">{step.n}</div>
                <div className="mt-4 font-display text-2xl">{step.title}</div>
                <p className="mt-3 font-body text-sm leading-relaxed text-ivory/60">{step.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Price note: single statement row on white */}
      <section className="bg-white py-24 md:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[380px_1fr] lg:gap-20">
            <Reveal>
              <SectionHeading eyebrow={t.priceEyebrow} heading={t.priceHeading} />
            </Reveal>
            <Reveal className="flex flex-col justify-end">
              <div className="border-t border-line pt-8">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <span className="font-display text-4xl text-navy md:text-5xl">{page.priceFrom}</span>
                  {t.priceFromLabel && (
                    <span className="font-body text-sm uppercase tracking-[0.14em] text-muted">{t.priceFromLabel}</span>
                  )}
                </div>
                <p className="mt-6 max-w-xl font-body text-sm leading-relaxed text-muted">{site.prices.disclaimer}</p>
                <Link
                  href={`${prefix}/narxlar`}
                  className="mt-6 inline-block font-body text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark transition-colors hover:text-navy"
                >
                  {pages.prices.breadcrumb} →
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* FAQ list on ivory */}
      <section className="bg-ivory py-24 md:py-32">
        <Container>
          <Reveal>
            <SectionHeading eyebrow={t.faqEyebrow} heading={t.faqHeading} />
          </Reveal>
          <div className="mt-14 max-w-3xl md:mt-20">
            {page.faq.map((faqItem, i) => (
              <Reveal key={i} delayMs={i * 70} className="border-t border-line py-8 last:border-b">
                <div className="font-display text-xl text-navy md:text-2xl">{faqItem.question}</div>
                <p className="mt-4 font-body text-base leading-relaxed text-muted">{faqItem.answer}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12">
            <Link
              href={`${prefix}/xizmatlar`}
              className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark transition-colors hover:text-navy"
            >
              {t.allServicesLabel}
            </Link>
          </Reveal>
        </Container>
      </section>

      <BookingBand />
    </>
  );
}
