// UZ — the team, including profile-page content.

import type { SiteContent } from "../types";
import { doctorPhotos } from "../media";

export const doctors: SiteContent["doctors"] = [
  {
    slug: "doctor-1",
    name: "[Dr. FAMILIYA 1]", // TODO
    role: "Jag'-yuz jarrohi, asoschisi",
    regalia: "[malaka/sertifikat]", // TODO
    photo: doctorPhotos["doctor-1"],
    bio: [
      "[Bio — 2–3 jumla: tajriba, yondashuv]", // TODO
      "[Bio — davomi]", // TODO
    ],
    education: [
      "[Ta'lim — universitet, yil]", // TODO
      "[Malaka oshirish — kurs/sertifikat]", // TODO
    ],
    focus: [
      "Tish implantatsiyasi (All-on-4 / All-on-6)",
      "Suyak plastikasi va sinus-lifting",
      "Og'iz va jag'-yuz jarrohligi",
    ],
  },
  {
    slug: "doctor-2",
    name: "[Dr. FAMILIYA 2]", // TODO
    role: "[ixtisosi, masalan: ortoped-stomatolog]", // TODO
    regalia: "[malaka/sertifikat]", // TODO
    photo: doctorPhotos["doctor-2"],
    bio: [
      "[Bio — 2–3 jumla: tajriba, yondashuv]", // TODO
    ],
    education: [
      "[Ta'lim — universitet, yil]", // TODO
    ],
    focus: [
      "[Yo'nalish 1]", // TODO
      "[Yo'nalish 2]", // TODO
    ],
  },
];
