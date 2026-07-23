"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_OUT } from "./motion-utils";

// Counts the numeric part of stat strings like "6+", "100+", "3 000+" up from
// zero when scrolled into view. The server and the first client render both
// show the final literal string (no hydration mismatch); bracketed
// placeholders and non-numeric values render verbatim and never animate.
function parseStat(raw: string): { target: number; format: (v: number) => string } | null {
  if (raw.includes("[")) return null;
  const match = raw.match(/\d[\d\s ]*\d|\d/);
  if (!match || match.index === undefined) return null;
  const target = Number(match[0].replace(/[\s ]/g, ""));
  if (!Number.isFinite(target) || target <= 0) return null;
  const prefix = raw.slice(0, match.index);
  const suffix = raw.slice(match.index + match[0].length);
  const grouped = /[\s ]/.test(match[0]);
  return {
    target,
    format: (v) => {
      const n = String(Math.round(v));
      return `${prefix}${grouped ? n.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : n}${suffix}`;
    },
  };
}

export default function AnimatedCounter({
  value,
  className = "",
  duration = 1.6,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || reducedMotion) return;
    const parsed = parseStat(value);
    if (!parsed) return;
    const controls = animate(0, parsed.target, {
      duration,
      ease: EASE_OUT,
      onUpdate: (v) => setDisplay(parsed.format(v)),
    });
    return () => controls.stop();
  }, [inView, reducedMotion, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
