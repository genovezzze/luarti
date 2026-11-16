import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { About } from "@/components/About";
import { CtaBand } from "@/components/CtaBand";
import { getDict, isLocale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDict(locale);
  return {
    title: `${d.about.eyebrow} - ${d.about.name}`,
    description: d.about.lead,
    alternates: { canonical: `/${locale}/about` },
    openGraph: { images: ["/images/about/artemijs.jpg"] },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDict(locale);
  return (
    <>
      <About locale={locale} dict={d.about} page />
      <CtaBand title={d.cta.title} button={d.cta.button} href={`/${locale}/contact`} />
    </>
  );
}
