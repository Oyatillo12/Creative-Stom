// RU — the team.

import type { SiteContent } from "../types";
import { doctorPhotos } from "../media";

export const doctors: SiteContent["doctors"] = [
  {
    slug: "doctor-1",
    name: "[Dr. FAMILIYA 1]", // TODO
    role: "Челюстно-лицевой хирург, основатель",
    regalia: "[квалификация/сертификат]", // TODO
    photo: doctorPhotos["doctor-1"],
    bio: [
      "[Био — 2–3 предложения: опыт, подход]", // TODO
      "[Био — продолжение]", // TODO
    ],
    education: [
      "[Образование — университет, год]", // TODO
      "[Повышение квалификации — курс/сертификат]", // TODO
    ],
    focus: [
      "Имплантация зубов (All-on-4 / All-on-6)",
      "Синус-лифтинг и костная пластика",
      "Хирургия полости рта",
    ],
  },
  {
    slug: "doctor-2",
    name: "[Dr. FAMILIYA 2]", // TODO
    role: "[специальность, например: хирург-имплантолог]", // TODO
    regalia: "[квалификация/сертификат]", // TODO
    photo: doctorPhotos["doctor-2"],
    bio: [
      "[Био — 2–3 предложения: опыт, подход]", // TODO
    ],
    education: [
      "[Образование — университет, год]", // TODO
    ],
    focus: [
      "[Направление 1]", // TODO
      "[Направление 2]", // TODO
    ],
  },
];
