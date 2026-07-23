// Composes the full UZ dictionary. Clinic facts come from siteConfig;
// localized clinic text comes from ./common.

import { siteConfig } from "@/config/site.config";
import type { SiteContent } from "../types";
import { media } from "../media";
import { meta, clinicText, layout, mapBlock } from "./common";
import { heroSlides, homepage, positioningQuote } from "./home";
import { services } from "./services";
import { servicePages, serviceTemplate } from "./service-pages";
import { pages } from "./pages";
import { implantPage } from "./implant";
import { doctors } from "./doctors";
import { cases } from "./cases";
import { faq, reviews, prices } from "./social-proof";
import { quiz, bookingForm } from "./forms";

export const uz: SiteContent = {
  meta,
  clinic: {
    name: siteConfig.clinic.name,
    phone: siteConfig.clinic.phone,
    telegramUrl: siteConfig.clinic.telegramUrl,
    license: siteConfig.clinic.license,
    coordinates: siteConfig.clinic.coordinates,
    stats: siteConfig.clinic.stats,
    address: clinicText.address,
    landmark: clinicText.landmark,
    workHours: clinicText.workHours,
    statsLabels: clinicText.statsLabels,
  },
  layout,
  heroSlides,
  doctors,
  services,
  media,
  mapBlock,
  servicePages,
  serviceTemplate,
  pages,
  homepage,
  implantPage,
  cases,
  faq,
  reviews,
  prices,
  quiz,
  positioningQuote,
  bookingForm,
};
