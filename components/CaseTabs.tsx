"use client";

import { useState, type ReactNode } from "react";

type Props = {
  tabs: { id: string; label: string; content: ReactNode; count?: string }[];
};

/** Simple tabs: "Screens" / "What we solved" on a case page. */
export function CaseTabs({ tabs }: Props) {
  const [active, setActive] = useState(tabs[0]?.id);
  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <div className="ctabs">
      <div className="ctabs__bar" role="tablist">
        <div className="ctabs__list">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={t.id === current.id}
              className={`ctabs__tab ${t.id === current.id ? "is-active" : ""}`}
              onClick={() => setActive(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        {current.count && <span className="ctabs__count">{current.count}</span>}
      </div>
      <div className="ctabs__panel" role="tabpanel" key={current.id}>
        {current.content}
      </div>
    </div>
  );
}
