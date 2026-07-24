import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Parallax from "@/components/motion/Parallax";
import { RevealGroup, RevealItem } from "@/components/motion/RevealGroup";
import BookingBand from "@/components/BookingBand";
import { getContent, localePrefix, type Locale } from "@/content";
import { alternatesFor } from "@/lib/seo";
import { textLink } from "@/lib/ui";

export function servicesIndexMetadata(locale: Locale): Metadata {
  const site = getContent(locale);
  return {
    title: `${site.pages.services.title} — ${site.clinic.name}`,
    description: site.pages.services.intro,
    alternates: alternatesFor("/xizmatlar", locale),
  };
}

export default function ServicesIndexView({ locale }: { locale: Locale }) {
  const site = getContent(locale);
  const prefix = localePrefix(locale);
  const { pages, services, homepage } = site;
  const [flagship, ...rest] = services;

  return (
    <>
      <PageHero
        breadcrumb={[{ label: pages.shared.homeLabel, href: prefix || "/" }, { label: pages.services.breadcrumb }]}
        heading={pages.services.title}
        intro={pages.services.intro}
      />

      {/* 01 — flagship: implantation feature split inside a sky mega-card */}
      <section className="px-4 py-10 md:px-6 md:py-14">
        <div className="mx-auto w-full max-w-[1400px] rounded-[36px] bg-sky">
          <Container className="grid items-center gap-12 py-14 md:py-20 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-coral font-body text-sm font-bold text-ink">
                  01
                </span>
                <div className="mt-6">
                  <SectionHeading
                    eyebrow={pages.services.flagshipEyebrow}
                    heading={flagship.title}
                    description={flagship.line}
                  />
                </div>
                <Link href={`${prefix}/xizmatlar/${flagship.slug}`} className={`mt-9 inline-block ${textLink}`}>
                  {homepage.services.linkLabel}
                </Link>
              </div>
            </Reveal>
            <Reveal delayMs={100}>
              <Parallax range={24}>
                <Link href={`${prefix}/xizmatlar/${flagship.slug}`} className="group block rotate-[1.2deg]">
                  <div className="sticker relative aspect-[4/3] overflow-hidden rounded-[28px]">
                    <Image
                      src={site.media.implantHero}
                      alt={flagship.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(min-width: 1024px) 580px, 100vw"
                    />
                  </div>
                </Link>
              </Parallax>
            </Reveal>
          </Container>
        </div>
      </section>

      {/* 02–06 — the rest of the surgical catalogue: white row cards */}
      <section className="py-14 md:py-20">
        <Container>
          <RevealGroup stagger={0.07} className="flex flex-col gap-4">
            {rest.map((item, i) => {
              const priceFrom = site.servicePages.find((p) => p.slug === item.slug)?.priceFrom;
              return (
                <RevealItem key={item.slug}>
                  <Link
                    href={`${prefix}/xizmatlar/${item.slug}`}
                    className="card-soft group flex flex-wrap items-center gap-x-6 gap-y-3 rounded-[24px] bg-card px-6 py-6 transition-transform duration-200 hover:-translate-y-1 sm:flex-nowrap md:px-8"
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[1.5px] border-ink/20 font-body text-xs font-bold text-ink">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-base font-medium leading-snug text-ink md:text-lg">
                        {item.title}
                      </span>
                      <span className="mt-1 block font-body text-sm text-ink/60">{item.line}</span>
                    </span>
                    {priceFrom ? (
                      <span className="shrink-0 rounded-full bg-lemon px-3.5 py-1.5 font-body text-xs font-semibold text-ink">
                        {priceFrom}
                      </span>
                    ) : null}
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink font-body text-sm text-paper transition-transform duration-200 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Container>
      </section>

      <BookingBand />
    </>
  );
}
