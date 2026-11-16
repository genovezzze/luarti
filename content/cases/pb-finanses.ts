import type { CaseStudy } from "./types";

const img = (file: string) => `/cases/pb-finanses/${file}`;

export const pbFinanses: CaseStudy = {
  slug: "pb-finanses",
  client: "PB Finanses",
  logo: img("logo.png"),
  url: "https://pb-finanses-landing-page.vercel.app/",
  urlLabel: "pb-finanses",
  year: "2026",
  kind: { en: "Website", lv: "Mājaslapa" },

  card: {
    title: { en: "A financial firm, presented with clarity.", lv: "Finanšu uzņēmums, parādīts skaidri." },
    text: {
      en: "A bilingual website for a full-service financial company in Ventspils - services, sectors, trust and a direct path to a consultation.",
      lv: "Divvalodu mājaslapa pilna servisa finanšu uzņēmumam Ventspilī - pakalpojumi, nozares, uzticība un tiešs ceļš uz konsultāciju.",
    },
    image: { src: img("desktop-0.png"), alt: { en: "PB Finanses website hero", lv: "PB Finanses mājaslapas galvene" }, aspect: "16 / 10" },
    overlay: { src: img("mobile-0.png"), alt: { en: "PB Finanses on mobile", lv: "PB Finanses mobilajā ierīcē" }, aspect: "390 / 844" },
    tone: "dark",
  },

  hero: {
    title: { en: "Trust, made visible online.", lv: "Uzticība, kas redzama arī tiešsaistē." },
    subtitle: {
      en: "A bilingual website for PB Finanses - a full-service financial company.",
      lv: "Divvalodu mājaslapa PB Finanses - pilna servisa finanšu uzņēmumam.",
    },
    tags: [
      { en: "Web design", lv: "Web dizains" },
      { en: "Development", lv: "Izstrāde" },
      { en: "LV / EN", lv: "LV / EN" },
    ],
    image: { src: img("desktop-0.png"), alt: { en: "PB Finanses homepage", lv: "PB Finanses sākumlapa" }, aspect: "16 / 10" },
    overlay: { src: img("mobile-0.png"), alt: { en: "Mobile version", lv: "Mobilā versija" }, aspect: "390 / 844" },
    caption: { en: "Live website · desktop and mobile", lv: "Darbojošā mājaslapa · dators un mobilais" },
  },

  problem: {
    en: "An experienced accounting firm needed a modern website in two languages that clearly shows its services and brings in new clients.",
    lv: "Pieredzējušam grāmatvedības uzņēmumam vajadzēja modernu mājaslapu divās valodās, kas skaidri parāda pakalpojumus un piesaista jaunus klientus.",
  },
  solution: {
    en: "A fast website in Latvian and English: services, sectors, reviews and news. You can ask for a consultation from any page.",
    lv: "Ātra mājaslapa latviešu un angļu valodā: pakalpojumi, nozares, atsauksmes un jaunumi. Konsultāciju var pieteikt no jebkuras lapas.",
  },

  highlight: {
    title: { en: "Every page leads to a conversation.", lv: "Katra lapa ved uz sarunu." },
    text: {
      en: "Services are easy to find: consulting, taxes, accounting, start-ups and planning. Each one has a clear next step.",
      lv: "Pakalpojumus ir viegli atrast: konsultācijas, nodokļi, grāmatvedība, jaunuzņēmumi un plānošana. Katram ir skaidrs nākamais solis.",
    },
    image: { src: img("desktop-1.png"), alt: { en: "Services section", lv: "Pakalpojumu sadaļa" }, aspect: "16 / 10" },
    labels: [
      { en: "Service", lv: "Pakalpojums" },
      { en: "Sector", lv: "Nozare" },
      { en: "Trust", lv: "Uzticība" },
      { en: "Consultation", lv: "Konsultācija" },
    ],
  },

  gallery: {
    title: { en: "Built for the people they serve.", lv: "Veidots cilvēkiem, kurus viņi apkalpo." },
    items: [
      {
        src: img("desktop-2.png"),
        alt: { en: "Client sectors", lv: "Klientu segmenti" },
        aspect: "16 / 10",
        caption: { en: "Client segments and sectors they know well.", lv: "Klientu segmenti un nozares, ko viņi labi pārzina." },
      },
      {
        src: img("desktop-4.png"),
        alt: { en: "Testimonials and news", lv: "Atsauksmes un jaunumi" },
        aspect: "16 / 10",
        caption: { en: "Testimonials and expert news build trust.", lv: "Atsauksmes un ekspertu jaunumi veido uzticību." },
      },
    ],
  },

  results: [
    { value: "LV / EN", label: { en: "fully bilingual content", lv: "pilnībā divvalodu saturs" } },
    { value: "5", label: { en: "service lines, clearly structured", lv: "pakalpojumu virzieni, skaidri strukturēti" } },
    { value: "1 click", label: { en: "to request a consultation", lv: "līdz konsultācijas pieteikumam" } },
    { value: "Mobile", label: { en: "first, fast on any device", lv: "vispirms, ātra jebkurā ierīcē" } },
  ],

  scope: [
    { en: "Content structure", lv: "Satura struktūra" },
    { en: "Web design", lv: "Web dizains" },
    { en: "Next.js development", lv: "Next.js izstrāde" },
    { en: "Bilingual LV / EN", lv: "Divvalodu LV / EN" },
    { en: "SEO basics", lv: "SEO pamati" },
    { en: "Consultation requests", lv: "Konsultāciju pieteikumi" },
  ],
  stack: ["Next.js","React","next-intl (LV / EN)","Google Analytics","Vercel"],
};
