"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { SystemGraph } from "@/components/graph/system-graph";
import { SentinelSim } from "@/components/graph/sentinel-sim";

export type SwitcherItem = {
  slug: string;
  name: string;
  category: string | null;
  shortDescription: string;
  live: string | null;
  source: string | null;
  visibility: string | null;
};

const visuals: Record<
  string,
  { render: () => React.ReactNode; caption: string }
> = {
  sentinel: {
    render: () => <SentinelSim />,
    caption:
      "A synthetic 15-minute contract run through simplified versions of Sentinel’s gates. Real market data can’t be shown here: Sentinel’s own data-rights rules don’t allow redistributing it.",
  },
  caltrack: {
    render: () => <SystemGraph />,
    caption:
      "A toy model of how CalTrack’s modules depend on each other. Change one and only what reads from it recomputes, in topological order, each module once and only after all its inputs settle. The dashed feedback edge waits for the next weekly tick instead of looping.",
  },
};

/** Tabbed hero: one live visual per project, so no single project owns the page. */
export function ProjectSwitcher({ items }: { items: SwitcherItem[] }) {
  const [active, setActive] = useState(items[0].slug);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = items.find((item) => item.slug === active)!;
  const visual = visuals[current.slug];

  const onKey = (event: KeyboardEvent, index: number) => {
    const delta =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (index + delta + items.length) % items.length;
    setActive(items[next].slug);
    tabs.current[next]?.focus();
  };

  return (
    <div className="switcher">
      <div className="switcher-tabs" role="tablist" aria-label="Projects">
        {items.map((item, index) => (
          <button
            key={item.slug}
            ref={(el) => {
              tabs.current[index] = el;
            }}
            role="tab"
            id={`tab-${item.slug}`}
            aria-selected={item.slug === active}
            aria-controls={`panel-${item.slug}`}
            tabIndex={item.slug === active ? 0 : -1}
            className="switcher-tab"
            onClick={() => setActive(item.slug)}
            onKeyDown={(event) => onKey(event, index)}
          >
            <span className="switcher-name">{item.slug}/</span>
            <span className="switcher-cat">{item.category?.toLowerCase()}</span>
          </button>
        ))}
      </div>
      <div
        className="switcher-panel"
        role="tabpanel"
        id={`panel-${current.slug}`}
        aria-labelledby={`tab-${current.slug}`}
      >
        <div className="switcher-head">
          <p>
            <b>{current.name}.</b> {current.shortDescription}
          </p>
          <p className="switcher-links">
            <Link href={`/projects/${current.slug}/`}>
              case study <span className="arrow">→</span>
            </Link>
            {current.live && (
              <a href={current.live} target="_blank" rel="noreferrer">
                live <span className="arrow">↗</span>
              </a>
            )}
            {current.source && (
              <a href={current.source} target="_blank" rel="noreferrer">
                source <span className="arrow">↗</span>
              </a>
            )}
            {current.visibility && (
              <span className="switcher-note">{current.visibility}</span>
            )}
          </p>
        </div>
        <figure key={current.slug} className="switcher-visual">
          {visual.render()}
          <figcaption>{visual.caption}</figcaption>
        </figure>
      </div>
    </div>
  );
}
