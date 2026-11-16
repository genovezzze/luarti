import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseTabs } from "@/components/CaseTabs";
import { CtaBand } from "@/components/CtaBand";
import { ArrowRight, ArrowUpRight, Tick } from "@/components/Icons";
import { WorkCard } from "@/components/WorkCard";
import { cases, getCase, getScreens } from "@/content/cases";
import { getDict, isLocale, locales, t } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => cases.map((c) => ({ locale, slug: c.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const c = getCase(slug);
  if (!c || !isLocale(locale)) return {};
  return {
    title: `${c.client} - ${t(c.hero.title, locale)}`,
    description: t(c.card.text, locale),
    alternates: { canonical: `/${locale}/work/${slug}` },
    openGraph: { images: [c.hero.image.src] },
  };
}

export default async function CasePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const c = getCase(slug);
  if (!c) notFound();
  const d = getDict(locale);
  const screens = getScreens(c);
  const others = cases.filter((x) => x.slug !== c.slug);

  const screensPanel = (
    <div className="cscreens">
      {screens.map((img) => {
        const [w, h] = img.aspect.split("/").map((n) => parseFloat(n));
        const portrait = h > w;
        return (
          <figure key={img.src} className={`cscreen ${portrait ? "cscreen--portrait" : ""}`}>
            <div className="cscreen__frame">
              <Image src={img.src} alt={t(img.alt, locale)} fill sizes="(max-width: 900px) 100vw, 640px" />
            </div>
          </figure>
        );
      })}
    </div>
  );

  const solvedPanel = (
    <div className="csolved">
      <div className="csolved__row">
        <h2 className="csolved__h">{d.case.problem}</h2>
        <p className="csolved__p">{t(c.problem, locale)}</p>
      </div>
      <div className="csolved__row">
        <h2 className="csolved__h">{d.case.solution}</h2>
        <p className="csolved__p">{t(c.solution, locale)}</p>
      </div>
      {c.highlight && (
        <div className="csolved__row">
          <h2 className="csolved__h">{t(c.highlight.title, locale)}</h2>
          <p className="csolved__p">{t(c.highlight.text, locale)}</p>
        </div>
      )}
      {c.flow && (
        <div className="csolved__row">
          <h2 className="csolved__h">{t(c.flow.title, locale)}</h2>
          <ol className="csolved__flow">
            {c.flow.steps.map((s, i) => (
              <li key={s.en}><span>{i + 1}</span>{t(s, locale)}</li>
            ))}
          </ol>
        </div>
      )}
      {c.results && (
        <div className="csolved__row">
          <h2 className="csolved__h">{d.case.results}</h2>
          <div className="csolved__stats">
            {c.results.map((r, i) => (
              <div key={r.value + i}>
                <span className="csolved__value">{r.value}</span>
                <span className="csolved__label">{t(r.label, locale)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {c.scope && (
        <div className="csolved__row">
          <h2 className="csolved__h">{d.case.stack}</h2>
          <ul className="csolved__scope">
            {c.scope.map((s) => (
              <li key={s.en}><Tick className="csolved__tick" />{t(s, locale)}</li>
            ))}
          </ul>
        </div>
      )}
      {c.stack && (
        <div className="csolved__row">
          <h2 className="csolved__h">{d.case.tech}</h2>
          <ul className="csolved__stack">
            {c.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <>
      <section className="section page-top chead">
        <div className="container">
          {c.logo && (
            <div className="chead__logo">
              <img src={c.logo} alt={c.client} />
            </div>
          )}
          <h1 className="chead__title">
            {c.client} :<br />
            <span>{t(c.hero.title, locale)}</span>
          </h1>

          <div className="chead__row">
            <Link href={`/${locale}/contact`} className="chead__idea">
              <span className="chead__idea-tag">{d.case.ideaLabel}</span>
              {d.case.ideaText}
              <ArrowRight className="chead__idea-arrow" />
            </Link>
            <dl className="chead__meta">
              <div>
                <dt>{d.case.direction}</dt>
                <dd>{t(c.kind, locale)}</dd>
              </div>
              <div>
                <dt>{d.case.did}</dt>
                <dd>{c.hero.tags.map((tag) => t(tag, locale)).join(", ")}</dd>
              </div>
              <div>
                <dt>{d.case.year}</dt>
                <dd>{c.year}</dd>
              </div>
            </dl>
          </div>

          <div className="chead__actions">
            <Link href={`/${locale}/contact`} className="btn btn--dark">{d.case.start}</Link>
            {c.url && (
              <a href={c.url} target="_blank" rel="noopener noreferrer" className="btn btn--outline">
                {d.work.visit} <ArrowUpRight className="btn__icon" />
              </a>
            )}
          </div>

          <CaseTabs
            tabs={[
              {
                id: "screens",
                label: d.case.screensTab,
                content: screensPanel,
                count: d.case.shown.replace("{n}", String(screens.length)),
              },
              { id: "solved", label: d.case.solvedTab, content: solvedPanel },
            ]}
          />
        </div>
      </section>

      {others.length > 0 && (
        <section className="section section--tight">
          <div className="container">
            <h2 className="cother__title">{d.case.other}</h2>
            <div className="wgrid">
              {others.map((o) => (
                <WorkCard key={o.slug} item={o} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand title={d.case.ctaTitle} button={d.case.ctaButton} href={`/${locale}/contact`} align="left" />
    </>
  );
}
