import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { getContent, localePrefix, type Locale } from "@/content";

export default function FeaturedCase({ locale = "uz" }: { locale?: Locale } = {}) {
  const site = getContent(locale);
  const prefix = localePrefix(locale);
  const { cases: casesCopy } = site.homepage;
  const featured = site.cases[0];

  return (
    <section id="cases" className="bg-ivory py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={casesCopy.eyebrow} heading={casesCopy.heading} />
        </Reveal>
      </Container>

      <Reveal className="mt-14 md:mt-20">
        <div className="grid grid-cols-2">
          <div className="relative aspect-[4/5] sm:aspect-[3/4]">
            <Image
              src={featured.before}
              alt={`${featured.title} — ${casesCopy.beforeLabel}`}
              fill
              sizes="50vw"
              className="object-cover"
            />
            <span className="absolute top-4 left-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-ivory md:top-8 md:left-8">
              {casesCopy.beforeLabel}
            </span>
          </div>
          <div className="relative aspect-[4/5] sm:aspect-[3/4]">
            <Image
              src={featured.after}
              alt={`${featured.title} — ${casesCopy.afterLabel}`}
              fill
              sizes="50vw"
              className="object-cover"
            />
            <span className="absolute top-4 right-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-ivory md:top-8 md:right-8">
              {casesCopy.afterLabel}
            </span>
          </div>
        </div>
      </Reveal>

      <Container>
        <div className="mt-8 flex flex-wrap items-baseline justify-between gap-4 md:mt-10">
          <div className="font-display text-2xl text-navy md:text-3xl">{featured.title}</div>
          <Link
            href={`${prefix}/keyslar`}
            className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-gold-dark transition-colors hover:text-navy"
          >
            {casesCopy.linkLabel}
          </Link>
        </div>
      </Container>
    </section>
  );
}
