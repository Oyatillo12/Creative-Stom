import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { getContent, localePrefix, type Locale } from "@/content";

export default function DoctorsSection({ locale = "uz" }: { locale?: Locale } = {}) {
  const site = getContent(locale);
  const prefix = localePrefix(locale);
  const { doctors: doctorsCopy } = site.homepage;
  const { doctors } = site;
  const showExpanding = doctors.length < 3;
  const columns = Math.min(showExpanding ? doctors.length + 1 : doctors.length, 3);
  const colsClass = columns === 3 ? "sm:grid-cols-3" : columns === 2 ? "sm:grid-cols-2" : "";

  return (
    <section id="doctors" className="bg-ivory py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={doctorsCopy.eyebrow} heading={doctorsCopy.heading} />
        </Reveal>
      </Container>

      <div className={`mt-16 grid grid-cols-1 gap-px bg-line md:mt-20 ${colsClass}`}>
        {doctors.map((doctor) => (
          <Reveal key={doctor.slug} className="bg-ivory">
            <Link href={`${prefix}/shifokorlar/${doctor.slug}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={doctor.photo}
                  alt={doctor.name}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="px-6 py-8 md:px-10">
                <div className="font-display text-2xl text-navy md:text-3xl">{doctor.name}</div>
                <div className="mt-3 font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                  {doctor.role}
                </div>
                <div className="mt-3 font-body text-sm text-muted">{doctor.regalia}</div>
                <div className="mt-5 font-body text-xs font-semibold uppercase tracking-[0.14em] text-navy transition-transform duration-200 group-hover:translate-x-1">
                  {doctorsCopy.linkLabel}
                </div>
              </div>
            </Link>
          </Reveal>
        ))}

        {showExpanding && (
          <Reveal className="flex flex-col justify-center bg-navy px-6 py-16 text-ivory md:px-10">
            <div className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-gold">
              {doctorsCopy.expandingLabel}
            </div>
            <div className="mt-4 max-w-[240px] font-body text-sm leading-relaxed text-ivory/60">
              {doctorsCopy.expandingText}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
