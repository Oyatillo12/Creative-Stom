"use client";

import { site } from "@/content";
import { useModals } from "./ModalProvider";

export default function StickyMobileBar() {
  const { clinic, layout } = site;
  const { openBooking } = useModals();
  const phoneHref = `tel:${clinic.phone.replace(/[^+\d]/g, "")}`;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t-2 border-gold bg-navy text-ivory md:hidden"
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
