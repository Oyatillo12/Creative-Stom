// UZ — lead-capture forms: quiz funnel and booking form.

import type { SiteContent } from "../types";

export const quiz: SiteContent["quiz"] = {
  steps: [
    {
      question: "Nechta tish yetishmayapti?",
      options: [
        { label: "1 ta", value: "1" },
        { label: "2–3 ta", value: "2-3" },
        { label: "Ko'p qismi", value: "most" },
        { label: "Barchasi", value: "all" },
      ],
    },
    {
      question: "Qancha vaqtdan beri?",
      options: [
        { label: "6 oydan kam", value: "lt-6m" },
        { label: "1 yilgacha", value: "lt-1y" },
        { label: "1 yildan ko'p", value: "gt-1y" },
      ],
    },
    {
      question: "KT (3D) tasviringiz bormi?",
      options: [
        { label: "Ha", value: "yes" },
        { label: "Yo'q", value: "no" },
      ],
    },
    {
      question: "Qachon boshlamoqchisiz?",
      options: [
        { label: "Tezroq", value: "asap" },
        { label: "1–3 oy", value: "1-3m" },
        { label: "O'rganyapman", value: "exploring" },
      ],
    },
  ],
  contactStep: {
    nameLabel: "Ism",
    namePlaceholder: "Ismingiz",
    phoneLabel: "Telefon",
    phonePlaceholder: "+998 __ ___-__-__",
    submitLabel: "Rejani olish",
  },
  backLabel: "Orqaga",
  closeLabel: "Yopish",
  successTemplate: "Rahmat, {name}! 15 daqiqada bog'lanamiz.",
};

export const bookingForm: SiteContent["bookingForm"] = {
  nameLabel: "Ism",
  namePlaceholder: "Ismingiz",
  phoneLabel: "Telefon",
  phonePlaceholder: "+998 __ ___-__-__",
  serviceLabel: "Xizmat",
  serviceAnyLabel: "Aniq emas / maslahat kerak",
  timeLabel: "Qulay vaqt",
  timePlaceholder: "Masalan, ertaga 15:00",
  submitLabel: "Yuborish",
  sendingLabel: "Yuborilmoqda…",
  successMessage: "So'rovingiz qabul qilindi. Tez orada bog'lanamiz.",
  errorMessage: "Xatolik yuz berdi. Qayta urinib ko'ring yoki qo'ng'iroq qiling.",
};
