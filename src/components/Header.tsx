"use client";

import Link from "next/link";
import { site } from "@/content";
import Container from "./Container";
import { useModals } from "./ModalProvider";

const NAV_ANCHORS: Record<string, string> = {
  "Xizmatlar": "#services",
  "Shifokorlar": "#doctors",
  "Keyslar": "#cases",
  "Klinika haqida": "#about",
  "Kontakt": "#contact",
};

export default function Header() {
  const { clinic, layout } = site;
  const { openBooking } = useModals();

  return (
    <header className="border-b border-line bg-ivory">
      <Container className="flex items-center justify-between py-6">
        <Link href="/" className="font-display text-2xl text-navy">
          {clinic.name}
        </Link>
        <nav className="hidden items-center gap-9 font-body text-sm font-medium text-ink lg:flex">
          {layout.nav.map((item) => (
            <a key={item} href={NAV_ANCHORS[item] ?? "#"} className="transition-colors hover:text-gold-dark">
              {item}
            </a>
          ))}
        </nav>
        <button
          type="button"
          onClick={openBooking}
          className="hidden items-center border border-navy px-6 py-3 font-body text-xs font-semibold uppercase tracking-[0.12em] text-navy transition-colors hover:bg-navy hover:text-ivory md:inline-flex"
        >
          {layout.header.ctaLabel}
        </button>
      </Container>
    </header>
  );
}
