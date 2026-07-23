import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import BookingBand from "@/components/BookingBand";
import { getContent, localePrefix, type Locale } from "@/content";
import { alternatesFor } from "@/lib/seo";

export function casesIndexMetadata(locale: Locale): Metadata {
  const site = getContent(locale);
  return {
    title: `${site.pages.cases.title} — ${site.clinic.name}`,
    description: site.pages.cases.intro,
    alternates: alternatesFor("/keyslar", locale),
  };
}

export default function CasesIndexView({ locale }: { locale: Locale }) {
  const site = getContent(locale);
  const prefix = localePrefix(locale);
  const { pages, cases, homepage } = site;

  return (
    <>
      <PageHero
        breadcrumb={[{ label: pages.shared.homeLabel, href: prefix || "/" }, { label: pages.cases.breadcrumb }]}
        heading={pages.cases.title}
        intro={pages.cases.intro}
      />

      {/* Case rows: slider beside summary, alternating sides */}
      <section className="bg-ivory py-24 md:py-32">
        <Container className="flex flex-col gap-24 md:gap-32">
          {cases.map((caseItem, i) => (
            <Reveal key={caseItem.slug}>
              <div
                className={`grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <BeforeAfterSlider
                  beforeSrc={caseItem.before}
                  afterSrc={caseItem.after}
                  beforeAlt={`${caseItem.title} — ${homepage.cases.beforeLabel}`}
                  afterAlt={`${caseItem.title} — ${homepage.cases.afterLabel}`}
                  beforeLabel={homepage.cases.beforeLabel}
                  afterLabel={homepage.cases.afterLabel}
                />
                <div>
                  <div className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                    {caseItem.service}
                  </div>
                  <h2 className="mt-4 font-display text-3xl text-navy md:text-4xl">{caseItem.title}</h2>
                  <p className="mt-5 max-w-md font-body text-base leading-relaxed text-muted">
                    {caseItem.story.problem}
                  </p>
                  <Link
                    href={`${prefix}/keyslar/${caseItem.slug}`}
                    className="mt-8 inline-block font-body text-xs font-semibold uppercase tracking-[0.14em] text-navy transition-transform duration-200 hover:translate-x-1"
                  >
                    {pages.cases.openLabel}
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>

      <BookingBand />
    </>
  );
}
