"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { site } from "@/content";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import Container from "./Container";
import { useModals } from "./ModalProvider";

const NAV_ANCHORS: Record<string, string> = {
  "Xizmatlar": "#services",
  "Shifokorlar": "#doctors",
  "Keyslar": "#cases",
  "Klinika haqida": "#about",
  "Kontakt": "#contact",
};

// Transparent over a page's hero (marked with [data-hero-sentinel]); solid
// ivory once the sentinel scrolls past the top edge, or on pages without one.
export default function Header() {
  const { clinic, layout } = site;
  const { openBooking } = useModals();
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the menu when navigation changes the route (state adjusted during
  // render, per React guidance, instead of a cascading effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const sentinel = document.querySelector("[data-hero-sentinel]");
    if (!sentinel) {
      const solidTimer = setTimeout(() => setSolid(true), 0);
      return () => clearTimeout(solidTimer);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setSolid(!entry.isIntersecting && entry.boundingClientRect.top <= 0);
      },
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [pathname]);

  useFocusTrap(menuOpen, headerRef);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const onDark = !solid || menuOpen;
  const phoneHref = `tel:${clinic.phone.replace(/[^+\d]/g, "")}`;

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid && !menuOpen ? "border-b border-line bg-ivory" : "border-b border-transparent bg-transparent"
      }`}
    >
      <AnimatePresence>
        {menuOpen && (
          <m.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 -z-10 flex flex-col justify-between overflow-y-auto bg-navy px-6 pt-28 pb-10 lg:hidden"
          >
            <nav className="flex flex-col gap-1">
              {layout.nav.map((item, i) => (
                <m.a
                  key={item}
                  href={NAV_ANCHORS[item] ?? "#"}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.06 * i, ease: "easeOut" }}
                  className="border-b border-ivory/10 py-4 font-display text-3xl text-ivory transition-colors hover:text-gold"
                >
                  {item}
                </m.a>
              ))}
            </nav>
            <m.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.06 * layout.nav.length, ease: "easeOut" }}
              className="mt-10 flex flex-col gap-5"
            >
              <a href={phoneHref} className="font-body text-lg text-ivory transition-colors hover:text-gold">
                {clinic.phone}
              </a>
              <div className="flex items-center gap-7 font-body text-sm text-ivory/70">
                <a
                  href={clinic.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gold"
                >
                  {layout.topBar.telegramLabel}
                </a>
                <span className="uppercase tracking-wide">{layout.topBar.languageToggle}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  openBooking();
                }}
                className="mt-2 inline-flex items-center justify-center bg-gold px-8 py-4 font-body text-xs font-semibold uppercase tracking-[0.12em] text-navy transition-colors hover:bg-gold-dark hover:text-ivory"
              >
                {layout.header.ctaLabel}
              </button>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>

      <Container
        className={`flex items-center justify-between transition-all duration-300 ${
          solid && !menuOpen ? "py-4" : "py-6"
        }`}
      >
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className={`font-display text-2xl transition-colors duration-300 ${onDark ? "text-ivory" : "text-navy"}`}
        >
          {clinic.name}
        </Link>

        <nav
          className={`hidden items-center gap-9 font-body text-sm font-medium lg:flex ${
            onDark ? "text-ivory/90" : "text-ink"
          }`}
        >
          {layout.nav.map((item) => (
            <a
              key={item}
              href={NAV_ANCHORS[item] ?? "#"}
              className={`transition-colors ${onDark ? "hover:text-gold" : "hover:text-gold-dark"}`}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <a
            href={phoneHref}
            className={`hidden font-body text-sm font-medium transition-colors xl:block ${
              onDark ? "text-ivory/90 hover:text-gold" : "text-ink hover:text-gold-dark"
            }`}
          >
            {clinic.phone}
          </a>
          <button
            type="button"
            onClick={openBooking}
            className={`hidden items-center border px-6 py-3 font-body text-xs font-semibold uppercase tracking-[0.12em] transition-colors md:inline-flex ${
              onDark
                ? "border-ivory/50 text-ivory hover:bg-ivory hover:text-navy"
                : "border-navy text-navy hover:bg-navy hover:text-ivory"
            }`}
          >
            {layout.header.ctaLabel}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? layout.header.closeLabel : layout.header.menuLabel}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span
              className={`h-0.5 w-6 transition-all duration-300 ${onDark ? "bg-ivory" : "bg-navy"} ${
                menuOpen ? "translate-y-1 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 transition-all duration-300 ${onDark ? "bg-ivory" : "bg-navy"} ${
                menuOpen ? "-translate-y-1 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </Container>
    </header>
  );
}
