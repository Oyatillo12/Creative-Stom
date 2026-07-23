// UZ — before/after case studies.

import type { SiteContent } from "../types";
import { caseImages } from "../media";

export const cases: SiteContent["cases"] = [
  {
    slug: "keys-01",
    title: "Keys 01 — [keys tavsifi]", // TODO
    before: caseImages["keys-01"].before,
    after: caseImages["keys-01"].after,
    service: "[Xizmat — masalan, All-on-4]", // TODO
    story: {
      problem: "[Bemor holati — 2–3 jumla]", // TODO
      plan: "[Jarrohlik rejasi — 2–3 jumla]", // TODO
      result: "[Natija — 2–3 jumla]", // TODO
    },
  },
  {
    slug: "keys-02",
    title: "Keys 02 — [keys tavsifi]", // TODO
    before: caseImages["keys-02"].before,
    after: caseImages["keys-02"].after,
    service: "[Xizmat — masalan, implantatsiya]", // TODO
    story: {
      problem: "[Bemor holati — 2–3 jumla]", // TODO
      plan: "[Jarrohlik rejasi — 2–3 jumla]", // TODO
      result: "[Natija — 2–3 jumla]", // TODO
    },
  },
];
