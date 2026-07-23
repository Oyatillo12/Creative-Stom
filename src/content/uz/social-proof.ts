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
  rating: "4.9",
  count: "[120]+", // TODO
  items: [
    { name: "[Ism F.]", text: "[Sharh matni — 2–3 jumla]" }, // TODO
    { name: "[Ism F.]", text: "[Sharh matni — 2–3 jumla]" }, // TODO
    { name: "[Ism F.]", text: "[Sharh matni — 2–3 jumla]" }, // TODO
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
