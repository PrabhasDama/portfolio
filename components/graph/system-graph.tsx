"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";

/*
 * A toy model of how CalTrack's modules read from each other. Changing a node
 * recomputes everything downstream in topological order: each module runs
 * exactly once, only after all of its changed inputs have settled, so nothing
 * ever reads a half-updated value. The progress → targets feedback edge is
 * deferred to the next weekly tick instead of looping.
 */

type Id =
  | "log"
  | "progress"
  | "targets"
  | "plan"
  | "grocery"
  | "stores"
  | "pantry"
  | "purchases"
  | "budget";

const NODES: Record<
  Id,
  { label: string; key: string; note: string; change: string; derive: string }
> = {
  log: {
    label: "food log",
    key: "food_log",
    note: "today",
    change: "log a snack",
    derive: "append to today’s intake",
  },
  progress: {
    label: "progress",
    key: "progress",
    note: "adherence",
    change: "add a weigh-in",
    derive: "recompute adherence vs targets",
  },
  targets: {
    label: "targets",
    key: "targets",
    note: "kcal · macros",
    change: "raise the protein target",
    derive: "adjust daily kcal and macros",
  },
  plan: {
    label: "meal plan",
    key: "meal_plan",
    note: "7 days",
    change: "swap tuesday’s dinner",
    derive: "re-fit the week to targets",
  },
  grocery: {
    label: "grocery list",
    key: "grocery_list",
    note: "needs − stock",
    change: "add an item by hand",
    derive: "plan needs minus pantry stock",
  },
  stores: {
    label: "store compare",
    key: "store_compare",
    note: "2+ stores",
    change: "switch preferred store",
    derive: "re-price the list, re-split carts",
  },
  pantry: {
    label: "pantry",
    key: "pantry",
    note: "on hand",
    change: "mark eggs as used up",
    derive: "update stock on hand",
  },
  purchases: {
    label: "purchases",
    key: "purchases",
    note: "receipts",
    change: "scan a receipt",
    derive: "record purchase",
  },
  budget: {
    label: "budget",
    key: "budget",
    note: "$ / week",
    change: "lower the weekly budget",
    derive: "spend vs. weekly budget",
  },
};

type Edge = { from: Id; to: Id; bend?: number; feedback?: boolean };
const EDGES: Edge[] = [
  { from: "log", to: "progress" },
  { from: "progress", to: "targets", bend: 22, feedback: true },
  { from: "targets", to: "progress", bend: 22 },
  { from: "targets", to: "plan" },
  { from: "plan", to: "grocery" },
  { from: "pantry", to: "grocery" },
  { from: "grocery", to: "stores" },
  { from: "stores", to: "budget" },
  { from: "purchases", to: "pantry" },
  { from: "purchases", to: "budget" },
];

type Layout = {
  name: "wide" | "narrow";
  width: number;
  height: number;
  w: number;
  h: number;
  pos: Record<Id, [number, number]>;
  legend: [number, number];
};
const WIDE: Layout = {
  name: "wide",
  width: 900,
  height: 400,
  w: 150,
  h: 54,
  pos: {
    log: [95, 60],
    progress: [330, 60],
    targets: [565, 60],
    plan: [800, 60],
    grocery: [565, 200],
    stores: [800, 200],
    pantry: [330, 340],
    purchases: [565, 340],
    budget: [800, 340],
  },
  legend: [22, 190],
};
const NARROW: Layout = {
  name: "narrow",
  width: 340,
  height: 540,
  w: 136,
  h: 50,
  pos: {
    log: [78, 36],
    progress: [262, 36],
    plan: [78, 146],
    targets: [262, 146],
    grocery: [78, 256],
    pantry: [262, 256],
    stores: [78, 366],
    purchases: [262, 366],
    budget: [78, 476],
  },
  legend: [196, 462],
};

const WAVE_MS = 520;
const HOLD_MS = 2600;
const DEMO: Id[] = ["purchases", "plan", "targets", "log"];

type Run = {
  id: number;
  source: Id;
  /** Longest-path depth from the source; only affected modules have one. */
  level: Partial<Record<Id, number>>;
  /** Forward edges inside the affected subgraph. */
  inner: Edge[];
  depth: number;
};

