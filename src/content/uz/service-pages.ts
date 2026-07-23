// UZ — full service pages rendered by the shared template at
// /xizmatlar/[slug]. Implantatsiya has its own dedicated pillar page and is
// not listed here. Unknown specifics stay literal [bracketed] placeholders.

import type { SiteContent } from "../types";
import { media } from "../media";

export const serviceTemplate: SiteContent["serviceTemplate"] = {
  breadcrumbLabel: "Xizmatlar",
  overviewEyebrow: "Xizmat haqida",
  factsLabel: "Muhim faktlar",
  processEyebrow: "Jarayon",
  processHeading: "Qanday o'tadi",
  priceEyebrow: "Narx",
  priceHeading: "Narx siyosati",
  priceFromLabel: "dan boshlanadi",
  faqEyebrow: "Savol-javob",
  faqHeading: "Ko'p so'raladigan savollar",
  allServicesLabel: "Barcha xizmatlar →",
};

const contactStep = { n: "01", title: "Bog'lanish va KT tashxis", text: "Holat KT asosida aniqlanadi, reja jarroh bilan kelishiladi" };
const controlStep = { title: "Nazorat", text: "Rejali ko'riklar bilan natija kuzatuvda qoladi" };

export const servicePages: SiteContent["servicePages"] = [
  {
    slug: "suyak-plastikasi",
    heroImage: media.processWide,
    intro: "[1–2 jumla — suyak plastikasi haqida]", // TODO
    overviewHeading: "Implant uchun mustahkam poydevor",
    overviewBody: "[Suyak plastikasi va sinus-lifting qachon kerak bo'lishi haqida 2–3 jumla]", // TODO
    facts: [
      "[Anesteziya turi]", // TODO
      "Davomiylik: [muddat]", // TODO
      "[Bitish muddati]", // TODO
    ],
    steps: [
      contactStep,
      { n: "02", title: "Jarrohlik bosqichi", text: "[Muolaja tavsifi — 1 jumla]" }, // TODO
      { n: "03", title: "Bitish davri", text: "[Muddat va tavsiyalar]" }, // TODO
      { n: "04", ...controlStep },
    ],
    faq: [
      { question: "Sinus-lifting og'riqlimi?", answer: "[Javob — 2–3 jumla]" }, // TODO
      { question: "[Savol]", answer: "[Javob — 2–3 jumla]" }, // TODO
    ],
    priceFrom: "[$ …]", // TODO
  },
  {
    slug: "tish-olib-tashlash",
    heroImage: media.processWide,
    intro: "[1–2 jumla — murakkab tish olib tashlash haqida]", // TODO
    overviewHeading: "Murakkab holatlar — jarroh nazoratida",
    overviewBody: "[Aql tishlari va murakkab olib tashlash holatlari haqida 2–3 jumla]", // TODO
    facts: [
      "[Anesteziya turi]", // TODO
      "Davomiylik: [muddat]", // TODO
      "[Tiklanish muddati]", // TODO
    ],
    steps: [
      contactStep,
      { n: "02", title: "Olib tashlash", text: "[Muolaja tavsifi — 1 jumla]" }, // TODO
      { n: "03", ...controlStep },
    ],
    faq: [
      { question: "Aql tishini olib tashlash shartmi?", answer: "[Javob — 2–3 jumla]" }, // TODO
      { question: "[Savol]", answer: "[Javob — 2–3 jumla]" }, // TODO
    ],
    priceFrom: "[$ …]", // TODO
  },
  {
    slug: "jag-kistalari",
    heroImage: media.processWide,
    intro: "[1–2 jumla — jag' kistalari haqida]", // TODO
    overviewHeading: "Aniq tashxis, o'z vaqtida muolaja",
    overviewBody: "[Jag' kistalarini davolash yondashuvi haqida 2–3 jumla]", // TODO
    facts: [
      "KT tashxis asosida reja",
      "[Anesteziya turi]", // TODO
      "[Tiklanish muddati]", // TODO
    ],
    steps: [
      contactStep,
      { n: "02", title: "Jarrohlik bosqichi", text: "[Muolaja tavsifi — 1 jumla]" }, // TODO
      { n: "03", ...controlStep },
    ],
    faq: [
      { question: "[Savol]", answer: "[Javob — 2–3 jumla]" }, // TODO
      { question: "[Savol]", answer: "[Javob — 2–3 jumla]" }, // TODO
    ],
    priceFrom: "[$ …]", // TODO
  },
  {
    slug: "jag-yuz-jarrohligi",
    heroImage: media.processWide,
    intro: "[1–2 jumla — og'iz va jag'-yuz jarrohligi haqida]", // TODO
    overviewHeading: "Jag'-yuz jarrohining ixtisosi",
    overviewBody: "[Yo'nalish qamrovi haqida 2–3 jumla]", // TODO
    facts: [
      "[Operatsiya turlari]", // TODO
      "[Anesteziya turi]", // TODO
      "[Statsionar sharoiti]", // TODO
    ],
    steps: [
      contactStep,
      { n: "02", title: "Operatsiya", text: "[Muolaja tavsifi — 1 jumla]" }, // TODO
      { n: "03", title: "Tiklanish", text: "[Muddat va tavsiyalar]" }, // TODO
      { n: "04", ...controlStep },
    ],
    faq: [
      { question: "[Savol]", answer: "[Javob — 2–3 jumla]" }, // TODO
      { question: "[Savol]", answer: "[Javob — 2–3 jumla]" }, // TODO
    ],
    priceFrom: "[$ …]", // TODO
  },
  {
    slug: "protezlash",
    heroImage: media.processWide,
    intro: "[1–2 jumla — protezlash va restavratsiya haqida]", // TODO
    overviewHeading: "Funktsiya va estetika birga",
    overviewBody: "[Protezlash turlari haqida 2–3 jumla]", // TODO
    facts: [
      "[Protez turlari]", // TODO
      "[Materiallar]", // TODO
      "[Muddat]", // TODO
    ],
    steps: [
      contactStep,
      { n: "02", title: "Tayyorlash va o'lchov", text: "[Bosqich tavsifi — 1 jumla]" }, // TODO
      { n: "03", title: "O'rnatish", text: "[Bosqich tavsifi — 1 jumla]" }, // TODO
      { n: "04", ...controlStep },
    ],
    faq: [
      { question: "[Savol]", answer: "[Javob — 2–3 jumla]" }, // TODO
      { question: "[Savol]", answer: "[Javob — 2–3 jumla]" }, // TODO
    ],
    priceFrom: "[$ …]", // TODO
  },
  {
    slug: "terapevtik-davolash",
    heroImage: media.processWide,
    intro: "[1–2 jumla — terapevtik davolash haqida]", // TODO
    overviewHeading: "Saqlab qolish — birinchi tanlov",
    overviewBody: "[Terapevtik yo'nalish qamrovi haqida 2–3 jumla]", // TODO
    facts: [
      "[Mikroskop / uskuna]", // TODO
      "[Anesteziya turi]", // TODO
      "[Seans davomiyligi]", // TODO
    ],
    steps: [
      contactStep,
      { n: "02", title: "Davolash", text: "[Bosqich tavsifi — 1 jumla]" }, // TODO
      { n: "03", ...controlStep },
    ],
    faq: [
      { question: "[Savol]", answer: "[Javob — 2–3 jumla]" }, // TODO
      { question: "[Savol]", answer: "[Javob — 2–3 jumla]" }, // TODO
    ],
    priceFrom: "[$ …]", // TODO
  },
  {
    slug: "professional-gigiena",
    heroImage: media.processWide,
    intro: "[1–2 jumla — professional gigiena haqida]", // TODO
    overviewHeading: "Profilaktika — eng arzon davolash",
    overviewBody: "[Gigiena protokoli haqida 2–3 jumla]", // TODO
    facts: [
      "[Usul/uskuna]", // TODO
      "Davomiylik: [muddat]", // TODO
      "[Tavsiya etilgan davriylik]", // TODO
    ],
    steps: [
      contactStep,
      { n: "02", title: "Gigiena seansi", text: "[Bosqich tavsifi — 1 jumla]" }, // TODO
      { n: "03", ...controlStep },
    ],
    faq: [
      { question: "[Savol]", answer: "[Javob — 2–3 jumla]" }, // TODO
      { question: "[Savol]", answer: "[Javob — 2–3 jumla]" }, // TODO
    ],
    priceFrom: "[$ …]", // TODO
  },
];
