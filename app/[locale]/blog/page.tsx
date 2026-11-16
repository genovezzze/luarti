import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { ArrowRight } from "@/components/Icons";
import { formatDate, posts } from "@/content/blog";
import { getDict, isLocale, locales, t } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDict(locale);
  return {
    title: d.blog.eyebrow,
    description: d.blog.text,
    alternates: {
      canonical: `/${locale}/blog`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/blog`])),
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);

  return (
    <>
      <section className="section page-top">
        <div className="container">
          <div className="section-head section-head--left" data-reveal>
            <p className="eyebrow">{d.blog.eyebrow}</p>
            <h1 className="h1">{d.blog.title}</h1>
            <p className="lead">{d.blog.text}</p>
          </div>
          <div className="blist">
            {posts.map((p) => (
              <Link key={p.slug} href={`/${locale}/blog/${p.slug}`} className="bcard" data-reveal>
                <div className="bcard__img">
                  <Image src={p.cover.src} alt={t(p.cover.alt, locale)} fill sizes="(max-width: 720px) 100vw, 560px" />
                </div>
                <div className="bcard__body">
                  <p className="bcard__meta">
                    {t(p.tag, locale)} · <time dateTime={p.date}>{formatDate(p.date, locale)}</time> · {p.minutes} {d.blog.minutes}
                  </p>
                  <h2 className="bcard__title">{t(p.title, locale)}</h2>
                  <p className="bcard__text">{t(p.excerpt, locale)}</p>
                  <span className="bcard__more">
                    {d.blog.read} <ArrowRight className="btn__icon" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title={d.cta.title} button={d.cta.button} href={`/${locale}/contact`} />
    </>
  );
}
