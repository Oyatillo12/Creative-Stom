"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Container from "./Container";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { SiteContent } from "@/content";

const SLIDE_INTERVAL_MS = 6500;
const CROSSFADE_MS = 1200;
const KEN_BURNS_MS = 8000;

interface HeroSlideshowProps {
  slides: SiteContent["heroSlides"];
  eyebrow: string;
  heading: string;
  subhead: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

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
  const zoomRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  useEffect(() => {
    if (reducedMotion) return;
    const el = zoomRefs.current[index];
    if (!el) return;
    el.style.animation = "none";
    void el.offsetWidth; // reflow — restarts the animation for repeat slides
    el.style.animation = `kenburns ${KEN_BURNS_MS}ms linear forwards`;
  }, [index, reducedMotion]);

  return (
    <section aria-label={heading} className="relative min-h-[100svh] overflow-hidden bg-navy">
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
            <div
              ref={(el) => {
                zoomRefs.current[i] = el;
              }}
              className="absolute inset-0"
            >
              <Image
                src={slide.image}
                alt={slide.caption}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        );
      })}

      <div className="absolute inset-0 bg-navy/55" />

      <div className="relative z-10 flex min-h-[100svh] flex-col">
        <Container className="flex flex-1 flex-col justify-end pb-20 pt-32 md:pb-28">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-gold">{eyebrow}</span>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[1.05] font-display text-ivory">
            {heading}
          </h1>
          <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-ivory/80 md:text-lg">{subhead}</p>
          <div className="mt-10 flex flex-wrap items-center gap-8">
            <a
              href="#booking"
              className="bg-gold px-9 py-4 font-body text-xs font-semibold uppercase tracking-[0.12em] text-navy transition-colors hover:bg-gold-dark hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              {ctaPrimary}
            </a>
            <a
              href="#services"
              className="border-b border-ivory/40 pb-1 font-body text-sm font-medium text-ivory transition-colors hover:border-gold hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              {ctaSecondary}
            </a>
          </div>
        </Container>

        <div className="absolute bottom-8 left-6 font-body text-xs font-semibold tracking-[0.2em] text-gold md:bottom-10 md:left-10">
          {String(index + 1).padStart(2, "0")} — {String(slides.length).padStart(2, "0")}
        </div>
      </div>
    </section>
  );
}
