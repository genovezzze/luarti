import type { Post } from "./types";

export const shadowy4Months: Post = {
  slug: "where-accountants-time-goes",
  date: "2026-11-10",
  minutes: 4,
  tag: { en: "Case study", lv: "Pētījums" },
  title: {
    en: "Where does an accountant’s time go? 4 months with Shadowy",
    lv: "Kur aiziet grāmatveža laiks? 4 mēneši ar Shadowy",
  },
  excerpt: {
    en: "I rolled out Shadowy in an accounting office: 10 people logged 2115 entries and 1652 hours in 4 months. Here is where the time went and 3 things to do with these numbers.",
    lv: "Ieviesu Shadowy grāmatvedības birojā: 10 cilvēki 4 mēnešos pierakstīja 2115 ierakstus un 1652 stundas. Lūk, kur aizgāja laiks un 3 lietas, ko ar šiem skaitļiem darīt.",
  },
  cover: { src: "/cases/shadowy/orange-laptop.webp", alt: { en: "Shadowy process analysis: where work repeats and which clients take the most time", lv: "Shadowy procesu analīze: kur atkārtojas darbs un kuri klienti aizņem visvairāk laika" }, aspect: "1605 / 907" },
  source: {
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7525837352863404032/",
    label: "LinkedIn",
  },
  body: [
    {
      type: "stats",
      items: [
        { value: "10", label: { en: "people", lv: "cilvēki" } },
        { value: "4", label: { en: "months", lv: "mēneši" } },
        { value: "2115", label: { en: "entries", lv: "ieraksti" } },
        { value: "1652 h", label: { en: "of work", lv: "darba" } },
      ],
    },
    { type: "h2", text: { en: "Why I study this", lv: "Kāpēc es to pētu" } },
    {
      type: "p",
      text: {
        en: "An accounting office does a lot of work every day that the client never sees and never pays for. Nobody knows how much time one client takes or what they really cost. The office also can’t show the client what it has done for them. I wanted to see numbers, not feelings.",
        lv: "Grāmatvedības birojā ikdienā tiek izdarīts daudz darba, ko klients tieši neredz un par ko nemaksā. Nav redzams, cik laika aiziet vienam klientam un cik viņš patiesībā izmaksā. Birojs arī nevar klientam parādīt, ko viņa labā izdarījis. Gribēju redzēt skaitļus, nevis sajūtas.",
      },
    },
    {
      type: "p",
      text: {
        en: "I came up with the idea and built the first prototype at the COLOURS hackathon “Workplace Reinvented”. Several mentors said the problem is real and worth developing.",
        lv: "Ideju izdomāju un pirmo prototipu uztaisīju COLOURS hakatonā „Workplace Reinvented”. Vairāki mentori teica, ka problēma ir reāla un ideju ir vērts attīstīt.",
      },
    },
    { type: "h2", text: { en: "How Shadowy got into the office", lv: "Kā Shadowy nonāca birojā" } },
    {
      type: "p",
      text: {
        en: "After the hackathon I started building Shadowy, a platform where you can quickly log what you did for each client. At the Kurzeme business forum CoLab 2026 I understood it can really be useful and decided to roll it out in companies.",
        lv: "Pēc hakatona sāku veidot Shadowy, platformu, kurā var ātri un viegli pierakstīt, ko izdarīji katram klientam. Kurzemes biznesa forumā CoLab 2026 sapratu, ka tā tiešām var noderēt, un nolēmu to attīstīt tālāk un ieviest uzņēmumos.",
      },
    },
    {
      type: "p",
      text: {
        en: "There I met an accounting office that was already trying to count this unseen work in Excel. It was inconvenient, there were no analytics and results were hard to show to the client. That became a pilot, and later I started working there too. Now I see every day which processes repeat most often and what can be digitised and automated.",
        lv: "Tur iepazinos ar grāmatvedības biroju, kas jau mēģināja Excel tabulās saskaitīt darbu, ko klients tieši neredz un par ko nemaksā. Tas bija neērti, nebija analītikas un rezultātu bija grūti parādīt klientam. No tā sākās pilotprojekts un vēlāk es tur sāku arī strādāt. Tagad katru dienu redzu, kuri procesi atkārtojas visbiežāk un ko var digitalizēt un automatizēt.",
      },
    },
    { type: "h2", text: { en: "Where 1652 hours went", lv: "Kur aizgāja 1652 stundas" } },
    {
      type: "bars",
      items: [
        { label: { en: "Bookkeeping documents", lv: "Dokumentu grāmatošana" }, pct: 24, value: "404 h" },
        { label: { en: "Payments and settlements", lv: "Norēķini" }, pct: 17, value: "285 h" },
        { label: { en: "Archiving and scanning", lv: "Arhivēšana un skenēšana" }, pct: 12, value: "196 h" },
        { label: { en: "Payroll", lv: "Algas" }, pct: 11, value: "188 h" },
        { label: { en: "Taxes, SRS declarations and annual reports", lv: "Nodokļi, VID deklarācijas un gada pārskati" }, pct: 7, value: "108 h" },
        { label: { en: "Other", lv: "Pārējais" }, pct: 29, value: "472 h" },
      ],
      note: {
        en: "From July to September Shadowy mainly tracked additional work. In October I changed it to track all work. Percentages: all logged time over 4 months.",
        lv: "Jūlijā līdz septembrim Shadowy fiksēja galvenokārt papildu darbu. Oktobrī to pārveidoju, lai uzskaitītu visu darbu. Procenti: viss pierakstītais laiks 4 mēnešos.",
      },
    },
    { type: "h2", text: { en: "What is behind the percentages", lv: "Kas slēpjas aiz procentiem" } },
    {
      type: "steps",
      items: [
        { en: "24% Bookkeeping: invoices, waybills, receipts, cash, advances and bank. One entry typically takes 30 minutes.", lv: "24% Grāmatošana: rēķini, pavadzīmes, čeki, kase, avansi un banka. Viens ieraksts tipiski 30 minūtes." },
        { en: "17% Settlements with creditors and debtors, issuing invoices and payments.", lv: "17% Norēķini ar kreditoriem un debitoriem, rēķinu izrakstīšana un maksājumi." },
        { en: "12% Paper: archiving and scanning. More than payroll.", lv: "12% Papīrs: arhivēšana un skenēšana. Vairāk nekā algām." },
        { en: "11% Payroll: work that repeats every month and is easy to predict.", lv: "11% Algas: darbs, kas atkārtojas katru mēnesi un ko var labi paredzēt." },
      ],
    },
    { type: "h2", text: { en: "What to do with it", lv: "Ko ar to darīt" } },
    {
      type: "steps",
      items: [
        { en: "For one month, log all work to see where your office’s hours go.", lv: "Mēnesi pierakstiet visu darbu, lai redzētu, kur aiziet jūsu biroja stundas." },
        { en: "Start with the biggest tasks: that is where digitisation and automation save the most time.", lv: "Sāciet ar lielākajiem darbiem: tur digitalizācija un automatizācija ietaupa visvairāk laika." },
        { en: "Set client prices based on the hours actually spent, not on feeling.", lv: "Cenas klientiem nosakiet pēc reāli pavadītajām stundām, nevis pēc sajūtas." },
      ],
    },
    { type: "h2", text: { en: "My goal", lv: "Mans mērķis" } },
    { type: "quote", text: { en: "Manual work should take minutes, not hours.", lv: "Lai roku darbs aizņem minūtes, nevis stundas." } },
    {
      type: "p",
      text: {
        en: "I want service companies to know what each client really costs, and their time to go to clients, not paperwork. I build tools that save hours. For example, the monthly report: 3 hours → 5 minutes.",
        lv: "Gribu, lai pakalpojumu uzņēmumi zinātu, cik patiesībā izmaksā katrs klients, un lai laiks aizietu klientiem, nevis papīriem. Pats izstrādāju rīkus, kas ietaupa stundas. Piemēram, mēneša akts: 3 stundas → 5 minūtes.",
      },
    },
  ],
};
