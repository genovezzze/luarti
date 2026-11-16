import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogIndex, type BlogItem } from "@/components/BlogIndex";
import { posts, readingMinutes } from "@/content/blog";
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

  const items: BlogItem[] = posts.map((p) => ({
    slug: p.slug,
    href: `/${locale}/blog/${p.slug}`,
    title: t(p.title, locale),
    excerpt: t(p.excerpt, locale),
    category: p.category,
    minutes: readingMinutes(p, locale),
    featured: !!p.featured,
    cover: { src: p.cover.src, alt: t(p.cover.alt, locale) },
  }));

  return (
    <>
      <section className="page-top bx-hero">
        <div className="container">
          <p className="eyebrow">{d.blog.eyebrow}</p>
          <div className="bx-hero__row">
            <h1 className="h1 bx-hero__title">
              {d.blog.title[0]}
              <br />
              {d.blog.title[1]}
            </h1>
            <p className="bx-hero__text">{d.blog.text}</p>
          </div>
        </div>
      </section>

      <BlogIndex items={items} dict={d.blog} />

      <section className="bx-cta">
        <div className="container bx-cta__in">
          <p className="bx-cta__title">{d.blog.ctaTitle}</p>
          <Link href={`/${locale}/contact`} className="btn btn--dark">
            {d.blog.ctaButton}
          </Link>
        </div>
      </section>
    </>
  );
}
