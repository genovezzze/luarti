"use client";

/**
 * Scroll motion for LUARTI:
 *  - titles / body text: see lib/textMotion.ts
 *  - buttons / pills: morph open (scaleX .4 → 1, scaleY 1.15 → 1, label/arrow slide in)
 *  - other [data-reveal] blocks: rise 40px + fade
 * Elements inside the hero scene ([data-scene]) or marked [data-at-manual] are skipped —
 * the scene drives them itself.
 */

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { disposeText, gsap, playText, prepareText, reducedMotion, ScrollTrigger } from "@/lib/textMotion";

const SCOPE = "main";
const SKIP = "[data-scene], [data-scene] *, [data-at-manual]";
const TITLE_SEL = ".h1, .h2, .h3, .eyebrow";
const BODY_SEL = ".lead, .lead-sm, .cols3 .col p, .case-slot p";
const CTA_SEL = ".btn, .pill";
const CTA_SKIP = ".pill--float, .form .btn";
/** Plain media inside text blocks that still get the rise */
const RISE_EXTRA = ".case-card__visual, .gallery__item .shot";

/* ───────── CTA (buttons & pills) ───────── */

type Cta = { el: HTMLElement; inner: HTMLElement; label?: HTMLElement; arrow?: Element | null; fill: boolean; bg: string; fg: string };

function prepareCta(el: HTMLElement): Cta {
  let inner = el.querySelector<HTMLElement>(":scope > .cta-in");
  if (!inner) {
    inner = document.createElement("span");
    inner.className = "cta-in";
    const label = document.createElement("span");
    label.className = "cta-label";
    [...el.childNodes].forEach((n) => {
      if (n instanceof Element && n.matches("svg")) inner!.appendChild(n);
      else label.appendChild(n);
    });
    inner.prepend(label);
    el.appendChild(inner);
  }
  const cs = getComputedStyle(el);
  return {
    el,
    inner,
    label: inner.querySelector<HTMLElement>(".cta-label") ?? undefined,
    arrow: inner.querySelector("svg"),
    fill: el.matches(".btn--dark, .btn--light"),
    bg: cs.backgroundColor,
    fg: cs.color,
  };
}

function initialCta(c: Cta) {
  const { el, inner, label, arrow } = c;
  el.style.transition = "none";
  gsap.set(el, { autoAlpha: 0, scaleX: 0.4, scaleY: 1.15, transformOrigin: "50% 50%" });
  gsap.set(inner, { scaleX: 2.5, scaleY: 1 / 1.15, transformOrigin: "50% 50%" });
  if (c.fill) gsap.set(el, { backgroundColor: "rgba(0,0,0,0)", color: c.bg, boxShadow: `inset 0 0 0 1px ${c.bg}` });
  if (label) gsap.set(label, { x: -6 });
  if (arrow) gsap.set(arrow, { x: 6 });
}

function playCta(c: Cta, delay = 0, duration = 0.85) {
  const { el, inner, label, arrow } = c;
  const half = 0.5 * duration;
  const lag = (duration - half) * 0.55;
  const inv = (prop: "scaleX" | "scaleY") => () => {
    const v = Number(gsap.getProperty(el, prop));
    return Number.isFinite(v) && v !== 0 ? 1 / v : 1;
  };
  const tl = gsap.timeline({
    delay,
    onComplete: () => {
      gsap.set(el, { clearProps: "transform,transformOrigin,opacity,visibility,backgroundColor,color,boxShadow" });
      gsap.set(inner, { clearProps: "transform,transformOrigin" });
      if (label) gsap.set(label, { clearProps: "transform" });
      if (arrow) gsap.set(arrow, { clearProps: "transform" });
      el.style.transition = "";
    },
  });
  tl.to(el, { scaleY: 1, duration, ease: "power2.inOut" }, 0);
  tl.to(el, { autoAlpha: 1, scaleX: 1, duration: half, ease: "power2.out" }, 0);
  tl.to(inner, { scaleY: 1, duration, ease: "none", modifiers: { scaleY: inv("scaleY") } }, 0);
  tl.to(inner, { scaleX: 1, duration: half + lag, ease: "none", modifiers: { scaleX: inv("scaleX") } }, 0);
  const slide = [label, arrow].filter(Boolean) as Element[];
  if (slide.length) tl.to(slide, { x: 0, duration: half, ease: "power3.inOut" }, half);
  if (c.fill) {
    tl.to(el, { backgroundColor: c.bg, color: c.fg, boxShadow: "inset 0 0 0 1px rgba(0,0,0,0)", duration: half, ease: "power3.inOut" }, half);
  }
}

/* ───────── Wire ───────── */

export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const scope = document.querySelector(SCOPE);
    if (!scope) return;

    if (reducedMotion()) {
      root.classList.remove("at-js");
      scope.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => el.classList.add("is-in"));
      return;
    }
    root.classList.add("reveal-ready");

    let cancelled = false;
    const triggers: ScrollTrigger[] = [];
    const wired: HTMLElement[] = [];
    const pick = (sel: string) => [...scope.querySelectorAll<HTMLElement>(sel)].filter((el) => !el.matches(SKIP));

    (async () => {
      await document.fonts?.ready;
      if (cancelled) return;

      // Text
      const titles = pick(TITLE_SEL);
      const bodies = pick(BODY_SEL);
      titles.forEach((el) => (el.dataset.at = "title"));
      bodies.forEach((el) => (el.dataset.at = "body"));
      [...titles, ...bodies].forEach((el) => {
        if (el.dataset.atDone !== undefined || el.dataset.atWired !== undefined) return;
        el.dataset.atWired = "";
        prepareText(el);
        wired.push(el);
        triggers.push(
          ScrollTrigger.create({ trigger: el, start: "top 85%", once: true, onEnter: () => playText(el, { delay: 0.1, once: true }) })
        );
      });

      // Buttons & pills
      pick(CTA_SEL).forEach((el) => {
        if (el.matches(CTA_SKIP) || el.dataset.ctaWired !== undefined) return;
        el.dataset.ctaWired = "";
        const c = prepareCta(el);
        initialCta(c);
        el.dataset.ctaReady = "";
        triggers.push(
          ScrollTrigger.create({ trigger: el, start: "top 92%", once: true, onEnter: () => playCta(c, 0.25) })
        );
      });

      // Blocks: rise unless they hold animated text
      const rise = (el: HTMLElement) => {
        el.dataset.riseReady = "";
        gsap.set(el, { opacity: 0, y: 40 });
        triggers.push(
          ScrollTrigger.create({
            trigger: el,
            start: "top 92%",
            once: true,
            onEnter: () => {
              el.classList.add("is-in");
              gsap.to(el, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", clearProps: "transform,opacity" });
            },
          })
        );
      };
      pick("[data-reveal]").forEach((el) => {
        if (el.dataset.riseReady !== undefined) return;
        if (el.querySelector("[data-at]") || el.matches("[data-at]")) {
          el.dataset.riseReady = "";
          el.classList.add("is-in");
        } else rise(el);
      });
      pick(RISE_EXTRA).forEach((el) => {
        if (el.dataset.riseReady === undefined) rise(el);
      });

      ScrollTrigger.refresh();
    })();

    return () => {
      cancelled = true;
      triggers.forEach((t) => t.kill());
      wired.forEach((el) => {
        if (el.dataset.atDone === undefined) disposeText(el);
      });
    };
  }, [pathname]);

  return null;
}
