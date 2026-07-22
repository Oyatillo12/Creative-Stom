import Container from "./Container";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { site } from "@/content/site";

export default function FirstVisitSection() {
  const { firstVisit } = site.homepage;

  return (
    <section className="bg-ivory py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={firstVisit.eyebrow} heading={firstVisit.heading} />
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12 md:mt-20 md:grid-cols-4 md:gap-10">
          {firstVisit.steps.map((step, i) => (
            <Reveal key={step.n} delayMs={i * 80} className="border-t border-line pt-6">
              <div className="font-body text-xs font-semibold tracking-[0.2em] text-gold-dark">{step.n}</div>
              <div className="mt-4 font-display text-2xl text-navy md:text-[28px]">{step.title}</div>
              <div className="mt-3 font-body text-sm leading-relaxed text-muted">{step.text}</div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
