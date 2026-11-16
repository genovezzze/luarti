"use client";

/**
 * Pinned hero scroll scene: the hero video card opens to full black, then tilts
 * in 3D and splits into depth layers ("Today" → video → "System") while text
 * slides change on the side.
 */

import Link from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";
import type { Dict } from "@/lib/i18n";
import { hideFade, hideText, playFade, playText, prepareFade, prepareText, reducedMotion } from "@/lib/textMotion";

type Props = { title: [string, string] | string[]; dict: Dict["scene"]; locale: string };

type Frame = { x: number; y: number; rx: number; ry: number; rz: number; s: number; z: number };

const DESKTOP: Frame[] = [
  { x: 0, y: 0, rx: 0, ry: 0, rz: 0, s: 1, z: 0 },
  { x: 0, y: -10, rx: 8, ry: -24, rz: 0, s: 0.56, z: 1 },
  { x: 13, y: 0, rx: 6, ry: 20, rz: 0, s: 0.46, z: 1.1 },
  { x: 13, y: 0, rx: -7, ry: 14, rz: -2, s: 0.46, z: 0.8 },
  { x: 13, y: 0, rx: 10, ry: 24, rz: 2, s: 0.45, z: 1.3 },
];
const MOBILE: Frame[] = [
  DESKTOP[0],
  { x: 0, y: 0, rx: 8, ry: -18, rz: 0, s: 0.84, z: 1 },
  { x: 0, y: 0, rx: 6, ry: 16, rz: 0, s: 0.82, z: 1 },
  { x: 0, y: 0, rx: -7, ry: 12, rz: -2, s: 0.82, z: 0.8 },
  { x: 0, y: 0, rx: 10, ry: 20, rz: 2, s: 0.8, z: 1.2 },
];
// Scroll progress → slide index, with holds between slides
const STOPS: [number, number][] = [
  [0, 0], [0.09, 1], [0.16, 1], [0.29, 2], [0.37, 2], [0.5, 3], [0.58, 3], [0.71, 4], [1, 4],
];
const NODE_X = [0.14, 0.38, 0.62, 0.86];
const TOOL_BOXES = [
  { x: 6, y: 16, w: 24, h: 30 },
  { x: 62, y: 12, w: 30, h: 26 },
  { x: 10, y: 60, w: 28, h: 28 },
  { x: 58, y: 56, w: 34, h: 32 },
];

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
function progressToSlide(p: number) {
  for (let i = 1; i < STOPS.length; i++) {
    const [p1, s1] = STOPS[i];
    const [p0, s0] = STOPS[i - 1];
    if (p <= p1) return s0 + (s1 - s0) * easeInOut(clamp((p - p0) / (p1 - p0 || 1)));
  }
  return STOPS[STOPS.length - 1][1];
}

const depth = (n: number): CSSProperties => ({
  transform: `var(--tf) translateZ(calc(var(--e) * var(--z) * var(--zm) * ${n}))`,
});

