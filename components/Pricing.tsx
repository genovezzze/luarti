import Link from "next/link";
import type { Dict, Locale } from "@/lib/i18n";
import { ArrowRight, Tick } from "./Icons";

type Props = { locale: Locale; dict: Dict["pricing"] };

export function Pricing({ locale, dict }: Props) {
  return (
    <section className="section" id="pricing">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">{dict.eyebrow}</p>
          <h2 className="h2">{dict.title}</h2>
          <p className="lead">{dict.text}</p>
          <span className="demo-badge">{dict.demo}</span>
        </div>

        <div className="pricing">
          {dict.plans.map((p, i) => {
            const featured = p.id === "platform";
            return (
              <article key={p.id} className={`plan ${featured ? "plan--featured" : ""}`} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="plan__top">
                  <span className="pill">{p.name}</span>
                  {featured && <span className="plan__badge">{dict.popular}</span>}
                </div>
                <div className="plan__price">
                  {p.price ? (
                    <>
                      {/* A range ("€300–500") is shown as is, without "from" */}
                      {!p.price.includes("–") && <span className="plan__from">{dict.from}</span>}
                      <span className="plan__amount">{p.price}</span>
                    </>
                  ) : (
                    <span className="plan__amount plan__amount--text">{dict.onRequest}</span>
                  )}
                </div>
                <p className="plan__text">{p.text}</p>
                <p className="plan__time">{p.timeline}</p>
                <ul className="plan__list">
                  {p.features.map((f) => (
                    <li key={f}><Tick className="plan__tick" />{f}</li>
                  ))}
                </ul>
                <Link
                  href={`/${locale}/contact?package=${p.id}`}
                  className={`btn ${featured ? "btn--light" : "btn--outline"} plan__cta`}
                >
                  {dict.cta} <ArrowRight className="btn__icon" />
                </Link>
              </article>
            );
          })}
        </div>

        <div className="addon" data-reveal>
          <div>
            <h3 className="addon__title">{dict.addon.title}</h3>
            <p className="addon__text">{dict.addon.text}</p>
          </div>
          <span className="addon__price">{dict.addon.price}</span>
        </div>
      </div>
    </section>
  );
}
