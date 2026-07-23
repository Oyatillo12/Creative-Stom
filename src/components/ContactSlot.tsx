import Container from "./Container";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import MapBlock from "./MapBlock";
import { getContent, type Locale } from "@/content";

export default function ContactSlot({ locale = "uz" }: { locale?: Locale } = {}) {
  const site = getContent(locale);
  const { contact } = site.homepage;

  return (
    <section id="contact" className="bg-ivory py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={contact.eyebrow} heading={contact.heading} />
        </Reveal>
        <Reveal className="mt-14 md:mt-20">
          <MapBlock />
        </Reveal>
      </Container>
    </section>
  );
}
