"use client";

/**
 * Scroll motion for LUARTI:
 *  - titles / body text: see lib/textMotion.ts
 *  - buttons / pills: open from the left edge (clip), label rises, arrow slides in
 *  - other [data-reveal] blocks: rise 40px + fade
 * Elements inside the hero scene ([data-scene]) or marked [data-at-manual] are skipped -
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

type Cta = { el: HTMLElement; label?: HTMLElement; arrow?: Element | null };

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
  return {
    el,
    label: inner.querySelector<HTMLElement>(".cta-label") ?? undefined,
    arrow: inner.querySelector("svg"),
  };
}

function initialCta(c: Cta) {
  const { el, label, arrow } = c;
  el.style.transition = "none";
  // Hidden behind a clip that will open from the left edge
  gsap.set(el, { autoAlpha: 1, clipPath: "inset(0% 100% 0% 0% round 999px)" });
  if (label) gsap.set(label, { y: "60%", opacity: 0 });
  if (arrow) gsap.set(arrow, { x: -10, opacity: 0 });
}

function playCta(c: Cta, delay = 0) {
  const { el, label, arrow } = c;
  const tl = gsap.timeline({
    delay,
    onComplete: () => {
      gsap.set(el, { clearProps: "clipPath,opacity,visibility" });
      if (label) gsap.set(label, { clearProps: "transform,opacity" });
      if (arrow) gsap.set(arrow, { clearProps: "transform,opacity" });
      el.style.transition = "";
    },
  });
  tl.to(el, { clipPath: "inset(0% 0% 0% 0% round 999px)", duration: 0.75, ease: "expo.out" }, 0);
  if (label) tl.to(label, { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" }, 0.18);
  if (arrow) tl.to(arrow, { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, 0.3);
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
