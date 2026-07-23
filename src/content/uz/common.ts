// UZ — sitewide chrome: meta, localized clinic text, nav/header/footer labels,
// map block, service-page stub. Bracketed values keep literal brackets until
// the clinic supplies real copy.

import type { SiteContent } from "../types";

export const meta: SiteContent["meta"] = {
  title: "Crative Stom — Toshkentda jarrohlik darajasidagi stomatologiya", // TODO
  description: "[SEO uchun qisqa tavsif]", // TODO
};

/** Localized clinic text — merged with siteConfig.clinic facts in ./index.ts. */
export const clinicText = {
  address: "", // TODO
  landmark: "[Mo'ljal — masalan, ... yaqinida]", // TODO
  workHours: "[Dush–Shan 09:00–19:00]", // TODO
  statsLabels: {
    years: "yil tajriba",
    surgeries: "muvaffaqiyatli operatsiya",
    doctors: "tajribali jarroh",
  },
};

export const layout: SiteContent["layout"] = {
  nav: {
    services: {
      label: "Xizmatlar",
      allLabel: "Barcha xizmatlar",
      surgicalLabel: "Jarrohlik yo'nalishi",
      generalLabel: "Umumiy stomatologiya",
    },
    primary: [
      { key: "doctors", label: "Shifokorlar" },
      { key: "cases", label: "Keyslar" },
    ],
    clinic: {
      label: "Klinika",
      items: [
        { key: "about", label: "Klinika haqida" },
        { key: "prices", label: "Narxlar" },
        { key: "contact", label: "Kontakt" },
      ],
    },
  },
  topBar: {
    telegramLabel: "Telegram",
  },
  header: {
    ctaLabel: "Onlayn yozilish",
    menuLabel: "Menyu",
    closeLabel: "Yopish",
    langLabel: "Til",
  },
  preloader: {
    ariaLabel: "Sahifa yuklanmoqda",
  },
  stickyBar: {
    call: "Qo'ng'iroq",
    telegram: "Telegram",
    book: "Yozilish",
  },
  footer: {
    licenseLabel: "Litsenziya",
    rightsNote: "[Barcha huquqlar himoyalangan]", // TODO
  },
};

export const mapBlock: SiteContent["mapBlock"] = {
  openLabel: "Xaritani ochish",
  iframeTitle: "Klinika xaritada",
  landmarkLabel: "Mo'ljal",
  phoneLabel: "Telefon",
  hoursLabel: "Ish vaqti",
  googleLabel: "Google Xaritalar",
  yandexLabel: "Yandex Xaritalar",
  twoGisLabel: "2GIS",
};

