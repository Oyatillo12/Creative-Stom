// Media paths are locale-independent and shared by every locale dictionary.
// Every image path referenced from components must come from here (or from a
// content dictionary that itself pulls from here).

import type { SiteContent } from "./types";

export const media: SiteContent["media"] = {
  aboutInterior: "/images/interior.jpeg",
  processWide: "/placeholders/wide-process.svg",
  implantHero: "/images/process-operation.jpg",
};

export const heroSlideImages = {
  processOperation: "/images/process-operation.jpg",
  reception: "/images/qabul-xona.jpg",
  microscope: "/images/micro-scope.jpg",
  team: "/images/team.jpg",
};

export const doctorPhotos = {
  "doctor-1": "/placeholders/doctor-1.svg",
  "doctor-2": "/placeholders/doctor-2.svg",
};

export const caseImages = {
  "keys-01": { before: "/placeholders/case1-before.svg", after: "/placeholders/case1-after.svg" },
  "keys-02": { before: "/placeholders/case2-before.svg", after: "/placeholders/case2-after.svg" },
};
