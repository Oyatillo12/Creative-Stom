// RU — the implantation pillar page.

import type { SiteContent } from "../types";

export const implantPage: SiteContent["implantPage"] = {
  breadcrumb: ["Главная", "Услуги", "Имплантация"],
  hero: {
    label: "ПРОЦЕСС ИМПЛАНТАЦИИ",
    heading: "Имплантация зубов",
    intro: "[1–2 предложения]", // TODO
    cta: "Онлайн запись",
  },
  reassurance: {
    eyebrow: "Безболезненно",
    heading: "Безболезненно. Под седацией, под полным контролем.",
    facts: [
      "[Тип анестезии]", // TODO
      "Длительность: [40–90 минут]", // TODO
      "На следующий день — обычная жизнь",
    ],
  },
  attribution: {
    text: "Операции проводит [Dr. FAMILIYA 1] — челюстно-лицевой хирург", // TODO
    credential: "[квалификация/сертификат]", // TODO
  },
  methods: {
    eyebrow: "Методы",
    heading: "Три метода — один хирургический уровень",
    linkLabel: "Подробнее →",
    durationLabel: "Срок",
    priceLabel: "Цена",
    featured: {
      badge: "Выбирают чаще всего",
      name: "All-on-4",
      description: "[кому подходит]", // TODO
      duration: "[срок]", // TODO
      price: "[цена: от $...]", // TODO
    },
    others: [
      { name: "Классическая имплантация", description: "[кому подходит]", duration: "[срок]", price: "[цена: от $...]" }, // TODO
      { name: "All-on-6", description: "[кому подходит]", duration: "[срок]", price: "[цена: от $...]" }, // TODO
    ],
    note: "Какой метод подходит именно вам — решает КТ-диагностика.",
  },
  process: {
    eyebrow: "Процесс",
    heading: "С первого дня до контроля",
    steps: [
      { n: "01", title: "КТ и план", time: "День 1" },
      { n: "02", title: "Хирургия", time: "[1 день]" }, // TODO
      { n: "03", title: "Приживление", time: "[3–6 мес]" }, // TODO
      { n: "04", title: "Протезирование", time: "[срок]" }, // TODO
      { n: "05", title: "Контроль", time: "Постоянно" },
    ],
  },
  results: {
    eyebrow: "Результаты",
    heading: "До / После",
  },
  prices: {
    eyebrow: "Цены",
    heading: "[Заголовок раздела цен]", // TODO
  },
  faq: {
    eyebrow: "Вопрос-ответ",
    heading: "Частые вопросы",
  },
  cta: {
    eyebrow: "Запись",
    heading: "Пусть хирург оценит вашу ситуацию",
    text: "Первый визит: КТ-диагностика — 30 минут, план и точная цена.",
  },
};
