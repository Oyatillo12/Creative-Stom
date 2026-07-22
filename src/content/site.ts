// Single source of truth for every visible string and media path on the site.
// Bracketed values are real placeholders from the client brief — keep the
// brackets literal until the clinic supplies the real copy. Every bracketed
// value carries a // TODO so a text search finds them all.

export interface Doctor {
  slug: string;
  name: string;
  role: string;
  regalia: string;
  photo: string;
}

export interface ServiceItem {
  slug: string;
  title: string;
  line: string;
}

export interface CaseItem {
  slug: string;
  title: string;
  before: string;
  after: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ReviewItem {
  name: string;
  text: string;
}

export interface PriceTier {
  label: string;
  priceFrom: string;
}

export interface QuizOption {
  label: string;
  value: string;
}

export interface QuizStep {
  question: string;
  options: QuizOption[];
}

export interface QuizContactStep {
  nameLabel: string;
  namePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  submitLabel: string;
}

export interface SiteContent {
  meta: {
    title: string;
    description: string;
  };
  clinic: {
    name: string;
    phone: string;
    address: string;
    landmark: string;
    telegramUrl: string;
    license: string;
    coordinates: { lat: number; lng: number };
    workHours: string;
    stats: { years: string; surgeries: string; doctors: number };
    statsLabels: { years: string; surgeries: string; doctors: string };
  };
  layout: {
    nav: string[];
    topBar: { languageToggle: string; telegramLabel: string };
    header: { ctaLabel: string };
    stickyBar: { call: string; telegram: string; book: string };
    footer: { licenseLabel: string; rightsNote: string };
  };
  heroSlides: { image: string; caption: string }[];
  doctors: Doctor[];
  services: {
    surgical: ServiceItem[];
    general: ServiceItem[];
  };
  media: {
    aboutInterior: string;
    processWide: string;
    certificates: string[];
    mapFacade: string;
    videoPoster: string;
    implantHero: string;
  };
  mapBlock: {
    openLabel: string;
    iframeTitle: string;
    landmarkLabel: string;
    phoneLabel: string;
    hoursLabel: string;
    googleLabel: string;
    yandexLabel: string;
    twoGisLabel: string;
  };
  servicePageStub: {
    breadcrumbLabel: string;
    genericHeading: string;
    message: string;
    backLabel: string;
  };
  homepage: {
    hero: { eyebrow: string; heading: string; subhead: string; ctaPrimary: string; ctaSecondary: string };
    about: { eyebrow: string; heading: string; statement: string; linkLabel: string };
    services: { eyebrow: string; heading: string; intro: string; surgicalLabel: string; generalLabel: string; linkLabel: string };
    doctors: { eyebrow: string; heading: string; expandingLabel: string; expandingText: string; linkLabel: string };
    cases: { eyebrow: string; heading: string; beforeLabel: string; afterLabel: string; linkLabel: string };
    credentials: { eyebrow: string; heading: string; certAlt: string; implantSystemsLabel: string; implantSystems: string[] };
    firstVisit: { eyebrow: string; heading: string; steps: { n: string; title: string; text: string }[] };
    reviews: { eyebrow: string; heading: string; googleLabel: string; linkLabel: string };
    faq: { eyebrow: string; heading: string };
    prices: { eyebrow: string; heading: string };
    quiz: { eyebrow: string; heading: string; intro: string; startLabel: string };
    cta: { eyebrow: string; heading: string; text: string; primaryLabel: string; secondaryLabel: string };
    contact: { eyebrow: string; heading: string };
  };
  implantPage: {
    breadcrumb: string[];
    hero: { label: string; heading: string; intro: string; cta: string };
    reassurance: { eyebrow: string; heading: string; facts: string[] };
    attribution: { text: string; credential: string };
    methods: {
      eyebrow: string;
      heading: string;
      linkLabel: string;
      featured: { badge: string; name: string; description: string; duration: string; price: string };
      others: { name: string; description: string; duration: string; price: string }[];
      note: string;
    };
    process: { eyebrow: string; heading: string; steps: { n: string; title: string; time: string }[] };
    results: { eyebrow: string; heading: string };
    prices: { eyebrow: string; heading: string };
    faq: { eyebrow: string; heading: string };
    cta: { eyebrow: string; heading: string; text: string };
  };
  cases: CaseItem[];
  faq: FaqItem[];
  reviews: { rating: string; count: string; items: ReviewItem[] };
  prices: { tiers: PriceTier[]; disclaimer: string };
  quiz: {
    steps: QuizStep[];
    contactStep: QuizContactStep;
    backLabel: string;
    closeLabel: string;
    successTemplate: string;
  };
  positioningQuote: { text: string; author: string };
  bookingForm: {
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    doctorLabel: string;
    doctorAnyLabel: string;
    timeLabel: string;
    timePlaceholder: string;
    submitLabel: string;
    successMessage: string;
  };
}

export const site: SiteContent = {
  meta: {
    title: "Crative Stom — Toshkentda jarrohlik darajasidagi stomatologiya", // TODO
    description: "[SEO uchun qisqa tavsif]", // TODO
  },

  clinic: {
    name: "Crative Stom", // TODO
    phone: "+998 [XX] [XXX-XX-XX]", // TODO
    address: "[Qisqa manzil]", // TODO
    landmark: "[Mo'ljal — masalan, ... yaqinida]", // TODO
    telegramUrl: "https://t.me/[username]", // TODO
    license: "[Litsenziya raqami]", // TODO
    coordinates: { lat: 41.3111, lng: 69.2797 },
    workHours: "[Dush–Shan 09:00–19:00]", // TODO
    stats: {
      years: "[15]+", // TODO
      surgeries: "[3 000]+", // TODO
      doctors: 2,
    },
    statsLabels: {
      years: "yil tajriba",
      surgeries: "muvaffaqiyatli operatsiya",
      doctors: "tajribali jarroh",
    },
  },

  layout: {
    nav: ["Xizmatlar", "Shifokorlar", "Keyslar", "Klinika haqida", "Narxlar", "Kontakt"],
    topBar: {
      languageToggle: "UZ / RU",
      telegramLabel: "Telegram",
    },
    header: {
      ctaLabel: "Onlayn yozilish",
    },
    stickyBar: {
      call: "Qo'ng'iroq",
      telegram: "Telegram",
      book: "Yozilish",
    },
    footer: {
      licenseLabel: "Litsenziya",
      rightsNote: "[Barcha huquqlar himoyalangan]", // TODO
    },
  },

  heroSlides: [
    { image: "/images/process-operation.jpg", caption: "OPERATSIYA JARAYONI" },
    { image: "/images/qabul-xona.jpg", caption: "KLINIKA QABULXONASI" },
    { image: "/images/micro-scope.jpg", caption: "MIKROSKOP OSTIDA ISH" },
    { image: "/images/team.jpg", caption: "JAMOA" },
  ],

  doctors: [
    {
      slug: "doctor-1",
      name: "[Dr. FAMILIYA 1]", // TODO
      role: "Jag'-yuz jarrohi, asoschisi",
      regalia: "[malaka/sertifikat]", // TODO
      photo: "/placeholders/doctor-1.svg",
    },
    {
      slug: "doctor-2",
      name: "[Dr. FAMILIYA 2]", // TODO
      role: "[ixtisosi, masalan: ortoped-stomatolog]", // TODO
      regalia: "[malaka/sertifikat]", // TODO
      photo: "/placeholders/doctor-2.svg",
    },
  ],

  services: {
    surgical: [
      { slug: "implantatsiya", title: "Tish implantatsiyasi (All-on-4 / All-on-6)", line: "[qisqa tavsif]" }, // TODO
      { slug: "suyak-plastikasi", title: "Suyak plastikasi va sinus-lifting", line: "[qisqa tavsif]" }, // TODO
      { slug: "tish-olib-tashlash", title: "Murakkab tish olib tashlash", line: "[qisqa tavsif]" }, // TODO
      { slug: "jag-kistalari", title: "Jag' kistalari", line: "[qisqa tavsif]" }, // TODO
      { slug: "jag-yuz-jarrohligi", title: "Og'iz va jag'-yuz jarrohligi", line: "[qisqa tavsif]" }, // TODO
    ],
    general: [
      { slug: "protezlash", title: "Protezlash va restavratsiya", line: "[qisqa tavsif]" }, // TODO
      { slug: "terapevtik-davolash", title: "Terapevtik davolash", line: "[qisqa tavsif]" }, // TODO
      { slug: "professional-gigiena", title: "Professional gigiena", line: "[qisqa tavsif]" }, // TODO
    ],
  },

  media: {
    aboutInterior: "/images/interior.jpeg",
    processWide: "/placeholders/wide-process.svg",
    certificates: [
      "/placeholders/cert-1.svg",
      "/placeholders/cert-2.svg",
      "/placeholders/cert-3.svg",
      "/placeholders/cert-4.svg",
    ],
    mapFacade: "/placeholders/map-facade.svg",
    videoPoster: "/placeholders/video-poster.svg",
    implantHero: "/images/process-operation.jpg",
  },

  mapBlock: {
    openLabel: "Xaritani ochish",
    iframeTitle: "Klinika xaritada",
    landmarkLabel: "Mo'ljal",
    phoneLabel: "Telefon",
    hoursLabel: "Ish vaqti",
    googleLabel: "Google Xaritalar",
    yandexLabel: "Yandex Xaritalar",
    twoGisLabel: "2GIS",
  },

  servicePageStub: {
    breadcrumbLabel: "Xizmatlar",
    genericHeading: "Xizmat",
    message: "Sahifa 1-bosqichda tayyorlanadi",
    backLabel: "Barcha xizmatlar →",
  },

  homepage: {
    hero: {
      eyebrow: "[KLINIKA NOMI] · TOSHKENT", // TODO
      heading: "Jarrohlik darajasidagi stomatologiya",
      subhead: "Implantatsiyadan jag'-yuz jarrohiyasigacha — [15]+ yillik tajriba, [3 000]+ operatsiya", // TODO
      ctaPrimary: "Onlayn yozilish",
      ctaSecondary: "Xizmatlar →",
    },
    about: {
      eyebrow: "Klinika haqida",
      heading: "Klinika emas — jarrohlik markazi",
      statement:
        "Biz protezlash punkti emas — jarrohlik markazimiz. Har bir davolash rejasi KT tashxisidan boshlanadi va jarroh tomonidan shaxsan tasdiqlanadi.",
      linkLabel: "Batafsil →",
    },
    services: {
      eyebrow: "Xizmatlar",
      heading: "Jarrohlik — klinikaning o'zagi",
      intro: "[Qisqa tavsif — nima uchun jarrohlik yo'nalishi klinikani ajratib turadi]", // TODO
      surgicalLabel: "Jarrohlik yo'nalishi",
      generalLabel: "Umumiy stomatologiya",
      linkLabel: "Batafsil →",
    },
    doctors: {
      eyebrow: "Shifokorlar",
      heading: "Jamoa jarrohlik maktabidan",
      expandingLabel: "Jamoa kengaymoqda",
      expandingText: "[Yangi mutaxassis — tez orada]", // TODO
      linkLabel: "Batafsil →",
    },
    cases: {
      eyebrow: "Natijalar",
      heading: "Avval / Keyin",
      beforeLabel: "Avval",
      afterLabel: "Keyin",
      linkLabel: "Barcha keyslar →",
    },
    credentials: {
      eyebrow: "Sertifikatlar",
      heading: "Xalqaro standartlar asosida ishlaymiz",
      certAlt: "Sertifikat",
      implantSystemsLabel: "Ishlatiladigan implant tizimlari",
      implantSystems: ["[IMPLANT TIZIMI 1]", "[IMPLANT TIZIMI 2]", "[IMPLANT TIZIMI 3]"], // TODO
    },
    firstVisit: {
      eyebrow: "Birinchi tashrif",
      heading: "Nima kutmoqchisiz",
      steps: [
        { n: "01", title: "Bog'lanish", text: "Telefon yoki Telegram orqali qulay vaqtni tanlaysiz" },
        { n: "02", title: "KT tashxis", text: "30 daqiqa — klinikada, aniq holat ko'rinadi" },
        { n: "03", title: "Davolash rejasi", text: "Jarroh tasdiqlagan reja va aniq narx" },
        { n: "04", title: "Davolash", text: "Reja asosida, bosqichma-bosqich nazoratda" },
      ],
    },
    reviews: {
      eyebrow: "Sharhlar",
      heading: "[Mijozlar fikri]", // TODO
      googleLabel: "Google sharhlari",
      linkLabel: "Google'da barcha sharhlarni ko'rish →",
    },
    faq: {
      eyebrow: "Savol-javob",
      heading: "Ko'p so'raladigan savollar",
    },
    prices: {
      eyebrow: "Narxlar",
      heading: "[Narxlar sarlavhasi]", // TODO
    },
    quiz: {
      eyebrow: "Test",
      heading: "[Qaysi usul sizga mos?]", // TODO
      intro: "[Qisqa tavsif — test qanday ishlaydi]", // TODO
      startLabel: "Testni boshlash",
    },
    cta: {
      eyebrow: "Yozilish",
      heading: "[Yakuniy CTA sarlavhasi]", // TODO
      text: "[Yakuniy CTA matni]", // TODO
      primaryLabel: "Vaqt tanlab yozilish",
      secondaryLabel: "60 soniyalik so'rovnoma",
    },
    contact: {
      eyebrow: "Kontakt",
      heading: "Klinikani xaritada toping",
    },
  },

  implantPage: {
    breadcrumb: ["Bosh sahifa", "Xizmatlar", "Implantatsiya"],
    hero: {
      label: "IMPLANTATSIYA JARAYONI",
      heading: "Tish implantatsiyasi",
      intro: "[1–2 jumla]", // TODO
      cta: "Onlayn yozilish",
    },
    reassurance: {
      eyebrow: "Og'riqsizlik",
      heading: "Og'riqsiz. Sedatsiya ostida, to'liq nazoratda.",
      facts: [
        "[Anesteziya turi]", // TODO
        "Davomiylik: [40–90 daqiqa]", // TODO
        "Ertasi kuni odatdagi hayot",
      ],
    },
    attribution: {
      text: "Operatsiyalarni [Dr. FAMILIYA 1] — jag'-yuz jarrohi bajaradi", // TODO
      credential: "[malaka/sertifikat]", // TODO
    },
    methods: {
      eyebrow: "Usullar",
      heading: "Uch usul — bitta jarrohlik darajasi",
      linkLabel: "Batafsil →",
      featured: {
        badge: "Eng ko'p tanlanadi",
        name: "All-on-4",
        description: "[kimga mos]", // TODO
        duration: "[muddat]", // TODO
        price: "[narx: $... dan]", // TODO
      },
      others: [
        { name: "Klassik implantatsiya", description: "[kimga mos]", duration: "[muddat]", price: "[narx: $... dan]" }, // TODO
        { name: "All-on-6", description: "[kimga mos]", duration: "[muddat]", price: "[narx: $... dan]" }, // TODO
      ],
      note: "Qaysi usul sizga mosligini KT tashxisi hal qiladi.",
    },
    process: {
      eyebrow: "Jarayon",
      heading: "Birinchi kundan nazoratgacha",
      steps: [
        { n: "01", title: "KT va reja", time: "1-kun" },
        { n: "02", title: "Jarrohlik", time: "[1 kun]" }, // TODO
        { n: "03", title: "Bitish", time: "[3–6 oy]" }, // TODO
        { n: "04", title: "Protezlash", time: "[muddat]" }, // TODO
        { n: "05", title: "Nazorat", time: "Doimiy" },
      ],
    },
    results: {
      eyebrow: "Natijalar",
      heading: "Avval / Keyin",
    },
    prices: {
      eyebrow: "Narxlar",
      heading: "[Narxlar sarlavhasi]", // TODO
    },
    faq: {
      eyebrow: "Savol-javob",
      heading: "Ko'p so'raladigan savollar",
    },
    cta: {
      eyebrow: "Yozilish",
      heading: "Holatingizni jarroh ko'rib chiqsin",
      text: "Birinchi tashrif: KT tashxis — 30 daqiqa, reja va aniq narx.",
    },
  },

  cases: [
    {
      slug: "keys-01",
      title: "Keys 01 — [keys tavsifi]", // TODO
      before: "/placeholders/case1-before.svg",
      after: "/placeholders/case1-after.svg",
    },
    {
      slug: "keys-02",
      title: "Keys 02 — [keys tavsifi]", // TODO
      before: "/placeholders/case2-before.svg",
      after: "/placeholders/case2-after.svg",
    },
  ],

  faq: [
    { question: "Implantatsiya og'riqlimi?", answer: "[Javob — 2–3 jumla]" }, // TODO
    { question: "Implant qancha xizmat qiladi?", answer: "[Javob — 2–3 jumla]" }, // TODO
    { question: "Bo'lib to'lash mumkinmi?", answer: "[Javob — 2–3 jumla]" }, // TODO
    { question: "[Savol]", answer: "[Javob — 2–3 jumla]" }, // TODO
    { question: "[Savol]", answer: "[Javob — 2–3 jumla]" }, // TODO
  ],

  reviews: {
    rating: "4.9",
    count: "[120]+", // TODO
    items: [
      { name: "[Ism F.]", text: "[Sharh matni — 2–3 jumla]" }, // TODO
      { name: "[Ism F.]", text: "[Sharh matni — 2–3 jumla]" }, // TODO
      { name: "[Ism F.]", text: "[Sharh matni — 2–3 jumla]" }, // TODO
    ],
  },

  prices: {
    tiers: [
      { label: "Klassik", priceFrom: "[$ …] dan" }, // TODO
      { label: "All-on-4", priceFrom: "[$ …] dan" }, // TODO
      { label: "All-on-6", priceFrom: "[$ …] dan" }, // TODO
    ],
    disclaimer: "Aniq narx faqat KT tashxisidan keyin — bu halol yondashuv.",
  },

  quiz: {
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
  },

  positioningQuote: {
    text: "Implantolog emas — jarroh.",
    author: "[Muallif / kontekst]", // TODO
  },

  bookingForm: {
    nameLabel: "Ism",
    namePlaceholder: "Ismingiz",
    phoneLabel: "Telefon",
    phonePlaceholder: "+998 __ ___-__-__",
    doctorLabel: "Shifokor",
    doctorAnyLabel: "Farqi yo'q",
    timeLabel: "Qulay vaqt",
    timePlaceholder: "Masalan, ertaga 15:00",
    submitLabel: "Yuborish",
    successMessage: "So'rovingiz qabul qilindi. Tez orada bog'lanamiz.",
  },
};
