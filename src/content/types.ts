// Shared content types. Every locale dictionary (src/content/<locale>/) must
// satisfy SiteContent, so UZ and RU can never drift apart structurally.

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
