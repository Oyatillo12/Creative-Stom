// RU — page-level copy for the platform's index pages.

import type { SiteContent } from "../types";

export const pages: SiteContent["pages"] = {
  shared: {
    homeLabel: "Главная",
  },
  services: {
    breadcrumb: "Услуги",
    title: "Услуги",
    intro: "[Краткое вступление — 1–2 предложения для страницы услуг]", // TODO
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
    intro: "[Краткое вступление — история и подход клиники, 1–2 предложения]", // TODO
  },
  contact: {
    breadcrumb: "Контакты",
    title: "Контакты",
    intro: "[Краткое вступление — как добраться, 1 предложение]", // TODO
  },
};
