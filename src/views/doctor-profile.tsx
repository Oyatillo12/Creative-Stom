import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import BookingBand from "@/components/BookingBand";
import { getContent, localePrefix, type Locale } from "@/content";
import { alternatesFor } from "@/lib/seo";

export function doctorStaticParams() {
  return getContent("uz").doctors.map((doctor) => ({ slug: doctor.slug }));
}

export function doctorMetadata(locale: Locale, slug: string): Metadata {
  const doctor = getContent(locale).doctors.find((item) => item.slug === slug);
  if (!doctor) return {};
  return {
    title: `${doctor.name} — ${getContent(locale).clinic.name}`,
    description: `${doctor.role}. ${doctor.regalia}`,
    alternates: alternatesFor(`/shifokorlar/${slug}`, locale),
  };
}

export default function DoctorProfileView({ locale, slug }: { locale: Locale; slug: string }) {
  const site = getContent(locale);
  const prefix = localePrefix(locale);
  const doctor = site.doctors.find((item) => item.slug === slug);
  if (!doctor) notFound();
  const { pages } = site;

  return (
    <>
      <PageHero
        breadcrumb={[
          { label: pages.shared.homeLabel, href: prefix || "/" },
          { label: pages.doctors.breadcrumb, href: `${prefix}/shifokorlar` },
          { label: doctor.name },
        ]}
        heading={doctor.name}
        intro={`${doctor.role} · ${doctor.regalia}`}
      />

      {/* Profile: sticky photo column beside biography */}
      <section className="bg-ivory py-24 md:py-32">
        <Container>
          <div className="grid gap-12 md:grid-cols-[minmax(0,380px)_1fr] md:gap-20">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden md:sticky md:top-28">
                <Image
                  src={doctor.photo}
                  alt={doctor.name}
                  fill
                  priority
                  sizes="(min-width: 768px) 380px, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <div>
              <Reveal>
                {doctor.bio.map((paragraph, i) => (
                  <p key={i} className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-ink first:mt-0">
                    {paragraph}
                  </p>
                ))}
              </Reveal>

              <Reveal className="mt-14">
                <div className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-gold-dark">
                  {pages.doctors.educationLabel}
                </div>
                <ul className="mt-4">
                  {doctor.education.map((entry) => (
                    <li key={entry} className="border-t border-line py-4 font-body text-base text-ink last:border-b">
                      {entry}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className="mt-14">
                <div className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-gold-dark">
                  {pages.doctors.focusLabel}
                </div>
                <ul className="mt-4">
                  {doctor.focus.map((entry) => (
                    <li key={entry} className="border-t border-line py-4 font-display text-xl text-navy last:border-b">
                      {entry}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className="mt-12">
                <Link
                  href={`${prefix}/shifokorlar`}
                  className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark transition-colors hover:text-navy"
                >
                  {pages.doctors.allDoctorsLabel}
                </Link>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <BookingBand />
    </>
  );
}
