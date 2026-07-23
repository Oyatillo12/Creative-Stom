// RU — sitewide chrome. Unknown facts stay literal [bracketed] placeholders.

import type { SiteContent } from "../types";

export const meta: SiteContent["meta"] = {
  title: "Creative Stom — клиника хирургической стоматологии в Ташкенте",
  description:
    "Creative Stom — клиника, специализирующаяся на имплантации зубов, сложном удалении зубов, удалении зубов мудрости, синус-лифтинге, апикоэктомии и хирургии полости рта. Современные технологии, опытные хирурги-имплантологи, международные стандарты.",
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
    instagramLabel: "Instagram",
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
    contactsLabel: "Контакты",
    rightsNote: "© Creative Stom — все права защищены",
  },
};

export const mapBlock: SiteContent["mapBlock"] = {
  iframeTitle: "Клиника на карте",
  landmarkLabel: "Ориентир",
  phoneLabel: "Телефон",
  hoursLabel: "Часы работы",
  googleLabel: "Google Карты",
  yandexLabel: "Яндекс Карты",
  twoGisLabel: "2ГИС",
};
