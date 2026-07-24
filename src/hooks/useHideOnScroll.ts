"use client";

import { useEffect, useState } from "react";

// True while the user scrolls down past `threshold`; false again on any
// scroll up. Drives the auto-hiding mobile chrome (header, bottom dock).
export function useHideOnScroll(threshold = 160) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > last + 4 && y > threshold) setHidden(true);
        else if (y < last - 4) setHidden(false);
        last = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return hidden;
}
