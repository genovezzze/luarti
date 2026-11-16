"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import type { Dict } from "@/lib/i18n";
import { ArrowRight } from "./Icons";

type Props = { dict: Dict["approach"] };

/* ───────── isometric diagram ───────── */

const W = 420; // plane width
const H = 180; // plane height
const CX = 330;
const PLANES = [100, 250, 400]; // y centres: interface, process, data

/** Point on an isometric plane: u, v in 0..1 */
const pt = (cy: number, u: number, v: number) => ({
  x: CX + (u - v) * (W / 2),
  y: cy - H / 2 + (u + v) * (H / 2),
});

function Plane({ cy, label, visible }: { cy: number; label: string; visible: boolean }) {
  const corners = [pt(cy, 0, 0), pt(cy, 1, 0), pt(cy, 1, 1), pt(cy, 0, 1)];
  const lines = [];
  for (let i = 1; i < 8; i++) {
    const t = i / 8;
    const a = pt(cy, t, 0), b = pt(cy, t, 1), c = pt(cy, 0, t), d = pt(cy, 1, t);
    lines.push(<line key={`u${i}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />);
    lines.push(<line key={`v${i}`} x1={c.x} y1={c.y} x2={d.x} y2={d.y} />);
  }
  const left = pt(cy, 0, 1);
  return (
    <g className={`ap-plane ${visible ? "is-on" : ""}`}>
      <polygon className="ap-plane__edge" points={corners.map((p) => `${p.x},${p.y}`).join(" ")} />
      <g className="ap-plane__grid">{lines}</g>
      <text className="ap-plane__label" x={left.x - 14} y={left.y + 4} textAnchor="end">{label}</text>
    </g>
  );
}

function Node({ cy, u, v, label, visible, pulse }: { cy: number; u: number; v: number; label: string; visible: boolean; pulse?: boolean }) {
  const p = pt(cy, u, v);
  return (
    <g className={`ap-node ${visible ? "is-on" : ""} ${pulse ? "ap-node--pulse" : ""}`} transform={`translate(${p.x} ${p.y})`}>
      <polygon points="0,-9 18,0 0,9 -18,0" />
      <text x="16" y="-10">{label}</text>
    </g>
  );
}

function Link({ a, b, visible }: { a: { x: number; y: number }; b: { x: number; y: number }; visible: boolean }) {
  return <line className={`ap-link ${visible ? "is-on" : ""}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />;
}

function Diagram({ step, d }: { step: number; d: Dict["approach"]["diagram"] }) {
  const [ui, pr, da] = PLANES;
  const data = [
    { u: 0.22, v: 0.25 },
    { u: 0.5, v: 0.72 },
    { u: 0.82, v: 0.38 },
  ];
  const proc = [
    { u: 0.3, v: 0.4 },
    { u: 0.72, v: 0.45 },
  ];
  const face = [
    { u: 0.32, v: 0.3 },
    { u: 0.72, v: 0.55 },
  ];
  const all = step >= 1;
  return (
    <svg className="ap-diagram" viewBox="0 0 660 500" aria-hidden="true">
      <Plane cy={ui} label={d.layers[0]} visible={all} />
      <Plane cy={pr} label={d.layers[1]} visible={all} />
      <Plane cy={da} label={d.layers[2]} visible />

      {/* step 1: scattered data, loose dashed links */}
      <Link a={pt(da, data[0].u, data[0].v)} b={pt(da, data[1].u, data[1].v)} visible />
      <Link a={pt(da, data[1].u, data[1].v)} b={pt(da, data[2].u, data[2].v)} visible />
      <Link a={pt(da, data[0].u, data[0].v)} b={pt(da, data[2].u, data[2].v)} visible />

      {/* step 2+: layers connected */}
      <Link a={pt(da, data[0].u, data[0].v)} b={pt(pr, proc[0].u, proc[0].v)} visible={all} />
      <Link a={pt(da, data[2].u, data[2].v)} b={pt(pr, proc[1].u, proc[1].v)} visible={all} />
      <Link a={pt(pr, proc[0].u, proc[0].v)} b={pt(pr, proc[1].u, proc[1].v)} visible={all} />
      <Link a={pt(pr, proc[0].u, proc[0].v)} b={pt(ui, face[0].u, face[0].v)} visible={all} />
      <Link a={pt(pr, proc[1].u, proc[1].v)} b={pt(ui, face[1].u, face[1].v)} visible={all} />
      <Link a={pt(ui, face[0].u, face[0].v)} b={pt(ui, 0.15, 0.72)} visible={step >= 2} />
      <Link a={pt(ui, face[1].u, face[1].v)} b={pt(ui, 0.15, 0.72)} visible={step >= 2} />

      {data.map((n, i) => <Node key={`d${i}`} cy={da} {...n} label={d.data[i]} visible />)}
      {proc.map((n, i) => <Node key={`p${i}`} cy={pr} {...n} label={d.process[i]} visible={all} />)}
      {face.map((n, i) => <Node key={`f${i}`} cy={ui} {...n} label={d.ui[i]} visible={all} />)}
      <Node cy={ui} u={0.15} v={0.72} label={d.extra} visible={step >= 2} pulse />
    </svg>
  );
}

/* ───────── pinned, scroll-driven steps ───────── */

type LenisLike = { scrollTo: (target: number, opts?: { duration?: number }) => void };

export function ApproachSlider({ dict }: Props) {
  const total = dict.steps.length;
  const [step, setStep] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);
  const pinned = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      pinned.current = window.innerWidth >= 1024;
      if (!pinned.current) return;
      const rect = track.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      const p = range > 0 ? Math.min(1, Math.max(0, -rect.top / range)) : 0;
      const pos = p * total;
      setStep(Math.min(total - 1, Math.floor(pos)));
      barsRef.current?.querySelectorAll<HTMLElement>(".ap__bar span").forEach((el, i) => {
        el.style.width = `${Math.min(1, Math.max(0, pos - i)) * 100}%`;
      });
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [total]);

  const go = useCallback(
    (n: number) => {
      const target = Math.min(total - 1, Math.max(0, n));
      const track = trackRef.current;
      if (!pinned.current || !track) {
        setStep(target);
        barsRef.current?.querySelectorAll<HTMLElement>(".ap__bar span").forEach((el, i) => {
          el.style.width = i <= target ? "100%" : "0%";
        });
        return;
      }
      const top = track.getBoundingClientRect().top + window.scrollY;
      const range = track.offsetHeight - window.innerHeight;
      const y = top + range * ((target + 0.5) / total);
      const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
      if (lenis) lenis.scrollTo(y, { duration: 1.1 });
      else window.scrollTo({ top: y, behavior: "smooth" });
    },
    [total]
  );

  const s = dict.steps[step];
  const label = dict.stepLabel.replace("{n}", String(step + 1)).replace("{total}", String(total));

  return (
    <section id="approach" className="ap-section">
      <div className="container">
        <div className="section-head section-head--left ap-head">
          <h2 className="h2">{dict.title}</h2>
          <p className="lead">{dict.text}</p>
        </div>
      </div>
      <div className="ap-track" ref={trackRef} style={{ "--steps": total } as CSSProperties}>
        <div className="ap-sticky">
          <div className="container ap-inner">

            <div className="ap">
              <div className="ap__text" key={step}>
                <span className="ap__badge">{label}</span>
                <h3 className="ap__title">{s.title}</h3>
                <p className="ap__desc">{s.text}</p>
                <p className="ap__meta">
                  <span className="ap__time">{s.time}</span>
                  <span>{s.note}</span>
                </p>
              </div>

              <div className="ap__visual">
                <Diagram step={step} d={dict.diagram} />
              </div>

              <div className="ap__controls">
                <button type="button" className="ap__arrow ap__arrow--prev" onClick={() => go(step - 1)} aria-label={dict.prev} disabled={step === 0}>
                  <ArrowRight />
                </button>
                <button type="button" className="ap__arrow" onClick={() => go(step + 1)} aria-label={dict.next} disabled={step === total - 1}>
                  <ArrowRight />
                </button>
                <div className="ap__bars" ref={barsRef}>
                  {dict.steps.map((st, i) => (
                    <button key={st.title} type="button" className="ap__bar" onClick={() => go(i)} aria-label={st.title}>
                      <span style={{ width: i === 0 ? "0%" : "0%" }} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
