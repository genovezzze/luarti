# LUARTI — agency website

Next.js 16 (App Router) · TypeScript · plain CSS · EN / LV.

```bash
npm install
npm run dev      # http://localhost:3000 → redirects to /en
npm run build && npm start
```

## Structure

```
app/[locale]/page.tsx              Home
app/[locale]/work/page.tsx         All cases
app/[locale]/work/[slug]/page.tsx  Case study template
app/[locale]/contact/page.tsx      "Start a project" form
app/api/contact/route.ts           Form → email (Resend)
lib/dictionaries/en.ts, lv.ts      All UI texts (incl. pricing)
content/cases/*.ts                 Case studies (one file per case)
public/cases/<slug>/               Case images
public/images/home/                Home photos (Unsplash)
```

## Add a new case

1. Copy `content/cases/shadowy.ts` → `content/cases/<slug>.ts`, change the content (EN + LV).
2. Put images in `public/cases/<slug>/`.
3. Register it in `content/cases/index.ts` (array order = display order).

Optional blocks (`highlight`, `flow`, `gallery`, `results`, `scope`) are rendered only when filled.

## Pricing

Demo packages live in `lib/dictionaries/*.ts` → `pricing`. The "Demo pricing" badge text is `pricing.demo`.

## Contact form

Copy `.env.example` → `.env.local` and set:

- `RESEND_API_KEY` — key from https://resend.com
- `CONTACT_TO_EMAIL` — where requests go (comma-separated for several)
- `CONTACT_FROM_EMAIL` — verified sender domain in Resend

Without these the API answers `503` and the form shows an error, so no request is silently lost.

## Photos

Home photos are from Unsplash (free licence):
`hero-team` 1573164713988-8665fc963095, `process-screen` 1531482615713-2afd69097998,
`automation-docs` 1450101499163-c8848c66ca85 (+ spare `warehouse`, `office`).
