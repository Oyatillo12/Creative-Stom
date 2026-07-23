import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import BookingBand from "@/components/BookingBand";
import { getContent, localePrefix, type Locale } from "@/content";
import { alternatesFor } from "@/lib/seo";

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

      {/* 01 — flagship: implantation feature split on white */}
      <section className="bg-white py-24 md:py-32">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div>
              <span className="font-display text-6xl text-line md:text-7xl">01</span>
              <div className="mt-6">
                <SectionHeading
                  eyebrow={pages.services.flagshipEyebrow}
                  heading={flagship.title}
                  description={flagship.line}
                />
              </div>
              <Link
                href={`${prefix}/xizmatlar/${flagship.slug}`}
                className="mt-10 inline-block font-body text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark transition-transform duration-200 hover:translate-x-1"
              >
                {homepage.services.linkLabel}
              </Link>
            </div>
          </Reveal>
          <Reveal delayMs={100}>
            <Link href={`${prefix}/xizmatlar/${flagship.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden border border-line">
                <Image
                  src={site.media.implantHero}
                  alt={flagship.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(min-width: 1024px) 580px, 100vw"
                />
              </div>
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* 02–06 — the rest of the surgical catalogue: numbered rows on ivory */}
      <section className="bg-ivory py-24 md:py-32">
        <Container>
          <div>
            {rest.map((item, i) => (
              <Reveal key={item.slug} delayMs={i * 60}>
                <Link
                  href={`${prefix}/xizmatlar/${item.slug}`}
                  className="group -mx-2 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-line px-2 py-7 transition-colors last:border-b hover:bg-white sm:flex-nowrap"
                >
                  <span className="w-8 shrink-0 font-body text-xs text-muted">{String(i + 2).padStart(2, "0")}</span>
                  <span className="flex-1 font-display text-2xl leading-snug text-navy md:text-3xl">{item.title}</span>
                  <span className="hidden max-w-[260px] font-body text-sm text-muted sm:block">{item.line}</span>
                  <span className="ml-auto shrink-0 font-body text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark transition-transform duration-200 group-hover:translate-x-1 sm:ml-0">
                    {homepage.services.linkLabel}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <BookingBand />
    </>
  );
}
