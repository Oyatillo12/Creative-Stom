// UZ — klinika sahifasi: manifest, standartlar, galereya, jamoa CTA.
// Standards derive from claims already made elsewhere in the site copy —
// do not add new factual claims here without brackets.

import type { SiteContent } from "../types";
import { heroSlideImages } from "../media";

export const clinicPage: SiteContent["clinicPage"] = {
  hero: {
    kicker: "Creative Stom · Toshkent",
    heading: "Faqat jarrohlik. Har kuni.",
  },
  manifesto: {
    eyebrow: "Yondashuv",
    heading: "Keng qamrovli klinika emasmiz — va bu bizning kuchimiz",
    paragraphs: [
      "Creative Stom faqat jarrohlik bilan shug'ullanadi: implantatsiya, murakkab tish sug'urish, sinus-lifting, apikoektomiya va og'iz bo'shlig'i jarrohligi.",
      "Har bir davolash rejasi KT tashxisidan boshlanadi va jarroh tomonidan shaxsan tuziladi — narx davolash boshlanishidan oldin aniq bo'ladi.",
      "Bitta yo'nalishga jamlangan tajriba: har kuni takrorlanadigan operatsiyalar, xalqaro protokollar va bashorat qilinadigan natija.",
    ],
  },
  standards: {
    eyebrow: "Standartlar",
    heading: "Har bir operatsiya qanday o'tadi",
    items: [
      {
        n: "01",
        title: "KT tashxis — birinchi qadam",
        text: "Davolash rejasi kompyuter tomografiyasisiz tuzilmaydi: aniq holat — aniq reja va aniq narx.",
      },
      {
        n: "02",
        title: "Xalqaro protokollar",
        text: "Operatsiyalar xalqaro standartlar asosida o'tkaziladi — bosqichlar oldindan belgilangan va hujjatlashtiriladi.",
      },
      {
        n: "03",
        title: "Mikroskop ostida ish",
        text: "Murakkab holatlar kattalashtirish ostida bajariladi — qo'shni tish va to'qimalar saqlanadi.",
      },
      {
        n: "04",
        title: "Bosqichma-bosqich nazorat",
        text: "Davolash reja asosida boradi: har bir bosqich jarroh nazoratida qoladi.",
      },
    ],
  },
  gallery: {
    images: [
      { src: heroSlideImages.microscope, caption: "MIKROSKOP OSTIDA ISH" },
      { src: heroSlideImages.reception, caption: "KLINIKA QABULXONASI" },
      { src: heroSlideImages.team, caption: "JAMOA" },
    ],
  },
  teamCta: {
    heading: "Jamoa bilan tanishing",
    text: "Har bir operatsiya tajribali xirurg-implantologlar tomonidan bajariladi.",
    linkLabel: "Shifokorlar →",
  },
};
