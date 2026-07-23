"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { useContent, useLocale } from "./LocaleProvider";
import { localePrefix, type Locale } from "@/content";
import type { NavKey } from "@/content/types";
import { LOCALES } from "@/config/site.config";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import Container from "./Container";
import { useModals } from "./ModalProvider";

const MotionLink = m.create(Link);

const NAV_ROUTES: Record<NavKey, string> = {
  services: "/xizmatlar",
  doctors: "/shifokorlar",
  cases: "/keyslar",
  about: "/klinika",
  prices: "/narxlar",
  contact: "/aloqa",
};

type DropdownId = "services" | "clinic" | "lang";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 10 6"
      aria-hidden="true"
      className={`h-[7px] w-[11px] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

// Transparent over a page's hero (marked with [data-hero-sentinel]); solid
// ivory once the sentinel scrolls past the top edge, or on pages without one.
export default function Header() {
  const site = useContent();
  const { clinic, layout } = site;
  const { nav } = layout;
  const { openBooking } = useModals();
  const pathname = usePathname();
  const locale = useLocale();
  const prefix = localePrefix(locale);
  const navHref = (key: NavKey) => `${prefix}${NAV_ROUTES[key]}`;
  const switchTarget = (target: Locale) => {
    const bare = pathname.replace(/^\/ru(?=\/|$)/, "") || "/";
    return `${localePrefix(target)}${bare === "/" ? "" : bare}` || "/";
  };
  const headerRef = useRef<HTMLElement>(null);
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState<DropdownId | null>(null);
  const toggleDropdown = (id: DropdownId) => setDropdown((cur) => (cur === id ? null : id));

  // Close menu and dropdowns when navigation changes the route (state adjusted
  // during render, per React guidance, instead of a cascading effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
    setDropdown(null);
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

  // Dropdowns close on Escape or any press outside the header.
  useEffect(() => {
    if (!dropdown) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdown(null);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setDropdown(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [dropdown]);

  const onDark = !solid || menuOpen;
  const phoneHref = `tel:${clinic.phone.replace(/[^+\d]/g, "")}`;

  const mobileLinks = [
    { label: nav.services.label, href: navHref("services") },
    ...nav.primary.map((item) => ({ label: item.label, href: navHref(item.key) })),
    ...nav.clinic.items.map((item) => ({ label: item.label, href: navHref(item.key) })),
  ];

  const navLinkCls = `transition-colors ${onDark ? "hover:text-gold" : "hover:text-gold-dark"}`;
  const panelCls = onDark
    ? "border border-ivory/10 bg-navy-2 text-ivory"
    : "border border-line bg-ivory text-ink shadow-[0_18px_40px_-24px_rgba(16,38,59,0.35)]";
  const panelItemCls = `block px-5 py-2.5 text-sm transition-colors ${
    onDark ? "text-ivory/90 hover:bg-navy hover:text-gold" : "text-ink hover:bg-line/40 hover:text-gold-dark"
  }`;
  const panelMotion = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.2, ease: "easeOut" as const },
  };

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
              {mobileLinks.map((item, i) => (
                <MotionLink
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.06 * i, ease: "easeOut" }}
                  className="border-b border-ivory/10 py-4 font-display text-3xl text-ivory transition-colors hover:text-gold"
                >
                  {item.label}
                </MotionLink>
              ))}
            </nav>
            <m.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.06 * mobileLinks.length, ease: "easeOut" }}
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
                <span className="flex items-center gap-3 uppercase tracking-wide">
                  {LOCALES.map((l) => (
                    <Link
                      key={l}
                      href={switchTarget(l)}
                      className={l === locale ? "text-gold" : "transition-colors hover:text-gold"}
                    >
                      {l.toUpperCase()}
                    </Link>
                  ))}
                </span>
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
          href={prefix || "/"}
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
          <div
            className="relative"
            onMouseEnter={() => setDropdown("services")}
            onMouseLeave={() => setDropdown((cur) => (cur === "services" ? null : cur))}
          >
            <button
              type="button"
              onClick={() => toggleDropdown("services")}
              aria-expanded={dropdown === "services"}
              aria-haspopup="true"
              className={`flex items-center gap-1.5 py-2 ${navLinkCls}`}
            >
              {nav.services.label}
              <Chevron open={dropdown === "services"} />
            </button>
            <AnimatePresence>
              {dropdown === "services" && (
                <m.div key="services-panel" {...panelMotion} className="absolute left-0 top-full pt-3">
                  <div className={`w-[600px] p-8 ${panelCls}`}>
                    <div className="grid grid-cols-2 gap-x-10">
                      {(
                        [
                          { label: nav.services.surgicalLabel, items: site.services.surgical },
                          { label: nav.services.generalLabel, items: site.services.general },
                        ] as const
                      ).map((group) => (
                        <div key={group.label}>
                          <div
                            className={`font-body text-[11px] font-semibold uppercase tracking-[0.14em] ${
                              onDark ? "text-gold" : "text-gold-dark"
                            }`}
                          >
                            {group.label}
                          </div>
                          <ul className="mt-4 flex flex-col gap-2.5">
                            {group.items.map((s) => (
                              <li key={s.slug}>
                                <Link
                                  href={`${navHref("services")}/${s.slug}`}
                                  className={`text-sm leading-snug transition-colors ${
                                    onDark ? "text-ivory/90 hover:text-gold" : "text-ink hover:text-gold-dark"
                                  }`}
                                >
                                  {s.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className={`mt-7 border-t pt-5 ${onDark ? "border-ivory/10" : "border-line"}`}>
                      <Link
                        href={navHref("services")}
                        className={`font-body text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
                          onDark ? "text-gold hover:text-ivory" : "text-gold-dark hover:text-navy"
                        }`}
                      >
                        {nav.services.allLabel}
                      </Link>
                    </div>
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>

          {nav.primary.map((item) => (
            <Link key={item.key} href={navHref(item.key)} className={navLinkCls}>
              {item.label}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setDropdown("clinic")}
            onMouseLeave={() => setDropdown((cur) => (cur === "clinic" ? null : cur))}
          >
            <button
              type="button"
              onClick={() => toggleDropdown("clinic")}
              aria-expanded={dropdown === "clinic"}
              aria-haspopup="true"
              className={`flex items-center gap-1.5 py-2 ${navLinkCls}`}
            >
              {nav.clinic.label}
              <Chevron open={dropdown === "clinic"} />
            </button>
            <AnimatePresence>
              {dropdown === "clinic" && (
                <m.div key="clinic-panel" {...panelMotion} className="absolute left-0 top-full pt-3">
                  <div className={`w-56 py-3 ${panelCls}`}>
                    {nav.clinic.items.map((item) => (
                      <Link key={item.key} href={navHref(item.key)} className={panelItemCls}>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <div className="flex items-center gap-6">
          <div
            className="relative hidden lg:block"
            onMouseEnter={() => setDropdown("lang")}
            onMouseLeave={() => setDropdown((cur) => (cur === "lang" ? null : cur))}
          >
            <button
              type="button"
              onClick={() => toggleDropdown("lang")}
              aria-expanded={dropdown === "lang"}
              aria-haspopup="true"
              aria-label={layout.header.langLabel}
              className={`flex items-center gap-1.5 py-2 font-body text-xs font-semibold uppercase tracking-wide transition-colors ${
                onDark ? "text-ivory/80 hover:text-gold" : "text-muted hover:text-gold-dark"
              }`}
            >
              {locale.toUpperCase()}
              <Chevron open={dropdown === "lang"} />
            </button>
            <AnimatePresence>
              {dropdown === "lang" && (
                <m.div key="lang-panel" {...panelMotion} className="absolute right-0 top-full pt-3">
                  <div className={`w-28 py-2 ${panelCls}`}>
                    {LOCALES.map((l) => (
                      <Link
                        key={l}
                        href={switchTarget(l)}
                        aria-current={l === locale ? "true" : undefined}
                        className={`block px-5 py-2 font-body text-xs font-semibold uppercase tracking-wide transition-colors ${
                          l === locale
                            ? onDark
                              ? "text-gold"
                              : "text-gold-dark"
                            : onDark
                              ? "text-ivory/80 hover:bg-navy hover:text-gold"
                              : "text-ink hover:bg-line/40 hover:text-gold-dark"
                        }`}
                      >
                        {l.toUpperCase()}
                      </Link>
                    ))}
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
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
