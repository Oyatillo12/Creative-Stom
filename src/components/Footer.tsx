import Link from "next/link";
import Container from "./Container";
import { getContent, localePrefix, type Locale } from "@/content";
import { NAV_ROUTES } from "@/lib/nav";

export default function Footer({ locale = "uz" }: { locale?: Locale } = {}) {
  const site = getContent(locale);
  const { clinic, layout, services } = site;
  const { nav, footer, topBar } = layout;
  const prefix = localePrefix(locale);
  const phoneHref = `tel:${clinic.phone.replace(/[^+\d]/g, "")}`;
  const clinicLinks = [...nav.primary, ...nav.clinic.items];
  const socials = [
    { label: topBar.telegramLabel, href: clinic.telegramUrl },
    { label: topBar.instagramLabel, href: clinic.instagramUrl },
  ];

  return (
    <footer className="bg-navy text-ivory/70">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10">
          <div>
            <div className="font-display text-2xl text-ivory">{clinic.name}</div>
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed">
              {clinic.address && (
                <>
                  {clinic.address}
                  <br />
                </>
              )}
              {clinic.landmark}
            </p>
          </div>

          <nav aria-label={nav.services.label}>
            <div className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {nav.services.label}
            </div>
            <ul className="mt-6 flex flex-col gap-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`${prefix}${NAV_ROUTES.services}/${s.slug}`}
                    className="font-body text-sm transition-colors hover:text-gold"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={nav.clinic.label}>
            <div className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {nav.clinic.label}
            </div>
            <ul className="mt-6 flex flex-col gap-3">
              {clinicLinks.map((item) => (
                <li key={item.key}>
                  <Link
                    href={`${prefix}${NAV_ROUTES[item.key]}`}
                    className="font-body text-sm transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <div className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {footer.contactsLabel}
            </div>
            <a
              href={phoneHref}
              className="mt-6 block font-display text-xl text-ivory transition-colors hover:text-gold"
            >
              {clinic.phone}
            </a>
            <div className="mt-3 font-body text-sm">{clinic.workHours}</div>
            <div className="mt-8 flex items-center gap-7">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-ivory/30 pb-1 font-body text-xs font-semibold uppercase tracking-[0.16em] text-ivory transition-colors hover:border-gold hover:text-gold"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
      <div className="border-t border-ivory/10 py-6">
        <Container className="font-body text-xs text-ivory/50">{footer.rightsNote}</Container>
      </div>
    </footer>
  );
}
