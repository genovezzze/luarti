import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Motion } from "@/components/Motion";
import { SmoothScroll } from "@/components/SmoothScroll";
import { getDict, isLocale, locales, siteUrl } from "@/lib/i18n";
import "../globals.css";

const font = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-sans",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = { children: ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDict(locale);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: dict.meta.title, template: "%s · LUARTI" },
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      siteName: "LUARTI",
      locale: locale === "lv" ? "lv_LV" : "en_US",
      type: "website",
      images: ["/images/home/hero-team.jpg"],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDict(locale);

  return (
    <html lang={locale} className={font.variable} suppressHydrationWarning>
      <head>
        {/* Hide animated text until it is split — avoids a flash before motion starts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("at-js")`,
          }}
        />
      </head>
      <body>
        <Header locale={locale} dict={dict.nav} />
        <main>{children}</main>
        <Footer locale={locale} dict={dict} />
        <Motion />
        <SmoothScroll />
      </body>
    </html>
  );
}
