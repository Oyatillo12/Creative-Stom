// RU — sitewide chrome. Unknown facts stay literal [bracketed] placeholders.

import type { SiteContent } from "../types";

export const meta: SiteContent["meta"] = {
  title: "Crative Stom — стоматология хирургического уровня в Ташкенте", // TODO
  description: "[Краткое описание для SEO]", // TODO
};

export const clinicText = {
  address: "", // TODO
  landmark: "[Ориентир — например, рядом с ...]", // TODO
  workHours: "[Пн–Сб 09:00–19:00]", // TODO
  statsLabels: {
    years: "лет опыта",
    surgeries: "успешных операций",
    doctors: "опытных хирурга",
  },
};

export const layout: SiteContent["layout"] = {
  nav: ["Услуги", "Врачи", "Кейсы", "О клинике", "Цены", "Контакты"],
  topBar: {
    languageToggle: "UZ / RU",
    telegramLabel: "Telegram",
  },
  header: {
    ctaLabel: "Онлайн запись",
    menuLabel: "Меню",
    closeLabel: "Закрыть",
  },
  preloader: {
    ariaLabel: "Страница загружается",
  },
  stickyBar: {
    call: "Звонок",
    telegram: "Telegram",
    book: "Запись",
  },
  footer: {
    licenseLabel: "Лицензия",
    rightsNote: "[Все права защищены]", // TODO
  },
};

export const mapBlock: SiteContent["mapBlock"] = {
  openLabel: "Открыть карту",
  iframeTitle: "Клиника на карте",
  landmarkLabel: "Ориентир",
  phoneLabel: "Телефон",
  hoursLabel: "Часы работы",
  googleLabel: "Google Карты",
  yandexLabel: "Яндекс Карты",
  twoGisLabel: "2ГИС",
};
