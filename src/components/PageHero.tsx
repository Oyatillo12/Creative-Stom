import Link from "next/link";
import Container from "./Container";
import Reveal from "./Reveal";
import TextReveal from "./motion/TextReveal";

interface Crumb {
  label: string;
  href?: string;
}

// Compact navy intro band for pages without imagery. Carries the
// [data-hero-sentinel] so the fixed header stays transparent over it.
export default function PageHero({
  breadcrumb,
  heading,
  intro,
}: {
  breadcrumb: Crumb[];
  heading: string;
  intro?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy">
      <span data-hero-sentinel aria-hidden className="absolute bottom-16 left-0 h-px w-px" />
      <Container className="pb-16 pt-36 md:pb-24 md:pt-44">
        <Reveal direction="down" distance={12} duration={0.5} amount={0.1}>
          <nav aria-label="Breadcrumb" className="font-body text-xs text-ivory/60 md:text-sm">
            {breadcrumb.map((crumb, i) => (
              <span key={crumb.label}>
                {i > 0 && <span className="mx-2">/</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="transition-colors hover:text-ivory">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-ivory">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        </Reveal>

        <div className="mt-6 h-0.5 w-14 bg-gold" />

        <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.4rem,5vw,4.5rem)] font-medium leading-[1.05] text-ivory">
          <TextReveal text={heading} delay={0.15} stagger={0.06} amount={0.1} />
        </h1>

        {intro && (
          <Reveal delayMs={300} distance={16} amount={0.1}>
            <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-ivory/80 md:text-lg">{intro}</p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
