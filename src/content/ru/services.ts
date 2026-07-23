// RU — service catalogue.

import type { SiteContent } from "../types";

export const services: SiteContent["services"] = {
  surgical: [
    { slug: "implantatsiya", title: "Имплантация зубов (All-on-4 / All-on-6)", line: "[краткое описание]" }, // TODO
    { slug: "suyak-plastikasi", title: "Костная пластика и синус-лифтинг", line: "[краткое описание]" }, // TODO
    { slug: "tish-olib-tashlash", title: "Сложное удаление зубов", line: "[краткое описание]" }, // TODO
    { slug: "jag-kistalari", title: "Кисты челюсти", line: "[краткое описание]" }, // TODO
    { slug: "jag-yuz-jarrohligi", title: "Челюстно-лицевая хирургия", line: "[краткое описание]" }, // TODO
  ],
  general: [
    { slug: "protezlash", title: "Протезирование и реставрация", line: "[краткое описание]" }, // TODO
    { slug: "terapevtik-davolash", title: "Терапевтическое лечение", line: "[краткое описание]" }, // TODO
    { slug: "professional-gigiena", title: "Профессиональная гигиена", line: "[краткое описание]" }, // TODO
  ],
};
