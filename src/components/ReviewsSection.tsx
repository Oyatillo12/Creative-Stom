import Container from "./Container";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import ReviewsCarousel from "./motion/ReviewsCarousel";
import { getContent, type Locale } from "@/content";

export default function ReviewsSection({ locale = "uz" }: { locale?: Locale } = {}) {
  const site = getContent(locale);
  const copy = site.homepage.reviews;

  return (
    <section className="bg-bone py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={copy.eyebrow} heading={copy.heading} />
        </Reveal>
        <Reveal className="mt-14 md:mt-16" delayMs={100}>
          <ReviewsCarousel
            items={site.reviews.items}
            heading={copy.heading}
            prevLabel={copy.prevLabel}
            nextLabel={copy.nextLabel}
          />
        </Reveal>
      </Container>
    </section>
  );
}
