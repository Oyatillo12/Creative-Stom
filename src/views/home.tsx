import type { Metadata } from "next";
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
      <AboutTeaser locale={locale} />
      <ServicesSection locale={locale} />
      <DoctorsSection locale={locale} />
      <PositioningQuote />
      <FeaturedCase locale={locale} />
      <CredentialsSection locale={locale} />
      <FirstVisitSection locale={locale} />
      <BookingBand />
      <ReviewsSection locale={locale} />
      <ContactSlot locale={locale} />
    </>
  );
}
