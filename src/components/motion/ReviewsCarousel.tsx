"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate, m, useMotionValue } from "motion/react";
import type { ReviewItem } from "@/content/types";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_OUT } from "./motion-utils";

// Drag-to-scroll review cards with prev/next buttons and arrow-key support.
// The track is one motion value; buttons and drag snapping both animate it to
// a card index, clamped so the last card parks at the right edge.
export default function ReviewsCarousel({
  items,
  heading,
  prevLabel,
  nextLabel,
}: {
  items: ReviewItem[];
  heading: string;
  prevLabel: string;
  nextLabel: string;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [atEnd, setAtEnd] = useState(false);

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return { step: 0, max: 0 };
    const max = Math.max(0, track.scrollWidth - viewport.clientWidth);
    const first = track.children[0] as HTMLElement | undefined;
    const second = track.children[1] as HTMLElement | undefined;
    const step = first && second ? second.offsetLeft - first.offsetLeft : (first?.offsetWidth ?? 0);
    return { step, max };
  }, []);

  const goTo = useCallback(
    (nextIndex: number, instant = false) => {
      const { step, max } = measure();
      if (!step) return;
      const clamped = Math.max(0, Math.min(nextIndex, items.length - 1));
      const target = Math.min(clamped * step, max);
      setIndex(clamped);
      setAtEnd(clamped === items.length - 1 || target >= max);
      if (instant || reducedMotion) x.set(-target);
      else animate(x, -target, { duration: 0.55, ease: EASE_OUT });
    },
    [items.length, measure, reducedMotion, x],
  );

  useEffect(() => {
    const onResize = () => goTo(index, true);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [goTo, index]);

  const onDragEnd = () => {
    const { step } = measure();
    if (!step) return;
    goTo(Math.round(-x.get() / step));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(index - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(index + 1);
    }
  };

  const buttonCls =
    "flex h-12 w-12 items-center justify-center border border-line font-body text-lg text-navy transition-colors hover:border-gold-dark hover:text-gold-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:pointer-events-none disabled:opacity-30";

  return (
    <div role="region" aria-roledescription="carousel" aria-label={heading} onKeyDown={onKeyDown}>
      <div ref={viewportRef} className="overflow-hidden">
        <m.div
          ref={trackRef}
          drag="x"
          dragConstraints={viewportRef}
          dragMomentum={false}
          onDragEnd={onDragEnd}
          style={{ x }}
          className="flex cursor-grab gap-6 active:cursor-grabbing md:gap-8"
        >
          {items.map((review, i) => (
            <article
              key={review.name + i}
              role="group"
              aria-label={`${i + 1} / ${items.length}`}
              className="flex w-[min(85vw,420px)] shrink-0 flex-col border border-line bg-ivory"
            >
              <div className="h-0.5 w-full bg-gold" />
              <div className="flex flex-1 flex-col justify-between p-8 md:p-10">
                <p className="font-display text-lg leading-relaxed text-navy md:text-xl">{review.text}</p>
                <footer className="mt-10 flex items-baseline justify-between gap-4 border-t border-line pt-6">
                  <span className="font-body text-sm font-semibold text-ink">{review.name}</span>
                  <span className="text-right font-body text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark">
                    {review.service}
                  </span>
                </footer>
              </div>
            </article>
          ))}
        </m.div>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-muted" aria-hidden="true">
          {String(index + 1).padStart(2, "0")} — {String(items.length).padStart(2, "0")}
        </span>
        <div className="flex gap-3">
          <button type="button" onClick={() => goTo(index - 1)} disabled={index === 0} aria-label={prevLabel} className={buttonCls}>
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" onClick={() => goTo(index + 1)} disabled={atEnd} aria-label={nextLabel} className={buttonCls}>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
