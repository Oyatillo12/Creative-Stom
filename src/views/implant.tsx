import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { BookingFormFields } from "@/components/BookingForm";
import ServiceHero from "@/components/ServiceHero";
import { getContent, localePrefix, type Locale } from "@/content";
import { alternatesFor } from "@/lib/seo";
import { JsonLd, breadcrumbJsonLd, faqJsonLd, procedureJsonLd } from "@/lib/jsonld";
import { textLink } from "@/lib/ui";

export function implantMetadata(locale: Locale): Metadata {
  const site = getContent(locale);
  return {
    title: `${site.implantPage.hero.heading} — ${site.clinic.name}`,
    description: site.implantPage.hero.intro,
    alternates: alternatesFor("/xizmatlar/implantatsiya", locale),
  };
}

export default function ImplantView({ locale }: { locale: Locale }) {
  const site = getContent(locale);
  const prefix = localePrefix(locale);
  const { implantPage, doctors, cases, faq, prices, homepage } = site;
  const surgeon = doctors[0];
  const breadcrumb = [
    { label: implantPage.breadcrumb[0], href: prefix || "/" },
    { label: implantPage.breadcrumb[1], href: `${prefix}/xizmatlar` },
    { label: implantPage.breadcrumb[2] },
  ];

  return (
    <>
      <JsonLd data={procedureJsonLd(locale, implantPage.hero.heading, "implantatsiya")} />
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <ServiceHero
        image={site.media.implantHero}
        imageAlt={implantPage.hero.label}
        breadcrumb={breadcrumb}
        heading={implantPage.hero.heading}
        intro={implantPage.hero.intro}
        ctaLabel={implantPage.hero.cta}
      />

      {/* Reassurance — violet mega-card with fact rows */}
      <section className="px-4 py-10 md:px-6 md:py-14">
        <div className="mx-auto w-full max-w-[1400px] rounded-[36px] bg-violet">
          <Container className="py-16 md:py-24">
            <div className="grid gap-12 lg:grid-cols-[1fr_400px] lg:gap-24">
              <Reveal>
                <SectionHeading
                  eyebrow={implantPage.reassurance.eyebrow}
                  heading={implantPage.reassurance.heading}
                  tone="dark"
                />
              </Reveal>
              <Reveal>
                <div className="pt-1">
                  {implantPage.reassurance.facts.map((fact, i, arr) => (
                    <div
                      key={fact}
                      className={`border-t border-paper/15 py-5 font-body text-base text-paper ${
                        i === arr.length - 1 ? "border-b" : ""
                      }`}
                    >
                      {fact}
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </Container>
        </div>
      </section>

      {/* Attribution — surgeon quote card */}
      <section className="py-14 md:py-20">
        <Container>
          <Reveal className="card-soft flex flex-col items-start gap-8 rounded-[28px] bg-card p-7 sm:flex-row sm:items-center md:p-10">
            <div className="sticker relative aspect-[4/5] w-32 shrink-0 -rotate-[1.5deg] overflow-hidden rounded-[20px] bg-sky sm:w-40">
              <Image src={surgeon.photo} alt={surgeon.name} fill sizes="160px" className="object-cover" />
            </div>
            <div>
              <p className="font-display text-lg font-medium leading-snug text-ink md:text-2xl">
                {implantPage.attribution.text}
              </p>
              <p className="mt-3 font-body text-sm text-ink/60">{implantPage.attribution.credential}</p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Methods */}
      <section className="py-16 md:py-24">
        <Container>
          <Reveal>
            <SectionHeading eyebrow={implantPage.methods.eyebrow} heading={implantPage.methods.heading} />
          </Reveal>

          <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-[1fr_1fr] lg:gap-10">
            <Reveal className="sticker rounded-[28px] bg-violet p-8 text-paper md:p-12">
              <span className="inline-flex items-center gap-2 rounded-full bg-coral px-3.5 py-1.5 font-body text-xs font-bold uppercase tracking-[0.1em] text-ink">
                {implantPage.methods.featured.badge}
              </span>
              <div className="mt-6 font-display text-2xl font-semibold md:text-3xl">
                {implantPage.methods.featured.name}
              </div>
              <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-paper/75">
                {implantPage.methods.featured.description}
              </p>
              <div className="mt-8">
                <div className="flex justify-between border-t border-paper/15 py-4 font-body text-sm">
                  <span className="text-paper/60">{implantPage.methods.durationLabel}</span>
                  <span>{implantPage.methods.featured.duration}</span>
                </div>
                <div className="flex justify-between border-t border-b border-paper/15 py-4 font-body text-sm">
                  <span className="text-paper/60">{implantPage.methods.priceLabel}</span>
                  <span>{implantPage.methods.featured.price}</span>
                </div>
              </div>
              <a
                href="#booking"
                className="mt-8 inline-block font-body text-sm font-semibold text-sky underline decoration-2 underline-offset-4 transition-colors hover:text-paper"
              >
                {implantPage.methods.linkLabel}
              </a>
            </Reveal>

            <Reveal className="flex flex-col gap-4">
              {implantPage.methods.others.map((method) => (
                <div key={method.name} className="card-soft rounded-[24px] bg-card p-6 md:p-7">
                  <div className="font-display text-lg font-medium text-ink md:text-xl">{method.name}</div>
                  <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-ink/70">
                    {method.description}
                  </p>
                  <div className="mt-4 font-body text-sm text-ink">
                    {implantPage.methods.durationLabel}: {method.duration} · {method.price} ·{" "}
                    <a
                      href="#booking"
                      className="font-semibold text-violet underline decoration-2 underline-offset-4 transition-colors hover:decoration-coral"
                    >
                      {implantPage.methods.linkLabel}
                    </a>
                  </div>
                </div>
              ))}
              <p className="mt-2 max-w-sm font-body text-sm leading-relaxed text-ink/70">
                {implantPage.methods.note}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Process timeline — numbered pills */}
      <section className="pb-16 md:pb-24">
        <Container>
          <Reveal>
            <SectionHeading eyebrow={implantPage.process.eyebrow} heading={implantPage.process.heading} />
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-5 md:mt-16 md:grid-cols-5 md:gap-6">
            {implantPage.process.steps.map((step, i) => (
              <Reveal
                key={step.n}
                delayMs={i * 70}
                className="card-soft flex h-full flex-col rounded-[24px] bg-card p-5 md:p-6"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-lemon font-body text-xs font-bold text-ink">
                  {step.n}
                </span>
                <div className="mt-4 font-display text-base font-medium leading-snug text-ink">{step.title}</div>
                <div className="mt-2 font-body text-sm text-ink/60">{step.time}</div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Results — before/after stickers */}
      <section className="pb-16 md:pb-24">
        <Container>
          <Reveal>
            <SectionHeading eyebrow={implantPage.results.eyebrow} heading={implantPage.results.heading} />
          </Reveal>

          <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-2 md:gap-10">
            {cases.map((caseItem, i) => (
              <Reveal key={caseItem.slug} className={i === 1 ? "md:mt-16" : ""}>
                <BeforeAfterSlider
                  beforeSrc={caseItem.before}
                  afterSrc={caseItem.after}
                  beforeAlt={`${caseItem.title} — ${homepage.cases.beforeLabel}`}
                  afterAlt={`${caseItem.title} — ${homepage.cases.afterLabel}`}
                  beforeLabel={homepage.cases.beforeLabel}
                  afterLabel={homepage.cases.afterLabel}
                  className={`sticker aspect-[4/3] rounded-[28px] ${i % 2 === 1 ? "rotate-[0.8deg]" : "-rotate-[0.8deg]"}`}
                />
                <div className="mt-5 font-display text-base font-medium text-ink md:text-lg">{caseItem.title}</div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Prices — sky mega-card with tier stickers */}
      <section className="px-4 py-10 md:px-6 md:py-14">
        <div className="mx-auto w-full max-w-[1400px] rounded-[36px] bg-sky">
          <Container className="py-16 md:py-24">
            <Reveal>
              <SectionHeading eyebrow={implantPage.prices.eyebrow} heading={implantPage.prices.heading} />
            </Reveal>

            <Reveal className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6 md:mt-14">
              {prices.tiers.map((tier, i) => (
                <div
                  key={tier.label}
                  className={`sticker rounded-[24px] bg-paper px-7 py-8 ${
                    i % 2 === 0 ? "-rotate-[0.8deg]" : "rotate-[0.8deg]"
                  }`}
                >
                  <div className="font-body text-xs font-semibold tracking-[0.14em] text-ink/60 uppercase">
                    {tier.label}
                  </div>
                  <div className="mt-4 font-display text-2xl font-semibold text-ink md:text-3xl">
                    {tier.priceFrom}
                  </div>
                </div>
              ))}
            </Reveal>

            <Reveal className="mt-12 max-w-2xl font-body text-base leading-relaxed text-ink/80 md:text-lg">
              {prices.disclaimer}
            </Reveal>
          </Container>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[380px_1fr] lg:gap-24">
            <Reveal>
              <SectionHeading eyebrow={implantPage.faq.eyebrow} heading={implantPage.faq.heading} />
            </Reveal>

            <Reveal className="flex flex-col gap-4">
              {faq.map((item) => (
                <details
                  key={item.question}
                  className="group card-soft rounded-[24px] bg-card px-6 md:px-8 [&::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 md:py-6">
                    <span className="font-display text-base font-medium text-ink md:text-lg">{item.question}</span>
                    <span
                      aria-hidden="true"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky font-body text-lg text-ink transition-transform duration-200 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-6 font-body text-sm leading-relaxed text-ink/75 md:text-base">
                    {item.answer}
                  </p>
                </details>
              ))}
              <a href={`${prefix}/narxlar`} className={`mt-2 self-start ${textLink}`}>
                {site.homepage.prices.linkLabel}
              </a>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Final CTA + inline booking form — violet mega-card */}
      <section id="booking" className="px-4 py-10 md:px-6 md:py-14">
        <div className="mx-auto w-full max-w-[1400px] rounded-[36px] bg-violet">
          <Container className="py-16 md:py-24">
            <div className="grid gap-12 lg:grid-cols-[1fr_460px] lg:gap-24">
              <Reveal>
                <SectionHeading
                  eyebrow={implantPage.cta.eyebrow}
                  heading={implantPage.cta.heading}
                  description={implantPage.cta.text}
                  tone="dark"
                />
              </Reveal>
              <Reveal>
                <div className="card-soft rounded-[28px] bg-paper p-7 md:p-9">
                  <BookingFormFields source="booking-band" />
                </div>
              </Reveal>
            </div>
          </Container>
        </div>
      </section>
    </>
  );
}
