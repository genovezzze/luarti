import Link from "next/link";
import { notFound } from "next/navigation";
import { ApproachSlider } from "@/components/ApproachSlider";
import { CaseCard } from "@/components/CaseCard";
import { CtaBand } from "@/components/CtaBand";
import { HeroScene } from "@/components/HeroScene";
import { ArrowRight } from "@/components/Icons";
import { Pricing } from "@/components/Pricing";
import { ProblemSection } from "@/components/ProblemSection";
import { cases } from "@/content/cases";
import { getDict, isLocale, type Locale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const d = getDict(locale);
  const home = `/${locale}`;

  return (
    <>
      <HeroScene title={d.hero.title} dict={d.scene} locale={locale} />

      <ProblemSection dict={d.problem} href={`${home}/contact`} />

      {/* WORK */}
      <section className="section" id="work">
        <div className="container">
          <div className="section-head section-head--row" data-reveal>
            <div>
              <p className="eyebrow">{d.work.eyebrow}</p>
              <h2 className="h2">{d.work.title}</h2>
              <p className="lead">{d.work.text}</p>
            </div>
            <Link href={`${home}/work`} className="btn btn--outline">
              {d.work.all} <ArrowRight className="btn__icon" />
            </Link>
          </div>
          <div className="case-list">
            {cases.map((c, i) => (
              <CaseCard key={c.slug} item={c} locale={locale} dict={d.work} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* APPROACH: pinned, steps change on scroll */}
      <ApproachSlider dict={d.approach} />

      <Pricing locale={locale} dict={d.pricing} />

      <CtaBand title={d.cta.title} button={d.cta.button} href={`${home}/contact`} />
    </>
  );
}
