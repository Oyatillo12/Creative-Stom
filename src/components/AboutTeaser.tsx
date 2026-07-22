import Image from "next/image";
import Container from "./Container";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { site } from "@/content/site";

export default function AboutTeaser() {
  const { about } = site.homepage;
  const { stats, statsLabels } = site.clinic;

  return (
    <section id="about" className="bg-ivory py-24 md:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <Reveal>
            <SectionHeading eyebrow={about.eyebrow} heading={about.heading} />
            <p className="mt-8 max-w-lg font-body text-base leading-relaxed text-muted">{about.statement}</p>

            <div className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-8">
              <div>
                <div className="font-display text-3xl text-navy md:text-4xl">{stats.years}</div>
                <div className="mt-2 font-body text-xs uppercase tracking-wide text-muted">{statsLabels.years}</div>
              </div>
              <div>
                <div className="font-display text-3xl text-navy md:text-4xl">{stats.surgeries}</div>
                <div className="mt-2 font-body text-xs uppercase tracking-wide text-muted">
                  {statsLabels.surgeries}
                </div>
              </div>
              <div>
                <div className="font-display text-3xl text-navy md:text-4xl">{stats.doctors}</div>
                <div className="mt-2 font-body text-xs uppercase tracking-wide text-muted">{statsLabels.doctors}</div>
              </div>
            </div>

            <a
              href="#doctors"
              className="mt-10 inline-block font-body text-sm font-semibold uppercase tracking-[0.12em] text-gold-dark transition-colors hover:text-navy"
            >
              {about.linkLabel}
            </a>
          </Reveal>

          <Reveal className="relative aspect-[4/5] w-full lg:aspect-auto">
            <Image
              src={site.media.aboutInterior}
              alt={about.heading}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
