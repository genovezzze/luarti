import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import type { Dict, Locale } from "@/lib/i18n";
import { ArrowRight, Tick } from "./Icons";

type Props = { locale: Locale; dict: Dict["about"]; page?: boolean };

/** Put the portrait at public/images/about/artemijs.jpg - it is picked up automatically. */
const PHOTO = "/images/about/artemijs.jpg";
const hasPhoto = () => fs.existsSync(path.join(process.cwd(), "public", PHOTO));

export function About({ locale, dict, page = false }: Props) {
  const photo = hasPhoto();
  const initials = dict.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <section className={`section ${page ? "page-top" : ""}`} id="about">
      <div className="container">
        <div className="about">
          <div className="about__side">
            <div className="about__photo" data-reveal>
              {photo ? (
                <Image src={PHOTO} alt={dict.photoAlt} fill priority={page} sizes="(max-width: 900px) 100vw, 420px" />
              ) : (
                <span className="about__initials" aria-label={dict.photoAlt}>{initials}</span>
              )}
            </div>
            <p className="about__name">{dict.name}</p>
            <p className="about__role">{dict.role}</p>
          </div>

          <div className="about__main">
            <p className="eyebrow">{dict.eyebrow}</p>
            {page ? <h1 className="h1 about__title">{dict.title}</h1> : <h2 className="h2">{dict.title}</h2>}
            <p className="lead">{dict.lead}</p>

            <h3 className="about__h">{dict.whyTitle}</h3>
            <div className="about__why">
              {dict.why.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            <blockquote className="about__goal" data-reveal>
              <span className="about__goal-label">{dict.goalTitle}</span>
              <p className="about__goal-big">{dict.goal}</p>
              <p className="about__goal-text">{dict.goalText}</p>
            </blockquote>

            <h3 className="about__h">{dict.pilotTitle}</h3>
            <p className="about__pilot-text">{dict.pilotText}</p>
            <div className="about__pilot" data-reveal>
              {dict.pilot.map((r, i) => (
                <div key={r.label} className={`about__bar${i === dict.pilot.length - 1 ? " about__bar--rest" : ""}`}>
                  <div className="about__bar-head">
                    <span>{r.label}</span>
                    <span className="about__bar-num">
                      {r.pct}% · {r.hours}
                    </span>
                  </div>
                  <div className="about__bar-track">
                    <span className="about__bar-fill" style={{ width: `${(r.pct / 29) * 100}%` }} />
                  </div>
                </div>
              ))}
              <p className="about__pilot-note">{dict.pilotNote}</p>
            </div>

            <h3 className="about__h">{dict.factsTitle}</h3>
            <div className="about__facts">
              {dict.facts.map((f) => (
                <div key={f.value} className="about__fact" data-reveal>
                  <span className="about__value">{f.value}</span>
                  <span className="about__label">{f.label}</span>
                </div>
              ))}
            </div>

            <h3 className="about__h">{dict.howTitle}</h3>
            <ul className="about__how">
              {dict.how.map((h) => (
                <li key={h}>
                  <Tick className="about__tick" />
                  {h}
                </li>
              ))}
            </ul>

            <p className="about__personal">{dict.personal}</p>

            <div className="about__actions">
              <Link href={`/${locale}/contact`} className="btn btn--dark">
                {dict.cta} <ArrowRight className="btn__icon" />
              </Link>
              <a href={dict.postUrl} target="_blank" rel="noopener noreferrer" className="about__post">
                {dict.postLink} <ArrowRight className="btn__icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
