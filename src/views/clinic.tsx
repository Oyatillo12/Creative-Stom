import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import ClinicHero from "@/components/ClinicHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ProofBar from "@/components/ProofBar";
import FirstVisitSection from "@/components/FirstVisitSection";
import BookingBand from "@/components/BookingBand";
import Parallax from "@/components/motion/Parallax";
import Marquee from "@/components/motion/Marquee";
import TextReveal from "@/components/motion/TextReveal";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import { getContent, localePrefix, type Locale } from "@/content";
import { NAV_ROUTES } from "@/lib/nav";
import { alternatesFor } from "@/lib/seo";

export function clinicMetadata(locale: Locale): Metadata {
  const site = getContent(locale);
  return {
    title: `${site.pages.clinic.title} — ${site.clinic.name}`,
    description: site.pages.clinic.intro,
    alternates: alternatesFor("/klinika", locale),
  };
}

const MANIFESTO_INDENTS = ["", "md:pl-24", "md:pl-48"];
const GALLERY_OFFSETS = ["md:mt-20", "", "md:mt-32"];
const GALLERY_RANGES = [22, -30, 40];

export default function ClinicView({ locale }: { locale: Locale }) {
  const site = getContent(locale);
  const prefix = localePrefix(locale);
  const { clinicPage } = site;

  return (
    <>
      <ClinicHero
        image={site.media.aboutInterior}
        kicker={clinicPage.hero.kicker}
        heading={clinicPage.hero.heading}
      />

      {/* Manifesto — oversized statements stepping across the page */}
      <section className="bg-ivory py-24 md:py-32">
        <Container>
          <Reveal>
            <SectionHeading eyebrow={clinicPage.manifesto.eyebrow} heading={clinicPage.manifesto.heading} />
          </Reveal>
          <div className="mt-14 md:mt-20">
            {clinicPage.manifesto.paragraphs.map((paragraph, i) => (
              <div
                key={i}
                className={`border-t border-line py-10 first:border-t-0 first:pt-0 md:py-14 ${MANIFESTO_INDENTS[i % MANIFESTO_INDENTS.length]}`}
              >
                <p className="max-w-3xl font-display text-2xl leading-snug text-navy md:text-3xl lg:text-4xl">
                  <TextReveal text={paragraph} stagger={0.02} amount={0.4} />
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ProofBar locale={locale} />

      {/* Standards — numbered protocol rows on navy */}
      <section className="bg-navy py-24 text-ivory md:py-32">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow={clinicPage.standards.eyebrow}
              heading={clinicPage.standards.heading}
              tone="dark"
            />
          </Reveal>
          <RevealGroup stagger={0.09} className="mt-16 border-b border-ivory/15 md:mt-20">
            {clinicPage.standards.items.map((item) => (
              <RevealItem key={item.n}>
                <div className="grid gap-3 border-t border-ivory/15 py-8 md:grid-cols-[140px_minmax(0,1fr)_minmax(0,1.2fr)] md:items-baseline md:gap-10 md:py-12">
                  <span aria-hidden="true" className="font-display text-5xl leading-none text-ivory/15 md:text-7xl">
                    {item.n}
                  </span>
                  <h3 className="font-display text-2xl text-ivory md:text-3xl">{item.title}</h3>
                  <p className="font-body text-sm leading-relaxed text-ivory/70 md:text-base">{item.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Gallery — offset images drifting over a ghosted marquee */}
      <section className="relative overflow-hidden bg-ivory py-24 md:py-36">
        <Marquee
          className="absolute left-0 top-10 w-full font-display text-[14vw] leading-none text-bone md:top-14"
          durationSec={60}
        >
          <span className="pr-24">{site.clinic.name}</span>
          <span className="pr-24">{site.clinic.name}</span>
        </Marquee>
        <Container className="relative">
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {clinicPage.gallery.images.map((img, i) => (
              <Parallax key={img.src} range={GALLERY_RANGES[i % GALLERY_RANGES.length]} className={GALLERY_OFFSETS[i % GALLERY_OFFSETS.length]}>
                <figure>
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={img.src}
                      alt={img.caption}
                      fill
                      sizes="(min-width: 768px) 30vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    {img.caption}
                  </figcaption>
                </figure>
              </Parallax>
            ))}
          </div>
        </Container>
      </section>

      {/* Team teaser */}
      <section className="bg-bone py-24 md:py-32">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow={site.homepage.doctors.eyebrow}
                heading={clinicPage.teamCta.heading}
                description={clinicPage.teamCta.text}
              />
            </Reveal>
            <Reveal delayMs={100}>
              <Link
                href={`${prefix}${NAV_ROUTES.doctors}`}
                className="inline-block border border-navy px-8 py-4 font-body text-xs font-semibold uppercase tracking-[0.12em] text-navy transition-colors hover:bg-navy hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                {clinicPage.teamCta.linkLabel}
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>

      <FirstVisitSection locale={locale} />
      <BookingBand />
    </>
  );
}
