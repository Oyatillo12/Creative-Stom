// RU — FAQ, reviews, and prices.

import type { SiteContent } from "../types";

export const faq: SiteContent["faq"] = [
  { question: "Имплантация — это больно?", answer: "[Ответ — 2–3 предложения]" }, // TODO
  { question: "Сколько служит имплант?", answer: "[Ответ — 2–3 предложения]" }, // TODO
  { question: "Можно ли оплатить в рассрочку?", answer: "[Ответ — 2–3 предложения]" }, // TODO
  { question: "[Вопрос]", answer: "[Ответ — 2–3 предложения]" }, // TODO
  { question: "[Вопрос]", answer: "[Ответ — 2–3 предложения]" }, // TODO
];

export const reviews: SiteContent["reviews"] = {
  rating: "4.9",
  count: "[120]+", // TODO
  items: [
    { name: "[Имя Ф.]", text: "[Текст отзыва — 2–3 предложения]" }, // TODO
    { name: "[Имя Ф.]", text: "[Текст отзыва — 2–3 предложения]" }, // TODO
    { name: "[Имя Ф.]", text: "[Текст отзыва — 2–3 предложения]" }, // TODO
  ],
};

export const prices: SiteContent["prices"] = {
  tiers: [
    { label: "Классическая", priceFrom: "от [$ …]" }, // TODO
    { label: "All-on-4", priceFrom: "от [$ …]" }, // TODO
    { label: "All-on-6", priceFrom: "от [$ …]" }, // TODO
  ],
  disclaimer: "Точная цена — только после КТ-диагностики. Это честный подход.",
};
