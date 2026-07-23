// Shared content types. Every locale dictionary (src/content/<locale>/) must
// satisfy SiteContent, so UZ and RU can never drift apart structurally.

export interface Doctor {
  slug: string;
  name: string;
  role: string;
  regalia: string;
  photo: string;
  bio: string[];
  education: string[];
  focus: string[];
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
  service: string;
  story: { problem: string; plan: string; result: string };
}

export interface ServicePageContent {
  slug: string;
  heroImage: string;
  intro: string;
  overviewHeading: string;
  overviewBody: string;
  facts: string[];
  steps: { n: string; title: string; text: string }[];
  faq: FaqItem[];
  priceFrom: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ReviewItem {
  name: string;
  service: string;
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

/** Route identity of a nav entry — Header maps keys to locale-prefixed paths. */
export type NavKey = "services" | "doctors" | "cases" | "about" | "prices" | "contact";

export interface NavLink {
  key: NavKey;
  label: string;
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
    instagramUrl: string;
    coordinates: { lat: number; lng: number };
    workHours: string;
    stats: { years: string; surgeries: string; doctors: number };
    statsLabels: { years: string; surgeries: string; doctors: string };
  };
  layout: {
    nav: {
      services: { label: string; allLabel: string };
      primary: NavLink[];
      clinic: { label: string; items: NavLink[] };
    };
    topBar: { telegramLabel: string; instagramLabel: string };
    header: { ctaLabel: string; menuLabel: string; closeLabel: string; langLabel: string };
    preloader: { ariaLabel: string };
    stickyBar: { call: string; telegram: string; book: string };
    footer: { contactsLabel: string; rightsNote: string };
  };
  heroSlides: { image: string; caption: string }[];
  doctors: Doctor[];
  services: ServiceItem[];
  media: {
    aboutInterior: string;
    processWide: string;
    implantHero: string;
  };
  mapBlock: {
    iframeTitle: string;
    landmarkLabel: string;
    phoneLabel: string;
    hoursLabel: string;
    googleLabel: string;
    yandexLabel: string;
    twoGisLabel: string;
  };
  servicePages: ServicePageContent[];
  serviceTemplate: {
    breadcrumbLabel: string;
    overviewEyebrow: string;
    factsLabel: string;
    processEyebrow: string;
    processHeading: string;
    priceEyebrow: string;
    priceHeading: string;
    priceFromLabel: string;
    faqEyebrow: string;
    faqHeading: string;
    allServicesLabel: string;
  };
  pages: {
    shared: { homeLabel: string };
    services: { breadcrumb: string; title: string; intro: string; flagshipEyebrow: string };
    doctors: {
      breadcrumb: string;
      title: string;
      intro: string;
      educationLabel: string;
      focusLabel: string;
    };
    cases: {
      breadcrumb: string;
      title: string;
      intro: string;
      openLabel: string;
      problemLabel: string;
      planLabel: string;
      resultLabel: string;
      allCasesLabel: string;
    };
    prices: { breadcrumb: string; title: string; intro: string; serviceColumn: string; priceColumn: string };
    clinic: { breadcrumb: string; title: string; intro: string };
    contact: { breadcrumb: string; title: string; intro: string };
  };
  homepage: {
    hero: { eyebrow: string; heading: string; subhead: string; ctaPrimary: string; ctaSecondary: string };
    about: { eyebrow: string; heading: string; statement: string; linkLabel: string };
    services: { eyebrow: string; heading: string; intro: string; linkLabel: string; bookLabel: string };
    doctors: { eyebrow: string; heading: string; linkLabel: string };
    cases: { eyebrow: string; heading: string; beforeLabel: string; afterLabel: string; linkLabel: string };
    firstVisit: {
      eyebrow: string;
      heading: string;
      steps: { n: string; title: string; text: string }[];
      ctaLabel: string;
    };
    reviews: { eyebrow: string; heading: string; prevLabel: string; nextLabel: string };
    faq: { eyebrow: string; heading: string };
    prices: { eyebrow: string; heading: string; linkLabel: string };
    quiz: { eyebrow: string; heading: string; intro: string; startLabel: string };
    cta: { eyebrow: string; heading: string; text: string; secondaryLabel: string };
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
      durationLabel: string;
      priceLabel: string;
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
  clinicPage: {
    hero: { kicker: string; heading: string };
    manifesto: { eyebrow: string; heading: string; paragraphs: string[] };
    standards: { eyebrow: string; heading: string; items: { n: string; title: string; text: string }[] };
    gallery: { images: { src: string; caption: string }[] };
    teamCta: { heading: string; text: string; linkLabel: string };
  };
  cases: CaseItem[];
  faq: FaqItem[];
  reviews: { items: ReviewItem[] };
  prices: { tiers: PriceTier[]; disclaimer: string };
  quiz: {
    steps: QuizStep[];
    contactStep: QuizContactStep;
    backLabel: string;
    closeLabel: string;
    successTemplate: string;
  };
  bookingForm: {
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    serviceLabel: string;
    serviceAnyLabel: string;
    timeLabel: string;
    timePlaceholder: string;
    submitLabel: string;
    sendingLabel: string;
    successMessage: string;
    errorMessage: string;
  };
}
