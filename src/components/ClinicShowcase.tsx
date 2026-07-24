import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import Parallax from "./motion/Parallax";
import { getContent, localePrefix, type Locale } from "@/content";
import { NAV_ROUTES } from "@/lib/nav";
import { btn } from "@/lib/ui";

// Clinic teaser: statement column beside a rounded photo card drifting over a
// tilted sky block, with a small overlapping second photo sticker.
export default function ClinicShowcase({ locale = "uz" }: { locale?: Locale } = {}) {
  const site = getContent(locale);
  const prefix = localePrefix(locale);
  const { about } = site.homepage;
  const surgerySlide = site.heroSlides[0];

  return (
    <section id="about" className="overflow-hidden py-20 md:py-28">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow={about.eyebrow} heading={about.heading} />
            <p className="mt-7 max-w-lg font-body text-base leading-relaxed text-ink/75">{about.statement}</p>
            <Link href={`${prefix}${NAV_ROUTES.about}`} className={`mt-9 ${btn.sky}`}>
              {about.linkLabel}
            </Link>
          </Reveal>

          <Reveal delayMs={120} className="relative pb-14 md:pb-20">
            <div
              aria-hidden="true"
              className="absolute -right-3 top-6 hidden h-[70%] w-[60%] rotate-[3deg] rounded-[32px] bg-sky md:block"
            />
            <Parallax range={30} className="relative ml-auto w-full max-w-[560px]">
              <div className="sticker relative aspect-[4/3] overflow-hidden rounded-[32px]">
                <Image
                  src={site.media.aboutInterior}
                  alt={about.heading}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Parallax>
            <Parallax
              range={-26}
              className="absolute bottom-0 left-0 hidden w-[42%] rotate-[-3deg] md:block"
            >
              <div className="sticker relative aspect-[4/5] overflow-hidden rounded-[24px]">
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
