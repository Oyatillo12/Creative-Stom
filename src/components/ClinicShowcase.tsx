import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import Parallax from "./motion/Parallax";
import { getContent, localePrefix, type Locale } from "@/content";
import { NAV_ROUTES } from "@/lib/nav";

// Asymmetric clinic teaser: statement column beside an overlapping two-image
// composition drifting at different parallax speeds, with the clinic wordmark
// ghosted behind as texture.
export default function ClinicShowcase({ locale = "uz" }: { locale?: Locale } = {}) {
  const site = getContent(locale);
  const prefix = localePrefix(locale);
  const { about } = site.homepage;
  const surgerySlide = site.heroSlides[0];

  return (
    <section id="about" className="relative overflow-hidden bg-ivory py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 top-8 select-none font-display text-[22vw] leading-none text-bone lg:text-[16vw]"
      >
        {site.clinic.name.split(" ")[0]}
      </div>

      <Container className="relative">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow={about.eyebrow} heading={about.heading} />
            <p className="mt-8 max-w-lg font-body text-base leading-relaxed text-ink/80">{about.statement}</p>
            <Link
              href={`${prefix}${NAV_ROUTES.about}`}
              className="mt-10 inline-block border-b border-navy/30 pb-1 font-body text-sm font-semibold uppercase tracking-[0.12em] text-navy transition-colors hover:border-gold-dark hover:text-gold-dark"
            >
              {about.linkLabel}
            </Link>
          </Reveal>

          <Reveal delayMs={120} className="relative pb-14 md:pb-20">
            <Parallax range={30} className="relative ml-auto w-full max-w-[560px]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={site.media.aboutInterior}
                  alt={about.heading}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Parallax>
            <Parallax range={-26} className="absolute bottom-0 left-0 hidden w-[42%] border-8 border-ivory md:block">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={surgerySlide.image}
                  alt={surgerySlide.caption}
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
              </div>
            </Parallax>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
