import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import BookingBand from "@/components/BookingBand";
import ServiceHero from "@/components/ServiceHero";
import { getContent, localePrefix, type Locale } from "@/content";
import { alternatesFor } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd, faqJsonLd, procedureJsonLd } from "@/lib/jsonld";
import { textLink } from "@/lib/ui";

function getService(locale: Locale, slug: string) {
  const site = getContent(locale);
  const item = site.services.find((service) => service.slug === slug);
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
  const breadcrumb = [
    { label: pages.shared.homeLabel, href: prefix || "/" },
    { label: t.breadcrumbLabel, href: `${prefix}/xizmatlar` },
    { label: item.title },
  ];

  return (
    <>
      <JsonLd data={procedureJsonLd(locale, item.title, slug)} />
      <JsonLd data={faqJsonLd(page.faq)} />
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <ServiceHero
        image={page.heroImage}
        imageAlt={item.title}
        breadcrumb={breadcrumb}
        heading={item.title}
        intro={page.intro}
        ctaLabel={site.layout.header.ctaLabel}
      />

      {/* Overview: two-column editorial with a facts card */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[380px_1fr] lg:gap-20">
            <Reveal>
              <SectionHeading eyebrow={t.overviewEyebrow} heading={page.overviewHeading} />
            </Reveal>
            <Reveal>
              <p className="max-w-2xl font-body text-lg leading-relaxed text-ink">{page.overviewBody}</p>
              <div className="card-soft mt-10 max-w-2xl rounded-[24px] bg-card p-6 md:p-8">
                <div className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink/15 px-3.5 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.12em] text-ink">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-coral" />
                  {t.factsLabel}
                </div>
                <ul className="mt-4">
                  {page.facts.map((fact) => (
                    <li
                      key={fact}
                      className="border-t border-line py-3.5 font-body text-base text-ink first:border-t-0"
                    >
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Process: numbered step tiles inside the violet mega-card */}
      <section className="px-4 py-10 md:px-6 md:py-14">
        <div className="mx-auto w-full max-w-[1400px] rounded-[36px] bg-violet">
          <Container className="py-16 md:py-24">
            <Reveal>
              <SectionHeading eyebrow={t.processEyebrow} heading={t.processHeading} tone="dark" />
            </Reveal>
            <RevealGroup stagger={0.09} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 md:mt-16">
              {page.steps.map((step) => (
                <RevealItem key={step.n} className="flex h-full flex-col rounded-[24px] bg-violet-2 p-6 md:p-7">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky font-body text-sm font-bold text-ink">
                    {step.n}
                  </span>
                  <div className="mt-5 font-display text-base font-medium leading-snug text-paper md:text-lg">
                    {step.title}
                  </div>
                  <p className="mt-3 font-body text-sm leading-relaxed text-paper/70">{step.text}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </div>
      </section>

      {/* Price note: lemon statement card */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[380px_1fr] lg:gap-20">
            <Reveal>
              <SectionHeading eyebrow={t.priceEyebrow} heading={t.priceHeading} />
            </Reveal>
            <Reveal className="flex flex-col justify-end">
              <div className="sticker rounded-[28px] bg-lemon p-7 md:p-9">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <span className="font-display text-2xl font-semibold text-ink md:text-3xl">{page.priceFrom}</span>
                  {t.priceFromLabel && (
                    <span className="font-body text-sm uppercase tracking-[0.14em] text-ink/60">
                      {t.priceFromLabel}
                    </span>
                  )}
                </div>
                <p className="mt-5 max-w-xl font-body text-sm leading-relaxed text-ink/75">
                  {site.prices.disclaimer}
                </p>
                <Link href={`${prefix}/narxlar`} className={`mt-6 inline-block ${textLink}`}>
                  {pages.prices.breadcrumb} →
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* FAQ cards */}
      <section className="pb-16 md:pb-24">
        <Container>
          <Reveal>
            <SectionHeading eyebrow={t.faqEyebrow} heading={t.faqHeading} />
          </Reveal>
          <div className="mt-12 flex max-w-3xl flex-col gap-4 md:mt-16">
            {page.faq.map((faqItem, i) => (
              <Reveal key={i} delayMs={i * 70} className="card-soft rounded-[24px] bg-card p-6 md:p-8">
                <div className="font-display text-base font-medium text-ink md:text-lg">{faqItem.question}</div>
                <p className="mt-3 font-body text-base leading-relaxed text-ink/75">{faqItem.answer}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12">
            <Link href={`${prefix}/xizmatlar`} className={textLink}>
              {t.allServicesLabel}
            </Link>
          </Reveal>
        </Container>
      </section>

      <BookingBand />
    </>
  );
}
