import Link from "next/link";
import Container from "./Container";
import Reveal from "./Reveal";
import TextReveal from "./motion/TextReveal";

interface Crumb {
  label: string;
  href?: string;
}

// Compact intro band for pages without imagery: a lemon card with breadcrumb
// pill, chunky heading, and a coral corner dot.
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
    <section className="pt-28 md:pt-32">
      <Container>
        <div className="card-soft relative overflow-hidden rounded-[36px] bg-lilac p-8 md:p-12 lg:p-14">
          <span
            aria-hidden="true"
            className="absolute -top-8 -right-8 h-28 w-28 rotate-12 rounded-[28px] bg-lemon md:h-36 md:w-36"
          />
          <span
            aria-hidden="true"
            className="absolute top-16 right-10 hidden h-5 w-5 rounded-full bg-coral md:block"
          />
          <Reveal direction="down" distance={12} duration={0.5} amount={0.1}>
            <nav
              aria-label="Breadcrumb"
              className="relative inline-flex flex-wrap items-center gap-x-2 rounded-full border-[1.5px] border-ink/15 bg-paper/70 px-4 py-2 font-body text-xs font-semibold text-ink/70 md:text-sm"
            >
              {breadcrumb.map((crumb, i) => (
                <span key={crumb.label}>
                  {i > 0 && <span className="mx-1.5 text-ink/40">/</span>}
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition-colors hover:text-violet">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-ink">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          </Reveal>

          <h1 className="relative mt-6 max-w-3xl font-display text-[clamp(1.8rem,4.2vw,3rem)] font-semibold leading-[1.12] text-ink">
            <TextReveal text={heading} delay={0.15} stagger={0.06} amount={0.1} />
          </h1>

          {intro && (
            <Reveal delayMs={300} distance={16} amount={0.1}>
              <p className="relative mt-5 max-w-xl font-body text-base leading-relaxed text-ink/75 md:text-lg">
                {intro}
              </p>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
