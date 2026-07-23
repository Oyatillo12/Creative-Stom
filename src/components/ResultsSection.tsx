import Link from "next/link";
import Container from "./Container";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import BeforeAfterSlider from "./BeforeAfterSlider";
import { getContent, localePrefix, type Locale } from "@/content";
import { NAV_ROUTES } from "@/lib/nav";

// One full-width interactive before/after comparison — the featured case.
export default function ResultsSection({ locale = "uz" }: { locale?: Locale } = {}) {
  const site = getContent(locale);
  const prefix = localePrefix(locale);
  const { cases: casesCopy } = site.homepage;
  const featured = site.cases[0];

  return (
    <section id="cases" className="bg-ivory py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={casesCopy.eyebrow} heading={casesCopy.heading} />
        </Reveal>
      </Container>

      <Container className="mt-14 md:mt-20">
        <Reveal>
          <BeforeAfterSlider
            beforeSrc={featured.before}
            afterSrc={featured.after}
            beforeAlt={`${featured.title} — ${casesCopy.beforeLabel}`}
            afterAlt={`${featured.title} — ${casesCopy.afterLabel}`}
            beforeLabel={casesCopy.beforeLabel}
            afterLabel={casesCopy.afterLabel}
            className="aspect-[4/3] w-full sm:aspect-[16/9]"
          />
        </Reveal>

        <div className="mt-8 flex flex-wrap items-baseline justify-between gap-4 md:mt-10">
          <div>
            <div className="font-display text-2xl text-navy md:text-3xl">{featured.title}</div>
            <div className="mt-2 font-body text-xs font-semibold uppercase tracking-[0.16em] text-gold-dark">
              {featured.service}
            </div>
          </div>
          <Link
            href={`${prefix}${NAV_ROUTES.cases}`}
            className="border-b border-navy/30 pb-1 font-body text-xs font-semibold uppercase tracking-[0.14em] text-navy transition-colors hover:border-gold-dark hover:text-gold-dark"
          >
            {casesCopy.linkLabel}
          </Link>
        </div>
      </Container>
    </section>
  );
}
