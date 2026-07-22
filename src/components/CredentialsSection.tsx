import Image from "next/image";
import Container from "./Container";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { site } from "@/content/site";

export default function CredentialsSection() {
  const { credentials } = site.homepage;

  return (
    <section className="bg-navy py-24 text-ivory md:py-32">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={credentials.eyebrow} heading={credentials.heading} tone="dark" />
        </Reveal>

        <Reveal className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4 md:mt-20 md:gap-10">
          {site.media.certificates.map((cert, i) => (
            <div key={cert} className="relative aspect-[4/5] border border-ivory/15">
              <Image
                src={cert}
                alt={`${credentials.certAlt} ${i + 1}`}
                fill
                sizes="(min-width: 768px) 22vw, 45vw"
                className="object-cover"
              />
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-16 border-t border-ivory/15 pt-10 md:mt-20">
          <div className="font-body text-xs font-semibold uppercase tracking-[0.24em] text-ivory/50">
            {credentials.implantSystemsLabel}
          </div>
          <div className="mt-6 flex flex-wrap gap-x-12 gap-y-4">
            {credentials.implantSystems.map((name) => (
              <span key={name} className="font-body text-lg uppercase tracking-[0.2em] text-ivory/85 md:text-xl">
                {name}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
