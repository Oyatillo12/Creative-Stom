import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import BookingBand from "@/components/BookingBand";
import { getContent, localePrefix, type Locale } from "@/content";
import { alternatesFor } from "@/lib/seo";
import { btn } from "@/lib/ui";

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

      {/* Case rows: slider sticker beside summary, alternating sides */}
      <section className="py-20 md:py-28">
        <Container className="flex flex-col gap-20 md:gap-28">
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
                  className={`sticker aspect-[4/3] rounded-[28px] ${i % 2 === 1 ? "rotate-[0.8deg]" : "-rotate-[0.8deg]"}`}
                />
                <div>
                  <div className="inline-flex rounded-full bg-sky px-3.5 py-1.5 font-body text-xs font-semibold text-ink">
                    {caseItem.service}
                  </div>
                  <h2 className="mt-4 font-display text-xl font-semibold text-ink md:text-2xl">{caseItem.title}</h2>
                  <p className="mt-4 max-w-md font-body text-base leading-relaxed text-ink/75">
                    {caseItem.story.problem}
                  </p>
                  <Link href={`${prefix}/keyslar/${caseItem.slug}`} className={`mt-7 ${btn.lemon}`}>
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
