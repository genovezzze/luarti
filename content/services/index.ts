import type { L } from "@/lib/i18n";

/**
 * Service detail pages (/[locale]/services/[id]).
 * To add a service: add an object to `services` below; the general
 * services page and the detail page pick it up automatically.
 */
export type ServicePage = {
  id: string;
  /** package id used to preselect the contact form */
  package: string;
  title: L;
  lead: L;
  image: { src: string; alt: L; aspect: string };
  stats: { label: L; value: L }[];
  fit: { quote: L; text: L }[];
  /** The typical doubt ("why do I even need this?") with an honest answer */
  objection: { quote: L; text: L };
  includes: { title: L; text: L }[];
  cases: string[];
  steps: { title: L; time: L }[];
  prices: { name: L; price: L }[];
  priceNote: L;
  related?: { id: string; text: L };
  faq: { q: L; a: L }[];
};

const onRequest: L = { en: "On request", lv: "Pēc pieprasījuma" };
const firstCall = { label: { en: "First call", lv: "Pirmais zvans" }, value: { en: "free, 20 min", lv: "bezmaksas, 20 min" } };
const estimate = { label: { en: "Estimate", lv: "Tāme" }, value: { en: "after a short call", lv: "pēc īsas sarunas" } };
const price = (en: string, lv: string): L => ({ en, lv });

