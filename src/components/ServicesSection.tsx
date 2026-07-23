import Link from "next/link";
import Container from "./Container";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import BookingTrigger from "./BookingTrigger";
import { RevealGroup, RevealItem } from "./motion/RevealGroup";
import { getContent, localePrefix, type Locale } from "@/content";
import { NAV_ROUTES } from "@/lib/nav";

// Navy service index: the heading column pins while the six rows scroll past.
export default function ServicesSection({ locale = "uz" }: { locale?: Locale } = {}) {
  const site = getContent(locale);
  const prefix = localePrefix(locale);
  const { services } = site.homepage;
  const catalogue = site.services;
  const priceFor = (slug: string) => site.servicePages.find((p) => p.slug === slug)?.priceFrom;

  const bookCls =
    "bg-gold px-9 py-4 font-body text-xs font-semibold uppercase tracking-[0.12em] text-navy transition-colors hover:bg-gold-dark hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

  return (
    <section id="services" className="bg-navy py-24 text-ivory md:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[380px_1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <SectionHeading
                eyebrow={services.eyebrow}
                heading={services.heading}
                description={services.intro}
                tone="dark"
              />
              <BookingTrigger label={services.bookLabel} className={`mt-10 hidden lg:inline-block ${bookCls}`} />
            </Reveal>
          </div>

          <div>
            <RevealGroup stagger={0.08} className="border-b border-ivory/15">
              {catalogue.map((item, i) => (
                <RevealItem key={item.slug}>
                  <Link
                    href={`${prefix}${NAV_ROUTES.services}/${item.slug}`}
                    className="group -mx-4 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-ivory/15 px-4 py-6 transition-colors hover:bg-navy-2 sm:flex-nowrap sm:py-7"
                  >
                    <span className="w-8 shrink-0 font-body text-xs text-ivory/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-xl leading-snug sm:text-2xl md:text-3xl">
                        {item.title}
                      </span>
                      <span className="mt-1.5 block font-body text-sm text-ivory/50">{item.line}</span>
                    </span>
                    {priceFor(item.slug) ? (
                      <span className="shrink-0 font-body text-sm text-ivory/60">{priceFor(item.slug)}</span>
                    ) : null}
                    <span
                      aria-hidden="true"
                      className="shrink-0 font-body text-lg text-gold transition-transform duration-200 group-hover:translate-x-1.5"
                    >
                      →
                    </span>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal className="mt-10 lg:hidden">
              <BookingTrigger label={services.bookLabel} className={bookCls} />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
