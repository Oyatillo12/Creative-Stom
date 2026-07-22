import Image from "next/image";
import Container from "./Container";
import Reveal from "./Reveal";
import { site } from "@/content/site";

export default function ContactSlot() {
  const { contact } = site.homepage;

  return (
    <section id="contact" aria-label={contact.heading} className="relative overflow-hidden bg-navy">
      <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
        <Image src={site.media.mapFacade} alt={contact.heading} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-navy/60" />
      </div>

      <Container className="absolute inset-0 flex flex-col justify-end pt-24 pb-16 md:pb-24">
        <Reveal>
          <span className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-gold">
            {contact.eyebrow}
          </span>
          <div className="mt-4 max-w-xl font-display text-3xl text-ivory md:text-5xl">{contact.heading}</div>
          <div className="mt-4 font-body text-sm text-ivory/70">{contact.note}</div>
        </Reveal>
      </Container>
    </section>
  );
}
