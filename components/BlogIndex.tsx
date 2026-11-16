"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Category } from "@/content/blog/types";
import type { Dict } from "@/lib/i18n";

export type BlogItem = {
  slug: string;
  href: string;
  title: string;
  excerpt: string;
  category: Category;
  minutes: number;
  featured: boolean;
  cover: { src: string; alt: string };
};

type Props = { items: BlogItem[]; dict: Dict["blog"] };

/*
 * Note: this part re-renders on filter changes, so it avoids the classes that
 * Motion hides until animated (.h1/.h2/.eyebrow/.btn/[data-reveal]).
 */

const UpRight = () => (
  <svg className="bx-ico" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Meta({ item, dict, featured }: { item: BlogItem; dict: Props["dict"]; featured?: boolean }) {
  return (
    <p className="bx-meta">
      {featured && <>{dict.featured} / </>}
      {dict.categories[item.category]}
      {!featured && <> / {item.minutes} min</>}
    </p>
  );
}

export function BlogIndex({ items, dict }: Props) {
  const [cat, setCat] = useState<"all" | Category>("all");
  const [q, setQ] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filtering = cat !== "all" || q.trim() !== "";
  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return items.filter(
      (i) => (cat === "all" || i.category === cat) && (!needle || `${i.title} ${i.excerpt}`.toLowerCase().includes(needle)),
    );
  }, [items, cat, q]);

  const featured = items.find((i) => i.featured) ?? items[0];
  const rest = items.filter((i) => i !== featured);
  const [big, ...side] = rest;
  const worth = showAll ? items : items.slice(0, 2);
  const cats = ["all", "automation", "platforms", "ai", "process"] as const;

  return (
    <>
      <div className="container">
        <div className="bx-bar">
          <div className="bx-chips" role="tablist">
            {cats.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={cat === c}
                className={`bx-chip ${cat === c ? "is-active" : ""}`}
                onClick={() => setCat(c)}
              >
                {dict.categories[c]}
              </button>
            ))}
          </div>
          <label className="bx-search">
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
              <path d="m10.5 10.5 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={dict.search} aria-label={dict.search} />
          </label>
        </div>
      </div>

      {filtering ? (
        <section className="bx-results container">
          {results.length === 0 ? (
            <p className="bx-empty">{dict.empty}</p>
          ) : (
            <div className="bx-grid">
              {results.map((i) => (
                <Link key={i.slug} href={i.href} className="bx-card">
                  <div className="bx-img">
                    <Image src={i.cover.src} alt={i.cover.alt} fill sizes="(max-width: 720px) 100vw, 400px" />
                  </div>
                  <Meta item={i} dict={dict} />
                  <h3 className="bx-title">{i.title}</h3>
                  <p className="bx-text">{i.excerpt}</p>
                </Link>
              ))}
            </div>
          )}
        </section>
      ) : (
        <>
          {/* Featured */}
          <section className="bx-feat">
            <div className="container bx-feat__in">
              <Link href={featured.href} className="bx-feat__media" tabIndex={-1} aria-hidden="true">
                <span className="bx-frame bx-frame--1" />
                <span className="bx-frame bx-frame--2" />
                <span className="bx-feat__img">
                  <Image src={featured.cover.src} alt="" fill sizes="(max-width: 900px) 100vw, 640px" />
                </span>
              </Link>
              <div className="bx-feat__body">
                <Meta item={featured} dict={dict} featured />
                <h2 className="bx-feat__title">
                  <Link href={featured.href}>{featured.title}</Link>
                </h2>
                <p className="bx-feat__text">{featured.excerpt}</p>
                <p className="bx-feat__min">
                  {featured.minutes} {dict.minutes}
                </p>
                <Link href={featured.href} className="bx-btn">
                  {dict.readArticle} <UpRight />
                </Link>
              </div>
            </div>
          </section>

          {/* Latest */}
          {big && (
            <section className="container bx-latest">
              <p className="bx-count">01-{String(items.length).padStart(2, "0")}</p>
              <h2 className="bx-h2">{dict.latest}</h2>
              <div className="bx-latest__grid">
                <Link href={big.href} className="bx-big">
                  <div className="bx-img bx-img--big">
                    <Image src={big.cover.src} alt={big.cover.alt} fill sizes="(max-width: 900px) 100vw, 640px" />
                  </div>
                  <Meta item={big} dict={dict} />
                  <h3 className="bx-title bx-title--big">{big.title}</h3>
                  <p className="bx-text">{big.excerpt}</p>
                </Link>
                <div className="bx-side">
                  {side.map((i) => (
                    <Link key={i.slug} href={i.href} className="bx-small">
                      <div className="bx-img bx-img--small">
                        <Image src={i.cover.src} alt={i.cover.alt} fill sizes="(max-width: 900px) 100vw, 400px" />
                      </div>
                      <Meta item={i} dict={dict} />
                      <h3 className="bx-title">{i.title}</h3>
                      <p className="bx-text">{i.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* One thought */}
          <section className="bx-band">
            <svg className="bx-band__wave" viewBox="0 0 1440 200" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 150 C 300 90, 520 200, 820 140 S 1250 60, 1440 110" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
            <div className="container bx-band__in">
              <p className="bx-band__eyebrow">{dict.band.eyebrow}</p>
              <p className="bx-band__title">
                {dict.band.title[0]}
                <br />
                {dict.band.title[1]}
              </p>
              <div className="bx-band__steps">
                {dict.band.steps.map((s, i) => (
                  <span key={s} className="bx-band__step">
                    {i > 0 && <span className="bx-band__arrow" aria-hidden="true" />}
                    <span className="bx-band__pill">{s}</span>
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Worth reading */}
          <section className="container bx-worth">
            <h2 className="bx-h2">{dict.worth}</h2>
            <ol className="bx-list">
              {worth.map((i, n) => (
                <li key={i.slug}>
                  <Link href={i.href} className="bx-row">
                    <span className="bx-row__n">{String(n + 1).padStart(2, "0")}</span>
                    <span className="bx-row__main">
                      <span className="bx-row__title">{i.title}</span>
                      <span className="bx-row__cat">{dict.categories[i.category]}</span>
                    </span>
                    <UpRight />
                  </Link>
                </li>
              ))}
            </ol>
            {!showAll && items.length > 2 && (
              <button type="button" className="bx-btn bx-btn--sm" onClick={() => setShowAll(true)}>
                {dict.showAll}
                <svg className="bx-ico" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M8 3v10M4 9l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
          </section>
        </>
      )}
    </>
  );
}
