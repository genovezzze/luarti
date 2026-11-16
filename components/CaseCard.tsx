import Link from "next/link";
import type { CaseStudy } from "@/content/cases/types";
import type { Dict, Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { CaseVisual } from "./CaseVisual";
import { ArrowRight } from "./Icons";

type Props = { item: CaseStudy; locale: Locale; dict: Dict["work"]; index: number };

export function CaseCard({ item, locale, dict, index }: Props) {
  const href = `/${locale}/work/${item.slug}`;
  return (
    <article className={`case-card case-card--${item.card.tone} ${index % 2 ? "is-flipped" : ""}`} data-reveal>
      <div className="case-card__text">
        <p className="eyebrow">
          {String(index + 1).padStart(2, "0")} / {item.client} · {t(item.kind, locale)}
        </p>
        <h3 className="h3">{t(item.card.title, locale)}</h3>
        <p className="lead-sm">{t(item.card.text, locale)}</p>
        <div className="case-card__actions">
          <Link href={href} className="btn btn--outline">
            {dict.view} <ArrowRight className="btn__icon" />
          </Link>
          {item.urlLabel && <span className="case-card__url">{item.urlLabel}</span>}
        </div>
      </div>
      <Link href={href} className="case-card__visual" aria-label={`${dict.view}: ${item.client}`} tabIndex={-1}>
        <CaseVisual image={item.card.image} overlay={item.card.overlay} locale={locale} sizes="(max-width: 900px) 100vw, 640px" />
      </Link>
    </article>
  );
}
