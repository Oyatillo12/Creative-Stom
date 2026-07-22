import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { site } from "@/content/site";

export default function Home() {
  const { hero } = site.homepage;
  const { stats, statsLabels } = site.clinic;

  return (
    <div className="py-24 md:py-32">
      <Container>
        <SectionHeading eyebrow={hero.eyebrow} heading={hero.heading} description={hero.subhead} />

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#"
            className="bg-gold px-9 py-4 font-body text-xs font-semibold uppercase tracking-[0.12em] text-navy transition-colors hover:bg-gold-dark hover:text-ivory"
          >
            {hero.ctaPrimary}
          </a>
          <a href="#" className="border-b border-ink/40 py-4 font-body text-sm font-medium text-ink">
            {hero.ctaSecondary}
          </a>
        </div>

        <div className="mt-20 grid max-w-xl grid-cols-3 divide-x divide-line border-t border-line pt-8">
          <div>
            <div className="font-display text-3xl text-navy">{stats.years}</div>
            <div className="mt-1 text-xs uppercase tracking-wide text-muted">{statsLabels.years}</div>
          </div>
          <div className="pl-8">
            <div className="font-display text-3xl text-navy">{stats.surgeries}</div>
            <div className="mt-1 text-xs uppercase tracking-wide text-muted">{statsLabels.surgeries}</div>
          </div>
          <div className="pl-8">
            <div className="font-display text-3xl text-navy">{stats.doctors}</div>
            <div className="mt-1 text-xs uppercase tracking-wide text-muted">{statsLabels.doctors}</div>
          </div>
        </div>
      </Container>
    </div>
  );
}
