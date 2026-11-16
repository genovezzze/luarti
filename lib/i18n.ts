import { en } from "./dictionaries/en";
import { lv } from "./dictionaries/lv";

export const locales = ["en", "lv"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** A string translated into every supported locale. */
export type L = Record<Locale, string>;

export type Dict = typeof en;

const dictionaries: Record<Locale, Dict> = { en, lv };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDict(locale: Locale): Dict {
  return dictionaries[locale];
}

/** Pick the current locale's value from a localized string. */
export function t(value: L, locale: Locale): string {
  return value[locale] ?? value.en;
}

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://luarti.vercel.app";
