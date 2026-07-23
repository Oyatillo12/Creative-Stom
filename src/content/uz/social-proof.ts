// UZ — FAQ, reviews, and prices.

import type { SiteContent } from "../types";

export const faq: SiteContent["faq"] = [
  { question: "Implantatsiya og'riqlimi?", answer: "[Javob — 2–3 jumla]" }, // TODO
  { question: "Implant qancha xizmat qiladi?", answer: "[Javob — 2–3 jumla]" }, // TODO
  { question: "Bo'lib to'lash mumkinmi?", answer: "[Javob — 2–3 jumla]" }, // TODO
  { question: "[Savol]", answer: "[Javob — 2–3 jumla]" }, // TODO
  { question: "[Savol]", answer: "[Javob — 2–3 jumla]" }, // TODO
];

export const reviews: SiteContent["reviews"] = {
  items: [
    // TODO demo-content — replace with real patient reviews before launch.
    {
      name: "Dilnoza R.",
      service: "Tish implantatsiyasi",
      text: "Implantatsiyadan juda qo'rqardim, lekin operatsiya 40 daqiqada og'riqsiz o'tdi. Ertasi kuni ishga chiqdim, shishish ham deyarli bo'lmadi. Uch oydan keyin koronka o'rnatildi — o'z tishimdan farqini sezmayman.",
    },
    {
      name: "Sherzod T.",
      service: "Aql tishini olib tashlash",
      text: "Pastki aql tishim yotiq o'sgan edi, boshqa klinikalar tegishga qo'rqishgan. Bu yerda KT asosida hammasini tushuntirib, 20 daqiqada olib tashlashdi. Kechqurun og'riq qoldiruvchi ham kerak bo'lmadi.",
    },
    {
      name: "Malika A.",
      service: "Sinus-lifting",
      text: "Suyak yetishmagani uchun implant qo'yib bo'lmaydi deyishgan edi. Sinus-lifting va implantatsiya bitta rejada bajarildi. Har bosqichda nima bo'layotganini tushuntirib borishdi — bu juda ishonch beradi.",
    },
    {
      name: "Jasur K.",
      service: "Murakkab tish sug'urish",
      text: "Ildizi singan tishni boshqa joyda ikki soat davolay olishmagan edi. Bu yerda mikroskop ostida bir seansda, qo'shni tishlarga tegmasdan sug'urib olishdi. Ertasi kuni ahvolimni so'rab o'zlari qo'ng'iroq qilishdi.",
    },
    {
      name: "Nilufar S.",
      service: "Tish implantatsiyasi",
      text: "Onamga 62 yoshda ikkita implant o'rnatildi. Yoshi katta bo'lgani uchun xavotirda edik, lekin operatsiyadan oldin barcha tekshiruvlar o'tkazildi. Olti oy bo'ldi — hech qanday muammo yo'q.",
    },
    {
      name: "Bekzod M.",
      service: "Apikoektomiya",
      text: "Tishni olib tashlamasdan saqlab qolish mumkinligiga ishonmagandim. Apikoektomiya bir soatga ham yetmadi, tish joyida qoldi. Yarim yildan keyingi rentgen suyak to'liq tiklanganini ko'rsatdi.",
    },
  ],
};

export const prices: SiteContent["prices"] = {
  tiers: [
    { label: "Klassik", priceFrom: "[$ …] dan" }, // TODO
    { label: "All-on-4", priceFrom: "[$ …] dan" }, // TODO
    { label: "All-on-6", priceFrom: "[$ …] dan" }, // TODO
  ],
  disclaimer: "Aniq narx faqat KT tashxisidan keyin — bu halol yondashuv.",
};
