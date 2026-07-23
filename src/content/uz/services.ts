// UZ — service catalogue. The clinic is purely surgical: six directions,
// implantatsiya is the flagship (dedicated pillar page). Adding a service =
// adding one object here + a servicePages entry.

import type { SiteContent } from "../types";

export const services: SiteContent["services"] = [
  { slug: "implantatsiya", title: "Tish implantatsiyasi", line: "Bir tishdan All-on-4 / All-on-6 gacha" },
  { slug: "tish-olib-tashlash", title: "Murakkab tish sug'urish", line: "Singan, yotiq va qiyshiq ildizli tishlar" },
  { slug: "aql-tishi-olib-tashlash", title: "Aql tishini olib tashlash", line: "Retinirlangan sakkizinchi tishlar ham" },
  { slug: "sinus-lifting", title: "Sinus-lifting", line: "Implant oldidan suyak hajmini tiklash" },
  { slug: "apikoektomiya", title: "Apikoektomiya", line: "Ildiz uchi rezeksiyasi — tish saqlanadi" },
  { slug: "ogiz-jarrohligi", title: "Og'iz bo'shlig'i jarrohligi", line: "Jag' kistalari va boshqa jarrohlik muolajalari" },
];
