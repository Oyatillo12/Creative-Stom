// RU — homepage copy.

import type { SiteContent } from "../types";
import { heroSlideImages } from "../media";

export const heroSlides: SiteContent["heroSlides"] = [
  { image: heroSlideImages.processOperation, caption: "ПРОЦЕСС ОПЕРАЦИИ" },
  { image: heroSlideImages.reception, caption: "ПРИЁМНАЯ КЛИНИКИ" },
  { image: heroSlideImages.microscope, caption: "РАБОТА ПОД МИКРОСКОПОМ" },
  { image: heroSlideImages.team, caption: "КОМАНДА" },
];

export const homepage: SiteContent["homepage"] = {
  hero: {
    eyebrow: "CREATIVE STOM · ТАШКЕНТ",
    heading: "Клиника хирургической стоматологии",
    subhead: "Имплантация, сложное удаление зубов, синус-лифтинг и хирургия полости рта — [15]+ лет опыта, [3 000]+ операций", // TODO
    ctaPrimary: "Онлайн запись",
    ctaSecondary: "Услуги →",
  },
  about: {
    eyebrow: "О клинике",
    heading: "Не клиника — хирургический центр",
    statement:
      "Мы занимаемся только хирургией — от имплантации до хирургии полости рта. Каждый план лечения начинается с КТ-диагностики, строится по международным протоколам и лично утверждается хирургом-имплантологом.",
    linkLabel: "Подробнее →",
  },
  services: {
    eyebrow: "Услуги",
    heading: "Шесть хирургических направлений",
    intro:
      "Клиника специализируется только на хирургической стоматологии. По каждому направлению работают опытные хирурги-имплантологи по международным стандартам — с индивидуальным подходом к каждому пациенту.",
    linkLabel: "Подробнее →",
    bookLabel: "Записаться на приём",
  },
  doctors: {
    eyebrow: "Врачи",
    heading: "Команда хирургической школы",
    linkLabel: "Подробнее →",
  },
  cases: {
    eyebrow: "Результаты",
    heading: "До / После",
    beforeLabel: "До",
    afterLabel: "После",
    linkLabel: "Все кейсы →",
  },
  firstVisit: {
    eyebrow: "Первый визит",
    heading: "Что вас ждёт",
    steps: [
      { n: "01", title: "Связаться", text: "Выбираете удобное время по телефону или в Telegram" },
      { n: "02", title: "КТ-диагностика", text: "30 минут — в клинике, видна точная картина" },
      { n: "03", title: "План лечения", text: "План, утверждённый хирургом, и точная цена" },
      { n: "04", title: "Лечение", text: "По плану, поэтапно, под контролем" },
    ],
    ctaLabel: "Записаться на первый визит",
  },
  reviews: {
    eyebrow: "Отзывы",
    heading: "Что говорят наши пациенты",
    prevLabel: "Предыдущий отзыв",
    nextLabel: "Следующий отзыв",
  },
  faq: {
    eyebrow: "Вопрос-ответ",
    heading: "Частые вопросы",
  },
  prices: {
    eyebrow: "Цены",
    heading: "[Заголовок раздела цен]", // TODO
    linkLabel: "Смотреть цены →",
  },
  quiz: {
    eyebrow: "Тест",
    heading: "[Какой метод вам подходит?]", // TODO
    intro: "[Краткое описание — как работает тест]", // TODO
    startLabel: "Начать тест",
  },
  cta: {
    eyebrow: "Запись",
    heading: "Запишитесь на консультацию",
    text: "Оставьте заявку — перезвоним в течение 15 минут и согласуем удобное время КТ-диагностики и консультации хирурга.",
    secondaryLabel: "Опрос за 60 секунд",
  },
  contact: {
    eyebrow: "Контакты",
    heading: "Найдите клинику на карте",
  },
};
