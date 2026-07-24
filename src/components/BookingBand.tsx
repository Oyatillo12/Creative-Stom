"use client";

import Container from "./Container";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { BookingFormFields } from "./BookingForm";
import { useModals } from "./ModalProvider";
import { useContent } from "./LocaleProvider";
import { btn } from "@/lib/ui";

// The conversion closer on every page: violet mega-card with the pitch on the
// left and the booking form in a white card on the right — zero clicks before
// a patient can start.
export default function BookingBand() {
  const site = useContent();
  const { cta } = site.homepage;
  const { openQuiz } = useModals();

  return (
    <section id="booking" className="px-4 py-10 md:px-6 md:py-14">
      <div className="mx-auto w-full max-w-[1400px] rounded-[36px] bg-violet">
        <Container className="py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-start lg:gap-20">
            <Reveal>
              <SectionHeading eyebrow={cta.eyebrow} heading={cta.heading} description={cta.text} tone="dark" />
              <button type="button" onClick={openQuiz} className={`mt-9 ${btn.sky}`}>
                {cta.secondaryLabel}
              </button>
            </Reveal>

            <Reveal delayMs={120}>
              <div className="card-soft rounded-[28px] bg-paper p-7 md:p-9">
                <BookingFormFields source="booking-band" />
              </div>
            </Reveal>
          </div>
        </Container>
      </div>
    </section>
  );
}
