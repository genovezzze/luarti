import type { L } from "@/lib/i18n";

/** Building blocks of an article body. */
export type Block =
  | { type: "p"; text: L }
  | { type: "h2"; text: L }
  | { type: "stats"; items: { value: string; label: L }[] }
  | { type: "bars"; note?: L; items: { label: L; pct: number; value: string }[] }
  | { type: "steps"; items: L[] }
  | { type: "quote"; text: L };

/** Filter chips on the blog page; labels live in the dictionaries (blog.categories). */
export type Category = "automation" | "platforms" | "ai" | "process";

export type Post = {
  slug: string;
  /** ISO date, e.g. "2026-11-10" */
  date: string;
  category: Category;
  /** Shown as the big featured post on the blog page */
  featured?: boolean;
  title: L;
  excerpt: L;
  cover: { src: string; alt: L; aspect: string };
  /** Original post (e.g. LinkedIn), optional */
  source?: { url: string; label: string };
  body: Block[];
};
