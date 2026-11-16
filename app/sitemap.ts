import type { MetadataRoute } from "next";
import { cases } from "@/content/cases";
import { locales, siteUrl } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/services", "/work", "/contact", ...cases.map((c) => `/work/${c.slug}`)];
  return locales.flatMap((l) => paths.map((p) => ({ url: `${siteUrl}/${l}${p}`, lastModified: new Date() })));
}
