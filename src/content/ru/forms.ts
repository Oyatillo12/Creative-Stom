// RU — lead-capture forms: quiz funnel and booking form.

import type { SiteContent } from "../types";

export const quiz: SiteContent["quiz"] = {
  steps: [
    {
      question: "Сколько зубов отсутствует?",
      options: [
        { label: "1", value: "1" },
        { label: "2–3", value: "2-3" },
        { label: "Большая часть", value: "most" },
        { label: "Все", value: "all" },
      ],
    },
    {
      question: "Как давно?",
      options: [
        { label: "Меньше 6 месяцев", value: "lt-6m" },
        { label: "До 1 года", value: "lt-1y" },
        { label: "Больше 1 года", value: "gt-1y" },
      ],
    },
    {
      question: "Есть ли у вас КТ (3D) снимок?",
      options: [
        { label: "Да", value: "yes" },
        { label: "Нет", value: "no" },
      ],
    },
    {
      question: "Когда хотите начать?",
      options: [
        { label: "Как можно скорее", value: "asap" },
        { label: "1–3 месяца", value: "1-3m" },
        { label: "Пока изучаю", value: "exploring" },
      ],
    },
  ],
  contactStep: {
    nameLabel: "Имя",
    namePlaceholder: "Ваше имя",
    phoneLabel: "Телефон",
    phonePlaceholder: "+998 __ ___-__-__",
    submitLabel: "Получить план",
  },
  backLabel: "Назад",
  closeLabel: "Закрыть",
  successTemplate: "Спасибо, {name}! Свяжемся в течение 15 минут.",
};

export const bookingForm: SiteContent["bookingForm"] = {
  nameLabel: "Имя",
  namePlaceholder: "Ваше имя",
  phoneLabel: "Телефон",
  phonePlaceholder: "+998 __ ___-__-__",
  serviceLabel: "Услуга",
  serviceAnyLabel: "Не знаю / нужна консультация",
  timeLabel: "Удобное время",
  timePlaceholder: "Например, завтра в 15:00",
  submitLabel: "Отправить",
  sendingLabel: "Отправляется…",
  successMessage: "Ваша заявка принята. Скоро свяжемся.",
  errorMessage: "Произошла ошибка. Попробуйте ещё раз или позвоните.",
};
