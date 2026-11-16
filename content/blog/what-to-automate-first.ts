import type { Post } from "./types";

export const whatToAutomateFirst: Post = {
  slug: "what-to-automate-first",
  date: "2026-11-13",
  category: "automation",
  title: {
    en: "What to automate first when everything feels important?",
    lv: "Ko automatizēt vispirms, ja viss šķiet svarīgs?",
  },
  excerpt: {
    en: "How to find the one process where automation brings the biggest gain in your daily work.",
    lv: "Kā atrast vienu procesu, kur automatizācija dos lielāko ieguvumu jūsu ikdienas darbā.",
  },
  cover: { src: "/images/home/automation-docs.jpg", alt: { en: "Working with documents", lv: "Darbs ar dokumentiem" }, aspect: "3 / 2" },
  body: [
    {
      type: "p",
      text: {
        en: "When people start talking about automation, they want to fix everything at once. That rarely works: the project gets big and expensive, and the team gets tired before it sees any result. I start with one process.",
        lv: "Kad sāk runāt par automatizāciju, gribas sakārtot visu uzreiz. Tā parasti nestrādā: projekts kļūst liels un dārgs, bet komanda nogurst, pirms redz rezultātu. Es sāku ar vienu procesu.",
      },
    },
    { type: "h2", text: { en: "Start with numbers, not feelings", lv: "Sāciet ar skaitļiem, nevis sajūtām" } },
    {
      type: "p",
      text: {
        en: "For one month, write down where the time goes. In the Shadowy pilot 10 people logged 1652 hours in 4 months, and the biggest blocks were bookkeeping documents (24%) and settlements (17%). Without the numbers it felt like the time went somewhere else.",
        lv: "Mēnesi pierakstiet, kur aiziet laiks. Shadowy pilotprojektā 10 cilvēki 4 mēnešos pierakstīja 1652 stundas, un lielākie bloki bija dokumentu grāmatošana (24%) un norēķini (17%). Bez skaitļiem šķita, ka laiks aiziet kaut kur citur.",
      },
    },
    { type: "h2", text: { en: "Three questions for every process", lv: "Trīs jautājumi katram procesam" } },
    {
      type: "steps",
      items: [
        { en: "How often does it repeat? Every day or week, or once a year?", lv: "Cik bieži tas atkārtojas? Katru dienu vai nedēļu, vai reizi gadā?" },
        { en: "How much time does it take in total per month?", lv: "Cik laika tas kopā aizņem mēnesī?" },
        { en: "Does it follow clear rules? If a person decides by feeling every time, it is hard to automate.", lv: "Vai tam ir skaidri noteikumi? Ja cilvēks katru reizi lemj pēc sajūtas, to automatizēt ir grūti." },
      ],
    },
    {
      type: "p",
      text: {
        en: "The best first candidate is work that repeats often, takes a lot of time and follows the same rules. For example, entering invoices, monthly reports or statements for clients.",
        lv: "Labākais pirmais kandidāts ir darbs, kas atkārtojas bieži, aizņem daudz laika un notiek pēc vieniem un tiem pašiem noteikumiem. Piemēram, rēķinu ievade, mēneša akti vai atskaites klientiem.",
      },
    },
    { type: "h2", text: { en: "What not to automate first", lv: "Ko neautomatizēt pirmo" } },
    {
      type: "p",
      text: {
        en: "Rare and complex cases where every time you need a person’s judgement. Leave those to people and automate what is around them: collecting data, reminders and preparation.",
        lv: "Retus un sarežģītus gadījumus, kur katru reizi vajag cilvēka spriedumu. Tos labāk atstāt cilvēkam un automatizēt to, kas ap tiem: datu savākšanu, atgādinājumus un sagatavošanu.",
      },
    },
    { type: "quote", text: { en: "One automated process that works is worth more than ten that exist only in a plan.", lv: "Viens automatizēts process, kas strādā, ir vērtīgāks par desmit, kas ir tikai plānā." } },
    {
      type: "p",
      text: {
        en: "An example: a monthly report that used to take 3 hours now takes 5 minutes. It is not a big project, but it gives back hours every month.",
        lv: "Piemērs: mēneša akts, kas agrāk aizņēma 3 stundas, tagad aizņem 5 minūtes. Tas nav liels projekts, bet katru mēnesi atgriež stundas.",
      },
    },
  ],
};
