import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { ArrowRight } from "@/components/Icons";
import { formatDate, getPost, posts } from "@/content/blog";
import type { Block } from "@/content/blog/types";
import type { Locale } from "@/lib/i18n";
import { getDict, isLocale, locales, siteUrl, t } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => posts.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!isLocale(locale) || !post) return {};
  const title = t(post.title, locale);
  const description = t(post.excerpt, locale);
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/blog/${slug}`])),
    },
    openGraph: {
      type: "article",
      title,
      description,
      publishedTime: post.date,
      authors: ["Artemijs Lučins"],
      images: [post.cover.src],
    },
    twitter: { card: "summary_large_image", title, description, images: [post.cover.src] },
  };
}

function BlockView({ block, locale }: { block: Block; locale: Locale }) {
  switch (block.type) {
    case "p":
      return <p className="post__p">{t(block.text, locale)}</p>;
    case "h2":
      return <h2 className="post__h2">{t(block.text, locale)}</h2>;
    case "quote":
      return <blockquote className="post__quote">{t(block.text, locale)}</blockquote>;
    case "steps":
      return (
        <ol className="post__steps">
          {block.items.map((it, i) => (
            <li key={i}>
              <span className="post__num">{String(i + 1).padStart(2, "0")}</span>
              <span>{t(it, locale)}</span>
            </li>
          ))}
        </ol>
      );
    case "stats":
      return (
        <div className="post__stats">
          {block.items.map((s) => (
            <div key={s.value} className="post__stat">
              <span className="post__stat-v">{s.value}</span>
              <span className="post__stat-l">{t(s.label, locale)}</span>
            </div>
          ))}
        </div>
      );
    case "bars": {
      const max = Math.max(...block.items.map((r) => r.pct));
      return (
        <figure className="about__pilot post__bars">
          {block.items.map((r, i) => (
            <div key={i} className={`about__bar${i === block.items.length - 1 ? " about__bar--rest" : ""}`}>
              <div className="about__bar-head">
                <span>{t(r.label, locale)}</span>
                <span className="about__bar-num">
                  {r.pct}% · {r.value}
                </span>
              </div>
              <div className="about__bar-track">
                <span className="about__bar-fill" style={{ width: `${(r.pct / max) * 100}%` }} />
              </div>
            </div>
          ))}
          {block.note && <figcaption className="about__pilot-note">{t(block.note, locale)}</figcaption>}
        </figure>
      );
    }
  }
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!isLocale(locale) || !post) notFound();
  const d = getDict(locale);
  const url = `${siteUrl}/${locale}/blog/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: t(post.title, locale),
    description: t(post.excerpt, locale),
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: locale === "lv" ? "lv-LV" : "en",
    image: `${siteUrl}${post.cover.src}`,
    mainEntityOfPage: url,
    url,
    author: { "@type": "Person", name: "Artemijs Lučins", url: `${siteUrl}/${locale}/about` },
    publisher: { "@type": "Organization", name: "LUARTI", url: siteUrl, logo: { "@type": "ImageObject", url: `${siteUrl}/images/LUARTI_black.svg` } },
    ...(post.source ? { sameAs: post.source.url } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="section page-top">
        <div className="container post">
          <Link href={`/${locale}/blog`} className="post__back">
            ← {d.blog.back}
          </Link>
          <header className="post__head">
            <p className="bcard__meta">
              {t(post.tag, locale)} · <time dateTime={post.date}>{formatDate(post.date, locale)}</time> · {post.minutes} {d.blog.minutes}
            </p>
            <h1 className="h1 post__title">{t(post.title, locale)}</h1>
            <p className="lead">{t(post.excerpt, locale)}</p>
            <Link href={`/${locale}/about`} className="post__author">
              <span className="post__avatar">
                <Image src="/images/about/artemijs-forum.jpg" alt="Artemijs Lučins" fill sizes="44px" />
              </span>
              <span>
                <span className="post__author-name">Artemijs Lučins</span>
                <span className="post__author-role">{d.about.role}</span>
              </span>
            </Link>
          </header>

          <div className="post__cover" style={{ aspectRatio: post.cover.aspect }}>
            <Image src={post.cover.src} alt={t(post.cover.alt, locale)} fill priority sizes="(max-width: 900px) 100vw, 880px" />
          </div>

          <div className="post__body">
            {post.body.map((b, i) => (
              <BlockView key={i} block={b} locale={locale} />
            ))}
            {post.source && (
              <p className="post__source">
                {d.blog.source}{" "}
                <a href={post.source.url} target="_blank" rel="noopener noreferrer">
                  {post.source.label} <ArrowRight className="btn__icon" />
                </a>
              </p>
            )}
          </div>
        </div>
      </article>
      <CtaBand title={d.blog.ctaTitle} button={d.cta.button} href={`/${locale}/contact`} />
    </>
  );
}
