"use client";

import { useEffect, useRef, useState } from "react";
import Container from "./Container";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { site } from "@/content";

export default function PositioningQuote() {
  const { text, author } = site.positioningQuote;
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const visible = reducedMotion || inView;

  return (
    <section aria-label={text} className="relative bg-navy py-40 md:py-56">
      <div className="sticky top-0 flex min-h-[70vh] items-center justify-center py-20">
        <Container>
          <div
            ref={ref}
            className={`mx-auto max-w-4xl text-center transition-all duration-[1400ms] ease-out ${
              visible ? "scale-100 opacity-100" : "scale-[0.97] opacity-0"
            }`}
          >
            <p className="font-display text-4xl italic leading-tight text-ivory sm:text-5xl md:text-7xl">{text}</p>
            <p className="mt-10 font-body text-xs font-semibold uppercase tracking-[0.24em] text-gold">{author}</p>
          </div>
        </Container>
      </div>
    </section>
  );
}
