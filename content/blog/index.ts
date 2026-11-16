import { shadowy4Months } from "./shadowy-4-months";
import type { Post } from "./types";

/**
 * Blog posts. To add a post: create a file next to this one (copy
 * shadowy-4-months.ts) and add it to the list. Newest first by date.
 */
export const posts: Post[] = [shadowy4Months].sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string, locale: string) {
  return new Date(iso + "T12:00:00Z").toLocaleDateString(locale === "lv" ? "lv-LV" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
