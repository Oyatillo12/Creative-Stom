import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CredentialsSection from "@/components/CredentialsSection";
import FirstVisitSection from "@/components/FirstVisitSection";
import PositioningQuote from "@/components/PositioningQuote";
import BookingBand from "@/components/BookingBand";
import { site } from "@/content";

export const metadata: Metadata = {
  title: `${site.pages.clinic.title} — ${site.clinic.name}`,
  description: site.pages.clinic.intro,
};

export default function ClinicPage() {
  const { pages, homepage, clinic, media } = site;
  const stats = [
    { value: clinic.stats.years, label: clinic.statsLabels.years },
    { value: clinic.stats.surgeries, label: clinic.statsLabels.surgeries },
    { value: String(clinic.stats.doctors), label: clinic.statsLabels.doctors },
  ];

  return (
    <>
      <PageHero
        breadcrumb={[{ label: pages.shared.homeLabel, href: "/" }, { label: pages.clinic.breadcrumb }]}
        heading={pages.clinic.title}
        intro={pages.clinic.intro}
      />

      {/* Statement beside interior imagery */}
      <section className="bg-ivory py-24 md:py-32">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow={homepage.about.eyebrow}
                heading={homepage.about.heading}
                description={homepage.about.statement}
              />
              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-line pt-8">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="font-display text-3xl text-navy md:text-4xl">{stat.value}</div>
                    <div className="mt-2 font-body text-xs uppercase tracking-[0.14em] text-muted">{stat.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delayMs={80}>
              <div className="relative aspect-[4/5] overflow-hidden lg:aspect-[3/4]">
                <Image
                  src={media.aboutInterior}
                  alt={homepage.about.heading}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <PositioningQuote />
      <CredentialsSection />
      <FirstVisitSection />
      <BookingBand />
    </>
  );
}
