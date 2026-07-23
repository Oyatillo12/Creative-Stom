"use client";

import { useRef, type ReactNode } from "react";
import { m, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Scroll-linked vertical drift: the wrapped block travels `range`px down to
// -`range`px as it crosses the viewport. MotionConfig's reducedMotion does not
// cover style-bound motion values, so this gates itself.
export default function Parallax({
  children,
  className = "",
  range = 40,
}: {
  children: ReactNode;
  className?: string;
  range?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);

  return (
    <m.div ref={ref} className={className} style={{ y: reducedMotion ? 0 : y }}>
      {children}
    </m.div>
  );
}
