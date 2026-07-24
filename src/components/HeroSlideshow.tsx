"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { m } from "motion/react";
import Container from "./Container";
import TextReveal from "./motion/TextReveal";
import { useModals } from "./ModalProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { btn } from "@/lib/ui";
import type { SiteContent } from "@/content";

const SLIDE_INTERVAL_MS = 5500;
const CROSSFADE_MS = 900;

const enter = (i: number) => ({
  duration: 0.6,
  delay: 0.15 + i * 0.12,
  ease: [0.22, 1, 0.36, 1] as const,
});

interface HeroSlideshowProps {
  slides: SiteContent["heroSlides"];
  eyebrow: string;
  heading: string;
  subhead: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

// Split hero: sky statement card beside a tilted photo sticker that cycles
// through the clinic slides, with lemon/coral shapes peeking out behind it.
export default function HeroSlideshow({
  slides,
  eyebrow,
  heading,
  subhead,
  ctaPrimary,
  ctaSecondary,
}: HeroSlideshowProps) {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const { openBooking } = useModals();

  useEffect(() => {
    if (reducedMotion || slides.length < 2) return;

    let timer: ReturnType<typeof setInterval> | null = null;
    const start = () => {
      timer = setInterval(() => {
        setIndex((i) => (i + 1) % slides.length);
      }, SLIDE_INTERVAL_MS);
    };
    const stop = () => {
      if (timer) clearInterval(timer);
      timer = null;
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    if (!document.hidden) start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reducedMotion, slides.length]);

  return (
    <section aria-label={heading} className="overflow-hidden pt-28 pb-8 md:pt-32 md:pb-12">
      <Container>
        <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <m.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={enter(0)}
            className="card-soft flex flex-col items-start justify-center rounded-[36px] bg-sky p-8 md:p-12 lg:p-14"
          >
            <m.span
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={enter(1)}
              className="inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-ink/15 bg-card px-4 py-2 font-body text-xs font-semibold uppercase tracking-[0.14em] text-ink"
            >
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-coral" />
              {eyebrow}
            </m.span>
            <h1 className="mt-6 font-display text-[clamp(1.85rem,4.4vw,3.2rem)] font-semibold leading-[1.1] text-ink">
              <TextReveal text={heading} delay={0.3} stagger={0.07} amount={0.1} />
            </h1>
            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={enter(2)}
              className="mt-5 max-w-xl font-body text-base leading-relaxed text-ink/75 md:text-lg"
            >
              {subhead}
            </m.p>
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={enter(3)}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <button type="button" onClick={openBooking} className={btn.primary}>
                {ctaPrimary}
              </button>
              <a href="#services" className={btn.light}>
                {ctaSecondary}
              </a>
            </m.div>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={enter(2)}
            className="relative min-h-[320px] sm:min-h-[400px] lg:min-h-0"
          >
            <div
              aria-hidden="true"
              className="absolute inset-x-6 top-2 bottom-0 rotate-[4deg] rounded-[32px] bg-lemon"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-2 -left-1 h-16 w-16 rotate-[-8deg] rounded-2xl bg-coral md:h-20 md:w-20"
            />
            <div className="sticker absolute inset-0 -rotate-[1.5deg] overflow-hidden rounded-[32px] bg-violet">
              {slides.map((slide, i) => {
                if (reducedMotion && i !== 0) return null;
                const active = reducedMotion || i === index;
                return (
                  <div
                    key={slide.image}
                    className="absolute inset-0"
                    style={{
                      opacity: active ? 1 : 0,
                      transition: reducedMotion ? "none" : `opacity ${CROSSFADE_MS}ms ease`,
                    }}
                    aria-hidden={!active}
                  >
                    <Image
                      src={slide.image}
                      alt={slide.caption}
                      fill
                      priority={i === 0}
                      sizes="(min-width: 1024px) 42vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                );
              })}
              <span className="absolute top-4 right-4 rounded-full bg-card px-3.5 py-1.5 font-body text-xs font-bold text-ink">
                {String(index + 1).padStart(2, "0")}/{String(slides.length).padStart(2, "0")}
              </span>
              <span className="absolute bottom-4 left-4 max-w-[80%] rounded-full bg-card px-4 py-2 font-body text-xs font-semibold text-ink">
                {slides[reducedMotion ? 0 : index].caption}
              </span>
            </div>
          </m.div>
        </div>
      </Container>
    </section>
  );
}
