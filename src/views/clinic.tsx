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
import { btn } from "@/lib/ui";

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
const GALLERY_TILTS = ["-rotate-[1.2deg]", "rotate-[1deg]", "-rotate-[0.8deg]"];

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
      <section className="py-20 md:py-28">
        <Container>
          <Reveal>
            <SectionHeading eyebrow={clinicPage.manifesto.eyebrow} heading={clinicPage.manifesto.heading} />
          </Reveal>
          <div className="mt-12 md:mt-16">
            {clinicPage.manifesto.paragraphs.map((paragraph, i) => (
              <div
                key={i}
                className={`border-t border-line py-9 first:border-t-0 first:pt-0 md:py-12 ${MANIFESTO_INDENTS[i % MANIFESTO_INDENTS.length]}`}
              >
                <p className="max-w-3xl font-display text-lg font-medium leading-snug text-ink md:text-2xl lg:text-[1.7rem]">
                  <TextReveal text={paragraph} stagger={0.02} amount={0.4} />
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ProofBar locale={locale} />

      {/* Standards — numbered protocol rows inside the violet mega-card */}
      <section className="px-4 py-10 md:px-6 md:py-14">
        <div className="mx-auto w-full max-w-[1400px] rounded-[36px] bg-violet">
          <Container className="py-16 md:py-24">
            <Reveal>
              <SectionHeading
                eyebrow={clinicPage.standards.eyebrow}
                heading={clinicPage.standards.heading}
                tone="dark"
              />
            </Reveal>
            <RevealGroup stagger={0.09} className="mt-12 border-b border-paper/15 md:mt-16">
              {clinicPage.standards.items.map((item) => (
                <RevealItem key={item.n}>
                  <div className="grid gap-3 border-t border-paper/15 py-8 md:grid-cols-[120px_minmax(0,1fr)_minmax(0,1.2fr)] md:items-baseline md:gap-10 md:py-12">
                    <span
                      aria-hidden="true"
                      className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-sky font-body text-sm font-bold text-ink"
                    >
                      {item.n}
                    </span>
                    <h3 className="font-display text-lg font-medium text-paper md:text-xl">{item.title}</h3>
                    <p className="font-body text-sm leading-relaxed text-paper/70 md:text-base">{item.text}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </div>
      </section>

      {/* Gallery — tilted photo stickers drifting over a ghosted marquee */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <Marquee
          className="absolute left-0 top-8 w-full font-display text-[13vw] font-bold leading-none text-sky md:top-10"
          durationSec={60}
        >
          <span className="pr-24">{site.clinic.name}</span>
          <span className="pr-24">{site.clinic.name}</span>
        </Marquee>
        <Container className="relative">
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {clinicPage.gallery.images.map((img, i) => (
              <Parallax
                key={img.src}
                range={GALLERY_RANGES[i % GALLERY_RANGES.length]}
                className={GALLERY_OFFSETS[i % GALLERY_OFFSETS.length]}
              >
                <figure className={GALLERY_TILTS[i % GALLERY_TILTS.length]}>
                  <div className="sticker relative aspect-[3/4] overflow-hidden rounded-[28px]">
                    <Image
                      src={img.src}
                      alt={img.caption}
                      fill
                      sizes="(min-width: 768px) 30vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-4 inline-flex rounded-full border-[1.5px] border-ink/15 bg-card px-3.5 py-1.5 font-body text-xs font-semibold text-ink">
                    {img.caption}
                  </figcaption>
                </figure>
              </Parallax>
            ))}
          </div>
        </Container>
      </section>

      {/* Team teaser — lemon card */}
      <section className="px-4 py-10 md:px-6 md:py-14">
        <div className="mx-auto w-full max-w-[1400px] rounded-[36px] bg-lemon">
          <Container className="py-14 md:py-20">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20">
              <Reveal>
                <SectionHeading
                  eyebrow={site.homepage.doctors.eyebrow}
                  heading={clinicPage.teamCta.heading}
                  description={clinicPage.teamCta.text}
                />
              </Reveal>
              <Reveal delayMs={100}>
                <Link href={`${prefix}${NAV_ROUTES.doctors}`} className={btn.light}>
                  {clinicPage.teamCta.linkLabel}
                </Link>
              </Reveal>
            </div>
          </Container>
        </div>
      </section>

      <FirstVisitSection locale={locale} />
      <BookingBand />
    </>
  );
}
