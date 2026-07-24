"use client";

import { useEffect, useState } from "react";
import { useContent } from "./LocaleProvider";
import { useModals } from "./ModalProvider";

// Floating pill dock on mobile: call / telegram / book.
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
      className={`fixed inset-x-3 bottom-3 z-40 transition-transform duration-300 md:hidden ${
        hidden ? "translate-y-[130%]" : "translate-y-0"
      }`}
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="sticker grid grid-cols-3 overflow-hidden rounded-full bg-violet text-paper">
        <a
          href={phoneHref}
          className="flex min-h-13 items-center justify-center border-r border-paper/15 text-xs font-semibold uppercase tracking-wide"
        >
          {layout.stickyBar.call}
        </a>
        <a
          href={clinic.telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-13 items-center justify-center text-xs font-semibold uppercase tracking-wide"
        >
          {layout.stickyBar.telegram}
        </a>
        <button
          type="button"
          onClick={openBooking}
          className="flex min-h-13 items-center justify-center bg-coral text-xs font-bold uppercase tracking-wide text-ink"
        >
          {layout.stickyBar.book}
        </button>
      </div>
    </div>
  );
}
