"use client";

import { useContent } from "./LocaleProvider";
import { useModals } from "./ModalProvider";
import { useHideOnScroll } from "@/hooks/useHideOnScroll";

function PhoneGlyph() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path
        d="M4 3.5 6.5 3l1.6 3.4-1.5 1.5a11 11 0 0 0 5.5 5.5l1.5-1.5L17 13.5l-.5 2.5c-.2 1-1.2 1.6-2.2 1.3A14.5 14.5 0 0 1 2.7 5.7C2.4 4.7 3 3.7 4 3.5Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TelegramGlyph() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M17 3.5 2.8 9.2l4.3 1.9M17 3.5l-2.3 12.7-5.6-5.1M17 3.5 7.1 11.1m0 0v4.4l2.6-2.6" strokeLinejoin="round" />
    </svg>
  );
}

// Conversion-first mobile dock: dominant coral Book button with compact
// call/telegram circles. Slides away on scroll down; a small round call FAB
// stays reachable while the dock is hidden.
export default function StickyMobileBar() {
  const site = useContent();
  const { clinic, layout } = site;
  const { openBooking } = useModals();
  const phoneHref = `tel:${clinic.phone.replace(/[^+\d]/g, "")}`;
  const hidden = useHideOnScroll();

  const roundBtn =
    "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-violet-2 text-paper transition-colors active:bg-violet";

  return (
    <>
      <div
        className={`fixed inset-x-3 bottom-3 z-40 transition-transform duration-300 md:hidden ${
          hidden ? "translate-y-[130%]" : "translate-y-0"
        }`}
        style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="sticker flex items-center gap-1.5 rounded-full bg-violet p-1.5 text-paper">
          <a href={phoneHref} aria-label={layout.stickyBar.call} className={roundBtn}>
            <PhoneGlyph />
          </a>
          <a
            href={clinic.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={layout.stickyBar.telegram}
            className={roundBtn}
          >
            <TelegramGlyph />
          </a>
          <button
            type="button"
            onClick={openBooking}
            className="flex h-12 flex-1 items-center justify-center rounded-full bg-coral text-sm font-bold uppercase tracking-wide text-ink"
          >
            {layout.stickyBar.book}
          </button>
        </div>
      </div>

      <a
        href={phoneHref}
        aria-label={layout.stickyBar.call}
        className={`sticker fixed right-3 bottom-3 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-lemon text-ink transition-all duration-300 md:hidden ${
          hidden ? "scale-100 opacity-100" : "pointer-events-none scale-50 opacity-0"
        }`}
        style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      >
        <PhoneGlyph />
      </a>
    </>
  );
}