export const services: ServicePage[] = [
  {
    id: "website",
    package: "website",
    title: { en: "Landing pages & websites", lv: "Landing lapas un mājaslapas" },
    lead: {
      en: "A fast, clear website that explains what you do and brings requests — in the languages your clients speak.",
      lv: "Ātra, skaidra mājaslapa, kas izskaidro, ko jūs darāt, un atnes pieprasījumus — valodās, kurās runā jūsu klienti.",
    },
    image: { src: "/cases/pb-finanses/desktop-0.png", alt: { en: "PB Finanses website", lv: "PB Finanses mājaslapa" }, aspect: "16 / 10" },
    stats: [
      { label: { en: "Price", lv: "Cena" }, value: price("from €300", "no €300") },
      { label: { en: "Time", lv: "Termiņš" }, value: price("1–2 weeks", "1–2 nedēļas") },
      firstCall,
      estimate,
    ],
    fit: [
      { quote: { en: "“We have no website, or it’s outdated”", lv: "“Mājaslapas nav vai tā ir novecojusi”" }, text: { en: "We make a modern site that looks good on a phone and loads fast.", lv: "Izveidojam modernu vietni, kas labi izskatās telefonā un ātri ielādējas." } },
      { quote: { en: "“People visit, but don’t contact us”", lv: "“Cilvēki ienāk, bet nesazinās”" }, text: { en: "Clear structure and one main action on every page: a call, a form or a booking.", lv: "Skaidra struktūra un viena galvenā darbība katrā lapā: zvans, forma vai pieteikums." } },
      { quote: { en: "“We need it in Latvian and English”", lv: "“Vajag latviski un angliski”" }, text: { en: "Two or more languages with a simple switch — like on the PB Finanses site.", lv: "Divas vai vairāk valodas ar vienkāršu pārslēgšanu — kā PB Finanses vietnē." } },
      { quote: { en: "“Requests get lost in email”", lv: "“Pieteikumi pazūd e-pastā”" }, text: { en: "The form sends requests straight to email, a CRM or Telegram.", lv: "Forma sūta pieteikumus uzreiz uz e-pastu, CRM vai Telegram." } },
    ],
    objection: { quote: { en: "“Business is going fine — why do I need a website?”", lv: "“Bizness jau iet labi — kāpēc man mājaslapa?”" }, text: { en: "New clients look you up on Google first. If they don’t find you there, they go to whoever they find. A website works for you even when you’re not answering the phone.", lv: "Jauni klienti jūs vispirms meklē Google. Ja tur jūs neatrod, viņi aiziet pie tā, kuru atrod. Mājaslapa strādā jūsu labā arī tad, kad jūs neatbildat uz zvaniem." } },
    includes: [
      { title: { en: "Structure", lv: "Struktūra" }, text: { en: "What to say, in which order, and where to put the main button.", lv: "Ko teikt, kādā secībā un kur likt galveno pogu." } },
      { title: { en: "Design", lv: "Dizains" }, text: { en: "Made for your brand, not a template.", lv: "Veidots jūsu zīmolam, nevis pēc šablona." } },
      { title: { en: "Development", lv: "Izstrāde" }, text: { en: "Fast and mobile-first, on modern technology.", lv: "Ātra un vispirms mobilajam, uz modernām tehnoloģijām." } },
      { title: { en: "Languages", lv: "Valodas" }, text: { en: "LV, EN and other languages if needed.", lv: "LV, EN un citas valodas, ja vajag." } },
      { title: { en: "Requests", lv: "Pieteikumi" }, text: { en: "Contact form to email, CRM or Telegram.", lv: "Kontaktforma uz e-pastu, CRM vai Telegram." } },
      { title: { en: "Basic SEO", lv: "SEO pamati" }, text: { en: "Titles, descriptions and a sitemap, so Google finds you.", lv: "Virsraksti, apraksti un sitemap, lai Google jūs atrod." } },
    ],
    cases: ["pb-finanses"],
    steps: [
      { title: { en: "Call and estimate", lv: "Zvans un tāme" }, time: price("1 day", "1 diena") },
      { title: { en: "Structure and texts", lv: "Struktūra un teksti" }, time: price("2–3 days", "2–3 dienas") },
      { title: { en: "Design and development", lv: "Dizains un izstrāde" }, time: price("1 week", "1 nedēļa") },
      { title: { en: "Launch", lv: "Palaišana" }, time: price("1 day", "1 diena") },
    ],
    prices: [
      { name: { en: "Landing page", lv: "Landing lapa" }, price: price("from €300", "no €300") },
      { name: { en: "Company website, several pages", lv: "Uzņēmuma mājaslapa, vairākas lapas" }, price: onRequest },
      { name: { en: "Website with blog or catalogue", lv: "Mājaslapa ar blogu vai katalogu" }, price: onRequest },
    ],
    priceNote: { en: "The price depends on the number of pages, languages and connections to other services. Excl. VAT.", lv: "Cena atkarīga no lapu skaita, valodām un savienojumiem ar citiem servisiem. Bez PVN." },
    related: { id: "telegram", text: { en: "Need it inside a messenger?", lv: "Vajag to tieši čatā?" } },
    faq: [
      { q: { en: "Do I need to write the texts myself?", lv: "Vai tekstus jāraksta pašam?" }, a: { en: "No. We prepare the structure and texts with you; you only check the facts.", lv: "Nē. Struktūru un tekstus sagatavojam kopā ar jums; jūs tikai pārbaudāt faktus." } },
      { q: { en: "Can I edit the site later?", lv: "Vai vēlāk varēšu vietni labot?" }, a: { en: "Yes. Small changes we can make for you, or we set up simple editing.", lv: "Jā. Nelielas izmaiņas varam veikt mēs vai iestatām vienkāršu rediģēšanu." } },
      { q: { en: "Is hosting included?", lv: "Vai hostings ir iekļauts?" }, a: { en: "We help choose and set it up. Support is on request.", lv: "Palīdzam izvēlēties un iestatīt. Atbalsts pēc pieprasījuma." } },
    ],
  },
  {
    id: "platform",
    package: "platform",
    title: { en: "Platforms", lv: "Platformas" },
    lead: {
      en: "Your own web platform for the team: data, roles and reports in one place, built around how you work.",
      lv: "Jūsu pašu tīmekļa platforma komandai: dati, lomas un pārskati vienuviet, veidota ap to, kā jūs strādājat.",
    },
    image: { src: "/cases/shadowy/beige-laptop.webp", alt: { en: "Shadowy platform", lv: "Shadowy platforma" }, aspect: "1615 / 891" },
    stats: [
      { label: { en: "Price", lv: "Cena" }, value: onRequest },
      { label: { en: "Time", lv: "Termiņš" }, value: price("4–8 weeks", "4–8 nedēļas") },
      firstCall,
      estimate,
    ],
    fit: [
      { quote: { en: "“Work lives in spreadsheets and chats”", lv: "“Darbs dzīvo tabulās un čatos”" }, text: { en: "We move it into one system where everyone sees the same data.", lv: "Pārnesam to vienā sistēmā, kur visi redz vienus datus." } },
      { quote: { en: "“Ready-made tools don’t fit our process”", lv: "“Gatavie rīki neder mūsu procesam”" }, text: { en: "We build exactly the screens and steps your team needs.", lv: "Uzbūvējam tieši tos ekrānus un soļus, kas vajadzīgi jūsu komandai." } },
      { quote: { en: "“We don’t see what each client costs”", lv: "“Neredzam, cik izmaksā katrs klients”" }, text: { en: "Reports by client, employee and type of work — like in Shadowy.", lv: "Pārskati pa klientiem, darbiniekiem un darba veidiem — kā Shadowy." } },
      { quote: { en: "“Everything depends on one person”", lv: "“Viss turas uz viena cilvēka”" }, text: { en: "The process is written into the system, not into someone’s head.", lv: "Process ir ierakstīts sistēmā, nevis kāda galvā." } },
    ],
    objection: { quote: { en: "“Excel is enough for us”", lv: "“Mums pietiek ar Excel”" }, text: { en: "While the team is small — yes. When there are more people and clients, spreadsheets start losing time and data. We’ll honestly tell you if it’s too early.", lv: "Kamēr komanda ir maza — jā. Kad cilvēku un klientu kļūst vairāk, tabulas sāk zaudēt laiku un datus. Godīgi pateiksim, ja vēl ir par agru." } },
    includes: [
      { title: { en: "Planning", lv: "Plānošana" }, text: { en: "We map the process and agree what goes into the first version.", lv: "Izkartējam procesu un vienojamies, kas būs pirmajā versijā." } },
      { title: { en: "Design", lv: "Dizains" }, text: { en: "Clear screens for every role: employee, manager, owner.", lv: "Skaidri ekrāni katrai lomai: darbiniekam, vadītājam, īpašniekam." } },
      { title: { en: "Roles and access", lv: "Lomas un piekļuves" }, text: { en: "Everyone sees only what they need.", lv: "Katrs redz tikai to, kas viņam vajadzīgs." } },
      { title: { en: "Reports", lv: "Pārskati" }, text: { en: "Dashboards and export to Excel or PDF.", lv: "Paneļi un eksports uz Excel vai PDF." } },
      { title: { en: "AI where it helps", lv: "AI, kur tas palīdz" }, text: { en: "AI drafts entries, a person approves.", lv: "AI sagatavo ierakstus, cilvēks apstiprina." } },
      { title: { en: "Launch", lv: "Palaišana" }, text: { en: "Server, domain, data import and team onboarding.", lv: "Serveris, domēns, datu imports un komandas apmācība." } },
    ],
    cases: ["shadowy"],
    steps: [
      { title: { en: "Call and process review", lv: "Zvans un procesa apskate" }, time: price("1 week", "1 nedēļa") },
      { title: { en: "Screens and prototype", lv: "Ekrāni un prototips" }, time: price("1–2 weeks", "1–2 nedēļas") },
      { title: { en: "Development", lv: "Izstrāde" }, time: price("3–5 weeks", "3–5 nedēļas") },
      { title: { en: "Launch and onboarding", lv: "Palaišana un apmācība" }, time: price("1 week", "1 nedēļa") },
    ],
    prices: [
      { name: { en: "Platform for one process", lv: "Platforma vienam procesam" }, price: onRequest },
      { name: { en: "Platform with roles and reports", lv: "Platforma ar lomām un pārskatiem" }, price: onRequest },
      { name: { en: "Platform with integrations and AI", lv: "Platforma ar integrācijām un AI" }, price: onRequest },
    ],
    priceNote: { en: "The price depends on the number of screens, roles and connected services. Excl. VAT.", lv: "Cena atkarīga no ekrānu, lomu un savienoto servisu skaita. Bez PVN." },
    related: { id: "crm", text: { en: "Mostly about sales and clients?", lv: "Galvenokārt par pārdošanu un klientiem?" } },
    faq: [
      { q: { en: "Who owns the code?", lv: "Kam pieder kods?" }, a: { en: "You do. The code and data stay with you.", lv: "Jums. Kods un dati paliek pie jums." } },
      { q: { en: "Can we start small?", lv: "Vai var sākt ar mazu?" }, a: { en: "Yes. We start with one main process and add the rest step by step.", lv: "Jā. Sākam ar vienu galveno procesu un pārējo pievienojam pa solim." } },
      { q: { en: "Where is the data stored?", lv: "Kur glabājas dati?" }, a: { en: "On servers in the EU.", lv: "Serveros ES." } },
    ],
  },
  {
    id: "crm",
    package: "platform",
    title: { en: "CRM", lv: "CRM" },
    lead: {
      en: "A CRM made for how you sell: every client, request and deal in one place, with reminders so nothing is forgotten.",
      lv: "CRM, kas veidota tam, kā jūs pārdodat: katrs klients, pieprasījums un darījums vienuviet, ar atgādinājumiem, lai nekas netiktu aizmirsts.",
    },
    image: { src: "/cases/shadowy/dashboard-wide.png", alt: { en: "Dashboard example", lv: "Paneļa piemērs" }, aspect: "1916 / 821" },
    stats: [
      { label: { en: "Price", lv: "Cena" }, value: onRequest },
      { label: { en: "Time", lv: "Termiņš" }, value: price("4–8 weeks", "4–8 nedēļas") },
      firstCall,
      estimate,
    ],
    fit: [
      { quote: { en: "“Requests come from everywhere”", lv: "“Pieprasījumi nāk no visurienes”" }, text: { en: "Site, email and messengers land in one list.", lv: "Vietne, e-pasts un čati nonāk vienā sarakstā." } },
      { quote: { en: "“We forget to call back”", lv: "“Aizmirstam atzvanīt”" }, text: { en: "Reminders and tasks for every deal.", lv: "Atgādinājumi un uzdevumi katram darījumam." } },
      { quote: { en: "“Standard CRMs are too complex”", lv: "“Standarta CRM ir pārāk sarežģītas”" }, text: { en: "Only the fields and steps you actually use.", lv: "Tikai tie lauki un soļi, ko jūs tiešām izmantojat." } },
      { quote: { en: "“We don’t know where sales get stuck”", lv: "“Nezinām, kur iestrēgst pārdošana”" }, text: { en: "Simple reports by stage and by manager.", lv: "Vienkārši pārskati pa posmiem un vadītājiem." } },
    ],
    objection: { quote: { en: "“We remember our clients anyway”", lv: "“Klientus atceramies tāpat”" }, text: { en: "While there are few of them. A CRM remembers everyone — even when the manager is on holiday or leaves the company.", lv: "Kamēr to ir maz. CRM atceras visus — arī tad, kad vadītājs ir atvaļinājumā vai aiziet no uzņēmuma." } },
    includes: [
      { title: { en: "Clients", lv: "Klienti" }, text: { en: "Contacts, history and documents in one card.", lv: "Kontakti, vēsture un dokumenti vienā kartītē." } },
      { title: { en: "Deal stages", lv: "Darījumu posmi" }, text: { en: "Your sales steps, not someone else’s.", lv: "Jūsu pārdošanas soļi, nevis kāda cita." } },
      { title: { en: "Requests", lv: "Pieprasījumi" }, text: { en: "From site, email and messengers automatically.", lv: "No vietnes, e-pasta un čatiem automātiski." } },
      { title: { en: "Reminders", lv: "Atgādinājumi" }, text: { en: "Tasks and notifications for the team.", lv: "Uzdevumi un paziņojumi komandai." } },
      { title: { en: "Reports", lv: "Pārskati" }, text: { en: "Sales by stage, manager and period.", lv: "Pārdošana pa posmiem, vadītājiem un periodiem." } },
      { title: { en: "Import", lv: "Imports" }, text: { en: "We move your existing contacts from Excel.", lv: "Pārnesam esošos kontaktus no Excel." } },
    ],
    cases: [],
    steps: [
      { title: { en: "Call and sales review", lv: "Zvans un pārdošanas apskate" }, time: price("1 week", "1 nedēļa") },
      { title: { en: "Fields, stages, screens", lv: "Lauki, posmi, ekrāni" }, time: price("1 week", "1 nedēļa") },
      { title: { en: "Development and import", lv: "Izstrāde un imports" }, time: price("2–5 weeks", "2–5 nedēļas") },
      { title: { en: "Launch and onboarding", lv: "Palaišana un apmācība" }, time: price("1 week", "1 nedēļa") },
    ],
    prices: [
      { name: { en: "CRM for a small team", lv: "CRM nelielai komandai" }, price: onRequest },
      { name: { en: "CRM with request intake and reports", lv: "CRM ar pieprasījumu savākšanu un pārskatiem" }, price: onRequest },
    ],
    priceNote: { en: "The price depends on the number of users, stages and integrations. Excl. VAT.", lv: "Cena atkarīga no lietotāju, posmu un integrāciju skaita. Bez PVN." },
    related: { id: "agents", text: { en: "Want AI to answer clients first?", lv: "Vēlaties, lai AI pirmais atbild klientiem?" } },
    faq: [
      { q: { en: "Why not a ready-made CRM?", lv: "Kāpēc ne gatava CRM?" }, a: { en: "If a ready one fits — great. We build when your process doesn’t fit or monthly fees get too high.", lv: "Ja gatava der — lieliski. Mēs būvējam, ja jūsu process neiederas vai mēneša maksas kļūst pārāk lielas." } },
      { q: { en: "Can you move our data?", lv: "Vai varat pārnest mūsu datus?" }, a: { en: "Yes, from Excel or another system.", lv: "Jā, no Excel vai citas sistēmas." } },
    ],
  },
  {
    id: "docs",
    package: "automation",
    title: { en: "Document automation", lv: "Dokumentu automatizācija" },
    lead: {
      en: "Invoices, contracts and reports are read, filled in, checked and sent automatically — your team stops copying data by hand.",
      lv: "Rēķini, līgumi un pārskati tiek nolasīti, aizpildīti, pārbaudīti un nosūtīti automātiski — komanda vairs nekopē datus ar rokām.",
    },
    image: { src: "/images/home/automation-docs.jpg", alt: { en: "Working with documents", lv: "Darbs ar dokumentiem" }, aspect: "3 / 2" },
    stats: [
      { label: { en: "Price", lv: "Cena" }, value: price("from €500", "no €500") },
      { label: { en: "Time", lv: "Termiņš" }, value: price("1–3 weeks", "1–3 nedēļas") },
      firstCall,
      estimate,
    ],
    fit: [
      { quote: { en: "“We retype invoices into the system”", lv: "“Pārrakstām rēķinus sistēmā”" }, text: { en: "Data is read from PDFs and scans automatically.", lv: "Dati tiek nolasīti no PDF un skeniem automātiski." } },
      { quote: { en: "“Contracts are made by hand every time”", lv: "“Līgumus katru reizi taisām ar rokām”" }, text: { en: "Templates fill themselves from your data.", lv: "Veidnes aizpildās pašas no jūsu datiem." } },
      { quote: { en: "“Reports take a whole day”", lv: "“Pārskati aizņem visu dienu”" }, text: { en: "Reports are built and sent on schedule.", lv: "Pārskati tiek sagatavoti un nosūtīti pēc grafika." } },
      { quote: { en: "“Mistakes appear when copying”", lv: "“Kopējot rodas kļūdas”" }, text: { en: "Checks catch errors and notify a person.", lv: "Pārbaudes atrod kļūdas un paziņo cilvēkam." } },
    ],
    objection: { quote: { en: "“It only takes a couple of hours a week”", lv: "“Tas aizņem tikai pāris stundas nedēļā”" }, text: { en: "A couple of hours a week is about 100 hours a year — plus the mistakes. Automating one process usually pays off quickly.", lv: "Pāris stundas nedēļā ir ap 100 stundu gadā — plus kļūdas. Viena procesa automatizācija parasti atmaksājas ātri." } },
    includes: [
      { title: { en: "Process review", lv: "Procesa apskate" }, text: { en: "We find which documents take the most time.", lv: "Atrodam, kuri dokumenti aizņem visvairāk laika." } },
      { title: { en: "Reading", lv: "Nolasīšana" }, text: { en: "PDFs, scans and emails turned into data.", lv: "PDF, skeni un e-pasti pārvērsti datos." } },
      { title: { en: "Templates", lv: "Veidnes" }, text: { en: "Contracts and documents filled automatically.", lv: "Līgumi un dokumenti aizpildās automātiski." } },
      { title: { en: "Checks", lv: "Pārbaudes" }, text: { en: "Rules that catch mistakes before they spread.", lv: "Noteikumi, kas atrod kļūdas, pirms tās izplatās." } },
      { title: { en: "Sending", lv: "Nosūtīšana" }, text: { en: "To email, your system or a shared folder.", lv: "Uz e-pastu, jūsu sistēmu vai kopīgu mapi." } },
      { title: { en: "Notifications", lv: "Paziņojumi" }, text: { en: "A person is told when something needs attention.", lv: "Cilvēks saņem ziņu, kad kaut kam vajag uzmanību." } },
    ],
    cases: [],
    steps: [
      { title: { en: "Call and estimate", lv: "Zvans un tāme" }, time: price("1–2 days", "1–2 dienas") },
      { title: { en: "Process and examples", lv: "Process un piemēri" }, time: price("2–3 days", "2–3 dienas") },
      { title: { en: "Building the automation", lv: "Automatizācijas izveide" }, time: price("1–2 weeks", "1–2 nedēļas") },
      { title: { en: "Testing on real documents", lv: "Testi ar reāliem dokumentiem" }, time: price("2–3 days", "2–3 dienas") },
    ],
    prices: [
      { name: { en: "One document process", lv: "Viens dokumentu process" }, price: price("from €500", "no €500") },
      { name: { en: "Several processes and integrations", lv: "Vairāki procesi un integrācijas" }, price: onRequest },
    ],
    priceNote: { en: "The price depends on the type of documents and the systems they go to. Excl. VAT.", lv: "Cena atkarīga no dokumentu veida un sistēmām, uz kurām tie nonāk. Bez PVN." },
    related: { id: "agents", text: { en: "Need AI to make decisions on the content?", lv: "Vajag, lai AI saprot saturu?" } },
    faq: [
      { q: { en: "Will it work with our accounting software?", lv: "Vai tas strādās ar mūsu grāmatvedības programmu?" }, a: { en: "Usually yes — through import files, email or an API. We check this on the first call.", lv: "Parasti jā — caur importa failiem, e-pastu vai API. To pārbaudām pirmajā zvanā." } },
      { q: { en: "What if a document is unusual?", lv: "Ko, ja dokuments ir neparasts?" }, a: { en: "It goes to a person for review instead of being processed blindly.", lv: "Tas nonāk pie cilvēka pārbaudei, nevis tiek apstrādāts akli." } },
    ],
  },
  {
    id: "agents",
    package: "automation",
    title: { en: "AI agents", lv: "AI aģenti" },
    lead: {
      en: "AI assistants that answer clients, prepare entries and do routine tasks — and a person always checks the result.",
      lv: "AI palīgi, kas atbild klientiem, sagatavo ierakstus un dara rutīnas darbus — un rezultātu vienmēr pārbauda cilvēks.",
    },
    image: { src: "/cases/shadowy/employee-view.webp", alt: { en: "AI-assisted entry in Shadowy", lv: "AI atbalstīta ievade Shadowy" }, aspect: "1600 / 900" },
    stats: [
      { label: { en: "Price", lv: "Cena" }, value: price("from €500", "no €500") },
      { label: { en: "Time", lv: "Termiņš" }, value: price("1–3 weeks", "1–3 nedēļas") },
      firstCall,
      estimate,
    ],
    fit: [
      { quote: { en: "“We answer the same questions all day”", lv: "“Visu dienu atbildam uz vieniem jautājumiem”" }, text: { en: "The agent answers from your information and passes hard cases to a person.", lv: "Aģents atbild no jūsu informācijas un sarežģītos gadījumus nodod cilvēkam." } },
      { quote: { en: "“Entering work data takes too long”", lv: "“Datu ievade aizņem pārāk ilgi”" }, text: { en: "Say or type it — AI prepares a structured entry, as in Shadowy.", lv: "Pasakiet vai uzrakstiet — AI sagatavo strukturētu ierakstu, kā Shadowy." } },
      { quote: { en: "“We’re afraid AI will make mistakes”", lv: "“Baidāmies, ka AI kļūdīsies”" }, text: { en: "Nothing important happens without human approval.", lv: "Nekas svarīgs nenotiek bez cilvēka apstiprinājuma." } },
      { quote: { en: "“We don’t know where AI is useful”", lv: "“Nezinām, kur AI noder”" }, text: { en: "We look at your process and suggest 1–2 places where it really saves time.", lv: "Apskatām jūsu procesu un iesakām 1–2 vietas, kur tas tiešām ietaupa laiku." } },
    ],
    objection: { quote: { en: "“We don’t need AI”", lv: "“AI mums nav vajadzīgs”" }, text: { en: "Maybe you really don’t. On the first call we’ll honestly say whether it will save you time — or not.", lv: "Varbūt tiešām nē. Pirmajā zvanā godīgi pateiksim, vai tas jums ietaupīs laiku — vai nē." } },
    includes: [
      { title: { en: "Finding the task", lv: "Uzdevuma atrašana" }, text: { en: "Where AI saves time and where it doesn’t.", lv: "Kur AI ietaupa laiku un kur ne." } },
      { title: { en: "Your knowledge", lv: "Jūsu zināšanas" }, text: { en: "The agent works from your documents and rules.", lv: "Aģents strādā ar jūsu dokumentiem un noteikumiem." } },
      { title: { en: "Where it works", lv: "Kur tas strādā" }, text: { en: "Chat on the site, email, Telegram or inside your system.", lv: "Čats vietnē, e-pasts, Telegram vai jūsu sistēmā." } },
      { title: { en: "Human approval", lv: "Cilvēka apstiprinājums" }, text: { en: "A person confirms before anything is saved or sent.", lv: "Cilvēks apstiprina, pirms kaut kas tiek saglabāts vai nosūtīts." } },
      { title: { en: "Logs", lv: "Žurnāls" }, text: { en: "Every action is recorded and can be checked.", lv: "Katra darbība tiek ierakstīta un ir pārbaudāma." } },
      { title: { en: "Improvements", lv: "Uzlabojumi" }, text: { en: "We tune answers based on real conversations.", lv: "Pielāgojam atbildes pēc reālām sarunām." } },
    ],
    cases: ["shadowy"],
    steps: [
      { title: { en: "Call and task choice", lv: "Zvans un uzdevuma izvēle" }, time: price("1–2 days", "1–2 dienas") },
      { title: { en: "Knowledge and rules", lv: "Zināšanas un noteikumi" }, time: price("2–4 days", "2–4 dienas") },
      { title: { en: "Building the agent", lv: "Aģenta izveide" }, time: price("1–2 weeks", "1–2 nedēļas") },
      { title: { en: "Test with your team", lv: "Tests ar jūsu komandu" }, time: price("2–3 days", "2–3 dienas") },
    ],
    prices: [
      { name: { en: "AI agent for one task", lv: "AI aģents vienam uzdevumam" }, price: price("from €500", "no €500") },
      { name: { en: "Agent inside your system with approvals", lv: "Aģents jūsu sistēmā ar apstiprināšanu" }, price: onRequest },
    ],
    priceNote: { en: "AI service usage (tokens) is paid separately at cost. Excl. VAT.", lv: "AI servisa lietošana (tokeni) tiek apmaksāta atsevišķi pēc pašizmaksas. Bez PVN." },
    related: { id: "docs", text: { en: "Mostly about documents?", lv: "Galvenokārt par dokumentiem?" } },
    faq: [
      { q: { en: "Is our data safe?", lv: "Vai mūsu dati ir drošībā?" }, a: { en: "The agent sees only what it needs for the task, and every action is logged.", lv: "Aģents redz tikai to, kas vajadzīgs uzdevumam, un katra darbība tiek ierakstīta." } },
      { q: { en: "What if the AI doesn’t know the answer?", lv: "Ko, ja AI nezina atbildi?" }, a: { en: "It says so and passes the question to a person.", lv: "Tas to pasaka un nodod jautājumu cilvēkam." } },
    ],
  },
  {
    id: "telegram",
    package: "telegram",
    title: { en: "Telegram Mini Apps", lv: "Telegram Mini Apps" },
    lead: {
      en: "Orders, bookings or a client account right inside Telegram — clients don’t need to install anything.",
      lv: "Pasūtījumi, rezervācijas vai klienta konts tieši Telegram — klientiem nekas nav jāinstalē.",
    },
    image: { src: "/images/home/office.jpg", alt: { en: "Team at work", lv: "Komanda darbā" }, aspect: "3 / 2" },
    stats: [
      { label: { en: "Price", lv: "Cena" }, value: onRequest },
      { label: { en: "Time", lv: "Termiņš" }, value: price("3–5 weeks", "3–5 nedēļas") },
      firstCall,
      estimate,
    ],
    fit: [
      { quote: { en: "“Our clients are already in Telegram”", lv: "“Mūsu klienti jau ir Telegram”" }, text: { en: "Meet them where they are — no app store, no install.", lv: "Satieciet viņus tur, kur viņi ir — bez lietotņu veikala un instalēšanas." } },
      { quote: { en: "“Bookings are done by phone”", lv: "“Rezervācijas notiek pa telefonu”" }, text: { en: "Clients pick a time themselves; you get a notification.", lv: "Klienti paši izvēlas laiku; jūs saņemat paziņojumu." } },
      { quote: { en: "“A mobile app is too expensive”", lv: "“Mobilā lietotne ir par dārgu”" }, text: { en: "A Mini App gives app-like screens for much less.", lv: "Mini App dod lietotnei līdzīgus ekrānus par daudz mazāku cenu." } },
      { quote: { en: "“We need to test an idea quickly”", lv: "“Ātri jāpārbauda ideja”" }, text: { en: "Launch in weeks and see if people use it.", lv: "Palaižam dažās nedēļās un redzam, vai cilvēki to lieto." } },
    ],
    objection: { quote: { en: "“Clients can just call us”", lv: "“Klienti var vienkārši piezvanīt”" }, text: { en: "They can, but many don’t want to. Lots of people prefer to order or book themselves — at any time of day.", lv: "Var, bet daudzi negrib zvanīt. Daudzi labprātāk pasūta vai pierakstās paši — jebkurā diennakts laikā." } },
    includes: [
      { title: { en: "Scenario", lv: "Scenārijs" }, text: { en: "One main thing the app does well.", lv: "Viena galvenā lieta, ko lietotne dara labi." } },
      { title: { en: "Mobile design", lv: "Mobilais dizains" }, text: { en: "Screens made for a phone and Telegram.", lv: "Ekrāni telefonam un Telegram." } },
      { title: { en: "Catalogue or booking", lv: "Katalogs vai rezervācijas" }, text: { en: "Products, services or time slots.", lv: "Preces, pakalpojumi vai laiki." } },
      { title: { en: "Admin panel", lv: "Administrācijas panelis" }, text: { en: "You manage content and orders yourself.", lv: "Saturu un pasūtījumus pārvaldāt paši." } },
      { title: { en: "Payments", lv: "Maksājumi" }, text: { en: "Online payments if you need them.", lv: "Tiešsaistes maksājumi, ja vajag." } },
      { title: { en: "Notifications", lv: "Paziņojumi" }, text: { en: "Messages to clients and your team.", lv: "Ziņas klientiem un jūsu komandai." } },
    ],
    cases: [],
    steps: [
      { title: { en: "Call and scenario", lv: "Zvans un scenārijs" }, time: price("2–3 days", "2–3 dienas") },
      { title: { en: "Screens and prototype", lv: "Ekrāni un prototips" }, time: price("1 week", "1 nedēļa") },
      { title: { en: "Development", lv: "Izstrāde" }, time: price("2–3 weeks", "2–3 nedēļas") },
      { title: { en: "Launch in Telegram", lv: "Palaišana Telegram" }, time: price("2–3 days", "2–3 dienas") },
    ],
    prices: [
      { name: { en: "Mini App with catalogue or booking", lv: "Mini App ar katalogu vai rezervācijām" }, price: onRequest },
      { name: { en: "Mini App with payments and client account", lv: "Mini App ar maksājumiem un klienta kontu" }, price: onRequest },
    ],
    priceNote: { en: "The price depends on the number of screens, payments and connections. Excl. VAT.", lv: "Cena atkarīga no ekrānu skaita, maksājumiem un savienojumiem. Bez PVN." },
    related: { id: "website", text: { en: "Need a regular website instead?", lv: "Vajag parastu mājaslapu?" } },
    faq: [
      { q: { en: "Do clients need to install anything?", lv: "Vai klientiem kaut kas jāinstalē?" }, a: { en: "No. The app opens inside Telegram from a link or a button.", lv: "Nē. Lietotne atveras Telegram no saites vai pogas." } },
      { q: { en: "Can it accept payments?", lv: "Vai tā var pieņemt maksājumus?" }, a: { en: "Yes, through payment providers supported by Telegram.", lv: "Jā, caur Telegram atbalstītiem maksājumu pakalpojumiem." } },
    ],
  },
];

export function getService(id: string) {
  return services.find((s) => s.id === id);
}
