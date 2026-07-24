import Container from "./Container";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import MapBlock from "./MapBlock";
import { getContent, type Locale } from "@/content";

export default function ContactSlot({ locale = "uz" }: { locale?: Locale } = {}) {
  const site = getContent(locale);
  const { contact } = site.homepage;

  return (
    <section id="contact" className="py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={contact.eyebrow} heading={contact.heading} />
        </Reveal>
        <Reveal className="mt-12 md:mt-16">
          <MapBlock />
        </Reveal>
      </Container>
    </section>
  );
}
