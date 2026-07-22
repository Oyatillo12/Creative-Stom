import Container from "./Container";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { site } from "@/content/site";

export default function ReviewsSection() {
  const { reviews: reviewsCopy } = site.homepage;
  const { rating, count, items } = site.reviews;

  return (
    <section className="bg-ivory py-24 md:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[360px_1fr] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow={reviewsCopy.eyebrow} heading={reviewsCopy.heading} />
            <div className="mt-10 flex items-end gap-4">
              <div className="font-display text-6xl text-navy md:text-7xl">{rating}</div>
              <div className="pb-2 font-body text-sm leading-snug text-muted">
                {reviewsCopy.googleLabel}
                <br />
                {count}
              </div>
            </div>
            <a
              href="#"
              className="mt-6 inline-block font-body text-sm font-semibold uppercase tracking-[0.12em] text-gold-dark transition-colors hover:text-navy"
            >
              {reviewsCopy.linkLabel}
            </a>
          </Reveal>

          <div className="flex flex-col">
            {items.map((review, i) => (
              <Reveal key={review.name} delayMs={i * 100} className="border-t border-line py-8 last:border-b md:py-10">
                <p className="max-w-2xl font-display text-xl leading-relaxed text-navy italic md:text-2xl">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="mt-5 font-body text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  {review.name}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
