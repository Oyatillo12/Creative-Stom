"use client";

import Image from "next/image";
import { useRef } from "react";
import { m, useScroll, useTransform } from "motion/react";
import Container from "./Container";
import TextReveal from "./motion/TextReveal";
import { EASE_OUT } from "./motion/motion-utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Clinic-page hero: a tall rounded photo card, interior drifting against the
// scroll, with a kicker pill and word-by-word heading pinned to its base.
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
    <section ref={ref} aria-label={heading} className="pt-28 md:pt-32">
      <Container>
        <div className="sticker relative min-h-[62svh] overflow-hidden rounded-[36px] bg-violet md:min-h-[72svh]">
          <m.div className="absolute inset-0" style={reducedMotion ? undefined : { y: mediaY }}>
            <Image src={image} alt={heading} fill priority sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-ink/45" />
          </m.div>

          <div className="relative z-10 flex min-h-[62svh] flex-col justify-end p-8 md:min-h-[72svh] md:p-12 lg:p-14">
            <m.span
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE_OUT }}
              className="inline-flex items-center gap-2.5 self-start rounded-full bg-card px-4 py-2 font-body text-xs font-semibold uppercase tracking-[0.14em] text-ink"
            >
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-coral" />
              {kicker}
            </m.span>
            <h1 className="mt-5 max-w-3xl font-display text-[clamp(1.9rem,4.6vw,3.4rem)] font-semibold leading-[1.1] text-paper">
              <TextReveal text={heading} delay={0.3} stagger={0.08} amount={0.1} />
            </h1>
          </div>
        </div>
      </Container>
    </section>
  );
}