function propagate(source: Id, id: number): Run {
  const forward = EDGES.filter((e) => !e.feedback);
  const affected = new Set<Id>([source]);
  const stack: Id[] = [source];
  while (stack.length) {
    const from = stack.pop()!;
    for (const e of forward)
      if (e.from === from && !affected.has(e.to)) {
        affected.add(e.to);
        stack.push(e.to);
      }
  }
  // Kahn's algorithm over the affected subgraph, tracking the longest path.
  const inner = forward.filter(
    (e) => affected.has(e.from) && affected.has(e.to),
  );
  const pending = new Map<Id, number>();
  for (const e of inner) pending.set(e.to, (pending.get(e.to) ?? 0) + 1);
  const level: Run["level"] = { [source]: 0 };
  const queue: Id[] = [source];
  while (queue.length) {
    const from = queue.shift()!;
    for (const e of inner.filter((e) => e.from === from)) {
      level[e.to] = Math.max(level[e.to] ?? 0, level[from]! + 1);
      pending.set(e.to, pending.get(e.to)! - 1);
      if (pending.get(e.to) === 0) queue.push(e.to);
    }
  }
  const depth = Math.max(...Object.values(level));
  return { id, source, level, inner, depth };
}

const inputsOf = (run: Run, id: Id) => run.inner.filter((e) => e.to === id);
/** How many of a module's changed inputs have settled before `step`. */
const arrived = (run: Run, id: Id, step: number) =>
  inputsOf(run, id).filter((e) => run.level[e.from]! < step).length;

type Line =
  | { kind: "cmd"; source: Id }
  | { kind: "node"; wave: number; node: Id }
  | { kind: "wait"; node: Id; on: Id[] }
  | { kind: "defer"; from: Id; to: Id }
  | { kind: "done"; count: number; waves: number };

function logLines(run: Run, step: number): Line[] {
  const lines: Line[] = [{ kind: "cmd", source: run.source }];
  const ids = Object.keys(run.level) as Id[];
  for (let s = 1; s <= Math.min(step, run.depth + 1); s++) {
    for (const id of ids)
      if (run.level[id] === s) lines.push({ kind: "node", wave: s, node: id });
    for (const id of ids)
      if (
        run.level[id]! > s &&
        arrived(run, id, s) > 0 &&
        arrived(run, id, s - 1) === 0
      )
        lines.push({
          kind: "wait",
          node: id,
          on: inputsOf(run, id)
            .filter((e) => run.level[e.from]! >= s)
            .map((e) => e.from),
        });
    for (const e of EDGES)
      if (e.feedback && run.level[e.from] === s - 1)
        lines.push({ kind: "defer", from: e.from, to: e.to });
  }
  if (step > run.depth)
    lines.push({ kind: "done", count: ids.length - 1, waves: run.depth });
  return lines;
}

/** Point where the segment from (cx, cy) toward (tx, ty) leaves a w×h box, pushed out by pad. */
function exit(
  cx: number,
  cy: number,
  tx: number,
  ty: number,
  hw: number,
  hh: number,
  pad: number,
) {
  const dx = tx - cx;
  const dy = ty - cy;
  const scale = Math.min(
    dx ? hw / Math.abs(dx) : Infinity,
    dy ? hh / Math.abs(dy) : Infinity,
  );
  const length = Math.hypot(dx, dy);
  return [
    +(cx + dx * scale + (dx / length) * pad).toFixed(1),
    +(cy + dy * scale + (dy / length) * pad).toFixed(1),
  ];
}

function edgePath(edge: Edge, layout: Layout) {
  const [ax, ay] = layout.pos[edge.from];
  const [bx, by] = layout.pos[edge.to];
  const hw = layout.w / 2;
  const hh = layout.h / 2;
  if (!edge.bend) {
    const [sx, sy] = exit(ax, ay, bx, by, hw, hh, 3);
    const [ex, ey] = exit(bx, by, ax, ay, hw, hh, 7);
    return `M${sx},${sy} L${ex},${ey}`;
  }
  const length = Math.hypot(bx - ax, by - ay);
  const qx = (ax + bx) / 2 - ((by - ay) / length) * edge.bend;
  const qy = (ay + by) / 2 + ((bx - ax) / length) * edge.bend;
  const [sx, sy] = exit(ax, ay, qx, qy, hw, hh, 3);
  const [ex, ey] = exit(bx, by, qx, qy, hw, hh, 7);
  return `M${sx},${sy} Q${qx.toFixed(1)},${qy.toFixed(1)} ${ex},${ey}`;
}

