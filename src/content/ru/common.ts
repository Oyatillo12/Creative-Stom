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
  nav: {
    services: {
      label: "Услуги",
      allLabel: "Все услуги",
      surgicalLabel: "Хирургическое направление",
      generalLabel: "Общая стоматология",
    },
    primary: [
      { key: "doctors", label: "Врачи" },
      { key: "cases", label: "Кейсы" },
    ],
    clinic: {
      label: "Клиника",
      items: [
        { key: "about", label: "О клинике" },
        { key: "prices", label: "Цены" },
        { key: "contact", label: "Контакты" },
      ],
    },
  },
  topBar: {
    telegramLabel: "Telegram",
  },
  header: {
    ctaLabel: "Онлайн запись",
    menuLabel: "Меню",
    closeLabel: "Закрыть",
    langLabel: "Язык",
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
