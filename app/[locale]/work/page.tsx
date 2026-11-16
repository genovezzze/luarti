import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WorkCard } from "@/components/WorkCard";
import { CtaBand } from "@/components/CtaBand";
import { cases } from "@/content/cases";
import { getDict, isLocale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDict(locale);
  return { title: d.work.indexTitle, description: d.work.indexText, alternates: { canonical: `/${locale}/work` } };
}

export default async function WorkPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);

  return (
    <>
      <section className="section page-top">
        <div className="container">
          <div className="section-head section-head--left" data-reveal>
            <p className="eyebrow">{d.work.eyebrow}</p>
            <h1 className="h1">{d.work.indexTitle}</h1>
            <p className="lead">{d.work.indexText}</p>
          </div>
          <div className="wgrid">
            {cases.map((c) => (
              <WorkCard key={c.slug} item={c} locale={locale} />
            ))}
            <Link href={`/${locale}/contact`} className="wcard wcard--slot" data-reveal>
              <span className="wcard__plus" aria-hidden="true">+</span>
              <div className="wcard__body">
                <div>
                  <p className="wcard__name">{d.work.comingSoon}</p>
                  <p className="wcard__text">{d.work.comingSoonText}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      <CtaBand title={d.cta.title} button={d.cta.button} href={`/${locale}/contact`} />
    </>
  );
}