export function SystemGraph({ label = "caltrack / dependency graph" }) {
  const [run, setRun] = useState<Run | null>(null);
  const [step, setStep] = useState(0);
  const [demo, setDemo] = useState(true);
  // Assume visible until the observer reports otherwise, so playback never depends on it firing.
  const [inView, setInView] = useState(true);
  const [reduced, setReduced] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const demoIndex = useRef(0);
  const uid = useId().replace(/:/g, "");

  const runId = useRef(0);

  // Reduced motion skips the wave-by-wave playback and shows the result.
  const start = useCallback(
    (source: Id) => {
      runId.current += 1;
      const next = propagate(source, runId.current);
      setRun(next);
      setStep(reduced ? next.depth + 1 : 0);
    },
    [reduced],
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 },
    );
    if (panel.current) observer.observe(panel.current);
    return () => {
      query.removeEventListener("change", sync);
      observer.disconnect();
    };
  }, []);

  // Advance one wave at a time.
  useEffect(() => {
    if (!run || step > run.depth) return;
    const timer = setTimeout(() => setStep((s) => s + 1), WAVE_MS);
    return () => clearTimeout(timer);
  }, [run, step]);

  // The demo cycles through a few sources until someone clicks a node.
  useEffect(() => {
    if (!demo || !inView || reduced) return;
    const finished = !run || step > run.depth;
    if (!finished) return;
    const timer = setTimeout(
      () => {
        start(DEMO[demoIndex.current % DEMO.length]);
        demoIndex.current += 1;
      },
      run ? HOLD_MS : 700,
    );
    return () => clearTimeout(timer);
  }, [demo, inView, reduced, run, step, start]);

  const choose = (id: Id) => {
    setDemo(false);
    start(id);
  };
  const onKey = (event: KeyboardEvent, id: Id) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      choose(id);
    }
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--mx",
      `${event.clientX - box.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--my",
      `${event.clientY - box.top}px`,
    );
  };

  const done = !run || step > run.depth;
  const nodeState = (id: Id) => {
    const level = run?.level[id];
    if (!run || level === undefined) return "idle";
    if (level === 0) return "source";
    if (level === step) return "hot";
    if (level < step) return "fresh";
    return arrived(run, id, step) > 0 ? "waiting" : "idle";
  };
  const edgeLit = (edge: Edge) =>
    !!run && run.inner.includes(edge) && run.level[edge.from]! < step;
  const packets = run
    ? EDGES.filter(
        (e) =>
          run.level[e.from] === step && (run.inner.includes(e) || e.feedback),
      )
    : [];
  const lines = run ? logLines(run, step) : [];

  const renderGraph = (layout: Layout) => (
    <svg
      className={`graph-svg is-${layout.name} ${done ? "is-done" : ""}`}
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      role="group"
      aria-label="CalTrack modules and the modules that read from them"
    >
      <defs>
        {(["idle", "lit"] as const).map((kind) => (
          <marker
            key={kind}
            id={`${uid}-${layout.name}-${kind}`}
            viewBox="0 0 10 10"
            refX="7"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto"
          >
            <path d="M1,1 L8,5 L1,9" className={`arrow-${kind}`} />
          </marker>
        ))}
      </defs>
      {EDGES.map((edge) => {
        const lit = edgeLit(edge);
        return (
          <path
            key={`${edge.from}-${edge.to}`}
            d={edgePath(edge, layout)}
            className={`edge ${edge.feedback ? "is-feedback" : ""} ${lit ? "is-lit" : ""}`}
            markerEnd={`url(#${uid}-${layout.name}-${lit ? "lit" : "idle"})`}
          />
        );
      })}
      {packets.map((edge) => (
        <path
          key={`${run!.id}-${step}-${edge.from}-${edge.to}`}
          d={edgePath(edge, layout)}
          pathLength={1}
          className={`packet ${edge.feedback ? "is-deferred" : ""}`}
        />
      ))}
      {(Object.keys(NODES) as Id[]).map((id) => {
        const [x, y] = layout.pos[id];
        const node = NODES[id];
        const state = nodeState(id);
        return (
          <g
            key={id}
            className={`node is-${state}`}
            transform={`translate(${x - layout.w / 2} ${y - layout.h / 2})`}
            role="button"
            tabIndex={0}
            aria-label={`${node.label}: ${node.change}`}
            onClick={() => choose(id)}
            onKeyDown={(event) => onKey(event, id)}
          >
            <rect width={layout.w} height={layout.h} rx="3" />
            {state === "hot" || state === "source" ? (
              <rect
                key={`${run?.id}-${state}`}
                className="node-flash"
                width={layout.w}
                height={layout.h}
                rx="3"
              />
            ) : null}
            <text x="12" y={layout.h / 2 - 3} className="node-label">
              {node.label}
            </text>
            <text x="12" y={layout.h / 2 + 13} className="node-note">
              {state === "waiting"
                ? `waiting ${arrived(run!, id, step)}/${inputsOf(run!, id).length}`
                : node.note}
            </text>
          </g>
        );
      })}
      <g
        className="legend"
        transform={`translate(${layout.legend[0]} ${layout.legend[1]})`}
        aria-hidden="true"
      >
        <path d="M0,0 H26" className="edge" />
        <text x="34" y="4">
          reads from
        </text>
        <path d="M0,22 H26" className="edge is-feedback" />
        <text x="34" y="26">
          weekly feedback
        </text>
        <circle cx="13" cy="44" r="3.5" className="legend-dot" />
        <text x="34" y="48">
          change
        </text>
      </g>
    </svg>
  );

  return (
    <div
      className="graph"
      ref={panel}
      onPointerMove={onPointerMove}
      data-demo={demo || undefined}
    >
      <div className="graph-bar">
        <span>{label}</span>
        <span className="graph-status">
          {demo && !reduced ? (
            <>
              <i aria-hidden="true" /> demo · click any node
            </>
          ) : (
            "click any node to change it"
          )}
        </span>
      </div>
      <div className="graph-canvas">
        {renderGraph(WIDE)}
        {renderGraph(NARROW)}
      </div>
      <ol className="graph-log" aria-live="polite" aria-relevant="additions">
        {lines.length === 0 && (
          <li className="log-cmd">
            <span className="log-prompt">$</span> waiting for a change
            <span className="log-caret" aria-hidden="true" />
          </li>
        )}
        {lines.map((line, index) => {
          const key = `${run!.id}-${index}`;
          if (line.kind === "cmd")
            return (
              <li key={key} className="log-cmd">
                <span className="log-prompt">$</span> caltrack emit{" "}
                <b>{NODES[line.source].key}.changed</b>{" "}
                <span className="log-comment">
                  # {NODES[line.source].change}
                </span>
              </li>
            );
          if (line.kind === "node")
            return (
              <li key={key} className="log-row">
                <span className="log-wave">w{line.wave}</span>
                <span className="log-node">{NODES[line.node].key}</span>
                <span className="log-text">{NODES[line.node].derive}</span>
              </li>
            );
          if (line.kind === "wait")
            return (
              <li key={key} className="log-row is-quiet">
                <span className="log-wave">…</span>
                <span className="log-node">{NODES[line.node].key}</span>
                <span className="log-text">
                  waiting on {line.on.map((id) => NODES[id].key).join(", ")}
                </span>
              </li>
            );
          if (line.kind === "defer")
            return (
              <li key={key} className="log-row is-quiet">
                <span className="log-wave">»</span>
                <span className="log-node">{NODES[line.to].key}</span>
                <span className="log-text">
                  deferred to next weekly tick (feedback edge)
                </span>
              </li>
            );
          return (
            <li key={key} className="log-done">
              {line.count === 0
                ? `✓ nothing reads from ${NODES[run!.source].key}, done`
                : line.count === 1
                  ? "✓ 1 module recomputed"
                  : `✓ ${line.count} modules recomputed once each, in dependency order`}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
