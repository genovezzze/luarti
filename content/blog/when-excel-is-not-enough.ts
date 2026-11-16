import type { Post } from "./types";

export const whenExcelIsNotEnough: Post = {
  slug: "when-excel-is-not-enough",
  date: "2026-11-15",
  category: "platforms",
  title: {
    en: "When is Excel no longer enough?",
    lv: "Kad ar Excel vairs nepietiek?",
  },
  excerpt: {
    en: "Signs that reliable, organised work needs a platform built for your process.",
    lv: "Pazīmes, ka uzticamākam un sakārtotākam darbam vajadzīga pielāgota platforma.",
  },
  cover: { src: "/cases/shadowy/tablet-matrix.webp", alt: { en: "Category × client table in Shadowy", lv: "Kategorija × klients tabula Shadowy" }, aspect: "1672 / 941" },
  body: [
    {
      type: "p",
      text: {
        en: "Excel is a great tool, and for a small team it is often all you need. I always say honestly when a platform is not needed yet. But there are signs that spreadsheets start losing time and data.",
        lv: "Excel ir lielisks rīks, un mazai komandai tas bieži ir viss, kas vajadzīgs. Es vienmēr godīgi pasaku, ja platforma vēl nav vajadzīga. Bet ir pazīmes, kad tabulas sāk zaudēt laiku un datus.",
      },
    },
    { type: "h2", text: { en: "Signs it is time to move", lv: "Pazīmes, ka laiks pāriet" } },
    {
      type: "steps",
      items: [
        { en: "Several people edit the same spreadsheet and data gets overwritten.", lv: "Vienu tabulu vienlaikus labo vairāki cilvēki, un dati pārrakstās." },
        { en: "There are several versions of the file and nobody knows which one is right.", lv: "Ir vairākas faila versijas, un neviens nezina, kura ir pareizā." },
        { en: "Reports are made by hand every week by copying numbers between spreadsheets.", lv: "Pārskatus katru nedēļu taisa ar rokām, kopējot skaitļus starp tabulām." },
        { en: "Only one person knows how the spreadsheet works.", lv: "Tikai viens cilvēks zina, kā tabula strādā." },
        { en: "You can’t see who did what and when.", lv: "Nav redzams, kurš ko izdarīja un kad." },
      ],
    },
    {
      type: "p",
      text: {
        en: "The Shadowy pilot started exactly like this: the office was trying to count the work clients don’t see in Excel. It was inconvenient, there were no analytics and results were hard to show to the client.",
        lv: "Shadowy pilotprojekts sākās tieši tā: birojs mēģināja Excel tabulās saskaitīt darbu, ko klients neredz. Tas bija neērti, nebija analītikas un rezultātu bija grūti parādīt klientam.",
      },
    },
    { type: "h2", text: { en: "What a platform gives you", lv: "Ko dod platforma" } },
    {
      type: "p",
      text: {
        en: "One place where everyone sees the same data. Roles, so everyone sees only what they need. Reports that build themselves. And a process written into the system, not into someone’s head.",
        lv: "Vienu vietu, kur visi redz vienus datus. Lomas, lai katrs redz tikai to, kas viņam vajadzīgs. Pārskatus, kas veidojas paši. Un procesu, kas ir ierakstīts sistēmā, nevis kāda galvā.",
      },
    },
    { type: "quote", text: { en: "The process should live in the system, not in one person’s head.", lv: "Procesam jādzīvo sistēmā, nevis viena cilvēka galvā." } },
    { type: "h2", text: { en: "How to start", lv: "Kā sākt" } },
    {
      type: "p",
      text: {
        en: "You don’t have to move everything at once. I start with one main process the team does every day and add the rest step by step. Export to Excel stays if accounting or clients need it.",
        lv: "Nav jāpārnes viss uzreiz. Es sāku ar vienu galveno procesu, ko komanda dara katru dienu, un pārējo pievienoju pa solim. Eksports uz Excel paliek, ja tas vajadzīgs grāmatvedībai vai klientiem.",
      },
    },
  ],
};
