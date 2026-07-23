"use client";

import { useEffect, useState } from "react";
import { useContent } from "./LocaleProvider";
import { useModals } from "./ModalProvider";

export default function StickyMobileBar() {
  const site = useContent();
  const { clinic, layout } = site;
  const { openBooking } = useModals();
  const phoneHref = `tel:${clinic.phone.replace(/[^+\d]/g, "")}`;
  const [hidden, setHidden] = useState(false);

  // Slides away while scrolling down, returns on any scroll up.
  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > last + 4 && y > 160) setHidden(true);
        else if (y < last - 4) setHidden(false);
        last = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t-2 border-gold bg-navy text-ivory transition-transform duration-300 md:hidden ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href={phoneHref}
        className="flex min-h-12 items-center justify-center border-r border-ivory/15 text-xs font-semibold uppercase tracking-wide"
      >
        {layout.stickyBar.call}
      </a>
      <a
        href={clinic.telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-12 items-center justify-center border-r border-ivory/15 text-xs font-semibold uppercase tracking-wide"
      >
        {layout.stickyBar.telegram}
      </a>
      <button
        type="button"
        onClick={openBooking}
        className="flex min-h-12 items-center justify-center text-xs font-semibold uppercase tracking-wide"
      >
        {layout.stickyBar.book}
      </button>
    </div>
  );
}
