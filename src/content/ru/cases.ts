// RU — before/after case studies.

import type { SiteContent } from "../types";
import { caseImages } from "../media";

export const cases: SiteContent["cases"] = [
  {
    slug: "keys-01",
    title: "Кейс 01 — [описание кейса]", // TODO
    before: caseImages["keys-01"].before,
    after: caseImages["keys-01"].after,
    service: "[Услуга — например, All-on-4]", // TODO
    story: {
      problem: "[Состояние пациента — 2–3 предложения]", // TODO
      plan: "[Хирургический план — 2–3 предложения]", // TODO
      result: "[Результат — 2–3 предложения]", // TODO
    },
  },
  {
    slug: "keys-02",
    title: "Кейс 02 — [описание кейса]", // TODO
    before: caseImages["keys-02"].before,
    after: caseImages["keys-02"].after,
    service: "[Услуга — например, имплантация]", // TODO
    story: {
      problem: "[Состояние пациента — 2–3 предложения]", // TODO
      plan: "[Хирургический план — 2–3 предложения]", // TODO
      result: "[Результат — 2–3 предложения]", // TODO
    },
  },
];
