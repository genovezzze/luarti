"use client";

/**
 * Hero scroll scene ("exploded view").
 *
 * The page scrolls through a tall track while the scene stays pinned. Scroll
 * progress is turned into a continuous stage value q (0 = full-width video,
 * 1..n = text slides). From q we compute, with formulas rather than keyframe
 * tables:
 *  - the stage pose: an orbit that slowly swings the stack from facing the
 *    text towards facing the reader;
 *  - the spread: layers pull apart diagonally (x, y and z), like an exploded
 *    technical drawing - the video card stays in the middle of the stack.
 * The mouse nudges each layer sideways in proportion to its depth (parallax).
 */

import Link from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";
import type { Dict } from "@/lib/i18n";
import { hideFade, hideText, playFade, playText, prepareFade, prepareText, reducedMotion } from "@/lib/textMotion";

type Props = { title: [string, string] | string[]; dict: Dict["scene"]; locale: string };

/** Number of stages after the opening one: intro + three service slides. */
const STAGES = 4;
/** Share of each scroll segment spent moving; the rest is a pause on the slide. */
const MOVE = 0.62;
/** Dashed "today" boxes on the tools layer, in % of the card. */
const TOOL_BOXES = [
  { x: 5, y: 12, w: 27, h: 32 },
  { x: 60, y: 9, w: 33, h: 28 },
  { x: 8, y: 57, w: 31, h: 30 },
  { x: 55, y: 52, w: 37, h: 35 },
];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
/** Ken Perlin's smootherstep: zero velocity and acceleration at both ends. */
const smoother = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);

/** Scroll progress (0..1) → stage value q (0..STAGES), pausing on each stage. */
function stageFromProgress(p: number) {
  const seg = 1 / STAGES;
  const i = Math.min(STAGES - 1, Math.floor(p / seg));
  const local = (p - i * seg) / seg;
  return i + smoother(clamp01(local / MOVE));
}

type Pose = { x: number; y: number; yaw: number; pitch: number; roll: number; scale: number; spread: number };

/** Pose of the stack on a given stage (q >= 1). Desktop sits to the right of the text. */
function orbit(q: number, mobile: boolean): Pose {
  const t = (q - 1) / (STAGES - 1); // 0..1 across the text slides
  const yaw = -26 + 44 * t; // swings from facing the text to facing the reader
  const pitch = 14 - 6 * t + 3 * Math.sin(t * Math.PI);
  const roll = 1.8 * Math.sin(t * Math.PI * 2);
  const spread = 1 + 0.35 * Math.sin(t * Math.PI); // most open in the middle
  // Intro slide: centred above the text; from the next slide on it moves aside for the copy
  const aside = smoother(clamp01(q - 1));
  return mobile
    ? { x: 0, y: 0, yaw: yaw * 0.7, pitch: pitch * 0.8, roll, scale: 0.8, spread }
    : { x: 15 * aside, y: -5 + 6 * aside, yaw, pitch, roll, scale: 0.56 - 0.06 * aside, spread };
}

const FLAT: Pose = { x: 0, y: 0, yaw: 0, pitch: 0, roll: 0, scale: 1, spread: 0 };

function mix(a: Pose, b: Pose, k: number): Pose {
  const m = (u: number, v: number) => u + (v - u) * k;
  return { x: m(a.x, b.x), y: m(a.y, b.y), yaw: m(a.yaw, b.yaw), pitch: m(a.pitch, b.pitch), roll: m(a.roll, b.roll), scale: m(a.scale, b.scale), spread: m(a.spread, b.spread) };
}

