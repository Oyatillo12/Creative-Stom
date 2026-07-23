"use client";

import Container from "./Container";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { useModals } from "./ModalProvider";
import { useContent } from "./LocaleProvider";

export default function BookingBand() {
  const site = useContent();
  const { cta } = site.homepage;
  const { openBooking, openQuiz } = useModals();

  return (
    <section id="booking" className="bg-navy py-24 text-ivory md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow={cta.eyebrow} heading={cta.heading} description={cta.text} tone="dark" />
          </Reveal>

          <Reveal className="flex flex-col gap-5 sm:flex-row lg:flex-col">
            <button
              type="button"
              onClick={openBooking}
              className="bg-gold px-9 py-4 text-center font-body text-xs font-semibold uppercase tracking-[0.12em] text-navy transition-colors hover:bg-gold-dark hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              {cta.primaryLabel}
            </button>
            <button
              type="button"
              onClick={openQuiz}
              className="border border-ivory/40 px-9 py-4 text-center font-body text-xs font-semibold uppercase tracking-[0.12em] text-ivory transition-colors hover:border-gold hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              {cta.secondaryLabel}
            </button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
