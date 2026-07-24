import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { RevealGroup, RevealItem } from "./motion/RevealGroup";
import { getContent, localePrefix, type Locale } from "@/content";
import { NAV_ROUTES } from "@/lib/nav";
import { btn, chip } from "@/lib/ui";

const PHOTO_BGS = ["bg-sky", "bg-lemon"];
const TILTS = ["-rotate-[1deg]", "rotate-[1deg]"];

// Doctor sticker cards: portrait on a colored field, credentials below.
export default function DoctorsSection({ locale = "uz" }: { locale?: Locale } = {}) {
  const site = getContent(locale);
  const prefix = localePrefix(locale);
  const { doctors: doctorsCopy } = site.homepage;
  const { doctors } = site;

  return (
    <section id="doctors" className="py-20 md:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <SectionHeading eyebrow={doctorsCopy.eyebrow} heading={doctorsCopy.heading} />
          </Reveal>
          <Reveal delayMs={100}>
            <Link href={`${prefix}${NAV_ROUTES.doctors}`} className={btn.lemon}>
              {doctorsCopy.linkLabel}
            </Link>
          </Reveal>
        </div>

        <RevealGroup stagger={0.12} className="mt-12 grid gap-8 md:mt-16 md:grid-cols-2 md:gap-10">
          {doctors.map((doctor, i) => (
            <RevealItem key={doctor.slug} className={TILTS[i % TILTS.length]}>
              <Link
                href={`${prefix}${NAV_ROUTES.doctors}`}
                className="card-soft group block overflow-hidden rounded-[28px] bg-card transition-transform duration-200 hover:-translate-y-1.5"
              >
                <div className={`relative aspect-[4/3] overflow-hidden ${PHOTO_BGS[i % PHOTO_BGS.length]}`}>
                  <Image
                    src={doctor.photo}
                    alt={doctor.name}
                    fill
                    sizes="(min-width: 768px) 46vw, 100vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-card px-3.5 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.1em] text-ink">
                    {doctor.role}
                  </span>
                </div>
                <div className="p-7 md:p-8">
                  <h3 className="font-display text-xl font-medium leading-tight text-ink md:text-2xl">
                    {doctor.name}
                  </h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-ink/70">{doctor.regalia}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {doctor.focus.map((f) => (
                      <span key={f} className={chip}>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
