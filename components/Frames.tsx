import type { CSSProperties, ReactNode } from "react";

export type FrameLabel = { text: string; x: string; y: string };

type Props = {
  children: ReactNode;
  labels?: FrameLabel[];
  tone?: "light" | "dark";
  /** Draw the flowing contour lines over the content */
  lines?: boolean;
  className?: string;
};

/**
 * The LUARTI signature: content sitting inside a stack of offset outline
 * frames, with flowing "process" lines and labelled steps around it.
 */
export function Frames({ children, labels = [], tone = "light", lines = true, className }: Props) {
  return (
    <div className={`frames frames--${tone} ${className ?? ""}`} data-reveal>
      <span className="frames__f frames__f1" aria-hidden="true" />
      <span className="frames__f frames__f2" aria-hidden="true" />
      <span className="frames__f frames__f3" aria-hidden="true" />
      <div className="frames__content">{children}</div>
      {lines && <FlowLines />}
      {labels.map((l, i) => (
        <span
          key={l.text + i}
          className="pill pill--float"
          style={{ left: l.x, top: l.y, "--d": `${0.25 + i * 0.12}s` } as CSSProperties}
        >
          {l.text}
        </span>
      ))}
    </div>
  );
}

export function FlowLines({ className }: { className?: string }) {
  return (
    <svg
      className={`flowlines ${className ?? ""}`}
      viewBox="0 0 1000 600"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M-20 140 C 120 60, 220 220, 360 150 S 600 40, 720 120 S 920 260, 1020 180" />
      <path d="M-20 420 C 140 360, 260 500, 420 430 S 640 300, 780 380 S 940 520, 1020 470" />
      <path d="M180 -20 C 240 120, 120 240, 230 360 S 330 560, 280 620" />
      <path d="M760 -20 C 700 140, 860 220, 800 360 S 700 520, 820 620" />
    </svg>
  );
}
