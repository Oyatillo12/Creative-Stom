"use client";

import type { ReactNode } from "react";
import { m } from "motion/react";
import { EASE_OUT, revealOffset, type RevealDirection } from "./motion/motion-utils";

export default function Reveal({
  children,
  className = "",
  delayMs = 0,
  direction = "up",
  distance = 24,
  duration = 0.6,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  direction?: RevealDirection;
  distance?: number;
  duration?: number;
  amount?: number;
}) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, ...revealOffset(direction, distance) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay: delayMs / 1000, ease: EASE_OUT }}
    >
      {children}
    </m.div>
  );
}
