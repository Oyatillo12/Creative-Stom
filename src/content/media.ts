// Media paths are locale-independent and shared by every locale dictionary.
// Every image path referenced from components must come from here (or from a
// content dictionary that itself pulls from here).

import type { SiteContent } from "./types";

export const media: SiteContent["media"] = {
  aboutInterior: "/images/interior.jpeg",
  processWide: "/images/teeth-remove.png",
  implantHero: "/images/process-operation.jpg",
};

export const heroSlideImages = {
  processOperation: "/images/process-operation.jpg",
  reception: "/images/qabul-xona.jpg",
  microscope: "/images/micro-scope.jpg",
  team: "/images/team.jpg",
};

export const doctorPhotos = {
  "doctor-1": "/images/shifokor-1.jpg",
  "doctor-2": "/images/shifokor-2.webp",
};

export const caseImages = {
  "keys-01": { before: "/images/case-1.webp", after: "/images/case1-after.webp" },
  "keys-02": { before: "/images/case2-before.webp", after: "/images/case2-after.webp" },
};
