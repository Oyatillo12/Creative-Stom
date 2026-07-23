import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import BookingBand from "@/components/BookingBand";
import { site } from "@/content";

export function generateStaticParams() {
  return site.cases.map((caseItem) => ({ slug: caseItem.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const caseItem = site.cases.find((item) => item.slug === slug);
  if (!caseItem) return {};
  return {
    title: `${caseItem.title} — ${site.clinic.name}`,
    description: caseItem.story.problem,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
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
          { label: pages.shared.homeLabel, href: "/" },
          { label: pages.cases.breadcrumb, href: "/keyslar" },
          { label: caseItem.title },
        ]}
        heading={caseItem.title}
        intro={caseItem.service}
      />

      {/* Full-width slider, then the three-part narrative */}
      <section className="bg-ivory py-24 md:py-32">
        <Container>
          <Reveal>
            <BeforeAfterSlider
              beforeSrc={caseItem.before}
              afterSrc={caseItem.after}
              beforeAlt={`${caseItem.title} — ${homepage.cases.beforeLabel}`}
              afterAlt={`${caseItem.title} — ${homepage.cases.afterLabel}`}
              beforeLabel={homepage.cases.beforeLabel}
              afterLabel={homepage.cases.afterLabel}
            />
          </Reveal>

          <div className="mt-20 grid gap-12 md:grid-cols-3 md:gap-10">
            {story.map((part, i) => (
              <Reveal key={part.label} delayMs={i * 70} className="border-t border-line pt-6">
                <div className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-gold-dark">
                  {part.label}
                </div>
                <p className="mt-4 font-body text-base leading-relaxed text-ink">{part.text}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16">
            <Link
              href="/keyslar"
              className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark transition-colors hover:text-navy"
            >
              {pages.cases.allCasesLabel}
            </Link>
          </Reveal>
        </Container>
      </section>

      <BookingBand />
    </>
  );
}
