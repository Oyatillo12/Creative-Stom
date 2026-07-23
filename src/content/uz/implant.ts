// UZ — the implantatsiya pillar page.

import type { SiteContent } from "../types";

export const implantPage: SiteContent["implantPage"] = {
  breadcrumb: ["Bosh sahifa", "Xizmatlar", "Implantatsiya"],
  hero: {
    label: "IMPLANTATSIYA JARAYONI",
    heading: "Tish implantatsiyasi",
    intro: "[1–2 jumla]", // TODO
    cta: "Onlayn yozilish",
  },
  reassurance: {
    eyebrow: "Og'riqsizlik",
    heading: "Og'riqsiz. Sedatsiya ostida, to'liq nazoratda.",
    facts: [
      "[Anesteziya turi]", // TODO
      "Davomiylik: [40–90 daqiqa]", // TODO
      "Ertasi kuni odatdagi hayot",
    ],
  },
  attribution: {
    text: "Operatsiyalarni [Dr. FAMILIYA 1] — jag'-yuz jarrohi bajaradi", // TODO
    credential: "[malaka/sertifikat]", // TODO
  },
  methods: {
    eyebrow: "Usullar",
    heading: "Uch usul — bitta jarrohlik darajasi",
    linkLabel: "Batafsil →",
    durationLabel: "Muddat",
    priceLabel: "Narx",
    featured: {
      badge: "Eng ko'p tanlanadi",
      name: "All-on-4",
      description: "[kimga mos]", // TODO
      duration: "[muddat]", // TODO
      price: "[narx: $... dan]", // TODO
    },
    others: [
      { name: "Klassik implantatsiya", description: "[kimga mos]", duration: "[muddat]", price: "[narx: $... dan]" }, // TODO
      { name: "All-on-6", description: "[kimga mos]", duration: "[muddat]", price: "[narx: $... dan]" }, // TODO
    ],
    note: "Qaysi usul sizga mosligini KT tashxisi hal qiladi.",
  },
  process: {
    eyebrow: "Jarayon",
    heading: "Birinchi kundan nazoratgacha",
    steps: [
      { n: "01", title: "KT va reja", time: "1-kun" },
      { n: "02", title: "Jarrohlik", time: "[1 kun]" }, // TODO
      { n: "03", title: "Bitish", time: "[3–6 oy]" }, // TODO
      { n: "04", title: "Protezlash", time: "[muddat]" }, // TODO
      { n: "05", title: "Nazorat", time: "Doimiy" },
    ],
  },
  results: {
    eyebrow: "Natijalar",
    heading: "Avval / Keyin",
  },
  prices: {
    eyebrow: "Narxlar",
    heading: "[Narxlar sarlavhasi]", // TODO
  },
  faq: {
    eyebrow: "Savol-javob",
    heading: "Ko'p so'raladigan savollar",
  },
  cta: {
    eyebrow: "Yozilish",
    heading: "Holatingizni jarroh ko'rib chiqsin",
    text: "Birinchi tashrif: KT tashxis — 30 daqiqa, reja va aniq narx.",
  },
};
