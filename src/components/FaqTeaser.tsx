import Link from "next/link";
import Container from "./Container";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { RevealGroup, RevealItem } from "./motion/RevealGroup";
import { getContent, localePrefix, type Locale } from "@/content";
import { NAV_ROUTES } from "@/lib/nav";

// Objection removal before the booking closer: FAQ accordion beside the
// honest-pricing note and a route to the full price list.
export default function FaqTeaser({ locale = "uz" }: { locale?: Locale } = {}) {
  const site = getContent(locale);
  const prefix = localePrefix(locale);
  const faqCopy = site.homepage.faq;

  return (
    <section className="bg-ivory py-24 md:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-24">
          <Reveal>
            <SectionHeading eyebrow={faqCopy.eyebrow} heading={faqCopy.heading} />
            <p className="mt-8 max-w-md font-body text-base leading-relaxed text-ink/80">
              {site.prices.disclaimer}
            </p>
            <Link
              href={`${prefix}${NAV_ROUTES.prices}`}
              className="mt-8 inline-block border-b border-navy/30 pb-1 font-body text-sm font-semibold uppercase tracking-[0.12em] text-navy transition-colors hover:border-gold-dark hover:text-gold-dark"
            >
              {site.homepage.prices.linkLabel}
            </Link>
          </Reveal>

          <RevealGroup stagger={0.07} className="border-t border-line">
            {site.faq.map((item) => (
              <RevealItem key={item.question}>
                <details className="group border-b border-line">
                  <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-6 font-display text-xl text-navy transition-colors hover:text-gold-dark md:text-2xl [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <span
                      aria-hidden="true"
                      className="shrink-0 font-body text-lg text-gold-dark transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-xl pb-7 font-body text-sm leading-relaxed text-ink/80 md:text-base">
                    {item.answer}
                  </p>
                </details>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
