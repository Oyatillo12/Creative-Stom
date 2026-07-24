import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import BookingBand from "@/components/BookingBand";
import { getContent, localePrefix, type Locale } from "@/content";
import { alternatesFor } from "@/lib/seo";

export function pricesMetadata(locale: Locale): Metadata {
  const site = getContent(locale);
  return {
    title: `${site.pages.prices.title} — ${site.clinic.name}`,
    description: site.pages.prices.intro,
    alternates: alternatesFor("/narxlar", locale),
  };
}

const TIER_STYLES = ["bg-sky -rotate-[1deg]", "bg-card rotate-[0.8deg]", "bg-lemon -rotate-[0.8deg]"];

export default function PricesView({ locale }: { locale: Locale }) {
  const site = getContent(locale);
  const prefix = localePrefix(locale);
  const { pages, prices, services, servicePages, serviceTemplate, homepage } = site;
  const serviceRows = servicePages.map((page) => ({
    slug: page.slug,
    title: services.find((item) => item.slug === page.slug)?.title ?? page.slug,
    priceFrom: page.priceFrom,
  }));

  return (
    <>
      <PageHero
        breadcrumb={[{ label: pages.shared.homeLabel, href: prefix || "/" }, { label: pages.prices.breadcrumb }]}
        heading={pages.prices.title}
        intro={pages.prices.intro}
      />

      {/* Implant tiers: three tilted sticker cards */}
      <section className="py-16 md:py-24">
        <Container>
          <Reveal>
            <SectionHeading eyebrow={homepage.prices.eyebrow} heading={homepage.prices.heading} />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-3 sm:gap-6 md:mt-16">
            {prices.tiers.map((tier, i) => (
              <Reveal
                key={tier.label}
                delayMs={i * 70}
                className={`sticker rounded-[24px] px-7 py-8 ${TIER_STYLES[i % TIER_STYLES.length]}`}
              >
                <div className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-ink/60">
                  {tier.label}
                </div>
                <div className="mt-4 font-display text-2xl font-semibold text-ink md:text-3xl">
                  {tier.priceFrom}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <p className="max-w-xl rounded-[24px] bg-lemon p-6 font-body text-sm leading-relaxed text-ink">
              {prices.disclaimer}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Per-service price list inside one white mega-card */}
      <section className="pb-16 md:pb-24">
        <Container>
          <Reveal>
            <div className="card-soft rounded-[28px] bg-card p-6 md:p-10">
              <div className="flex items-baseline justify-between gap-6 border-b-2 border-ink pb-4 font-body text-xs font-bold uppercase tracking-[0.18em] text-ink">
                <span>{pages.prices.serviceColumn}</span>
                <span>{pages.prices.priceColumn}</span>
              </div>
              <div>
                {serviceRows.map((row, i) => (
                  <Reveal key={row.slug} delayMs={i * 40}>
                    <Link
                      href={`${prefix}/xizmatlar/${row.slug}`}
                      className="group -mx-3 flex items-baseline justify-between gap-6 rounded-2xl border-b border-line px-3 py-5 transition-colors last:border-b-0 hover:bg-sky/40"
                    >
                      <span className="font-display text-base font-medium text-ink transition-colors group-hover:text-violet md:text-lg">
                        {row.title}
                      </span>
                      <span className="shrink-0 rounded-full bg-paper px-3.5 py-1.5 font-body text-sm font-semibold text-ink">
                        {row.priceFrom}
                        {serviceTemplate.priceFromLabel ? ` ${serviceTemplate.priceFromLabel}` : ""}
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <BookingBand />
    </>
  );
}