export function HeroScene({ title, dict, locale }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const sticky = stickyRef.current;
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    if (!track || !sticky || !wrap || !stage) return;
    const root = document.documentElement;
    const heroTitle = sticky.querySelector<HTMLElement>("[data-hero-title]");

    if (reducedMotion()) {
      track.classList.add("hs__track--static");
      return;
    }

    const slides = [...sticky.querySelectorAll<HTMLElement>("[data-slide]")];
    const groups = new Map<number, { texts: HTMLElement[]; fades: HTMLElement[] }>();
    groups.set(0, { texts: heroTitle ? [heroTitle] : [], fades: [] });
    slides.forEach((s) =>
      groups.set(Number(s.dataset.slide), {
        texts: [...s.querySelectorAll<HTMLElement>("[data-at]")],
        fades: [...s.querySelectorAll<HTMLElement>("[data-fade]")],
      })
    );

    let started = false;
    let active = -1;
    let mode = "";
    let raf = 0;
    let pose: Frame = DESKTOP[0];
    let e = 0;
    let mx = 0, my = 0, tx = 0, ty = 0, praf = 0;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const applyTf = () => {
      const rx = pose.rx - 3 * my * e;
      const ry = pose.ry + 4 * mx * e;
      stage.style.setProperty(
        "--tf",
        `perspective(2200px) translate(${pose.x}%, ${pose.y}%) rotateX(${rx.toFixed(3)}deg) rotateY(${ry.toFixed(3)}deg) rotateZ(${pose.rz}deg) scale(${pose.s})`
      );
    };
    const pointerLoop = () => {
      mx += (tx - mx) * 0.08;
      my += (ty - my) * 0.08;
      applyTf();
      praf = Math.abs(tx - mx) + Math.abs(ty - my) > 0.002 ? requestAnimationFrame(pointerLoop) : 0;
    };
    const onPointer = (ev: PointerEvent) => {
      if (ev.pointerType !== "mouse") return;
      tx = (ev.clientX / window.innerWidth) * 2 - 1;
      ty = (ev.clientY / window.innerHeight) * 2 - 1;
      if (!praf) praf = requestAnimationFrame(pointerLoop);
    };
    if (fine) window.addEventListener("pointermove", onPointer, { passive: true });

    const switchSlide = (q: number) => {
      const r = Math.round(q);
      const next = Math.abs(q - r) < 0.3 ? r : -1;
      if (!started || next === active) return;
      const prev = groups.get(active);
      prev?.texts.forEach((el) => hideText(el));
      prev?.fades.forEach(hideFade);
      const cur = groups.get(next);
      cur?.texts.forEach((el, i) => playText(el, { delay: 0.05 + 0.15 * i }));
      cur?.fades.forEach((el) => playFade(el, { delay: 0.3 }));
      active = next;
    };

    const update = () => {
      raf = 0;
      const rect = track.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      const q = progressToSlide(range > 0 ? clamp(-rect.top / range) : 0);
      const mobile = window.innerWidth < 1024;
      const frames = mobile ? MOBILE : DESKTOP;
      const a = frames[Math.floor(q)];
      const b = frames[Math.min(frames.length - 1, Math.ceil(q))];
      const h = q - Math.floor(q);
      const lerp = (u: number, v: number) => u + (v - u) * h;
      pose = { x: lerp(a.x, b.x), y: lerp(a.y, b.y), rx: lerp(a.rx, b.rx), ry: lerp(a.ry, b.ry), rz: lerp(a.rz, b.rz), s: lerp(a.s, b.s), z: lerp(a.z, b.z) };
      e = clamp(q);
      sticky.style.setProperty("--e", e.toFixed(4));
      sticky.style.setProperty("--zm", pose.z.toFixed(3));

      if (mobile) {
        const vh = window.innerHeight;
        const cardH = Math.min(0.66 * wrap.clientWidth, 0.42 * vh);
        const top = Math.max(112, 0.13 * vh);
        wrap.style.top = `${(72 + (top - 72) * e).toFixed(1)}px`;
        wrap.style.bottom = `${(8 + (vh - top - cardH - 8) * e).toFixed(1)}px`;
      } else {
        wrap.style.top = "";
        wrap.style.bottom = "";
      }
      applyTf();

      slides.forEach((s) => {
        const o = clamp(1 - 1.4 * Math.abs(q - Number(s.dataset.slide)));
        s.style.opacity = o.toFixed(3);
        s.style.pointerEvents = o > 0.6 ? "auto" : "none";
      });
      switchSlide(q);

      const bottomGap = rect.bottom - window.innerHeight;
      const m = bottomGap < 72 || q < 0.05 ? "top" : q < 1.5 ? "hidden" : "dark";
      if (m !== mode) {
        mode = m;
        root.dataset.scene = m;
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();

    let cancelled = false;
    (async () => {
      await document.fonts?.ready;
      if (cancelled) return;
      groups.forEach((g) => {
        g.texts.forEach((el) => prepareText(el));
        g.fades.forEach(prepareFade);
      });
      started = true;
      update();
    })();

    return () => {
      cancelled = true;
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pointermove", onPointer);
      if (raf) cancelAnimationFrame(raf);
      if (praf) cancelAnimationFrame(praf);
      delete root.dataset.scene;
    };
  }, []);

  return (
    <section className="hs" data-scene>
      <div className="hs__track" ref={trackRef}>
        <div className="hs__sticky" ref={stickyRef}>
          <div className="hs__wrap" ref={wrapRef}>
            <div className="hs__stage" ref={stageRef}>
              <div className="hs__layer" style={{ ...depth(-1), opacity: "var(--e)" }} aria-hidden="true">
                <span className="hs__frame" style={{ opacity: 0.22 }} />
                <span className="hs__ticks">
                  {Array.from({ length: 9 }, (_, i) => <span key={i} />)}
                </span>
              </div>

              <div className="hs__card" style={{ transform: "var(--tf)" }}>
                <video
                  src="/videos/hero.mp4"
                  poster="/videos/hero-poster.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-hidden="true"
                />
                <div className="hs__shade" style={{ opacity: "calc(0.45 - var(--e) * 0.2)" }} />
                <span className="hs__chip hs__chip--corner" style={{ opacity: "var(--e)" }}>{dict.clip}</span>
              </div>

              <div className="hs__layer" style={{ ...depth(1), opacity: "var(--e)" }} aria-hidden="true">
                <span className="hs__frame" style={{ opacity: 0.3 }} />
                {dict.tools.map((tool, i) => {
                  const b = TOOL_BOXES[i % TOOL_BOXES.length];
                  return (
                    <span key={tool} className="hs__box" style={{ left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%`, height: `${b.h}%` }}>
                      <span className="hs__chip hs__box-label">{tool}</span>
                    </span>
                  );
                })}
                <span className="hs__chip hs__chip--edge">{dict.today}</span>
              </div>

              <div className="hs__layer" style={{ ...depth(2), opacity: "var(--e)" }} aria-hidden="true">
                <span className="hs__frame" style={{ opacity: 0.3 }} />
                <svg className="hs__flow">
                  {NODE_X.slice(0, -1).map((x, i) => (
                    <line key={x} x1={`${x * 100}%`} x2={`${NODE_X[i + 1] * 100}%`} y1="50%" y2="50%" />
                  ))}
                </svg>
                <span className="hs__dot" />
                {dict.nodes.map((n, i) => (
                  <span
                    key={n}
                    className="hs__chip hs__node"
                    style={{ left: `${NODE_X[i] * 100}%`, animationDelay: `${(1.2 * i).toFixed(1)}s` }}
                  >
                    {n}
                  </span>
                ))}
                <span className="hs__chip hs__chip--edge">{dict.system}</span>
              </div>
            </div>
          </div>

          <div className="hs__title" style={{ opacity: "calc(1 - var(--e) * 3)" }}>
            <h1 className="hero__title" data-at="" data-at-manual="" data-hero-title="">
              {title[0]}
              <br />
              {title[1]}
            </h1>
          </div>

          <div className="hs__slide hs__slide--intro" data-slide="1">
            <h2 className="hs__h" data-at="" data-at-manual="">{dict.intro.title}</h2>
            <p className="hs__p" data-at="body" data-at-manual="">{dict.intro.text}</p>
          </div>

          {dict.slides.map((s, n) => (
            <div key={s.tag} className="hs__slide hs__slide--side" data-slide={n + 2}>
              <Link href={`/${locale}/services/${s.href}`} className="hs__tag" data-fade="">{s.tag}</Link>
              <Link href={`/${locale}/services/${s.href}`} className="hs__link">
                <h2 className="hs__h hs__h--pre" data-at="" data-at-manual="">{s.title}</h2>
              </Link>
              <p className="hs__p" data-at="body" data-at-manual="">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
