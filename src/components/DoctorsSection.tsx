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
  const colsClass = doctors.length >= 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";

  return (
    <section id="doctors" className="bg-ivory py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={doctorsCopy.eyebrow} heading={doctorsCopy.heading} />
        </Reveal>

        <div className={`mt-16 grid grid-cols-1 gap-6 md:mt-20 md:gap-8 ${colsClass}`}>
          {doctors.map((doctor, i) => (
            <Reveal key={doctor.slug} delayMs={i * 80}>
              <Link href={`${prefix}/shifokorlar`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={doctor.photo}
                    alt={doctor.name}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-navy/85 px-6 py-6 transition-colors duration-300 group-hover:bg-navy md:px-8">
                    <div className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                      {doctor.role}
                    </div>
                    <div className="mt-2 font-display text-2xl text-ivory md:text-3xl">{doctor.name}</div>
                    <div className="mt-2 font-body text-sm text-ivory/60">{doctor.regalia}</div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <Link
            href={`${prefix}/shifokorlar`}
            className="inline-block font-body text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark transition-transform duration-200 hover:translate-x-1"
          >
            {doctorsCopy.linkLabel}
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
