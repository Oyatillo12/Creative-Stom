"use client";

import { useEffect, useState } from "react";

const SEEN_KEY = "cs-preloader-seen";
const FILL_MS = 800; // 100ms delay + 700ms brand fill (globals.css)
const LIFT_MS = 400;

// Server-rendered so the violet overlay is the very first paint on a cold visit.
// The inline script hides it pre-hydration for repeat visits and reduced motion,
// so those users never see a flash.
const HIDE_SCRIPT = `try{if(sessionStorage.getItem("${SEEN_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches){var e=document.getElementById("cs-preloader");e&&(e.style.display="none")}}catch(t){}`;

export default function Preloader({ brand, ariaLabel }: { brand: string; ariaLabel: string }) {
  const [lifted, setLifted] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (
      sessionStorage.getItem(SEEN_KEY) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      // Already hidden visually by the inline script; unmount on next tick.
      const skipTimer = setTimeout(() => setGone(true), 0);
      return () => clearTimeout(skipTimer);
    }
    const liftTimer = setTimeout(() => setLifted(true), FILL_MS + 50);
    const goneTimer = setTimeout(() => {
      setGone(true);
      sessionStorage.setItem(SEEN_KEY, "1");
    }, FILL_MS + 50 + LIFT_MS);
    return () => {
      clearTimeout(liftTimer);
      clearTimeout(goneTimer);
    };
  }, []);

  if (gone) return null;

  return (
    <>
      <div
        id="cs-preloader"
        // The inline script below edits this element's style pre-hydration
        // (display:none for repeat visits) — an intentional mismatch.
        suppressHydrationWarning
        role="status"
        aria-label={ariaLabel}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-violet transition-transform ease-in"
        style={{
          transform: lifted ? "translateY(-100%)" : "none",
          transitionDuration: `${LIFT_MS}ms`,
        }}
      >
        <span className="relative font-display text-2xl font-semibold text-paper/25 md:text-4xl">
          {brand}
          <span
            aria-hidden
            className="absolute inset-0 text-sky"
            style={{ clipPath: "inset(0 100% 0 0)", animation: "brandfill 700ms ease-out 100ms forwards" }}
          >
            {brand}
          </span>
        </span>
      </div>
      <script dangerouslySetInnerHTML={{ __html: HIDE_SCRIPT }} />
    </>
  );
}
