import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import BookingBand from "@/components/BookingBand";
import { getContent, localePrefix, type Locale } from "@/content";
import { alternatesFor } from "@/lib/seo";
import { textLink } from "@/lib/ui";

export function caseStaticParams() {
  return getContent("uz").cases.map((caseItem) => ({ slug: caseItem.slug }));
}

export function caseMetadata(locale: Locale, slug: string): Metadata {
  const caseItem = getContent(locale).cases.find((item) => item.slug === slug);
  if (!caseItem) return {};
  return {
    title: `${caseItem.title} — ${getContent(locale).clinic.name}`,
    description: caseItem.story.problem,
    alternates: alternatesFor(`/keyslar/${slug}`, locale),
  };
}

const STORY_BGS = ["bg-sky", "bg-card", "bg-lemon"];

export default function CaseStudyView({ locale, slug }: { locale: Locale; slug: string }) {
  const site = getContent(locale);
  const prefix = localePrefix(locale);
  const caseItem = site.cases.find((item) => item.slug === slug);
  if (!caseItem) notFound();
  const { pages, homepage } = site;
  const story = [
    { label: pages.cases.problemLabel, text: caseItem.story.problem },
    { label: pages.cases.planLabel, text: caseItem.story.plan },
    { label: pages.cases.resultLabel, text: caseItem.story.result },
  ];

  return (
    <>
      <PageHero
        breadcrumb={[
          { label: pages.shared.homeLabel, href: prefix || "/" },
          { label: pages.cases.breadcrumb, href: `${prefix}/keyslar` },
          { label: caseItem.title },
        ]}
        heading={caseItem.title}
        intro={caseItem.service}
      />

      {/* Full-width slider, then the three-part narrative as colored cards */}
      <section className="py-20 md:py-28">
        <Container>
          <Reveal>
            <BeforeAfterSlider
              beforeSrc={caseItem.before}
              afterSrc={caseItem.after}
              beforeAlt={`${caseItem.title} — ${homepage.cases.beforeLabel}`}
              afterAlt={`${caseItem.title} — ${homepage.cases.afterLabel}`}
              beforeLabel={homepage.cases.beforeLabel}
              afterLabel={homepage.cases.afterLabel}
              className="sticker aspect-[4/3] w-full rounded-[32px] sm:aspect-[16/9]"
            />
          </Reveal>

          <div className="mt-14 grid gap-5 md:mt-20 md:grid-cols-3 md:gap-6">
            {story.map((part, i) => (
              <Reveal
                key={part.label}
                delayMs={i * 70}
                className={`card-soft flex h-full flex-col rounded-[24px] p-6 md:p-7 ${STORY_BGS[i % STORY_BGS.length]}`}
              >
                <div className="inline-flex items-center gap-2 self-start rounded-full border-[1.5px] border-ink/15 bg-paper/70 px-3.5 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.12em] text-ink">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-coral" />
                  {part.label}
                </div>
                <p className="mt-4 font-body text-base leading-relaxed text-ink">{part.text}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14">
            <Link href={`${prefix}/keyslar`} className={textLink}>
              {pages.cases.allCasesLabel}
            </Link>
          </Reveal>
        </Container>
      </section>

      <BookingBand />
    </>
  );
}
