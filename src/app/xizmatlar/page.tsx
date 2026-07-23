import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import BookingBand from "@/components/BookingBand";
import { site } from "@/content";

export const metadata: Metadata = {
  title: `${site.pages.services.title} — ${site.clinic.name}`,
  description: site.pages.services.intro,
};

export default function ServicesIndexPage() {
  const { pages, services, homepage } = site;

  return (
    <>
      <PageHero
        breadcrumb={[{ label: pages.shared.homeLabel, href: "/" }, { label: pages.services.breadcrumb }]}
        heading={pages.services.title}
        intro={pages.services.intro}
      />

      {/* Surgical core: numbered editorial rows on ivory */}
      <section className="bg-ivory py-24 md:py-32">
        <Container>
          <Reveal>
            <div className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-gold-dark">
              {homepage.services.surgicalLabel}
            </div>
          </Reveal>
          <div className="mt-8">
            {services.surgical.map((item, i) => (
              <Reveal key={item.slug} delayMs={i * 60}>
                <Link
                  href={`/xizmatlar/${item.slug}`}
                  className="group -mx-2 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-line px-2 py-7 transition-colors last:border-b hover:bg-white sm:flex-nowrap"
                >
                  <span className="w-8 shrink-0 font-body text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
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

      {/* General dentistry: card-free two-column band on navy */}
      <section className="bg-navy py-24 text-ivory md:py-32">
        <Container>
          <Reveal>
            <div className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-gold">
              {homepage.services.generalLabel}
            </div>
          </Reveal>
          <div className="mt-10 grid gap-x-16 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {services.general.map((item, i) => (
              <Reveal key={item.slug} delayMs={i * 60}>
                <Link href={`/xizmatlar/${item.slug}`} className="group block border-t border-ivory/15 pt-6">
                  <span className="font-display text-2xl transition-colors group-hover:text-gold">{item.title}</span>
                  <span className="mt-3 block font-body text-sm text-ivory/50">{item.line}</span>
                  <span className="mt-5 block font-body text-xs font-semibold uppercase tracking-[0.14em] text-gold transition-transform duration-200 group-hover:translate-x-1">
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
