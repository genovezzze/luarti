/**
 * Text motion (GSAP + SplitText).
 *  - titles: each line slides up out of its mask, words sharpen from a soft
 *    blur, and the colour settles from a muted grey into the final colour;
 *  - body text: lines lift a little and fade in.
 * Shared by the scroll-wired Motion component and the hero scroll scene.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/** Start colour of titles before they settle into their own colour. */
const MUTED = "#8c8c88";

export type TextState = {
  split: SplitText;
  variant: "title" | "body";
  tl?: gsap.core.Timeline;
  shown: boolean;
};

const states = new WeakMap<HTMLElement, TextState>();

export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function create(el: HTMLElement): TextState {
  const variant = el.dataset.at === "body" ? "body" : "title";
  const ws = getComputedStyle(el).whiteSpace;
  const keepSpaces = ws.startsWith("pre") || ws === "break-spaces";
  const split = SplitText.create(el, {
    type: "words,lines",
    mask: "lines",
    wordsClass: "at-word",
    linesClass: "at-line",
    reduceWhiteSpace: !keepSpaces,
  });
  // Give descenders room inside the masks without changing the block height:
  // the first mask pulls up by the padding, the rest by padding + the previous mask's bottom.
  gsap.set(split.masks, { paddingTop: "0.12em", paddingBottom: "0.12em", marginTop: "-0.24em", marginBottom: "-0.12em" });
  gsap.set(split.masks[0], { marginTop: "-0.12em" });
  return { split, variant, shown: false };
}

function reset(s: TextState) {
  const { lines, words } = s.split;
  if (s.variant === "body") {
    gsap.set(lines, { yPercent: 60, opacity: 0 });
  } else {
    gsap.set(lines, { yPercent: 110, color: MUTED });
    gsap.set(words, { opacity: 0, filter: "blur(6px)" });
  }
}

/** Split the element and put it in its hidden start state. */
export function prepareText(el: HTMLElement): TextState {
  let s = states.get(el);
  if (!s) {
    s = create(el);
    reset(s);
    states.set(el, s);
    el.dataset.atReady = "";
  }
  return s;
}

/** Undo the split (used on route change for texts that never played). */
export function disposeText(el: HTMLElement) {
  const s = states.get(el);
  if (!s) return;
  s.tl?.kill();
  s.split.revert();
  states.delete(el);
}

export function playText(el: HTMLElement, { delay = 0, once = false }: { delay?: number; once?: boolean } = {}) {
  const s = prepareText(el);
  s.tl?.kill();
  reset(s);
  s.shown = true;

  const final = getComputedStyle(el).color;
  const lines = s.split.lines as HTMLElement[];
  const words = s.split.words as HTMLElement[];
  const tl = gsap.timeline({
    delay,
    onComplete: () => {
      gsap.set([...lines, ...words], { clearProps: "color,filter,opacity" });
      if (once) {
        s.split.revert();
        states.delete(el);
        el.dataset.atDone = "";
      }
    },
  });
  s.tl = tl;

  if (s.variant === "body") {
    tl.to(lines, { yPercent: 0, opacity: 1, duration: 0.8, ease: "expo.out", stagger: 0.07 });
    return;
  }

  lines.forEach((line, i) => {
    const t = 0.11 * i;
    tl.to(line, { yPercent: 0, duration: 1.05, ease: "expo.out" }, t);
    tl.to(line, { color: final, duration: 0.9, ease: "sine.out" }, t + 0.25);
    const lineWords = words.filter((w) => line.contains(w));
    if (lineWords.length) {
      tl.to(lineWords, { opacity: 1, filter: "blur(0px)", duration: 0.7, ease: "power2.out", stagger: 0.035 }, t + 0.08);
    }
  });
}

export function hideText(el: HTMLElement) {
  const s = states.get(el);
  if (!s) return;
  s.tl?.kill();
  if (!s.shown) {
    reset(s);
    return;
  }
  s.shown = false;
  const lines = s.split.lines as HTMLElement[];
  s.tl = gsap.timeline().to(lines, { yPercent: -110, duration: 0.45, ease: "power2.in", stagger: 0.05 });
}

/* Fade helpers for small labels */
export function prepareFade(el: HTMLElement) {
  if (el.dataset.fadeReady !== undefined) return;
  gsap.set(el, { opacity: 0, y: 6 });
  el.dataset.fadeReady = "";
}
export function playFade(el: HTMLElement, { delay = 0.3, duration = 0.6 } = {}) {
  prepareFade(el);
  gsap.killTweensOf(el);
  gsap.to(el, { opacity: 1, y: 0, duration, delay, ease: "power2.out" });
}
export function hideFade(el: HTMLElement) {
  gsap.killTweensOf(el);
  gsap.to(el, { opacity: 0, y: -6, duration: 0.3, ease: "power2.in" });
}

export { gsap, ScrollTrigger };
