"use client";

import Image from "next/image";
import { useRef } from "react";
import { m, useScroll, useTransform } from "motion/react";
import Container from "./Container";
import TextReveal from "./motion/TextReveal";
import { EASE_OUT } from "./motion/motion-utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Immersive clinic-page hero: full-bleed interior photo drifting against the
// scroll, kicker + word-by-word heading. Carries the header's hero sentinel.
export default function ClinicHero({
  image,
  kicker,
  heading,
}: {
  image: string;
  kicker: string;
  heading: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);

  return (
    <section ref={ref} aria-label={heading} className="relative min-h-[72svh] overflow-hidden bg-navy md:min-h-[82svh]">
      <m.div className="absolute inset-0" style={reducedMotion ? undefined : { y: mediaY }}>
        <Image src={image} alt={heading} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-navy/60" />
      </m.div>

      <span data-hero-sentinel aria-hidden className="absolute left-0 top-[52svh] h-px w-px" />

      <Container className="relative z-10 flex min-h-[72svh] flex-col justify-end pb-16 pt-36 md:min-h-[82svh] md:pb-24">
        <m.span
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE_OUT }}
          className="inline-block font-body text-xs font-semibold uppercase tracking-[0.24em] text-gold"
        >
          {kicker}
        </m.span>
        <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.4rem,5.5vw,4.5rem)] font-medium leading-[1.05] text-ivory">
          <TextReveal text={heading} delay={0.3} stagger={0.08} amount={0.1} />
        </h1>
      </Container>
    </section>
  );
}
