"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import type { ReactNode } from "react";

// Loads only the ~5 kB dom-animation feature set; `strict` guarantees no
// component accidentally imports the full `motion.*` bundle. reducedMotion
// "user" makes every m.* animation respect prefers-reduced-motion.
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
