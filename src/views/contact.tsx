import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import MapBlock from "@/components/MapBlock";
import BookingBand from "@/components/BookingBand";
import { getContent, localePrefix, type Locale } from "@/content";
import { alternatesFor } from "@/lib/seo";

export function contactMetadata(locale: Locale): Metadata {
  const site = getContent(locale);
  return {
    title: `${site.pages.contact.title} — ${site.clinic.name}`,
    description: site.pages.contact.intro,
    alternates: alternatesFor("/aloqa", locale),
  };
}

export default function ContactView({ locale }: { locale: Locale }) {
  const site = getContent(locale);
  const prefix = localePrefix(locale);
  const { pages } = site;

  return (
    <>
      <PageHero
        breadcrumb={[{ label: pages.shared.homeLabel, href: prefix || "/" }, { label: pages.contact.breadcrumb }]}
        heading={pages.contact.title}
        intro={pages.contact.intro}
      />

      <section className="bg-ivory py-24 md:py-32">
        <Container>
          <Reveal>
            <MapBlock />
          </Reveal>
        </Container>
      </section>

      <BookingBand />
    </>
  );
}
