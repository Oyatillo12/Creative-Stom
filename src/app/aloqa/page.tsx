import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import MapBlock from "@/components/MapBlock";
import BookingBand from "@/components/BookingBand";
import { site } from "@/content";

export const metadata: Metadata = {
  title: `${site.pages.contact.title} — ${site.clinic.name}`,
  description: site.pages.contact.intro,
};

export default function ContactPage() {
  const { pages } = site;

  return (
    <>
      <PageHero
        breadcrumb={[{ label: pages.shared.homeLabel, href: "/" }, { label: pages.contact.breadcrumb }]}
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
