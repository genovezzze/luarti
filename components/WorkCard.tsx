import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/content/cases/types";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { ArrowRight } from "./Icons";

type Props = { item: CaseStudy; locale: Locale };

/** Compact project card: image, name, one line, arrow. */
export function WorkCard({ item, locale }: Props) {
  return (
    <Link href={`/${locale}/work/${item.slug}`} className="wcard" data-reveal>
      <div className="wcard__img">
        <Image src={item.card.image.src} alt={t(item.card.image.alt, locale)} fill sizes="(max-width: 720px) 100vw, 420px" />
      </div>
      <div className="wcard__body">
        <div>
          <p className="wcard__name">{item.client}</p>
          <p className="wcard__text">{t(item.card.title, locale)}</p>
        </div>
        <span className="wcard__arrow" aria-hidden="true">
          <ArrowRight />
        </span>
      </div>
    </Link>
  );
}
