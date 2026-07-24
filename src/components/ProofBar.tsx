import Container from "./Container";
import AnimatedCounter from "./motion/AnimatedCounter";
import { RevealGroup, RevealItem } from "./motion/RevealGroup";
import { getContent, type Locale } from "@/content";

const CARD_STYLES = [
  "bg-lemon -rotate-[1.5deg]",
  "bg-card rotate-[1deg]",
  "bg-sky -rotate-[1deg]",
];

// Three tilted stat stickers counting up on scroll.
export default function ProofBar({ locale = "uz" }: { locale?: Locale } = {}) {
  const site = getContent(locale);
  const { stats, statsLabels } = site.clinic;
  const items = [
    { value: stats.years, label: statsLabels.years },
    { value: stats.surgeries, label: statsLabels.surgeries },
    { value: String(stats.doctors), label: statsLabels.doctors },
  ];

  return (
    <section className="py-10 md:py-14">
      <Container>
        <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6" stagger={0.12}>
          {items.map((item, i) => (
            <RevealItem
              key={item.label}
              className={`sticker flex items-baseline justify-between gap-4 rounded-[24px] px-7 py-6 sm:block md:px-8 md:py-8 ${CARD_STYLES[i % CARD_STYLES.length]}`}
            >
              <AnimatedCounter
                value={item.value}
                className="font-display text-4xl font-semibold text-ink md:text-5xl"
              />
              <div className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-ink/60 sm:mt-3">
                {item.label}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
