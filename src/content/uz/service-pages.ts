// UZ — full service pages rendered by the shared template at
// /xizmatlar/[slug]. Implantatsiya has its own dedicated pillar page and is
// not listed here. Unknown specifics stay literal [bracketed] placeholders.

import type { SiteContent } from "../types";
import { media } from "../media";

export const serviceTemplate: SiteContent["serviceTemplate"] = {
  breadcrumbLabel: "Xizmatlar",
  overviewEyebrow: "Xizmat haqida",
  factsLabel: "Muhim faktlar",
  processEyebrow: "Jarayon",
  processHeading: "Qanday o'tadi",
  priceEyebrow: "Narx",
  priceHeading: "Narx siyosati",
  priceFromLabel: "dan boshlanadi",
  faqEyebrow: "Savol-javob",
  faqHeading: "Ko'p so'raladigan savollar",
  allServicesLabel: "Barcha xizmatlar →",
};

const contactStep = { n: "01", title: "Bog'lanish va KT tashxis", text: "Holat KT asosida aniqlanadi, reja jarroh bilan kelishiladi" };
const controlStep = { title: "Nazorat", text: "Rejali ko'riklar bilan natija kuzatuvda qoladi" };

export const servicePages: SiteContent["servicePages"] = [
  {
    slug: "tish-olib-tashlash",
    heroImage: media.processWide,
    intro: "Tish sug'urish jarrohlik holatiga aylanganda — toj butunlay yemirilgan, ildizlar qiyshiq yoki avvalgi urinish muvaffaqiyatsiz bo'lganda — muolajani xirurg o'tkazadi.",
    overviewHeading: "Murakkab holatlar — jarroh nazoratida",
    overviewBody:
      "Har bir holat avval KT orqali o'rganiladi: ildizlarning shakli, joylashuvi va qo'shni tuzilmalar aniqlanadi. Tish atravmatik protokol bo'yicha, zarur bo'lsa bo'laklarga ajratib olib tashlanadi — atrofdagi suyak saqlanadi, shuning uchun keyinchalik shu joyga implant qo'yish mumkin bo'lib qoladi.",
    facts: [
      "Mahalliy anesteziya ostida",
      "Davomiylik: [muddat]", // TODO
      "Atravmatik protokol — suyak implant uchun saqlanadi",
    ],
    steps: [
      contactStep,
      { n: "02", title: "Olib tashlash", text: "Tish atravmatik usulda, suyakni saqlagan holda olib tashlanadi" },
      { n: "03", ...controlStep },
    ],
    faq: [
      {
        question: "Sug'urishdan keyin implant qachon qo'yiladi?",
        answer:
          "Holatga qarab: ba'zan implant sug'urish bilan bir kunda o'rnatiladi, ko'pincha lunka bitgach — 2–4 oydan keyin. Aniq muddatni KT asosida jarroh belgilaydi.",
      },
      { question: "[Savol]", answer: "[Javob — 2–3 jumla]" }, // TODO
    ],
    priceFrom: "[$ …]", // TODO
  },
  {
    slug: "aql-tishi-olib-tashlash",
    heroImage: media.processWide,
    intro: "Sakkizinchi tishlarni — shu jumladan yotiq (retinirlangan) va qisman chiqqan holatlarda ham — jarrohlik yo'li bilan olib tashlaymiz.",
    overviewHeading: "Sakkizinchi tish: qachon olib tashlanadi",
    overviewBody:
      "Aql tishi yallig'lanish (perikoronit) berganda, yettinchi tishni siqib qiyshaytirganda, yotiq holatda qolganda yoki ortodontik davolash talab qilganda olib tashlanadi. KT ildizlarning pastki jag' nervi va gaymor bo'shlig'iga nisbatan joylashuvini ko'rsatadi — operatsiya shu asosda rejalashtiriladi.",
    facts: [
      "Mahalliy anesteziya ostida",
      "Davomiylik: [muddat]", // TODO
      "Tiklanish: odatda bir hafta ichida",
    ],
    steps: [
      contactStep,
      { n: "02", title: "Olib tashlash", text: "Yotiq tish zarur bo'lsa bo'laklarga ajratib, minimal jarohat bilan chiqariladi" },
      { n: "03", title: "Chok va tavsiyalar", text: "Yara choklanadi, parvarish bo'yicha yozma tavsiyalar beriladi" },
      { n: "04", ...controlStep },
    ],
    faq: [
      {
        question: "Yotiq aql tishini olib tashlash og'riqlimi?",
        answer:
          "Operatsiya vaqtida anesteziya tufayli og'riq sezilmaydi. Keyingi 2–3 kunda shish va noqulaylik tabiiy — tavsiyalarga rioya qilinsa, tez o'tib ketadi.",
      },
      { question: "[Savol]", answer: "[Javob — 2–3 jumla]" }, // TODO
    ],
    priceFrom: "[$ …]", // TODO
  },
  {
    slug: "sinus-lifting",
    heroImage: media.processWide,
    intro: "Yuqori jag'da suyak balandligi yetishmasa, sinus-lifting gaymor bo'shlig'i ostidagi suyak hajmini tiklab, implantatsiyaga yo'l ochadi.",
    overviewHeading: "Implant uchun mustahkam poydevor",
    overviewBody:
      "Gaymor bo'shlig'i pardasi ehtiyotkorlik bilan ko'tarilib, hosil bo'lgan joyga suyak materiali kiritiladi. Ochiq yoki yopiq usul KT ko'rsatkichlariga qarab tanlanadi. Zarur bo'lsa, suyak plastikasi (hajm yetishmagan boshqa sohalarda suyak o'stirish) ham shu klinikada bajariladi.",
    facts: [
      "Ochiq yoki yopiq usul — KT asosida",
      "[Anesteziya turi]", // TODO
      "Implantatsiya: [4–6 oy]dan keyin yoki bir vaqtda", // TODO
    ],
    steps: [
      contactStep,
      { n: "02", title: "Jarrohlik bosqichi", text: "Parda ko'tarilib, suyak materiali joylashtiriladi" },
      { n: "03", title: "Bitish davri", text: "[Muddat va tavsiyalar]" }, // TODO
      { n: "04", ...controlStep },
    ],
    faq: [
      {
        question: "Sinus-lifting og'riqlimi?",
        answer:
          "Muolaja anesteziya ostida o'tadi va og'riqsiz kechadi. Keyingi kunlarda yengil shish bo'lishi mumkin — bu tabiiy jarayon.",
      },
      {
        question: "Implantni sinus-lifting bilan bir kunda qo'yish mumkinmi?",
        answer:
          "Ha, agar mavjud suyak balandligi implantni birlamchi mahkamlashga yetsa. Bunday imkoniyat KT asosida aniqlanadi.",
      },
    ],
    priceFrom: "[$ …]", // TODO
  },
  {
    slug: "apikoektomiya",
    heroImage: media.processWide,
    intro: "Apikoektomiya — ildiz uchini kesib olib tashlash orqali infeksiya o'chog'ini yo'q qiladigan va aks holda sug'urilishi kerak bo'lgan tishni saqlab qoladigan operatsiya.",
    overviewHeading: "Tishni saqlab qolish uchun jarrohlik",
    overviewBody:
      "Ildiz uchida granulema yoki kista bo'lsa-yu, kanalni qayta davolash imkonsiz bo'lsa (masalan, shtift yoki toj o'rnatilgan), apikoektomiya qilinadi: kichik kesma orqali ildiz uchi olib tashlanadi va kanal retrograd usulda germetik yopiladi.",
    facts: [
      "Mahalliy anesteziya ostida",
      "Davomiylik: [muddat]", // TODO
      "Muqobili — sug'urish; apikoektomiya tishni saqlaydi",
    ],
    steps: [
      contactStep,
      { n: "02", title: "Operatsiya", text: "Ildiz uchi infeksiya o'chog'i bilan birga olib tashlanadi, kanal germetik yopiladi" },
      { n: "03", ...controlStep },
    ],
    faq: [
      {
        question: "Apikoektomiyadan keyin tish qancha xizmat qiladi?",
        answer:
          "Muvaffaqiyatli operatsiyadan so'ng tish yillar davomida to'liq xizmat qiladi. Natija rejali ko'riklarda rentgen orqali kuzatib boriladi.",
      },
      { question: "[Savol]", answer: "[Javob — 2–3 jumla]" }, // TODO
    ],
    priceFrom: "[$ …]", // TODO
  },
  {
    slug: "ogiz-jarrohligi",
    heroImage: media.processWide,
    intro: "Og'iz bo'shlig'idagi ambulator jarrohlik muolajalari — tashxisdan operatsiyagacha bir joyda.",
    overviewHeading: "KT tashxis, aniq reja, jarroh ijrosi",
    overviewBody:
      "Yo'nalish qamroviga jag' kistalarini olib tashlash (sistektomiya), til va lab yuganchalari plastikasi (frenuloplastika), biopsiya hamda implantatsiya oldidan tuzatish muolajalari kiradi. Muolajalarning aksariyati mahalliy anesteziya ostida ambulator tarzda o'tadi.",
    facts: [
      "Jag' kistalari, frenuloplastika va ambulator muolajalar",
      "[Anesteziya turi]", // TODO
      "[Tiklanish muddati]", // TODO
    ],
    steps: [
      contactStep,
      { n: "02", title: "Operatsiya", text: "Muolaja KT asosidagi reja bo'yicha bajariladi" },
      { n: "03", title: "Tiklanish", text: "[Muddat va tavsiyalar]" }, // TODO
      { n: "04", ...controlStep },
    ],
    faq: [
      {
        question: "Jag' kistasi o'z-o'zidan yo'qoladimi?",
        answer:
          "Yo'q — kista bildirmasdan kattalashib, suyakni yemira boradi. Ko'pincha u KT tekshiruvida tasodifan aniqlanadi; o'z vaqtida olib tashlash asoratlarning oldini oladi.",
      },
      { question: "[Savol]", answer: "[Javob — 2–3 jumla]" }, // TODO
    ],
    priceFrom: "[$ …]", // TODO
  },
];
