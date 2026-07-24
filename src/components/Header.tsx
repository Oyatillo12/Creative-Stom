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
import { useHideOnScroll } from "@/hooks/useHideOnScroll";
import { NAV_ROUTES } from "@/lib/nav";
import { useModals } from "./ModalProvider";

const MotionLink = m.create(Link);

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

// Floating pill bar: a rounded white capsule that hovers over every page.
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState<DropdownId | null>(null);
  const scrollHidden = useHideOnScroll();
  const toggleDropdown = (id: DropdownId) => setDropdown((cur) => (cur === id ? null : id));

  // Close menu and dropdowns when navigation changes the route (state adjusted
  // during render, per React guidance, instead of a cascading effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
    setDropdown(null);
  }

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

  const phoneHref = `tel:${clinic.phone.replace(/[^+\d]/g, "")}`;

  const mobileLinks = [
    { label: nav.services.label, href: navHref("services") },
    ...nav.primary.map((item) => ({ label: item.label, href: navHref(item.key) })),
    ...nav.clinic.items.map((item) => ({ label: item.label, href: navHref(item.key) })),
  ];

  const navLinkCls = "rounded-full px-3 py-2 transition-colors hover:bg-sky/60 hover:text-violet";
  const panelCls = "rounded-3xl border-[1.5px] border-ink/10 bg-card text-ink card-soft";
  const panelItemCls =
    "block rounded-full px-5 py-2.5 text-sm text-ink transition-colors hover:bg-sky/60 hover:text-violet";
  const panelMotion = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.2, ease: "easeOut" as const },
  };

  return (
    <header
      ref={headerRef}
      // On mobile the bar slides away while scrolling down (like the dock);
      // desktop keeps it pinned. Never hide while the menu is open. The
      // transform class is applied ONLY while hiding: a transformed ancestor
      // becomes the containing block for the fixed menu overlay and would
      // clip it to the bar's box.
      className={`fixed inset-x-0 top-0 z-50 px-4 pt-4 transition-transform duration-300 md:px-6 ${
        scrollHidden && !menuOpen && !dropdown ? "-translate-y-[120%] lg:translate-y-0" : ""
      }`}
    >
      <AnimatePresence>
        {menuOpen && (
          <m.div
            key="menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="sticker fixed inset-x-2 top-2 bottom-2 -z-10 flex flex-col overflow-y-auto rounded-[32px] bg-violet px-5 pt-24 pb-6 md:px-9 lg:hidden"
            style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
          >
            <nav className="flex flex-col">
              {mobileLinks.map((item, i) => (
                <MotionLink
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 * i, ease: "easeOut" }}
                  className="group flex items-center justify-between gap-4 border-b border-paper/10 py-3.5"
                >
                  <span className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="w-7 shrink-0 font-body text-xs font-bold text-paper/40"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-lg font-medium text-paper transition-colors group-hover:text-sky">
                      {item.label}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-2 font-body text-sm text-paper transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </MotionLink>
              ))}
            </nav>

            <m.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 * mobileLinks.length, ease: "easeOut" }}
              className="mt-auto flex flex-col gap-5 pt-8"
            >
              <a
                href={phoneHref}
                className="font-display text-lg font-semibold text-paper transition-colors hover:text-sky"
              >
                {clinic.phone}
              </a>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={clinic.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border-[1.5px] border-paper/30 px-4 py-2 font-body text-xs font-semibold text-paper transition-colors hover:border-sky hover:text-sky"
                >
                  {layout.topBar.telegramLabel}
                </a>
                <a
                  href={clinic.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border-[1.5px] border-paper/30 px-4 py-2 font-body text-xs font-semibold text-paper transition-colors hover:border-sky hover:text-sky"
                >
                  {layout.topBar.instagramLabel}
                </a>
                <span className="ml-auto flex items-center gap-1.5">
                  {LOCALES.map((l) => (
                    <Link
                      key={l}
                      href={switchTarget(l)}
                      aria-current={l === locale ? "true" : undefined}
                      className={`rounded-full px-3.5 py-2 font-body text-xs font-bold uppercase tracking-wide transition-colors ${
                        l === locale
                          ? "bg-paper text-ink"
                          : "border-[1.5px] border-paper/30 text-paper hover:border-sky hover:text-sky"
                      }`}
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
                className="sticker sticker-press inline-flex w-full items-center justify-center rounded-full bg-coral px-8 py-4 font-body text-sm font-bold text-ink"
              >
                {layout.header.ctaLabel}
              </button>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>

      <div className="card-soft mx-auto flex w-full max-w-[1240px] items-center justify-between rounded-full border-[1.5px] border-ink/10 bg-card px-5 py-2.5 text-ink md:px-6">
        <Link
          href={prefix || "/"}
          onClick={() => setMenuOpen(false)}
          className="font-display text-base font-semibold tracking-tight text-violet md:text-lg"
        >
          {clinic.name}
        </Link>

        <nav className="hidden items-center gap-1 font-body text-sm font-medium text-ink lg:flex">
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
              className={`flex items-center gap-1.5 ${navLinkCls}`}
            >
              {nav.services.label}
              <Chevron open={dropdown === "services"} />
            </button>
            <AnimatePresence>
              {dropdown === "services" && (
                <m.div key="services-panel" {...panelMotion} className="absolute left-0 top-full pt-4">
                  <div className={`w-[480px] p-7 ${panelCls}`}>
                    <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
                      {site.services.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`${navHref("services")}/${s.slug}`}
                            className="block rounded-full px-3 py-1.5 text-sm leading-snug text-ink transition-colors hover:bg-sky/60 hover:text-violet"
                          >
                            {s.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 border-t border-line pt-4">
                      <Link
                        href={navHref("services")}
                        className="px-3 font-body text-sm font-semibold text-violet underline decoration-2 underline-offset-4 transition-colors hover:decoration-coral"
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
              className={`flex items-center gap-1.5 ${navLinkCls}`}
            >
              {nav.clinic.label}
              <Chevron open={dropdown === "clinic"} />
            </button>
            <AnimatePresence>
              {dropdown === "clinic" && (
                <m.div key="clinic-panel" {...panelMotion} className="absolute left-0 top-full pt-4">
                  <div className={`w-60 p-3 ${panelCls}`}>
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

        <div className="flex items-center gap-2 md:gap-3">
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
              className="flex items-center gap-1.5 rounded-full border-[1.5px] border-ink/15 px-3.5 py-2 font-body text-xs font-semibold uppercase tracking-wide text-ink transition-colors hover:border-violet hover:text-violet"
            >
              {locale.toUpperCase()}
              <Chevron open={dropdown === "lang"} />
            </button>
            <AnimatePresence>
              {dropdown === "lang" && (
                <m.div key="lang-panel" {...panelMotion} className="absolute right-0 top-full pt-4">
                  <div className={`w-28 p-2 ${panelCls}`}>
                    {LOCALES.map((l) => (
                      <Link
                        key={l}
                        href={switchTarget(l)}
                        aria-current={l === locale ? "true" : undefined}
                        className={`block rounded-full px-4 py-2 font-body text-xs font-semibold uppercase tracking-wide transition-colors ${
                          l === locale ? "bg-sky/60 text-violet" : "text-ink hover:bg-sky/60 hover:text-violet"
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
            className="hidden font-body text-sm font-semibold text-ink transition-colors hover:text-violet xl:block"
          >
            {clinic.phone}
          </a>
          <button
            type="button"
            onClick={openBooking}
            className="sticker sticker-press hidden items-center rounded-full bg-coral px-5 py-2.5 font-body text-sm font-semibold text-ink md:inline-flex"
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
              className={`h-0.5 w-6 rounded-full bg-ink transition-all duration-300 ${
                menuOpen ? "translate-y-1 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 rounded-full bg-ink transition-all duration-300 ${
                menuOpen ? "-translate-y-1 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </header>
  );
}
