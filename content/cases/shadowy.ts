import type { CaseStudy } from "./types";

const img = (file: string) => `/cases/shadowy/${file}`;

export const shadowy: CaseStudy = {
  slug: "shadowy",
  client: "Shadowy",
  logo: img("logo.svg"),
  url: "https://shadowy.lv",
  urlLabel: "shadowy.lv",
  year: "2026",
  kind: { en: "Platform", lv: "Platforma" },

  card: {
    title: { en: "What does each client really cost?", lv: "Cik patiesībā izmaksā katrs klients?" },
    text: {
      en: "A platform for accounting firms to understand client hours, costs and the reasons behind additional work.",
      lv: "Platforma grāmatvedības birojiem, lai saprastu klientu stundas, izmaksas un papildu darba iemeslus.",
    },
    image: { src: img("beige-laptop.webp"), alt: { en: "Shadowy work entry on a laptop", lv: "Shadowy darba ieraksts klēpjdatorā" }, aspect: "1615 / 891" },
    overlay: { src: img("tablet-matrix.webp"), alt: { en: "Category × client matrix on a tablet", lv: "Kategorija × klients matrica planšetē" }, aspect: "1672 / 941" },
    tone: "light",
  },

  hero: {
    title: { en: "From daily work to client cost clarity.", lv: "No ikdienas darba līdz skaidrām klientu izmaksām." },
    subtitle: { en: "A purpose-built platform for accounting firms.", lv: "Speciāli grāmatvedības birojiem veidota platforma." },
    tags: [
      { en: "Platform development", lv: "Platformas izstrāde" },
      { en: "AI-assisted entry", lv: "AI atbalstīta ievade" },
      { en: "Reporting", lv: "Pārskati" },
    ],
    image: { src: img("beige-laptop.webp"), alt: { en: "Shadowy on a laptop", lv: "Shadowy klēpjdatorā" }, aspect: "1615 / 891" },
    overlay: { src: img("tablet-matrix.webp"), alt: { en: "Category × client matrix", lv: "Kategorija × klients matrica" }, aspect: "1672 / 941" },
    caption: { en: "Product interface visualisation · demo data", lv: "Produkta saskarnes vizualizācija · demo dati" },
  },

  problem: {
    en: "Accounting firms don’t see how much time each client really takes - and why some clients need so much extra work.",
    lv: "Grāmatvedības biroji neredz, cik laika patiesībā aizņem katrs klients - un kāpēc dažiem vajag tik daudz papildu darba.",
  },
  solution: {
    en: "A simple tool: an employee tells what they did, AI prepares the entry, a manager approves it. The firm sees what each client really costs.",
    lv: "Vienkāršs rīks: darbinieks pastāsta, ko izdarīja, AI sagatavo ierakstu, vadītājs to apstiprina. Birojs redz, cik patiesībā izmaksā katrs klients.",
  },

  highlight: {
    title: { en: "AI drafts. People decide.", lv: "AI sagatavo. Cilvēki izlemj." },
    text: {
      en: "Say or type what you did. AI writes the entry, you check it and save. Nothing is saved without a person.",
      lv: "Pasakiet vai uzrakstiet, ko izdarījāt. AI sagatavo ierakstu, jūs to pārbaudāt un saglabājat. Bez cilvēka nekas netiek saglabāts.",
    },
    image: { src: img("employee-view.webp"), alt: { en: "Employee entry view with AI draft", lv: "Darbinieka ieraksta skats ar AI melnrakstu" }, aspect: "1600 / 900" },
    labels: [
      { en: "Voice or text", lv: "Balss vai teksts" },
      { en: "Draft", lv: "Melnraksts" },
      { en: "Review", lv: "Pārbaude" },
      { en: "Approve", lv: "Apstiprināt" },
    ],
  },

  flow: {
    title: { en: "From a work entry to a client cost report.", lv: "No darba ieraksta līdz klienta izmaksu pārskatam." },
    steps: [
      { en: "Employee entry", lv: "Darbinieka ieraksts" },
      { en: "AI draft", lv: "AI melnraksts" },
      { en: "Human review", lv: "Cilvēka pārbaude" },
      { en: "Categorised data", lv: "Kategorizēti dati" },
      { en: "Client report", lv: "Klienta pārskats" },
    ],
    text: {
      en: "Daily work turns into a clear report for each client. One entry takes about 30 seconds.",
      lv: "Ikdienas darbs kļūst par skaidru pārskatu katram klientam. Viens ieraksts aizņem apmēram 30 sekundes.",
    },
    image: { src: img("dashboard-wide.png"), alt: { en: "Shadowy work overview dashboard", lv: "Shadowy darba pārskata panelis" }, aspect: "1916 / 821" },
  },

  gallery: {
    title: { en: "One platform, a clearer picture.", lv: "Viena platforma, skaidrāks attēls." },
    items: [
      {
        src: img("tablet-matrix.webp"),
        alt: { en: "Category × client matrix", lv: "Kategorija × klients matrica" },
        aspect: "1672 / 941",
        caption: { en: "Work categorised by client and type.", lv: "Darbs sadalīts pa klientiem un veidiem." },
        dark: true,
      },
      {
        src: img("orange-laptop.webp"),
        alt: { en: "Process analysis view", lv: "Procesu analīzes skats" },
        aspect: "1605 / 907",
        caption: {
          en: "Process analysis: repeated work, client load and savings potential.",
          lv: "Procesu analīze: atkārtots darbs, klientu slodze un ietaupījuma potenciāls.",
        },
      },
    ],
  },

  results: [
    { value: "~30 s", label: { en: "to log a work entry", lv: "darba ieraksta fiksēšanai" } },
    { value: "5", label: { en: "steps from entry to client report", lv: "soļi no ieraksta līdz pārskatam" } },
    { value: "EU", label: { en: "data storage, exportable", lv: "datu glabāšana, eksportējami dati" } },
    { value: "€49", label: { en: "per month for the whole office", lv: "mēnesī visam birojam" } },
  ],

  scope: [
    { en: "Product strategy", lv: "Produkta stratēģija" },
    { en: "UX/UI design", lv: "UX/UI dizains" },
    { en: "Web platform", lv: "Tīmekļa platforma" },
    { en: "AI-assisted entry", lv: "AI atbalstīta ievade" },
    { en: "Roles & permissions", lv: "Lomas un piekļuves" },
    { en: "Reports & export", lv: "Pārskati un eksports" },
  ],
  stack: ["Next.js","React","Tailwind CSS","Lucide","AI (LLM)","Vercel"],
};
