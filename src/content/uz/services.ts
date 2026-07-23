// UZ — service catalogue. Adding a service = adding one object here.

import type { SiteContent } from "../types";

export const services: SiteContent["services"] = {
  surgical: [
    { slug: "implantatsiya", title: "Tish implantatsiyasi (All-on-4 / All-on-6)", line: "[qisqa tavsif]" }, // TODO
    { slug: "suyak-plastikasi", title: "Suyak plastikasi va sinus-lifting", line: "[qisqa tavsif]" }, // TODO
    { slug: "tish-olib-tashlash", title: "Murakkab tish olib tashlash", line: "[qisqa tavsif]" }, // TODO
    { slug: "jag-kistalari", title: "Jag' kistalari", line: "[qisqa tavsif]" }, // TODO
    { slug: "jag-yuz-jarrohligi", title: "Og'iz va jag'-yuz jarrohligi", line: "[qisqa tavsif]" }, // TODO
  ],
  general: [
    { slug: "protezlash", title: "Protezlash va restavratsiya", line: "[qisqa tavsif]" }, // TODO
    { slug: "terapevtik-davolash", title: "Terapevtik davolash", line: "[qisqa tavsif]" }, // TODO
    { slug: "professional-gigiena", title: "Professional gigiena", line: "[qisqa tavsif]" }, // TODO
  ],
};
