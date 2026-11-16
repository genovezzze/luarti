/**
 * Text motion (GSAP + SplitText): masked lines rise, words slide in,
 * titles flash green → violet → final colour.
 * Shared by the scroll-wired Motion component and the hero scroll scene.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const GREEN = "#72CE7B";
export const VIOLET = "#79648C";

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
  const pre = ws.startsWith("pre") || ws === "break-spaces";
  const split = SplitText.create(el, {
    type: "words,lines",
    mask: "lines",
    wordsClass: "at-word",
    linesClass: "at-line",
    reduceWhiteSpace: !pre,
  });
  gsap.set(split.masks, { paddingTop: "0.12em", marginTop: "-0.12em", paddingBottom: "0.12em", marginBottom: "-0.12em" });
  // Adjacent masks' negative margins collapse (-0.12em instead of -0.24em), making the split text
  // taller than the original and causing a jump on revert. Compensate so the height is identical.
  gsap.set(split.masks.slice(1), { marginTop: "-0.24em" });
  return { split, variant, shown: false };
}

export function initial(s: TextState) {
  const { lines, words } = s.split;
  if (s.variant === "body") {
    gsap.set(lines, { yPercent: 50, opacity: 1 });
    gsap.set(words, { opacity: 0 });
  } else {
    gsap.set(lines, { yPercent: 400, x: 0, opacity: 0, color: GREEN });
    gsap.set(words, { yPercent: 0, x: "30%", opacity: 0, color: GREEN });
  }
}

/** Split the element and put it in its hidden start state. */
export function prepareText(el: HTMLElement): TextState {
  let s = states.get(el);
  if (!s) {
    s = create(el);
    initial(s);
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
  initial(s);
  s.shown = true;

  const final = getComputedStyle(el).color;
  const lines = s.split.lines as HTMLElement[];
  const words = s.split.words as HTMLElement[];
  const tl = gsap.timeline({
    delay,
    onComplete: () => {
      gsap.set([...lines, ...words], { clearProps: "color" });
      if (once) {
        s.split.revert();
        states.delete(el);
        el.dataset.atDone = "";
      }
    },
  });
  s.tl = tl;

  if (s.variant === "body") {
    const lt = 0.052 * Math.max(0, lines.length - 1);
    const wt = 0.025 * Math.max(0, words.length - 1);
    const total = Math.max(0.55, lt + 0.2, wt + 0.2);
    tl.to(lines, { yPercent: 0, duration: total - lt, ease: "power3.out", stagger: 0.052 }, 0);
    tl.to(words, { opacity: 1, duration: total - wt, ease: "power2.out", stagger: 0.025 }, 0);
    return;
  }

  lines.forEach((line, i) => {
    const lineWords = words.filter((w) => line.contains(w));
    const t = 0.08 * i;
    tl.to(line, { yPercent: 0, x: 0, opacity: 1, duration: 1, ease: "power3.out" }, t);
    tl.to(line, { color: VIOLET, duration: 0.3276, ease: "power1.inOut" }, t + 0.22);
    tl.to(line, { color: final, duration: 0.4524, ease: "power1.inOut" }, t + 0.22 + 0.3276);
    if (!lineWords.length) return;
    const w = t + 0.04;
    tl.to(lineWords, { x: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.03 }, w);
    tl.to(lineWords, { color: VIOLET, duration: 0.29484, ease: "power1.inOut", stagger: 0.03 }, w + 0.198);
    tl.to(lineWords, { color: final, duration: 0.40716, ease: "power1.inOut", stagger: 0.03 }, w + 0.198 + 0.29484);
  });
}

export function hideText(el: HTMLElement) {
  const s = states.get(el);
  if (!s) return;
  s.tl?.kill();
  if (!s.shown) {
    initial(s);
    return;
  }
  s.shown = false;
  const tl = gsap.timeline();
  s.tl = tl;
  const lines = s.split.lines as HTMLElement[];
  const words = s.split.words as HTMLElement[];
  lines.forEach((line, i) => {
    const lineWords = words.filter((w) => line.contains(w));
    const t = 0.08 * i;
    if (lineWords.length) tl.to(lineWords, { yPercent: -30, opacity: 0, duration: 0.4, ease: "power3.in", stagger: 0.03 }, t);
    tl.to(line, { yPercent: -100, opacity: 0, duration: 0.5, ease: "power3.in" }, t + 0.02);
  });
}

/* Fade helpers for small labels */
export function prepareFade(el: HTMLElement) {
  if (el.dataset.fadeReady !== undefined) return;
  gsap.set(el, { opacity: 0 });
  el.dataset.fadeReady = "";
}
export function playFade(el: HTMLElement, { delay = 0.3, duration = 0.6 } = {}) {
  prepareFade(el);
  gsap.killTweensOf(el);
  gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration, delay });
}
export function hideFade(el: HTMLElement) {
  gsap.killTweensOf(el);
  gsap.to(el, { opacity: 0, duration: 0.3, ease: "power2.in" });
}

export { gsap, ScrollTrigger };
