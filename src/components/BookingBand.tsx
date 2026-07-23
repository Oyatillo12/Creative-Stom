"use client";

import Container from "./Container";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { BookingFormFields } from "./BookingForm";
import { useModals } from "./ModalProvider";
import { useContent } from "./LocaleProvider";

// The conversion closer on every page: pitch on the left, the booking form
// itself visible on the right — zero clicks before a patient can start.
export default function BookingBand() {
  const site = useContent();
  const { cta } = site.homepage;
  const { openQuiz } = useModals();

  return (
    <section id="booking" className="bg-navy py-24 text-ivory md:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-start lg:gap-24">
          <Reveal>
            <SectionHeading eyebrow={cta.eyebrow} heading={cta.heading} description={cta.text} tone="dark" />
            <button
              type="button"
              onClick={openQuiz}
              className="mt-10 border border-ivory/40 px-9 py-4 text-center font-body text-xs font-semibold uppercase tracking-[0.12em] text-ivory transition-colors hover:border-gold hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              {cta.secondaryLabel}
            </button>
          </Reveal>

          <Reveal delayMs={120}>
            <div className="border border-ivory/15 bg-navy-2 p-8 md:p-10">
              <BookingFormFields tone="dark" source="booking-band" />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
