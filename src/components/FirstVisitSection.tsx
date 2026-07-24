"use client";

import { useRef } from "react";
import { m, useScroll } from "motion/react";
import Container from "./Container";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import BookingTrigger from "./BookingTrigger";
import { RevealGroup, RevealItem } from "./motion/RevealGroup";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { getContent, type Locale } from "@/content";
import { btn } from "@/lib/ui";

// Mint mega-card with four numbered step tiles; a coral rule draws itself
// across the top of the step row as it scrolls into view.
export default function FirstVisitSection({ locale = "uz" }: { locale?: Locale } = {}) {
  const site = getContent(locale);
  const { firstVisit } = site.homepage;
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.85", "start 0.35"],
  });

  return (
    <section className="px-4 py-10 md:px-6 md:py-14">
      <div className="mx-auto w-full max-w-[1400px] rounded-[36px] bg-sky">
        <Container className="py-16 md:py-24">
          <Reveal>
            <SectionHeading eyebrow={firstVisit.eyebrow} heading={firstVisit.heading} />
          </Reveal>

          <div ref={trackRef} className="relative mt-12 md:mt-16">
            <div aria-hidden="true" className="absolute inset-x-0 -top-4 hidden h-1 rounded-full bg-ink/10 md:block" />
            <m.div
              aria-hidden="true"
              style={reducedMotion ? undefined : { scaleX: scrollYProgress }}
              className="absolute inset-x-0 -top-4 hidden h-1 origin-left rounded-full bg-coral md:block"
            />
            {/* Mobile: horizontal snap carousel; md+: four-column grid. */}
            <RevealGroup
              stagger={0.1}
              className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:snap-none md:grid-cols-4 md:gap-6 md:overflow-visible md:px-0 md:pb-0 md:pt-6"
            >
              {firstVisit.steps.map((step) => (
                <RevealItem
                  key={step.n}
                  className="flex h-full w-[75%] max-w-[300px] shrink-0 snap-start flex-col rounded-[24px] bg-paper p-6 md:w-auto md:max-w-none md:shrink md:p-7"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-coral font-body text-sm font-bold text-ink">
                    {step.n}
                  </span>
                  <div className="mt-5 font-display text-base font-medium leading-snug text-ink md:text-lg">
                    {step.title}
                  </div>
                  <div className="mt-3 font-body text-sm leading-relaxed text-ink/70">{step.text}</div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <Reveal className="mt-12 md:mt-14">
            <BookingTrigger label={firstVisit.ctaLabel} className={btn.primary} />
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
