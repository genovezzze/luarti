import type { CaseStudy } from "./types";
import { shadowy } from "./shadowy";
import { pbFinanses } from "./pb-finanses";

/**
 * All case studies, in display order.
 * New case → create a file next to this one and add it to the list.
 */
export const cases: CaseStudy[] = [shadowy, pbFinanses];

export function getCase(slug: string): CaseStudy | undefined {
  return cases.find((c) => c.slug === slug);
}

export function getNextCase(slug: string): CaseStudy {
  const i = cases.findIndex((c) => c.slug === slug);
  return cases[(i + 1) % cases.length];
}

/** All screenshots of a case, in order, without duplicates. */
export function getScreens(c: CaseStudy) {
  const list = [
    c.hero.image,
    c.hero.overlay,
    c.highlight?.image,
    c.flow?.image,
    ...(c.gallery?.items ?? []),
  ].filter(Boolean) as NonNullable<CaseStudy["hero"]["overlay"]>[];
  const seen = new Set<string>();
  return list.filter((img) => (seen.has(img.src) ? false : (seen.add(img.src), true)));
}

export type { CaseStudy };
