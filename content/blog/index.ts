import type { Locale } from "@/lib/i18n";
import { aiDraftsHumanApproves } from "./ai-drafts-human-approves";
import { shadowy4Months } from "./shadowy-4-months";
import type { Block, Post } from "./types";
import { whatToAutomateFirst } from "./what-to-automate-first";
import { whenExcelIsNotEnough } from "./when-excel-is-not-enough";

/**
 * Blog posts. To add a post: create a file next to this one (copy
 * what-to-automate-first.ts) and add it to the list. Sorted newest first.
 */
export const posts: Post[] = [shadowy4Months, whatToAutomateFirst, aiDraftsHumanApproves, whenExcelIsNotEnough].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

function blockText(b: Block, l: Locale): string {
  switch (b.type) {
    case "p":
    case "h2":
    case "quote":
      return b.text[l];
    case "steps":
      return b.items.map((i) => i[l]).join(" ");
    case "stats":
      return b.items.map((i) => `${i.value} ${i.label[l]}`).join(" ");
    case "bars":
      return b.items.map((i) => i.label[l]).join(" ") + " " + (b.note?.[l] ?? "");
  }
}

/** Reading time in minutes (~180 words per minute, at least 2). */
export function readingMinutes(post: Post, locale: Locale) {
  const words = post.body.map((b) => blockText(b, locale)).join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(words / 180));
}

export function formatDate(iso: string, locale: string) {
  return new Date(iso + "T12:00:00Z").toLocaleDateString(locale === "lv" ? "lv-LV" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
