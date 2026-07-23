import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import BookingBand from "@/components/BookingBand";
import { getContent, localePrefix, type Locale } from "@/content";
import { alternatesFor } from "@/lib/seo";
import { JsonLd, physicianJsonLd } from "@/lib/jsonld";

export function doctorsIndexMetadata(locale: Locale): Metadata {
  const site = getContent(locale);
  return {
    title: `${site.pages.doctors.title} — ${site.clinic.name}`,
    description: site.pages.doctors.intro,
    alternates: alternatesFor("/shifokorlar", locale),
  };
}

export default function DoctorsIndexView({ locale }: { locale: Locale }) {
  const site = getContent(locale);
  const prefix = localePrefix(locale);
  const { pages, doctors } = site;

  return (
    <>
      {doctors.map((doctor) => (
        <JsonLd key={doctor.slug} data={physicianJsonLd(locale, doctor)} />
      ))}
      <PageHero
        breadcrumb={[{ label: pages.shared.homeLabel, href: prefix || "/" }, { label: pages.doctors.breadcrumb }]}
        heading={pages.doctors.title}
        intro={pages.doctors.intro}
      />

      {/* Full dossiers: alternating photo/bio rows with education + focus */}
      <section className="bg-ivory py-24 md:py-32">
        <Container className="flex flex-col gap-24 md:gap-32">
          {doctors.map((doctor, i) => (
            <Reveal key={doctor.slug}>
              <div
                className={`grid items-start gap-10 md:grid-cols-[minmax(0,420px)_1fr] md:gap-16 lg:gap-24 ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-[4/5] overflow-hidden md:sticky md:top-28">
                  <Image
                    src={doctor.photo}
                    alt={doctor.name}
                    fill
                    sizes="(min-width: 768px) 420px, 100vw"
                    className="object-cover"
                  />
                </div>

                <div>
                  <div className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                    {doctor.role}
                  </div>
                  <h2 className="mt-4 font-display text-3xl text-navy md:text-5xl">{doctor.name}</h2>
                  <div className="mt-4 font-body text-sm text-muted">{doctor.regalia}</div>

                  <div className="mt-8 max-w-2xl">
                    {doctor.bio.map((paragraph, j) => (
                      <p key={j} className="mt-5 font-body text-base leading-relaxed text-ink first:mt-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
                    <div>
                      <div className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-gold-dark">
                        {pages.doctors.focusLabel}
                      </div>
                      <ul className="mt-4">
                        {doctor.focus.map((entry) => (
                          <li key={entry} className="border-t border-line py-4 font-display text-lg text-navy last:border-b">
                            {entry}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-gold-dark">
                        {pages.doctors.educationLabel}
                      </div>
                      <ul className="mt-4">
                        {doctor.education.map((entry) => (
                          <li key={entry} className="border-t border-line py-4 font-body text-sm leading-relaxed text-ink last:border-b">
                            {entry}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>

      <BookingBand />
    </>
  );
}
