"use client";

import type { ReactNode } from "react";
import { m } from "motion/react";
import { EASE_OUT, revealOffset, type RevealDirection } from "./motion-utils";

// Staggered reveal: RevealGroup orchestrates, RevealItem children inherit the
// hidden/visible variants. Replaces manual `delayMs={i * 80}` loops.
export function RevealGroup({
  children,
  className = "",
  stagger = 0.08,
  delay = 0,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
}) {
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </m.div>
  );
}

export function RevealItem({
  children,
  className = "",
  direction = "up",
  distance = 24,
  duration = 0.6,
}: {
  children: ReactNode;
  className?: string;
  direction?: RevealDirection;
  distance?: number;
  duration?: number;
}) {
  return (
    <m.div
      className={className}
      variants={{
        hidden: { opacity: 0, ...revealOffset(direction, distance) },
        visible: { opacity: 1, x: 0, y: 0, transition: { duration, ease: EASE_OUT } },
      }}
    >
      {children}
    </m.div>
  );
}
