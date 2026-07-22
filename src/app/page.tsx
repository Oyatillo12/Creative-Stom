import HeroSlideshow from "@/components/HeroSlideshow";
import AboutTeaser from "@/components/AboutTeaser";
import ServicesSection from "@/components/ServicesSection";
import DoctorsSection from "@/components/DoctorsSection";
import PositioningQuote from "@/components/PositioningQuote";
import FeaturedCase from "@/components/FeaturedCase";
import CredentialsSection from "@/components/CredentialsSection";
import FirstVisitSection from "@/components/FirstVisitSection";
import BookingBand from "@/components/BookingBand";
import ReviewsSection from "@/components/ReviewsSection";
import ContactSlot from "@/components/ContactSlot";
import { site } from "@/content/site";

export default function Home() {
  const { hero } = site.homepage;

  return (
    <>
      <HeroSlideshow
        slides={site.heroSlides}
        eyebrow={hero.eyebrow}
        heading={hero.heading}
        subhead={hero.subhead}
        ctaPrimary={hero.ctaPrimary}
        ctaSecondary={hero.ctaSecondary}
      />
      <AboutTeaser />
      <ServicesSection />
      <DoctorsSection />
      <PositioningQuote />
      <FeaturedCase />
      <CredentialsSection />
      <FirstVisitSection />
      <BookingBand />
      <ReviewsSection />
      <ContactSlot />
    </>
  );
}
