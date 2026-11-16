import type { L } from "@/lib/i18n";

export type CaseImage = {
  src: string;
  alt: L;
  /** CSS aspect-ratio, e.g. "16 / 9" */
  aspect: string;
};

/**
 * A case study. Every block except the basics is optional - the case page
 * renders only the sections that are filled in.
 *
 * To add a new case: copy one of the files in this folder, change the content,
 * put images in /public/cases/<slug>/ and register it in ./index.ts.
 */
export type CaseStudy = {
  slug: string;
  client: string;
  logo?: string;
  url?: string;
  urlLabel?: string;
  year: string;
  /** Short category shown on cards, e.g. "Platform" / "Website" */
  kind: L;

  /** Card on the home page and /work */
  card: {
    title: L;
    text: L;
    image: CaseImage;
    /** Optional second image overlapping the first (device composition) */
    overlay?: CaseImage;
    tone: "light" | "dark";
  };

  hero: {
    title: L;
    subtitle: L;
    tags: L[];
    image: CaseImage;
    overlay?: CaseImage;
    caption?: L;
  };

  problem: L;
  solution: L;

  /** Dark highlight block with framed image and floating labels */
  highlight?: {
    title: L;
    text: L;
    image: CaseImage;
    labels: L[];
  };

  /** Numbered flow (e.g. entry → report) with an image */
  flow?: {
    title: L;
    steps: L[];
    text: L;
    image: CaseImage;
  };

  gallery?: {
    title: L;
    items: (CaseImage & { caption: L; dark?: boolean })[];
  };

  results?: { value: string; label: L }[];

  scope?: L[];

  /** Technologies used (shown as chips) */
  stack?: string[];
};
