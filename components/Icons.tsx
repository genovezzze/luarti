type P = { className?: string };
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const ArrowRight = ({ className }: P) => (
  <svg {...base} className={className}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const ArrowUpRight = ({ className }: P) => (
  <svg {...base} className={className}><path d="M7 17 17 7M8 7h9v9" /></svg>
);
export const Home = ({ className }: P) => (
  <svg {...base} className={className}><path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z" /></svg>
);
export const Box = ({ className }: P) => (
  <svg {...base} className={className}><path d="M12 3 4 7v10l8 4 8-4V7zM4 7l8 4 8-4M12 11v10" /></svg>
);
export const Check = ({ className }: P) => (
  <svg {...base} className={className}><circle cx="12" cy="12" r="8.5" /><path d="m8.5 12 2.5 2.5 4.5-5" /></svg>
);
export const Bars = ({ className }: P) => (
  <svg {...base} className={className}><path d="M5 20V12M10 20V6M15 20v-9M20 20V9M3 20h18" /></svg>
);
export const Tick = ({ className }: P) => (
  <svg {...base} className={className}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
);
export const Menu = ({ className }: P) => (
  <svg {...base} className={className}><path d="M4 8h16M4 16h16" /></svg>
);
export const Close = ({ className }: P) => (
  <svg {...base} className={className}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
