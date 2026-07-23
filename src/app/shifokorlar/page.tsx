import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import BookingBand from "@/components/BookingBand";
import { site } from "@/content";

export const metadata: Metadata = {
  title: `${site.pages.doctors.title} — ${site.clinic.name}`,
  description: site.pages.doctors.intro,
};

export default function DoctorsIndexPage() {
  const { pages, doctors, homepage } = site;

  return (
    <>
      <PageHero
        breadcrumb={[{ label: pages.shared.homeLabel, href: "/" }, { label: pages.doctors.breadcrumb }]}
        heading={pages.doctors.title}
        intro={pages.doctors.intro}
      />

      {/* Alternating editorial rows: photo beside bio */}
      <section className="bg-ivory py-24 md:py-32">
        <Container className="flex flex-col gap-24 md:gap-32">
          {doctors.map((doctor, i) => (
            <Reveal key={doctor.slug}>
              <div
                className={`grid items-start gap-10 md:grid-cols-[minmax(0,380px)_1fr] md:gap-16 ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Link href={`/shifokorlar/${doctor.slug}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={doctor.photo}
                      alt={doctor.name}
                      fill
                      sizes="(min-width: 768px) 380px, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>
                <div>
                  <div className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                    {doctor.role}
                  </div>
                  <h2 className="mt-4 font-display text-3xl text-navy md:text-4xl">
                    <Link href={`/shifokorlar/${doctor.slug}`} className="transition-colors hover:text-gold-dark">
                      {doctor.name}
                    </Link>
                  </h2>
                  <div className="mt-3 font-body text-sm text-muted">{doctor.regalia}</div>
                  <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-ink">{doctor.bio[0]}</p>
                  <Link
                    href={`/shifokorlar/${doctor.slug}`}
                    className="mt-8 inline-block font-body text-xs font-semibold uppercase tracking-[0.14em] text-navy transition-transform duration-200 hover:translate-x-1"
                  >
                    {homepage.doctors.linkLabel}
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal className="border-t border-line pt-10">
            <div className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-gold-dark">
              {homepage.doctors.expandingLabel}
            </div>
            <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-muted">{homepage.doctors.expandingText}</p>
          </Reveal>
        </Container>
      </section>

      <BookingBand />
    </>
  );
}
