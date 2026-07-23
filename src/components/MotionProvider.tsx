"use client";

import { LazyMotion, MotionConfig, domMax } from "motion/react";
import type { ReactNode } from "react";

// domMax includes drag/pan gestures (reviews carousel) on top of the dom
// animation set; `strict` guarantees no component accidentally imports the
// full `motion.*` bundle. reducedMotion "user" makes every m.* animation
// respect prefers-reduced-motion.
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
