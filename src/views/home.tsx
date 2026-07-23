import type { Metadata } from "next";
import HeroSlideshow from "@/components/HeroSlideshow";
import ProofBar from "@/components/ProofBar";
import ClinicShowcase from "@/components/ClinicShowcase";
import ServicesSection from "@/components/ServicesSection";
import DoctorsSection from "@/components/DoctorsSection";
import ResultsSection from "@/components/ResultsSection";
import FirstVisitSection from "@/components/FirstVisitSection";
import ReviewsSection from "@/components/ReviewsSection";
import FaqTeaser from "@/components/FaqTeaser";
import BookingBand from "@/components/BookingBand";
import ContactSlot from "@/components/ContactSlot";
import { getContent, type Locale } from "@/content";
import { alternatesFor } from "@/lib/seo";

export function homeMetadata(locale: Locale): Metadata {
  const site = getContent(locale);
  return {
    title: site.meta.title,
    description: site.meta.description,
    alternates: alternatesFor("/", locale),
  };
}

// Conversion path: value → proof → catalogue → trust → results → process →
// social proof → objection removal → booking → directions.
export default function HomeView({ locale }: { locale: Locale }) {
  const site = getContent(locale);
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
      <ProofBar locale={locale} />
      <ClinicShowcase locale={locale} />
      <ServicesSection locale={locale} />
      <DoctorsSection locale={locale} />
      <ResultsSection locale={locale} />
      <FirstVisitSection locale={locale} />
      <ReviewsSection locale={locale} />
      <FaqTeaser locale={locale} />
      <BookingBand />
      <ContactSlot locale={locale} />
    </>
  );
}
