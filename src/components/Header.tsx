import Link from "next/link";
import { site } from "@/content/site";
import Container from "./Container";

export default function Header() {
  const { clinic, layout } = site;

  return (
    <header className="border-b border-line bg-ivory">
      <Container className="flex items-center justify-between py-6">
        <Link href="/" className="font-display text-2xl text-navy">
          {clinic.name}
        </Link>
        <nav className="hidden items-center gap-9 font-body text-sm font-medium text-ink lg:flex">
          {layout.nav.map((item) => (
            <a key={item} href="#" className="transition-colors hover:text-gold-dark">
              {item}
            </a>
          ))}
        </nav>
        <a
          href="#"
          className="hidden items-center border border-navy px-6 py-3 font-body text-xs font-semibold uppercase tracking-[0.12em] text-navy transition-colors hover:bg-navy hover:text-ivory md:inline-flex"
        >
          {layout.header.ctaLabel}
        </a>
      </Container>
    </header>
  );
}
