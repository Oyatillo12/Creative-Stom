"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

// Remounts on every navigation — gives each page a short entrance without
// blocking interaction or shifting layout.
export default function Template({ children }: { children: ReactNode }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </m.div>
  );
}
