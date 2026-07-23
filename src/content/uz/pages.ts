// UZ — page-level copy for the platform's index pages.

import type { SiteContent } from "../types";

export const pages: SiteContent["pages"] = {
  shared: {
    homeLabel: "Bosh sahifa",
  },
  services: {
    breadcrumb: "Xizmatlar",
    title: "Xizmatlar",
    intro: "Bizda umumiy stomatologiya yo'q — barcha xizmatlar jarrohlik. Har bir muolaja KT tashxisi va jarroh tasdiqlagan reja asosida o'tadi.",
    flagshipEyebrow: "Asosiy yo'nalish",
  },
  doctors: {
    breadcrumb: "Shifokorlar",
    title: "Shifokorlar",
    intro: "[Qisqa kirish — jamoa haqida 1–2 jumla]", // TODO
    educationLabel: "Ta'lim va malaka",
    focusLabel: "Yo'nalishlar",
  },
  cases: {
    breadcrumb: "Keyslar",
    title: "Avval / Keyin",
    intro: "[Qisqa kirish — natijalar sahifasi uchun 1–2 jumla]", // TODO
    openLabel: "Keysni ko'rish →",
    problemLabel: "Holat",
    planLabel: "Jarrohlik rejasi",
    resultLabel: "Natija",
    allCasesLabel: "Barcha keyslar →",
  },
  prices: {
    breadcrumb: "Narxlar",
    title: "Narxlar",
    intro: "[Qisqa kirish — narx siyosati haqida 1–2 jumla]", // TODO
    serviceColumn: "Xizmat",
    priceColumn: "Narx",
  },
  clinic: {
    breadcrumb: "Klinika haqida",
    title: "Klinika haqida",
    intro:
      "Creative Stom — tish implantatsiyasi va og'iz bo'shlig'i jarrohligiga ixtisoslashgan klinika. Zamonaviy texnologiyalar, xalqaro standartlar va har bir bemorga individual yondashuv — bizning ustuvor maqsadimiz.",
  },
  contact: {
    breadcrumb: "Kontakt",
    title: "Kontakt",
    intro: "[Qisqa kirish — qanday yetib kelish haqida 1 jumla]", // TODO
  },
};
