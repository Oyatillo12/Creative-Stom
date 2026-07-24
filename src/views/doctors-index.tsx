import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import BookingBand from "@/components/BookingBand";
import { getContent, localePrefix, type Locale } from "@/content";
import { alternatesFor } from "@/lib/seo";
import { JsonLd, physicianJsonLd } from "@/lib/jsonld";
import { chip } from "@/lib/ui";

export function doctorsIndexMetadata(locale: Locale): Metadata {
  const site = getContent(locale);
  return {
    title: `${site.pages.doctors.title} — ${site.clinic.name}`,
    description: site.pages.doctors.intro,
    alternates: alternatesFor("/shifokorlar", locale),
  };
}

const PHOTO_BGS = ["bg-sky", "bg-lemon"];
const PHOTO_TILTS = ["-rotate-[1.2deg]", "rotate-[1.2deg]"];

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

      {/* Full dossiers: alternating photo-sticker/bio rows with education + focus */}
      <section className="py-20 md:py-28">
        <Container className="flex flex-col gap-20 md:gap-28">
          {doctors.map((doctor, i) => (
            <Reveal key={doctor.slug}>
              <div
                className={`grid items-start gap-10 md:grid-cols-[minmax(0,420px)_1fr] md:gap-16 lg:gap-24 ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className={`md:sticky md:top-28 ${PHOTO_TILTS[i % PHOTO_TILTS.length]}`}>
                  <div
                    className={`sticker relative aspect-[4/5] overflow-hidden rounded-[28px] ${PHOTO_BGS[i % PHOTO_BGS.length]}`}
                  >
                    <Image
                      src={doctor.photo}
                      alt={doctor.name}
                      fill
                      sizes="(min-width: 768px) 420px, 100vw"
                      className="object-cover"
                    />
                    <span className="absolute top-4 left-4 rounded-full bg-card px-3.5 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.1em] text-ink">
                      {doctor.role}
                    </span>
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">{doctor.name}</h2>
                  <div className="mt-3 font-body text-sm text-ink/70">{doctor.regalia}</div>

                  <div className="mt-7 max-w-2xl">
                    {doctor.bio.map((paragraph, j) => (
                      <p key={j} className="mt-5 font-body text-base leading-relaxed text-ink first:mt-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-10">
                    <div className="card-soft rounded-[24px] bg-card p-6 md:p-7">
                      <div className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink/15 px-3.5 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.12em] text-ink">
                        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-coral" />
                        {pages.doctors.focusLabel}
                      </div>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {doctor.focus.map((entry) => (
                          <span key={entry} className={chip}>
                            {entry}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="card-soft rounded-[24px] bg-card p-6 md:p-7">
                      <div className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink/15 px-3.5 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.12em] text-ink">
                        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-sky" />
                        {pages.doctors.educationLabel}
                      </div>
                      <ul className="mt-4">
                        {doctor.education.map((entry) => (
                          <li
                            key={entry}
                            className="border-t border-line py-3.5 font-body text-sm leading-relaxed text-ink first:border-t-0"
                          >
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
