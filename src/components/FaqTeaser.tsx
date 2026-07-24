import Link from "next/link";
import Container from "./Container";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { RevealGroup, RevealItem } from "./motion/RevealGroup";
import { getContent, localePrefix, type Locale } from "@/content";
import { NAV_ROUTES } from "@/lib/nav";
import { btn } from "@/lib/ui";

// Objection removal before the booking closer: FAQ accordion cards beside the
// honest-pricing note and a route to the full price list.
export default function FaqTeaser({ locale = "uz" }: { locale?: Locale } = {}) {
  const site = getContent(locale);
  const prefix = localePrefix(locale);
  const faqCopy = site.homepage.faq;

  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow={faqCopy.eyebrow} heading={faqCopy.heading} />
            <p className="mt-7 max-w-md rounded-[24px] bg-lemon p-6 font-body text-sm leading-relaxed text-ink md:text-base">
              {site.prices.disclaimer}
            </p>
            <Link href={`${prefix}${NAV_ROUTES.prices}`} className={`mt-8 ${btn.light}`}>
              {site.homepage.prices.linkLabel}
            </Link>
          </Reveal>

          <RevealGroup stagger={0.07} className="flex flex-col gap-4">
            {site.faq.map((item) => (
              <RevealItem key={item.question}>
                <details className="group card-soft rounded-[24px] bg-card px-6 md:px-8">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-base font-medium text-ink transition-colors hover:text-violet md:py-6 md:text-lg [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <span
                      aria-hidden="true"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky font-body text-lg text-ink transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-xl pb-6 font-body text-sm leading-relaxed text-ink/75 md:text-base">
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
