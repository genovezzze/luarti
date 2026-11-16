import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { ArrowRight, Tick } from "@/components/Icons";
import { getDict, isLocale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDict(locale);
  return { title: d.services.eyebrow, description: d.services.text, alternates: { canonical: `/${locale}/services` } };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  const s = d.services;

  return (
    <>
      <section className="section page-top">
        <div className="container">
          <div className="section-head section-head--left" data-reveal>
            <p className="eyebrow">{s.eyebrow}</p>
            <h1 className="h1">{s.title}</h1>
            <p className="lead">{s.text}</p>
          </div>

          <div className="svc-list">
            {s.items.map((item, i) => (
              <article key={item.id} id={item.id} className="svc" data-reveal>
                <div className="svc__head">
                  <span className="svc__num">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="svc__title">
                    <Link href={`/${locale}/services/${item.id}`}>{item.title}</Link>
                  </h2>
                  <Link href={`/${locale}/services/${item.id}`} className="svc__example">
                    {s.more} <ArrowRight className="svc__arrow" />
                  </Link>
                  {item.example && (
                    <Link href={`/${locale}/work/${item.example.slug}`} className="svc__example">
                      {item.example.label} <ArrowRight className="svc__arrow" />
                    </Link>
                  )}
                </div>

                <div className="svc__body">
                  <p className="svc__text">{item.text}</p>
                  <p className="svc__label">{s.includesLabel}</p>
                  <ul className="svc__points">
                    {item.points.map((pt) => (
                      <li key={pt}>
                        <Tick className="svc__tick" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="svc__side">
                  <dl>
                    <div>
                      <dt>{s.priceLabel}</dt>
                      <dd className="svc__price">{item.price}</dd>
                    </div>
                    <div>
                      <dt>{s.timeLabel}</dt>
                      <dd>{item.time}</dd>
                    </div>
                  </dl>
                  <Link href={`/${locale}/contact?package=${item.package}`} className="btn btn--dark btn--sm">
                    {s.cta} <ArrowRight className="btn__icon" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <p className="svc-note">{d.pricing.demo}</p>
        </div>
      </section>

      <CtaBand title={d.cta.title} button={d.cta.button} href={`/${locale}/contact`} />
    </>
  );
}
