import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { ArrowRight } from "@/components/Icons";
import { WorkCard } from "@/components/WorkCard";
import { getCase } from "@/content/cases";
import { getService, services } from "@/content/services";
import { getDict, isLocale, locales, t } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string; id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => services.map((s) => ({ locale, id: s.id })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const s = getService(id);
  if (!s || !isLocale(locale)) return {};
  return { title: t(s.title, locale), description: t(s.lead, locale), alternates: { canonical: `/${locale}/services/${id}` } };
}

export default async function ServicePage({ params }: Props) {
  const { locale, id } = await params;
  if (!isLocale(locale)) notFound();
  const s = getService(id);
  if (!s) notFound();
  const d = getDict(locale);
  const L = d.services;
  const relatedCases = s.cases.map(getCase).filter(Boolean);
  const related = s.related ? getService(s.related.id) : undefined;
  const contact = `/${locale}/contact?package=${s.package}`;

  return (
    <>
      {/* HERO */}
      <section className="section page-top shero">
        <div className="container shero__grid">
          <div className="shero__text">
            <Link href={`/${locale}/services`} className="shero__back">← {L.all}</Link>
            <h1 className="h1">{t(s.title, locale)}</h1>
            <p className="lead-sm">{t(s.lead, locale)}</p>
            <dl className="shero__stats">
              {s.stats.map((st) => (
                <div key={st.label.en}>
                  <dt>{t(st.label, locale)}</dt>
                  <dd>{t(st.value, locale)}</dd>
                </div>
              ))}
            </dl>
            <Link href={contact} className="btn btn--dark">
              {L.cta} <ArrowRight className="btn__icon" />
            </Link>
          </div>
          <div className="shero__img" style={{ aspectRatio: s.image.aspect }} data-reveal>
            <Image src={s.image.src} alt={t(s.image.alt, locale)} fill priority sizes="(max-width: 900px) 100vw, 640px" />
          </div>
        </div>
      </section>

      {/* WHO IT IS FOR */}
      <section className="section section--tight">
        <div className="container">
          <h2 className="h2 sblock__title">{L.fitTitle}</h2>
          <div className="sfit">
            {s.fit.map((f) => (
              <div key={f.quote.en} className="sfit__item" data-reveal>
                <p className="sfit__quote">{t(f.quote, locale)}</p>
                <p className="sfit__text">{t(f.text, locale)}</p>
              </div>
            ))}
          </div>
          <div className="sobj" data-reveal>
            <p className="sobj__quote">{t(s.objection.quote, locale)}</p>
            <p className="sobj__text">{t(s.objection.text, locale)}</p>
          </div>
        </div>
      </section>

      {/* WHAT IS INCLUDED */}
      <section className="section section--tight">
        <div className="container">
          <h2 className="h2 sblock__title">{L.includesTitle}</h2>
          <div className="sinc">
            {s.includes.map((inc) => (
              <div key={inc.title.en} className="sinc__item" data-reveal>
                <h3 className="sinc__title">{t(inc.title, locale)}</h3>
                <p className="sinc__text">{t(inc.text, locale)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASES */}
      {relatedCases.length > 0 && (
        <section className="section section--tight">
          <div className="container">
            <h2 className="h2 sblock__title">{L.casesTitle}</h2>
            <div className="wgrid">
              {relatedCases.map((c) => (
                <WorkCard key={c!.slug} item={c!} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* STEPS */}
      <section className="section section--tight">
        <div className="container">
          <h2 className="h2 sblock__title">{L.stepsTitle}</h2>
          <ol className="ssteps">
            {s.steps.map((st, i) => (
              <li key={st.title.en} data-reveal>
                <span className="ssteps__num">{String(i + 1).padStart(2, "0")}</span>
                <p className="ssteps__title">{t(st.title, locale)}</p>
                <p className="ssteps__time">{t(st.time, locale)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PRICES */}
      <section className="section section--tight">
        <div className="container sprice">
          <h2 className="h2 sblock__title">{L.pricesTitle}</h2>
          <div className="sprice__list">
            {s.prices.map((p) => (
              <div key={p.name.en} className="sprice__row">
                <span>{t(p.name, locale)}</span>
                <span className="sprice__val">{t(p.price, locale)}</span>
              </div>
            ))}
            <p className="sprice__note">{t(s.priceNote, locale)}</p>
          </div>
          {related && s.related && (
            <Link href={`/${locale}/services/${related.id}`} className="srelated">
              <span>{t(s.related.text, locale)}</span>
              <span className="srelated__name">
                {t(related.title, locale)} <ArrowRight className="srelated__arrow" />
              </span>
            </Link>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--tight">
        <div className="container">
          <div className="sfaq">
            <div className="sfaq__head">
              <h2 className="h2">{L.faqTitle}</h2>
              <p className="lead-sm">{L.faqText}</p>
            </div>
            <div className="sfaq__list">
              {s.faq.map((f, i) => (
                <details key={f.q.en} className="sfaq__item" open={i === 0}>
                  <summary>
                    <span className="sfaq__icon" aria-hidden="true" />
                    {t(f.q, locale)}
                  </summary>
                  <p>{t(f.a, locale)}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand title={d.cta.title} button={d.cta.button} href={contact} />
    </>
  );
}
