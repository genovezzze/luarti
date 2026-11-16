import type { MetadataRoute } from "next";
import { posts } from "@/content/blog";
import { cases } from "@/content/cases";
import { services } from "@/content/services";
import { locales, siteUrl } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/services",
    ...services.map((s) => `/services/${s.id}`),
    "/work",
    ...cases.map((c) => `/work/${c.slug}`),
    "/blog",
    "/about",
    "/contact",
  ];
  const lastPost = posts[0]?.date;
  return [
    ...locales.flatMap((l) =>
      pages.map((p) => ({
        url: `${siteUrl}/${l}${p}`,
        lastModified: p === "/blog" && lastPost ? new Date(lastPost) : new Date(),
        alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${siteUrl}/${x}${p}`])) },
      })),
    ),
    ...locales.flatMap((l) =>
      posts.map((post) => ({
        url: `${siteUrl}/${l}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${siteUrl}/${x}/blog/${post.slug}`])) },
      })),
    ),
  ];
}
