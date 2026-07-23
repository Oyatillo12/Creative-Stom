// UZ — the team.

import type { SiteContent } from "../types";
import { doctorPhotos } from "../media";

export const doctors: SiteContent["doctors"] = [
  {
    slug: "doctor-1",
    name: "[Dr. FAMILIYA 1]", // TODO
    role: "Jag'-yuz jarrohi, asoschisi",
    regalia: "[malaka/sertifikat]", // TODO
    photo: doctorPhotos["doctor-1"],
  },
  {
    slug: "doctor-2",
    name: "[Dr. FAMILIYA 2]", // TODO
    role: "[ixtisosi, masalan: ortoped-stomatolog]", // TODO
    regalia: "[malaka/sertifikat]", // TODO
    photo: doctorPhotos["doctor-2"],
  },
];
