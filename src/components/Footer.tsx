import { getContent, type Locale } from "@/content";
import Container from "./Container";

export default function Footer({ locale = "uz" }: { locale?: Locale } = {}) {
  const site = getContent(locale);
  const { clinic, layout } = site;

  return (
    <footer className="bg-navy text-ivory/70">
      <Container className="flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="font-display text-xl text-ivory">{clinic.name}</div>
          <p className="mt-2 text-sm">
            {clinic.address} · {clinic.landmark}
          </p>
        </div>
        <div className="text-xs uppercase tracking-wide">
          {layout.footer.licenseLabel}: {clinic.license}
        </div>
      </Container>
      <div className="border-t border-ivory/10 py-5">
        <Container className="text-xs">{layout.footer.rightsNote}</Container>
      </div>
    </footer>
  );
}
