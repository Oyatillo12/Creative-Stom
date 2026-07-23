import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { BookingFormFields } from "@/components/BookingForm";
import ServiceHero from "../_components/ServiceHero";
import { site } from "@/content";

export const metadata: Metadata = {
  title: `${site.implantPage.hero.heading} — ${site.clinic.name}`,
};

export default function ImplantatsiyaPage() {
  const { implantPage, doctors, cases, faq, prices, homepage } = site;
  const surgeon = doctors[0];

  return (
    <>
      <ServiceHero
        image={site.media.implantHero}
        imageAlt={implantPage.hero.label}
        breadcrumb={[
          { label: implantPage.breadcrumb[0], href: "/" },
          { label: implantPage.breadcrumb[1], href: "/xizmatlar" },
          { label: implantPage.breadcrumb[2] },
        ]}
        heading={implantPage.hero.heading}
        intro={implantPage.hero.intro}
        ctaLabel={implantPage.hero.cta}
      />

      {/* Reassurance */}
      <section className="bg-navy py-24 text-ivory md:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_400px] lg:gap-24">
            <Reveal>
              <SectionHeading eyebrow={implantPage.reassurance.eyebrow} heading={implantPage.reassurance.heading} tone="dark" />
            </Reveal>
            <Reveal>
              <div className="pt-1">
                {implantPage.reassurance.facts.map((fact, i, arr) => (
                  <div
                    key={fact}
                    className={`border-t border-ivory/15 py-5 font-body text-base ${i === arr.length - 1 ? "border-b" : ""}`}
                  >
                    {fact}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Attribution */}
      <section className="border-b border-line bg-ivory py-20 md:py-24">
        <Container>
          <Reveal className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
            <div className="relative aspect-[4/5] w-32 shrink-0 border border-navy p-2 sm:w-40">
              <div className="relative h-full w-full overflow-hidden">
                <Image src={surgeon.photo} alt={surgeon.name} fill sizes="160px" className="object-cover" />
              </div>
            </div>
            <div>
              <p className="font-display text-2xl leading-snug text-navy md:text-3xl">{implantPage.attribution.text}</p>
              <p className="mt-3 font-body text-sm text-muted">{implantPage.attribution.credential}</p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Methods */}
      <section className="bg-ivory py-24 md:py-32">
        <Container>
          <Reveal>
            <SectionHeading eyebrow={implantPage.methods.eyebrow} heading={implantPage.methods.heading} />
          </Reveal>

          <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <Reveal className="bg-navy p-10 text-ivory md:p-14">
              <span className="font-body text-xs font-semibold tracking-[0.24em] text-gold uppercase">
                {implantPage.methods.featured.badge}
              </span>
              <div className="mt-6 font-display text-4xl md:text-5xl">{implantPage.methods.featured.name}</div>
              <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-ivory/70">
                {implantPage.methods.featured.description}
              </p>
              <div className="mt-8">
                <div className="flex justify-between border-t border-ivory/15 py-4 font-body text-sm">
                  <span className="text-ivory/60">Muddat</span>
                  <span>{implantPage.methods.featured.duration}</span>
                </div>
                <div className="flex justify-between border-t border-b border-ivory/15 py-4 font-body text-sm">
                  <span className="text-ivory/60">Narx</span>
                  <span>{implantPage.methods.featured.price}</span>
                </div>
              </div>
              <a
                href="#booking"
                className="mt-8 inline-block font-body text-xs font-semibold tracking-[0.14em] text-gold uppercase transition-colors hover:text-ivory"
              >
                {implantPage.methods.linkLabel}
              </a>
            </Reveal>

            <Reveal>
              {implantPage.methods.others.map((method) => (
                <div key={method.name} className="border-t border-line py-8 first:border-t-0 md:border-t md:first:border-t last:border-b">
                  <div className="font-display text-2xl text-navy md:text-3xl">{method.name}</div>
                  <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-muted">{method.description}</p>
                  <div className="mt-4 font-body text-sm text-ink">
                    Muddat: {method.duration} · {method.price} ·{" "}
                    <a href="#booking" className="font-semibold text-gold-dark transition-colors hover:text-navy">
                      {implantPage.methods.linkLabel}
                    </a>
                  </div>
                </div>
              ))}
              <p className="mt-8 max-w-sm font-body text-sm leading-relaxed text-muted">{implantPage.methods.note}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Process timeline */}
      <section className="bg-ivory pb-24 md:pb-32">
        <Container>
          <Reveal>
            <SectionHeading eyebrow={implantPage.process.eyebrow} heading={implantPage.process.heading} />
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 md:mt-20 md:grid-cols-5 md:gap-10">
            {implantPage.process.steps.map((step, i) => (
              <Reveal key={step.n} delayMs={i * 70} className="border-t border-line pt-6">
                <div className="font-body text-xs font-semibold tracking-[0.2em] text-gold-dark">{step.n}</div>
                <div className="mt-4 font-display text-2xl text-navy">{step.title}</div>
                <div className="mt-3 font-body text-sm text-muted">{step.time}</div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Results — before/after */}
      <section className="bg-ivory pb-24 md:pb-32">
        <Container>
          <Reveal>
            <SectionHeading eyebrow={implantPage.results.eyebrow} heading={implantPage.results.heading} />
          </Reveal>

          <div className="mt-14 grid gap-16 md:mt-20 md:grid-cols-2 md:gap-10">
            {cases.map((caseItem, i) => (
              <Reveal key={caseItem.slug} className={i === 1 ? "md:mt-16" : ""}>
                <div className="border border-navy p-3">
                  <BeforeAfterSlider
                    beforeSrc={caseItem.before}
                    afterSrc={caseItem.after}
                    beforeAlt={`${caseItem.title} — ${homepage.cases.beforeLabel}`}
                    afterAlt={`${caseItem.title} — ${homepage.cases.afterLabel}`}
                    beforeLabel={homepage.cases.beforeLabel}
                    afterLabel={homepage.cases.afterLabel}
                    className="aspect-[4/3]"
                  />
                </div>
                <div className="mt-5 font-display text-xl text-navy">{caseItem.title}</div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Prices */}
      <section className="bg-navy py-24 text-ivory md:py-32">
        <Container>
          <Reveal>
            <SectionHeading eyebrow={implantPage.prices.eyebrow} heading={implantPage.prices.heading} tone="dark" />
          </Reveal>

          <Reveal className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3 md:mt-14">
            {prices.tiers.map((tier) => (
              <div key={tier.label} className="border-t border-ivory/15 pt-6">
                <div className="font-body text-xs font-semibold tracking-[0.22em] text-ivory/55 uppercase">
                  {tier.label}
                </div>
                <div className="mt-4 font-display text-4xl md:text-5xl">{tier.priceFrom}</div>
              </div>
            ))}
          </Reveal>

          <Reveal className="mt-16 max-w-2xl font-display text-xl leading-relaxed text-ivory/80 italic md:text-2xl">
            {prices.disclaimer}
          </Reveal>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-ivory py-24 md:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[380px_1fr] lg:gap-24">
            <Reveal>
              <SectionHeading eyebrow={implantPage.faq.eyebrow} heading={implantPage.faq.heading} />
            </Reveal>

            <Reveal className="border-t border-line">
              {faq.map((item) => (
                <details key={item.question} className="group border-b border-line py-6 [&::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6">
                    <span className="font-display text-xl text-navy md:text-2xl">{item.question}</span>
                    <span className="relative shrink-0 font-body text-2xl leading-none text-gold-dark transition-transform duration-200 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-muted md:text-base">
                    {item.answer}
                  </p>
                </details>
              ))}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Final CTA + inline booking form */}
      <section id="booking" className="bg-navy py-24 text-ivory md:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_460px] lg:gap-24">
            <Reveal>
              <SectionHeading eyebrow={implantPage.cta.eyebrow} heading={implantPage.cta.heading} description={implantPage.cta.text} tone="dark" />
            </Reveal>
            <Reveal>
              <BookingFormFields tone="dark" />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
