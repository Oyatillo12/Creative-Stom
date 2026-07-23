import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import Parallax from "./motion/Parallax";
import { getContent, localePrefix, type Locale } from "@/content";
import { NAV_ROUTES } from "@/lib/nav";

// Editorial doctor spreads: portrait and a bone text panel overlapping its
// edge, mirrored for every second doctor.
export default function DoctorsSection({ locale = "uz" }: { locale?: Locale } = {}) {
  const site = getContent(locale);
  const prefix = localePrefix(locale);
  const { doctors: doctorsCopy } = site.homepage;
  const { doctors } = site;

  return (
    <section id="doctors" className="bg-bone py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={doctorsCopy.eyebrow} heading={doctorsCopy.heading} />
        </Reveal>

        <div className="mt-16 flex flex-col gap-20 md:mt-24 md:gap-28">
          {doctors.map((doctor, i) => {
            const mirrored = i % 2 === 1;
            return (
              <div key={doctor.slug} className="grid gap-8 md:grid-cols-12 md:items-center md:gap-0">
                <Parallax
                  range={26}
                  className={`md:row-start-1 ${mirrored ? "md:col-start-8 md:col-end-13" : "md:col-start-1 md:col-end-6"}`}
                >
                  <Link href={`${prefix}${NAV_ROUTES.doctors}`} className="group block">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={doctor.photo}
                        alt={doctor.name}
                        fill
                        sizes="(min-width: 768px) 42vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                  </Link>
                </Parallax>

                <div
                  className={`relative z-10 md:row-start-1 ${
                    mirrored ? "md:col-start-1 md:col-end-9" : "md:col-start-5 md:col-end-13"
                  }`}
                >
                  <div className={`bg-bone py-2 md:py-12 ${mirrored ? "md:pr-16" : "md:pl-16"}`}>
                    <div className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                      {doctor.role}
                    </div>
                    <h3 className="mt-4 font-display text-3xl leading-tight text-navy md:text-4xl lg:text-5xl">
                      {doctor.name}
                    </h3>
                    <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-ink/70 md:text-base">
                      {doctor.regalia}
                    </p>
                    <div className="mt-7 flex flex-wrap gap-2.5">
                      {doctor.focus.map((f) => (
                        <span
                          key={f}
                          className="border border-line px-3.5 py-1.5 font-body text-xs uppercase tracking-[0.08em] text-ink/70"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`${prefix}${NAV_ROUTES.doctors}`}
                      className="mt-9 inline-block border-b border-navy/30 pb-1 font-body text-xs font-semibold uppercase tracking-[0.14em] text-navy transition-colors hover:border-gold-dark hover:text-gold-dark"
                    >
                      {doctorsCopy.linkLabel}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
