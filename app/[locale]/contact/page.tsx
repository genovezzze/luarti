import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { Frames } from "@/components/Frames";
import { getDict, isLocale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDict(locale);
  return { title: d.contact.eyebrow, description: d.contact.text, alternates: { canonical: `/${locale}/contact` } };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);

  return (
    <section className="section page-top">
      <div className="container contact">
        <div className="contact__text" data-reveal>
          <p className="eyebrow">{d.contact.eyebrow}</p>
          <h1 className="h1">{d.contact.title}</h1>
          <p className="lead-sm">{d.contact.text}</p>
          <ol className="contact__steps">
            {d.contact.steps.map((s, i) => (
              <li key={s}>
                <span className="step-num">{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
        </div>
        <Frames lines={false} className="frames--form">
          <div className="form-card">
            <ContactForm locale={locale} dict={d.contact.form} />
          </div>
        </Frames>
      </div>
    </section>
  );
}
