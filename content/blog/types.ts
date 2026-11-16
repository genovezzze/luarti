import type { L } from "@/lib/i18n";

/** Building blocks of an article body. */
export type Block =
  | { type: "p"; text: L }
  | { type: "h2"; text: L }
  | { type: "stats"; items: { value: string; label: L }[] }
  | { type: "bars"; note?: L; items: { label: L; pct: number; value: string }[] }
  | { type: "steps"; items: L[] }
  | { type: "quote"; text: L };

export type Post = {
  slug: string;
  /** ISO date, e.g. "2026-11-10" */
  date: string;
  minutes: number;
  tag: L;
  title: L;
  excerpt: L;
  cover: { src: string; alt: L; aspect: string };
  /** Original post (e.g. LinkedIn), optional */
  source?: { url: string; label: string };
  body: Block[];
};
