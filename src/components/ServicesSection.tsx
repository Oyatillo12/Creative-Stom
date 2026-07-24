import Link from "next/link";
import Container from "./Container";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import BookingTrigger from "./BookingTrigger";
import { RevealGroup, RevealItem } from "./motion/RevealGroup";
import { getContent, localePrefix, type Locale } from "@/content";
import { NAV_ROUTES } from "@/lib/nav";
import { btn } from "@/lib/ui";

const CARD_COLORS = ["bg-card", "bg-sky", "bg-lemon"];

// Teal mega-card holding the service catalogue as a grid of colored tiles.
export default function ServicesSection({ locale = "uz" }: { locale?: Locale } = {}) {
  const site = getContent(locale);
  const prefix = localePrefix(locale);
  const { services } = site.homepage;
  const catalogue = site.services;
  const priceFor = (slug: string) => site.servicePages.find((p) => p.slug === slug)?.priceFrom;

  return (
    <section id="services" className="px-4 py-10 md:px-6 md:py-14">
      <div className="mx-auto w-full max-w-[1400px] rounded-[36px] bg-violet">
        <Container className="py-16 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <Reveal>
              <SectionHeading
                eyebrow={services.eyebrow}
                heading={services.heading}
                description={services.intro}
                tone="dark"
              />
            </Reveal>
            <Reveal delayMs={100}>
              <BookingTrigger label={services.bookLabel} className={btn.primary} />
            </Reveal>
          </div>

          {/* Mobile: horizontal snap carousel; sm+: grid. */}
          <RevealGroup
            stagger={0.07}
            className="no-scrollbar -mx-6 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 md:mt-16 lg:grid-cols-3"
          >
            {catalogue.map((item, i) => (
              <RevealItem
                key={item.slug}
                className="h-full w-[80%] max-w-[320px] shrink-0 snap-start sm:w-auto sm:max-w-none sm:shrink"
              >
                <Link
                  href={`${prefix}${NAV_ROUTES.services}/${item.slug}`}
                  className={`group flex h-full flex-col rounded-[24px] p-7 transition-transform duration-200 hover:-translate-y-1.5 md:p-8 ${CARD_COLORS[i % CARD_COLORS.length]}`}
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center self-start rounded-full border-[1.5px] border-ink/20 font-body text-xs font-bold text-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-5 block font-display text-lg font-medium leading-snug text-ink md:text-xl">
                    {item.title}
                  </span>
                  <span className="mt-2.5 block font-body text-sm leading-relaxed text-ink/65">{item.line}</span>
                  <span className="mt-auto flex items-center justify-between gap-4 pt-7">
                    {priceFor(item.slug) ? (
                      <span className="rounded-full border-[1.5px] border-ink/20 px-3.5 py-1.5 font-body text-xs font-semibold text-ink">
                        {priceFor(item.slug)}
                      </span>
                    ) : (
                      <span />
                    )}
                    <span
                      aria-hidden="true"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-ink font-body text-sm text-paper transition-transform duration-200 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </div>
    </section>
  );
}