/** Layer index in the stack: negative = behind the video card, positive = in front. */
const layer = (k: number): CSSProperties => ({ "--k": k } as CSSProperties);

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

    // Text groups per stage: 0 = hero title, 1..n = slides
    const slides = [...sticky.querySelectorAll<HTMLElement>("[data-slide]")];
    const groups = new Map<number, { texts: HTMLElement[]; fades: HTMLElement[] }>();
    groups.set(0, { texts: heroTitle ? [heroTitle] : [], fades: [] });
    for (const s of slides) {
      groups.set(Number(s.dataset.slide), {
        texts: [...s.querySelectorAll<HTMLElement>("[data-at]")],
        fades: [...s.querySelectorAll<HTMLElement>("[data-fade]")],
      });
    }

    let ready = false;
    let shown = -1;
    let headerMode = "";
    let frame = 0;
    let open = 0;

    // Pointer parallax: target and smoothed value, -1..1
    const ptr = { tx: 0, ty: 0, x: 0, y: 0, raf: 0 };
    const hasMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const parallax = () => {
      ptr.x += (ptr.tx - ptr.x) * 0.1;
      ptr.y += (ptr.ty - ptr.y) * 0.1;
      sticky.style.setProperty("--px", `${(ptr.x * 14 * open).toFixed(2)}px`);
      sticky.style.setProperty("--py", `${(ptr.y * 10 * open).toFixed(2)}px`);
      ptr.raf = Math.abs(ptr.tx - ptr.x) + Math.abs(ptr.ty - ptr.y) > 0.001 ? requestAnimationFrame(parallax) : 0;
    };
    const onPointer = (ev: PointerEvent) => {
      if (ev.pointerType !== "mouse") return;
      ptr.tx = (ev.clientX / window.innerWidth) * 2 - 1;
      ptr.ty = (ev.clientY / window.innerHeight) * 2 - 1;
      if (!ptr.raf) ptr.raf = requestAnimationFrame(parallax);
    };
    if (hasMouse) window.addEventListener("pointermove", onPointer, { passive: true });

    const showStage = (q: number) => {
      const nearest = Math.round(q);
      const target = Math.abs(q - nearest) < 0.25 ? nearest : -1;
      if (!ready || target === shown) return;
      const out = groups.get(shown);
      out?.texts.forEach(hideText);
      out?.fades.forEach(hideFade);
      const inn = groups.get(target);
      inn?.texts.forEach((el, i) => playText(el, { delay: 0.1 + 0.12 * i }));
      inn?.fades.forEach((el) => playFade(el, { delay: 0.25 }));
      shown = target;
    };

    const render = () => {
      frame = 0;
      const box = track.getBoundingClientRect();
      const travel = box.height - window.innerHeight;
      const q = stageFromProgress(travel > 0 ? clamp01(-box.top / travel) : 0);
      const mobile = window.innerWidth < 1024;

      open = clamp01(q);
      const pose = mix(FLAT, orbit(Math.max(1, q), mobile), open);
      const unit = mobile ? 0.55 : 1;

      sticky.style.setProperty("--open", open.toFixed(4));
      stage.style.transform =
        `translate(${pose.x.toFixed(2)}%, ${pose.y.toFixed(2)}%) ` +
        `rotateX(${pose.pitch.toFixed(2)}deg) rotateY(${pose.yaw.toFixed(2)}deg) rotateZ(${pose.roll.toFixed(2)}deg) ` +
        `scale(${pose.scale.toFixed(4)})`;
      // Diagonal spread per layer step
      sticky.style.setProperty("--sx", `${(10 * unit * pose.spread).toFixed(1)}px`);
      sticky.style.setProperty("--sy", `${(-8 * unit * pose.spread).toFixed(1)}px`);
      sticky.style.setProperty("--sz", `${(120 * unit * pose.spread).toFixed(1)}px`);

      if (mobile) {
        // Card moves up and shrinks to a fixed height; slide text sits under it
        const vh = window.innerHeight;
        const cardH = Math.min(0.64 * wrap.clientWidth, 0.4 * vh);
        const top = Math.max(100, 0.12 * vh);
        wrap.style.top = `${(72 + (top - 72) * open).toFixed(1)}px`;
        wrap.style.bottom = `${(8 + (vh - top - cardH - 8) * open).toFixed(1)}px`;
        sticky.style.setProperty("--slide-top", `${Math.round(top + cardH + 40)}px`);
      } else {
        wrap.style.top = "";
        wrap.style.bottom = "";
        sticky.style.removeProperty("--slide-top");
      }

      for (const s of slides) {
        const o = clamp01(1 - 1.6 * Math.abs(q - Number(s.dataset.slide)));
        s.style.opacity = o.toFixed(3);
        s.style.pointerEvents = o > 0.6 ? "auto" : "none";
      }
      showStage(q);

      // Header style: light over the opening video and after the scene, hidden in between, dark on slides
      const nearEnd = box.bottom - window.innerHeight < 72;
      const mode = nearEnd || q < 0.05 ? "top" : q < 1.5 ? "hidden" : "dark";
      if (mode !== headerMode) {
        headerMode = mode;
        root.dataset.scene = mode;
      }
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    render();

    let alive = true;
    (async () => {
      await document.fonts?.ready;
      if (!alive) return;
      groups.forEach((g) => {
        g.texts.forEach((el) => prepareText(el));
        g.fades.forEach(prepareFade);
      });
      ready = true;
      render();
    })();

    return () => {
      alive = false;
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      window.removeEventListener("pointermove", onPointer);
      if (frame) cancelAnimationFrame(frame);
      if (ptr.raf) cancelAnimationFrame(ptr.raf);
      delete root.dataset.scene;
    };
  }, []);

  const nodes = dict.nodes;
  const nodeX = nodes.map((_, i) => (i + 0.5) / nodes.length);

  return (
    <section className="hs" data-scene>
      <div className="hs__track" ref={trackRef}>
        <div className="hs__sticky" ref={stickyRef}>
          <div className="hs__wrap" ref={wrapRef}>
            <div className="hs__stage" ref={stageRef}>
              {/* Back: blueprint plate with corner marks */}
              <div className="hs__layer hs__layer--back" style={layer(-1)} aria-hidden="true">
                <span className="hs__frame hs__frame--faint" />
                <span className="hs__corner hs__corner--tl" />
                <span className="hs__corner hs__corner--tr" />
                <span className="hs__corner hs__corner--bl" />
                <span className="hs__corner hs__corner--br" />
              </div>

              {/* Middle: the video card */}
              <div className="hs__card" style={layer(0)}>
                <video src="/videos/hero.mp4" poster="/videos/hero-poster.jpg" autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
                <div className="hs__shade" />
                <span className="hs__chip hs__chip--corner">{dict.clip}</span>
              </div>

              {/* Front 1: the scattered tools of today */}
              <div className="hs__layer" style={layer(1)} aria-hidden="true">
                <span className="hs__frame" />
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

              {/* Front 2: one system, a request travelling through the steps */}
              <div className="hs__layer" style={layer(2)} aria-hidden="true">
                <span className="hs__frame" />
                <svg className="hs__flow">
                  <line x1={`${nodeX[0] * 100}%`} x2={`${nodeX[nodeX.length - 1] * 100}%`} y1="50%" y2="50%" />
                </svg>
                <span className="hs__pulse" style={{ "--from": `${nodeX[0] * 100}%`, "--to": `${nodeX[nodeX.length - 1] * 100}%` } as CSSProperties} />
                {nodes.map((n, i) => (
                  <span key={n} className="hs__chip hs__node" style={{ left: `${nodeX[i] * 100}%`, animationDelay: `${(i * 1.1).toFixed(1)}s` }}>
                    {n}
                  </span>
                ))}
                <span className="hs__chip hs__chip--edge">{dict.system}</span>
              </div>
            </div>
          </div>

          <div className="hs__title">
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
