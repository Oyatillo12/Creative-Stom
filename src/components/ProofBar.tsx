import Container from "./Container";
import AnimatedCounter from "./motion/AnimatedCounter";
import { RevealGroup, RevealItem } from "./motion/RevealGroup";
import { getContent, type Locale } from "@/content";

// Thin proof band: the clinic's three headline stats counting up on scroll.
export default function ProofBar({ locale = "uz" }: { locale?: Locale } = {}) {
  const site = getContent(locale);
  const { stats, statsLabels } = site.clinic;
  const items = [
    { value: stats.years, label: statsLabels.years },
    { value: stats.surgeries, label: statsLabels.surgeries },
    { value: String(stats.doctors), label: statsLabels.doctors },
  ];

  return (
    <section className="border-y border-line bg-bone py-12 md:py-16">
      <Container>
        <RevealGroup className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6" stagger={0.12}>
          {items.map((item) => (
            <RevealItem key={item.label} className="flex items-baseline gap-5 sm:block">
              <AnimatedCounter
                value={item.value}
                className="font-display text-5xl text-navy md:text-6xl lg:text-7xl"
              />
              <div className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-ink/70 sm:mt-3">
                {item.label}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
