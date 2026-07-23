// RU — full service pages (same slugs as UZ; slugs are shared URLs).

import type { SiteContent } from "../types";
import { media } from "../media";

export const serviceTemplate: SiteContent["serviceTemplate"] = {
  breadcrumbLabel: "Услуги",
  overviewEyebrow: "Об услуге",
  factsLabel: "Важные факты",
  processEyebrow: "Процесс",
  processHeading: "Как проходит",
  priceEyebrow: "Цена",
  priceHeading: "Ценовая политика",
  priceFromLabel: "",
  faqEyebrow: "Вопрос-ответ",
  faqHeading: "Частые вопросы",
  allServicesLabel: "Все услуги →",
};

const contactStep = { n: "01", title: "Связаться и пройти КТ", text: "Состояние определяется по КТ, план согласуется с хирургом" };
const controlStep = { title: "Контроль", text: "Результат остаётся под наблюдением на плановых осмотрах" };

export const servicePages: SiteContent["servicePages"] = [
  {
    slug: "suyak-plastikasi",
    heroImage: media.processWide,
    intro: "[1–2 предложения — о костной пластике]", // TODO
    overviewHeading: "Прочный фундамент для импланта",
    overviewBody: "[Когда нужна костная пластика и синус-лифтинг — 2–3 предложения]", // TODO
    facts: [
      "[Тип анестезии]", // TODO
      "Длительность: [срок]", // TODO
      "[Срок заживления]", // TODO
    ],
    steps: [
      contactStep,
      { n: "02", title: "Хирургический этап", text: "[Описание процедуры — 1 предложение]" }, // TODO
      { n: "03", title: "Период заживления", text: "[Срок и рекомендации]" }, // TODO
      { n: "04", ...controlStep },
    ],
    faq: [
      { question: "Синус-лифтинг — это больно?", answer: "[Ответ — 2–3 предложения]" }, // TODO
      { question: "[Вопрос]", answer: "[Ответ — 2–3 предложения]" }, // TODO
    ],
    priceFrom: "от [$ …]", // TODO
  },
  {
    slug: "tish-olib-tashlash",
    heroImage: media.processWide,
    intro: "[1–2 предложения — о сложном удалении зубов]", // TODO
    overviewHeading: "Сложные случаи — под контролем хирурга",
    overviewBody: "[Зубы мудрости и сложные удаления — 2–3 предложения]", // TODO
    facts: [
      "[Тип анестезии]", // TODO
      "Длительность: [срок]", // TODO
      "[Срок восстановления]", // TODO
    ],
    steps: [
      contactStep,
      { n: "02", title: "Удаление", text: "[Описание процедуры — 1 предложение]" }, // TODO
      { n: "03", ...controlStep },
    ],
    faq: [
      { question: "Обязательно ли удалять зуб мудрости?", answer: "[Ответ — 2–3 предложения]" }, // TODO
      { question: "[Вопрос]", answer: "[Ответ — 2–3 предложения]" }, // TODO
    ],
    priceFrom: "от [$ …]", // TODO
  },
  {
    slug: "jag-kistalari",
    heroImage: media.processWide,
    intro: "[1–2 предложения — о кистах челюсти]", // TODO
    overviewHeading: "Точная диагностика, своевременное лечение",
    overviewBody: "[Подход к лечению кист челюсти — 2–3 предложения]", // TODO
    facts: [
      "План на основе КТ-диагностики",
      "[Тип анестезии]", // TODO
      "[Срок восстановления]", // TODO
    ],
    steps: [
      contactStep,
      { n: "02", title: "Хирургический этап", text: "[Описание процедуры — 1 предложение]" }, // TODO
      { n: "03", ...controlStep },
    ],
    faq: [
      { question: "[Вопрос]", answer: "[Ответ — 2–3 предложения]" }, // TODO
      { question: "[Вопрос]", answer: "[Ответ — 2–3 предложения]" }, // TODO
    ],
    priceFrom: "от [$ …]", // TODO
  },
  {
    slug: "jag-yuz-jarrohligi",
    heroImage: media.processWide,
    intro: "[1–2 предложения — о челюстно-лицевой хирургии]", // TODO
    overviewHeading: "Специализация челюстно-лицевого хирурга",
    overviewBody: "[Охват направления — 2–3 предложения]", // TODO
    facts: [
      "[Виды операций]", // TODO
      "[Тип анестезии]", // TODO
      "[Условия стационара]", // TODO
    ],
    steps: [
      contactStep,
      { n: "02", title: "Операция", text: "[Описание процедуры — 1 предложение]" }, // TODO
      { n: "03", title: "Восстановление", text: "[Срок и рекомендации]" }, // TODO
      { n: "04", ...controlStep },
    ],
    faq: [
      { question: "[Вопрос]", answer: "[Ответ — 2–3 предложения]" }, // TODO
      { question: "[Вопрос]", answer: "[Ответ — 2–3 предложения]" }, // TODO
    ],
    priceFrom: "от [$ …]", // TODO
  },
  {
    slug: "protezlash",
    heroImage: media.processWide,
    intro: "[1–2 предложения — о протезировании]", // TODO
    overviewHeading: "Функция и эстетика вместе",
    overviewBody: "[Виды протезирования — 2–3 предложения]", // TODO
    facts: [
      "[Виды протезов]", // TODO
      "[Материалы]", // TODO
      "[Срок]", // TODO
    ],
    steps: [
      contactStep,
      { n: "02", title: "Подготовка и слепки", text: "[Описание этапа — 1 предложение]" }, // TODO
      { n: "03", title: "Установка", text: "[Описание этапа — 1 предложение]" }, // TODO
      { n: "04", ...controlStep },
    ],
    faq: [
      { question: "[Вопрос]", answer: "[Ответ — 2–3 предложения]" }, // TODO
      { question: "[Вопрос]", answer: "[Ответ — 2–3 предложения]" }, // TODO
    ],
    priceFrom: "от [$ …]", // TODO
  },
  {
    slug: "terapevtik-davolash",
    heroImage: media.processWide,
    intro: "[1–2 предложения — о терапевтическом лечении]", // TODO
    overviewHeading: "Сохранить зуб — первый выбор",
    overviewBody: "[Охват терапевтического направления — 2–3 предложения]", // TODO
    facts: [
      "[Микроскоп / оборудование]", // TODO
      "[Тип анестезии]", // TODO
      "[Длительность приёма]", // TODO
    ],
    steps: [
      contactStep,
      { n: "02", title: "Лечение", text: "[Описание этапа — 1 предложение]" }, // TODO
      { n: "03", ...controlStep },
    ],
    faq: [
      { question: "[Вопрос]", answer: "[Ответ — 2–3 предложения]" }, // TODO
      { question: "[Вопрос]", answer: "[Ответ — 2–3 предложения]" }, // TODO
    ],
    priceFrom: "от [$ …]", // TODO
  },
  {
    slug: "professional-gigiena",
    heroImage: media.processWide,
    intro: "[1–2 предложения — о профессиональной гигиене]", // TODO
    overviewHeading: "Профилактика — самое доступное лечение",
    overviewBody: "[Протокол гигиены — 2–3 предложения]", // TODO
    facts: [
      "[Метод/оборудование]", // TODO
      "Длительность: [срок]", // TODO
      "[Рекомендуемая периодичность]", // TODO
    ],
    steps: [
      contactStep,
      { n: "02", title: "Сеанс гигиены", text: "[Описание этапа — 1 предложение]" }, // TODO
      { n: "03", ...controlStep },
    ],
    faq: [
      { question: "[Вопрос]", answer: "[Ответ — 2–3 предложения]" }, // TODO
      { question: "[Вопрос]", answer: "[Ответ — 2–3 предложения]" }, // TODO
    ],
    priceFrom: "от [$ …]", // TODO
  },
];
