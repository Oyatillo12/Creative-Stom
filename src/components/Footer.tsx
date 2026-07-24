import Link from "next/link";
import { getContent, localePrefix, type Locale } from "@/content";
import { NAV_ROUTES } from "@/lib/nav";

// Big rounded violet card floating inside the page frame, sky/coral accents.
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
    <footer className="px-4 pb-4 pt-8 md:px-6 md:pb-6">
      <div className="mx-auto w-full max-w-[1400px] rounded-[36px] bg-violet text-paper/75">
        <div className="px-8 py-14 md:px-14 md:py-20">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10">
            <div>
              <div className="font-display text-xl font-semibold text-paper md:text-2xl">{clinic.name}</div>
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
              <div className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-paper/25 px-3.5 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.14em] text-paper">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-coral" />
                {nav.services.label}
              </div>
              <ul className="mt-6 flex flex-col gap-3">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`${prefix}${NAV_ROUTES.services}/${s.slug}`}
                      className="font-body text-sm transition-colors hover:text-sky"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label={nav.clinic.label}>
              <div className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-paper/25 px-3.5 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.14em] text-paper">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-sky" />
                {nav.clinic.label}
              </div>
              <ul className="mt-6 flex flex-col gap-3">
                {clinicLinks.map((item) => (
                  <li key={item.key}>
                    <Link
                      href={`${prefix}${NAV_ROUTES[item.key]}`}
                      className="font-body text-sm transition-colors hover:text-sky"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-paper/25 px-3.5 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.14em] text-paper">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-lemon" />
                {footer.contactsLabel}
              </div>
              <a
                href={phoneHref}
                className="mt-6 block font-display text-lg font-medium text-paper transition-colors hover:text-sky md:text-xl"
              >
                {clinic.phone}
              </a>
              <div className="mt-3 font-body text-sm">{clinic.workHours}</div>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border-[1.5px] border-paper/30 px-4 py-2 font-body text-xs font-semibold text-paper transition-colors hover:border-sky hover:text-sky"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-paper/10 px-8 py-6 md:px-14">
          <div className="font-body text-xs text-paper/50">{footer.rightsNote}</div>
        </div>
      </div>
    </footer>
  );
}
