import { site } from "@/content";
import Container from "./Container";

export default function TopBar() {
  const { clinic, layout } = site;

  return (
    <div className="hidden bg-navy text-ivory/70 md:block">
      <Container className="flex items-center justify-between py-3 text-xs">
        <div className="flex items-center gap-7">
          <a href={`tel:${clinic.phone.replace(/[^+\d]/g, "")}`} className="transition-colors hover:text-gold">
            {clinic.phone}
          </a>
          <span>{clinic.address}</span>
        </div>
        <div className="flex items-center gap-7">
          <span className="uppercase tracking-wide">{layout.topBar.languageToggle}</span>
          <a
            href={clinic.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-gold"
          >
            {layout.topBar.telegramLabel}
          </a>
        </div>
      </Container>
    </div>
  );
}
