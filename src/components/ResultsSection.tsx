import Link from "next/link";
import Container from "./Container";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import BeforeAfterSlider from "./BeforeAfterSlider";
import { getContent, localePrefix, type Locale } from "@/content";
import { NAV_ROUTES } from "@/lib/nav";
import { btn } from "@/lib/ui";

// One full-width interactive before/after comparison — the featured case.
export default function ResultsSection({ locale = "uz" }: { locale?: Locale } = {}) {
  const site = getContent(locale);
  const prefix = localePrefix(locale);
  const { cases: casesCopy } = site.homepage;
  const featured = site.cases[0];

  return (
    <section id="cases" className="py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={casesCopy.eyebrow} heading={casesCopy.heading} />
        </Reveal>
      </Container>

      <Container className="mt-12 md:mt-16">
        <Reveal>
          <BeforeAfterSlider
            beforeSrc={featured.before}
            afterSrc={featured.after}
            beforeAlt={`${featured.title} — ${casesCopy.beforeLabel}`}
            afterAlt={`${featured.title} — ${casesCopy.afterLabel}`}
            beforeLabel={casesCopy.beforeLabel}
            afterLabel={casesCopy.afterLabel}
            className="sticker aspect-[4/3] w-full rounded-[32px] sm:aspect-[16/9]"
          />
        </Reveal>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-6 md:mt-10">
          <div>
            <div className="font-display text-lg font-medium text-ink md:text-xl">{featured.title}</div>
            <div className="mt-2.5 inline-flex rounded-full bg-sky px-3.5 py-1.5 font-body text-xs font-semibold text-ink">
              {featured.service}
            </div>
          </div>
          <Link href={`${prefix}${NAV_ROUTES.cases}`} className={btn.sky}>
            {casesCopy.linkLabel}
          </Link>
        </div>
      </Container>
    </section>
  );
}
