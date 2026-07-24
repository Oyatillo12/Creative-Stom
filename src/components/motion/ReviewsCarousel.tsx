"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate, m, useMotionValue } from "motion/react";
import type { ReviewItem } from "@/content/types";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_OUT } from "./motion-utils";

const CARD_TILTS = ["-rotate-[0.8deg]", "rotate-[0.8deg]", "rotate-0"];

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
    "sticker sticker-press flex h-12 w-12 items-center justify-center rounded-full bg-card font-body text-lg text-ink disabled:pointer-events-none disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral";

  return (
    <div role="region" aria-roledescription="carousel" aria-label={heading} onKeyDown={onKeyDown}>
      <div ref={viewportRef} className="overflow-hidden py-2">
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
              className={`card-soft flex w-[min(85vw,420px)] shrink-0 flex-col rounded-[24px] bg-card ${CARD_TILTS[i % CARD_TILTS.length]}`}
            >
              <div className="flex flex-1 flex-col justify-between p-7 md:p-9">
                <div>
                  <span aria-hidden="true" className="font-display text-4xl font-bold leading-none text-coral">
                    “
                  </span>
                  <p className="mt-2 font-body text-base leading-relaxed text-ink">{review.text}</p>
                </div>
                <footer className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
                  <span className="font-body text-sm font-bold text-ink">{review.name}</span>
                  <span className="rounded-full bg-sky px-3 py-1 font-body text-xs font-semibold text-ink">
                    {review.service}
                  </span>
                </footer>
              </div>
            </article>
          ))}
        </m.div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-ink/50" aria-hidden="true">
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
