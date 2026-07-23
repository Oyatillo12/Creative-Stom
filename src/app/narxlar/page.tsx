import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import BookingBand from "@/components/BookingBand";
import { site } from "@/content";

export const metadata: Metadata = {
  title: `${site.pages.prices.title} — ${site.clinic.name}`,
  description: site.pages.prices.intro,
};

export default function PricesPage() {
  const { pages, prices, services, servicePages, serviceTemplate, homepage } = site;
  const allServices = [...services.surgical, ...services.general];
  const serviceRows = servicePages.map((page) => ({
    slug: page.slug,
    title: allServices.find((item) => item.slug === page.slug)?.title ?? page.slug,
    priceFrom: page.priceFrom,
  }));

  return (
    <>
      <PageHero
        breadcrumb={[{ label: pages.shared.homeLabel, href: "/" }, { label: pages.prices.breadcrumb }]}
        heading={pages.prices.title}
        intro={pages.prices.intro}
      />

      {/* Implant tiers: large display numbers on ivory */}
      <section className="bg-ivory py-24 md:py-32">
        <Container>
          <Reveal>
            <SectionHeading eyebrow={homepage.prices.eyebrow} heading={homepage.prices.heading} />
          </Reveal>
          <div className="mt-14 grid gap-px bg-line sm:grid-cols-3 md:mt-20">
            {prices.tiers.map((tier, i) => (
              <Reveal key={tier.label} delayMs={i * 70} className="bg-ivory py-10 sm:px-8 sm:first:pl-0">
                <div className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                  {tier.label}
                </div>
                <div className="mt-4 font-display text-4xl text-navy md:text-5xl">{tier.priceFrom}</div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <p className="max-w-xl font-body text-sm leading-relaxed text-muted">{prices.disclaimer}</p>
          </Reveal>
        </Container>
      </section>

      {/* Per-service table rows on white */}
      <section className="bg-white py-24 md:py-32">
        <Container>
          <Reveal>
            <div className="flex items-baseline justify-between gap-6 border-b-2 border-navy pb-4 font-body text-xs font-semibold uppercase tracking-[0.24em] text-navy">
              <span>{pages.prices.serviceColumn}</span>
              <span>{pages.prices.priceColumn}</span>
            </div>
          </Reveal>
          <div>
            {serviceRows.map((row, i) => (
              <Reveal key={row.slug} delayMs={i * 40}>
                <Link
                  href={`/xizmatlar/${row.slug}`}
                  className="group flex items-baseline justify-between gap-6 border-b border-line py-6 transition-colors hover:bg-ivory"
                >
                  <span className="font-display text-xl text-navy transition-colors group-hover:text-gold-dark md:text-2xl">
                    {row.title}
                  </span>
                  <span className="shrink-0 font-body text-base text-ink">
                    {row.priceFrom} {serviceTemplate.priceFromLabel}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <BookingBand />
    </>
  );
}
