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

// Four-step first-visit timeline on slate navy; a gold rule draws itself
// across the step row as it scrolls into view.
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
    <section className="bg-navy-2 py-24 text-ivory md:py-32">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={firstVisit.eyebrow} heading={firstVisit.heading} tone="dark" />
        </Reveal>

        <div ref={trackRef} className="relative mt-16 md:mt-20">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 hidden h-0.5 bg-ivory/15 md:block" />
          <m.div
            aria-hidden="true"
            style={reducedMotion ? undefined : { scaleX: scrollYProgress }}
            className="absolute inset-x-0 top-0 hidden h-0.5 origin-left bg-gold md:block"
          />
          <RevealGroup
            stagger={0.1}
            className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-4 md:gap-10"
          >
            {firstVisit.steps.map((step) => (
              <RevealItem key={step.n} className="border-t border-ivory/15 pt-6 md:border-t-0 md:pt-9">
                <div className="font-body text-xs font-semibold tracking-[0.2em] text-gold">{step.n}</div>
                <div className="mt-4 font-display text-2xl text-ivory md:text-[26px]">{step.title}</div>
                <div className="mt-3 font-body text-sm leading-relaxed text-ivory/70">{step.text}</div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal className="mt-14 md:mt-16">
          <BookingTrigger
            label={firstVisit.ctaLabel}
            className="bg-gold px-9 py-4 font-body text-xs font-semibold uppercase tracking-[0.12em] text-navy transition-colors hover:bg-gold-dark hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          />
        </Reveal>
      </Container>
    </section>
  );
}
