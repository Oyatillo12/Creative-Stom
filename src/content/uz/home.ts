// UZ — homepage copy: hero slides and all homepage sections.

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
    eyebrow: "CREATIVE STOM · TOSHKENT",
    heading: "Xirurgik stomatologiya klinikasi",
    subhead: "Implantatsiya, murakkab tish sug'urish, sinus-lifting va og'iz bo'shlig'i jarrohligi — [15]+ yillik tajriba, [3 000]+ operatsiya", // TODO
    ctaPrimary: "Onlayn yozilish",
    ctaSecondary: "Xizmatlar →",
  },
  about: {
    eyebrow: "Klinika haqida",
    heading: "Klinika emas — jarrohlik markazi",
    statement:
      "Biz faqat jarrohlik bilan shug'ullanamiz — implantatsiyadan og'iz bo'shlig'i jarrohligigacha. Har bir davolash rejasi KT tashxisidan boshlanadi, xalqaro protokollar asosida tuziladi va xirurg-implantolog tomonidan shaxsan tasdiqlanadi.",
    linkLabel: "Batafsil →",
  },
  services: {
    eyebrow: "Xizmatlar",
    heading: "Oltita jarrohlik yo'nalishi",
    intro:
      "Klinika faqat xirurgik stomatologiyaga ixtisoslashgan. Har bir yo'nalishda tajribali xirurg-implantologlar xalqaro standartlar asosida ishlaydi — har bir bemorga individual yondashuv bilan.",
    linkLabel: "Batafsil →",
    bookLabel: "Qabulga yozilish",
  },
  doctors: {
    eyebrow: "Shifokorlar",
    heading: "Jamoa jarrohlik maktabidan",
    linkLabel: "Batafsil →",
  },
  cases: {
    eyebrow: "Natijalar",
    heading: "Avval / Keyin",
    beforeLabel: "Avval",
    afterLabel: "Keyin",
    linkLabel: "Barcha keyslar →",
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
    ctaLabel: "Birinchi tashrifga yozilish",
  },
  reviews: {
    eyebrow: "Sharhlar",
    heading: "Bemorlarimiz nima deydi",
    prevLabel: "Oldingi sharh",
    nextLabel: "Keyingi sharh",
  },
  faq: {
    eyebrow: "Savol-javob",
    heading: "Ko'p so'raladigan savollar",
  },
  prices: {
    eyebrow: "Narxlar",
    heading: "[Narxlar sarlavhasi]", // TODO
    linkLabel: "Narxlarni ko'rish →",
  },
  quiz: {
    eyebrow: "Test",
    heading: "[Qaysi usul sizga mos?]", // TODO
    intro: "[Qisqa tavsif — test qanday ishlaydi]", // TODO
    startLabel: "Testni boshlash",
  },
  cta: {
    eyebrow: "Yozilish",
    heading: "Konsultatsiyaga yoziling",
    text: "So'rovni qoldiring — 15 daqiqada qo'ng'iroq qilamiz, KT tashxis va jarroh konsultatsiyasi uchun qulay vaqtni kelishamiz.",
    secondaryLabel: "60 soniyalik so'rovnoma",
  },
  contact: {
    eyebrow: "Kontakt",
    heading: "Klinikani xaritada toping",
  },
};
