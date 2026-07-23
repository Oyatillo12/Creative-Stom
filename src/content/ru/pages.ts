// RU — page-level copy for the platform's index pages.

import type { SiteContent } from "../types";

export const pages: SiteContent["pages"] = {
  shared: {
    homeLabel: "Главная",
  },
  services: {
    breadcrumb: "Услуги",
    title: "Услуги",
    intro: "У нас нет общей стоматологии — все услуги хирургические. Каждое вмешательство проводится по КТ-диагностике и плану, утверждённому хирургом.",
    flagshipEyebrow: "Ключевое направление",
  },
  doctors: {
    breadcrumb: "Врачи",
    title: "Врачи",
    intro: "[Краткое вступление — о команде, 1–2 предложения]", // TODO
    educationLabel: "Образование и квалификация",
    focusLabel: "Направления",
    allDoctorsLabel: "Все врачи →",
  },
  cases: {
    breadcrumb: "Кейсы",
    title: "До / После",
    intro: "[Краткое вступление — 1–2 предложения для страницы результатов]", // TODO
    openLabel: "Смотреть кейс →",
    problemLabel: "Состояние",
    planLabel: "Хирургический план",
    resultLabel: "Результат",
    allCasesLabel: "Все кейсы →",
  },
  prices: {
    breadcrumb: "Цены",
    title: "Цены",
    intro: "[Краткое вступление — о ценовой политике, 1–2 предложения]", // TODO
    serviceColumn: "Услуга",
    priceColumn: "Цена",
  },
  clinic: {
    breadcrumb: "О клинике",
    title: "О клинике",
    intro:
      "Creative Stom — клиника, специализирующаяся на имплантации зубов и хирургии полости рта. Современные технологии, международные стандарты и индивидуальный подход к каждому пациенту — наш приоритет.",
  },
  contact: {
    breadcrumb: "Контакты",
    title: "Контакты",
    intro: "[Краткое вступление — как добраться, 1 предложение]", // TODO
  },
};
