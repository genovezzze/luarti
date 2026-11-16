import Link from "next/link";
import type { Dict } from "@/lib/i18n";
import { ArrowRight } from "./Icons";

type Props = { dict: Dict["problem"]; href: string };

export function ProblemSection({ dict, href }: Props) {
  return (
    <section className="section section--tight">
      <div className="container">
        <div className="problem">
          <div className="problem__head">
            <h2 className="h2">{dict.title}</h2>
            <p className="lead-sm">{dict.text}</p>
          </div>

          <ul className="problem__list">
            {dict.items.map((item, i) => (
              <li key={item.title}>
                <span className="problem__num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h3">{item.title}</h3>
                <p className="lead-sm">{item.text}</p>
              </li>
            ))}
          </ul>

          <div className="problem__cta" data-reveal>
            <div>
              <h3 className="h3">{dict.ctaTitle}</h3>
              <p className="lead-sm">{dict.ctaText}</p>
            </div>
            <Link href={href} className="btn btn--light">
              {dict.cta} <ArrowRight className="btn__icon" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
