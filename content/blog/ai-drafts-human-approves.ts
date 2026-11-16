import type { Post } from "./types";

export const aiDraftsHumanApproves: Post = {
  slug: "ai-drafts-human-approves",
  date: "2026-11-14",
  category: "ai",
  title: {
    en: "AI drafts. A person approves.",
    lv: "AI sagatavo. Cilvēks apstiprina.",
  },
  excerpt: {
    en: "How the split between AI and people works in practice and why it is effective.",
    lv: "Kā praksē strādā sadalījums starp AI un cilvēku un kāpēc tas ir efektīvs.",
  },
  cover: { src: "/cases/shadowy/employee-view.webp", alt: { en: "AI-prepared entry in Shadowy", lv: "AI sagatavots ieraksts Shadowy" }, aspect: "1600 / 900" },
  body: [
    {
      type: "p",
      text: {
        en: "Many people are afraid that AI will make mistakes, and that is fair. That is why in my systems AI does not make decisions. AI prepares, a person checks and approves.",
        lv: "Daudzi baidās, ka AI kļūdīsies, un tas ir pamatoti. Tāpēc savās sistēmās es AI neļauju pieņemt lēmumus. AI sagatavo, cilvēks pārbauda un apstiprina.",
      },
    },
    { type: "h2", text: { en: "How it looks in Shadowy", lv: "Kā tas izskatās Shadowy" } },
    {
      type: "steps",
      items: [
        { en: "An employee says or types what they did.", lv: "Darbinieks pasaka vai uzraksta, ko izdarīja." },
        { en: "AI prepares a structured entry: client, category, time.", lv: "AI sagatavo strukturētu ierakstu: klients, kategorija, laiks." },
        { en: "The employee checks it and saves.", lv: "Darbinieks to pārbauda un saglabā." },
        { en: "A manager approves, and the data goes into reports.", lv: "Vadītājs apstiprina, un dati nonāk pārskatos." },
      ],
    },
    {
      type: "p",
      text: {
        en: "Nothing is saved without a person. AI saves time on writing and sorting, but the responsibility stays with people.",
        lv: "Bez cilvēka nekas netiek saglabāts. AI ietaupa laiku rakstīšanai un kārtošanai, bet atbildība paliek cilvēkam.",
      },
    },
    { type: "h2", text: { en: "Why it works", lv: "Kāpēc tas strādā" } },
    {
      type: "p",
      text: {
        en: "AI is good at routine: structuring text, filling in fields, finding the right category. But it does not know the context of your clients as well as your team does. The split uses the strengths of both.",
        lv: "AI labi tiek galā ar rutīnu: strukturēt tekstu, aizpildīt laukus, atrast pareizo kategoriju. Bet tas nezina jūsu klientu kontekstu tik labi kā jūsu komanda. Šāds sadalījums izmanto abu stiprās puses.",
      },
    },
    { type: "h2", text: { en: "Where to use this approach", lv: "Kur šo pieeju izmantot" } },
    {
      type: "steps",
      items: [
        { en: "Replies to clients: AI drafts, a person sends.", lv: "Atbildes klientiem: AI sagatavo melnrakstu, cilvēks nosūta." },
        { en: "Documents: AI reads the invoice, a person checks unusual cases.", lv: "Dokumenti: AI nolasa rēķinu, cilvēks pārbauda neparastos gadījumus." },
        { en: "Entries and reports: AI sorts, a manager approves.", lv: "Ieraksti un atskaites: AI sakārto, vadītājs apstiprina." },
      ],
    },
    { type: "quote", text: { en: "Nothing important happens without human approval.", lv: "Nekas svarīgs nenotiek bez cilvēka apstiprinājuma." } },
    {
      type: "p",
      text: {
        en: "Every action is recorded in a log, so you can always see what AI prepared and what a person approved.",
        lv: "Katra darbība tiek ierakstīta žurnālā, tāpēc vienmēr var redzēt, ko sagatavoja AI un ko apstiprināja cilvēks.",
      },
    },
  ],
};
