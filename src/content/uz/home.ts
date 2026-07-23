// UZ — homepage copy: hero slides, all homepage sections, positioning quote.

import type { SiteContent } from "../types";
import { heroSlideImages } from "../media";

export const heroSlides: SiteContent["heroSlides"] = [
  { image: heroSlideImages.processOperation, caption: "OPERATSIYA JARAYONI" },
  { image: heroSlideImages.reception, caption: "KLINIKA QABULXONASI" },
  { image: heroSlideImages.microscope, caption: "MIKROSKOP OSTIDA ISH" },
  { image: heroSlideImages.team, caption: "JAMOA" },
];

export const homepage: SiteContent["homepage"] = {
  hero: {
    eyebrow: "[KLINIKA NOMI] · TOSHKENT", // TODO
    heading: "Jarrohlik darajasidagi stomatologiya",
    subhead: "Implantatsiyadan jag'-yuz jarrohiyasigacha — [15]+ yillik tajriba, [3 000]+ operatsiya", // TODO
    ctaPrimary: "Onlayn yozilish",
    ctaSecondary: "Xizmatlar →",
  },
  about: {
    eyebrow: "Klinika haqida",
    heading: "Klinika emas — jarrohlik markazi",
    statement:
      "Biz protezlash punkti emas — jarrohlik markazimiz. Har bir davolash rejasi KT tashxisidan boshlanadi va jarroh tomonidan shaxsan tasdiqlanadi.",
    linkLabel: "Batafsil →",
  },
  services: {
    eyebrow: "Xizmatlar",
    heading: "Jarrohlik — klinikaning o'zagi",
    intro: "[Qisqa tavsif — nima uchun jarrohlik yo'nalishi klinikani ajratib turadi]", // TODO
    surgicalLabel: "Jarrohlik yo'nalishi",
    generalLabel: "Umumiy stomatologiya",
    linkLabel: "Batafsil →",
  },
  doctors: {
    eyebrow: "Shifokorlar",
    heading: "Jamoa jarrohlik maktabidan",
    expandingLabel: "Jamoa kengaymoqda",
    expandingText: "[Yangi mutaxassis — tez orada]", // TODO
    linkLabel: "Batafsil →",
  },
  cases: {
    eyebrow: "Natijalar",
    heading: "Avval / Keyin",
    beforeLabel: "Avval",
    afterLabel: "Keyin",
    linkLabel: "Barcha keyslar →",
  },
  credentials: {
    eyebrow: "Sertifikatlar",
    heading: "Xalqaro standartlar asosida ishlaymiz",
    certAlt: "Sertifikat",
    implantSystemsLabel: "Ishlatiladigan implant tizimlari",
    implantSystems: ["[IMPLANT TIZIMI 1]", "[IMPLANT TIZIMI 2]", "[IMPLANT TIZIMI 3]"], // TODO
  },
  firstVisit: {
    eyebrow: "Birinchi tashrif",
    heading: "Nima kutmoqchisiz",
    steps: [
      { n: "01", title: "Bog'lanish", text: "Telefon yoki Telegram orqali qulay vaqtni tanlaysiz" },
      { n: "02", title: "KT tashxis", text: "30 daqiqa — klinikada, aniq holat ko'rinadi" },
      { n: "03", title: "Davolash rejasi", text: "Jarroh tasdiqlagan reja va aniq narx" },
      { n: "04", title: "Davolash", text: "Reja asosida, bosqichma-bosqich nazoratda" },
    ],
  },
  reviews: {
    eyebrow: "Sharhlar",
    heading: "[Mijozlar fikri]", // TODO
    googleLabel: "Google sharhlari",
    linkLabel: "Google'da barcha sharhlarni ko'rish →",
  },
  faq: {
    eyebrow: "Savol-javob",
    heading: "Ko'p so'raladigan savollar",
  },
  prices: {
    eyebrow: "Narxlar",
    heading: "[Narxlar sarlavhasi]", // TODO
  },
  quiz: {
    eyebrow: "Test",
    heading: "[Qaysi usul sizga mos?]", // TODO
    intro: "[Qisqa tavsif — test qanday ishlaydi]", // TODO
    startLabel: "Testni boshlash",
  },
  cta: {
    eyebrow: "Yozilish",
    heading: "[Yakuniy CTA sarlavhasi]", // TODO
    text: "[Yakuniy CTA matni]", // TODO
    primaryLabel: "Vaqt tanlab yozilish",
    secondaryLabel: "60 soniyalik so'rovnoma",
  },
  contact: {
    eyebrow: "Kontakt",
    heading: "Klinikani xaritada toping",
  },
};

export const positioningQuote: SiteContent["positioningQuote"] = {
  text: "Implantolog emas — jarroh.",
  author: "[Muallif / kontekst]", // TODO
};
