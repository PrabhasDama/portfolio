"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/*
 * A simplified replay of Sentinel's decision engine on a synthetic 15-minute
 * contract. Prices are a random walk generated in the browser: Sentinel's
 * data-rights rules don't allow redistributing real Coinbase or Kalshi data.
 * The gates and tier rules follow docs/signals.md in the Sentinel repo,
 * with volatility and order flow reduced to toy versions.
 */

const CONTRACT_S = 900;
const TICK_S = 5;
const TICK_MS = 100;
const TICKS = CONTRACT_S / TICK_S;
const HOLD_MS = 2800;
const SIGMA_MIN = 0.0006;
const SIGMA_TICK = SIGMA_MIN * Math.sqrt(TICK_S / 60);
const TIERS = [15, 13, 11, 9, 7, 5, 3, 2, 1];

const rule = (tier: number) =>
  tier >= 11
    ? { cushion: 1.5, families: 3 }
    : tier >= 7
      ? { cushion: 1.25, families: 2 }
      : { cushion: 1, families: 2 };

type Side = 1 | -1;
type Lean = Side | 0;
type Gate = { name: string; ok: boolean; detail: string };
type Eval = {
  tier: number;
  side: Side;
  cushion: number;
  families: [Lean, Lean, Lean];
  quote: number;
  fresh: boolean;
  gates: Gate[];
  pass: boolean;
};
type LogLine = {
  id: number;
  tag: string;
  text: string;
  kind?: "lock" | "close";
};
type Contract = {
  id: number;
  target: number;
  prices: number[];
  drift: number;
  pressure: number;
  emaFast: number;
  emaSlow: number;
  stale: [number, number] | null;
  lastTier: number | null;
  lock: { tick: number; side: Side; tier: number } | null;
  settled: Side | null;
  log: LogLine[];
  current: Eval | null;
};

const gauss = () => {
  const u = 1 - Math.random();
  const v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};
/** Standard normal CDF (Abramowitz–Stegun 7.1.26). */
const phi = (x: number) => {
  const t = 1 / (1 + (0.3275911 * Math.abs(x)) / Math.SQRT2);
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) *
      t +
      0.254829592) *
      t *
      Math.exp(-(x * x) / 2);
  return x >= 0 ? (1 + y) / 2 : (1 - y) / 2;
};
const money = (n: number) =>
  n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
const dir = (side: Side) => (side === 1 ? "UP" : "DOWN");
const arrow = (lean: Lean) => (lean === 1 ? "▲" : lean === -1 ? "▼" : "–");

function newContract(id: number): Contract {
  const target = Math.round((60000 + Math.random() * 8000) / 10) * 10;
  const open = target * (1 + gauss() * SIGMA_MIN * 0.6);
  const stale: Contract["stale"] =
    Math.random() < 0.35
      ? (() => {
          const start = 20 + Math.floor(Math.random() * 120);
          return [start, start + 6 + Math.floor(Math.random() * 5)];
        })()
      : null;
  return {
    id,
    target,
    prices: [open],
    drift: gauss() * SIGMA_TICK * 0.45,
    pressure: 0,
    emaFast: open,
    emaSlow: open,
    stale,
    lastTier: null,
    lock: null,
    settled: null,
    log: [],
    current: null,
  };
}

function evaluate(c: Contract): Eval {
  const i = c.prices.length - 1;
  const price = c.prices[i];
  const minutesLeft = (CONTRACT_S - i * TICK_S) / 60;
  const tier = TIERS.filter((t) => t >= minutesLeft - 1e-9).at(-1) ?? 15;
  const side: Side = price >= c.target ? 1 : -1;
  // The averaged final minute counts one third.
  const effective = Math.max(minutesLeft - 1, 0) + Math.min(minutesLeft, 1) / 3;
  const cushion =
    Math.abs(price - c.target) /
    (price * SIGMA_MIN * Math.sqrt(Math.max(effective, 1 / 60)));
  const back = c.prices[Math.max(0, i - 12)];
  const momentum: Lean =
    Math.abs(price - back) / price > SIGMA_MIN * 0.25
      ? price > back
        ? 1
        : -1
      : 0;
  const flow: Lean = c.pressure > 0.25 ? 1 : c.pressure < -0.25 ? -1 : 0;
  const spread = (c.emaFast - c.emaSlow) / price;
  const technicals: Lean =
    Math.abs(spread) > SIGMA_MIN * 0.05 ? (spread > 0 ? 1 : -1) : 0;
  const families: [Lean, Lean, Lean] = [momentum, flow, technicals];
  const support = families.filter((f) => f === side).length;
  const oppose = families.filter((f) => f === -side).length;
  const quote = Math.min(
    99,
    Math.max(1, Math.round(100 * phi(cushion) + gauss() * 2)),
  );
  const fresh = !(c.stale && i >= c.stale[0] && i < c.stale[1]);
  const warm = i >= 12;
  const need = rule(tier);
  const gates: Gate[] = [
    {
      name: "data quality",
      ok: fresh && warm,
      detail: !warm ? "warming up" : fresh ? "feed fresh" : "feed stale",
    },
    {
      name: "cushion",
      ok: cushion >= need.cushion,
      detail: `${cushion.toFixed(2)} / ${need.cushion.toFixed(2)}`,
    },
    {
      name: "evidence",
      ok: oppose === 0 && support >= need.families,
      detail: `${families.map(arrow).join(" ")}  ${support}/${need.families}${oppose ? " · opposed" : ""}`,
    },
    {
      name: "price check",
      ok: quote >= 35,
      detail: `${side === 1 ? "YES" : "NO"} ${quote}¢`,
    },
  ];
  return {
    tier,
    side,
    cushion,
    families,
    quote,
    fresh,
    gates,
    pass: gates.every((g) => g.ok),
  };
}

/** Advance one tick. Returns false once the contract has settled. */
function step(c: Contract, nextLog: () => number): boolean {
  if (c.settled) return false;
  const i = c.prices.length;
  if (i > TICKS) {
    const final = c.prices[c.prices.length - 1];
    c.settled = final >= c.target ? 1 : -1;
    c.log.push({
      id: nextLog(),
      tag: "close",
      kind: "close",
      text: `settled ${c.settled === 1 ? "above" : "below"} target · ${
        c.lock
          ? `call was ${dir(c.lock.side)} at T${c.lock.tier}`
          : "no call, recorded as SIT OUT"
      }`,
    });
    return false;
  }
  if (Math.random() < 0.025) c.drift = gauss() * SIGMA_TICK * 0.45;
  const prev = c.prices[i - 1];
  const price = prev * Math.exp(c.drift + gauss() * SIGMA_TICK);
  c.prices.push(price);
  c.pressure =
    0.85 * c.pressure + 0.15 * (Math.sign(c.drift) * 0.8 + gauss() * 0.7);
  c.emaFast += (2 / 10) * (price - c.emaFast);
  c.emaSlow += (2 / 22) * (price - c.emaSlow);
  const e = evaluate(c);
  c.current = e;
  if (!c.lock) {
    if (e.pass) {
      c.lock = { tick: c.prices.length - 1, side: e.side, tier: e.tier };
      c.log.push({
        id: nextLog(),
        tag: `T${e.tier}`,
        kind: "lock",
        text: `all gates pass → LOCK ${dir(e.side)} (cushion ${e.cushion.toFixed(2)})`,
      });
    } else if (e.tier !== c.lastTier) {
      const failed = e.gates.find((g) => !g.ok)!;
      c.log.push({
        id: nextLog(),
        tag: `T${e.tier}`,
        text: `SIT OUT · ${failed.name}: ${failed.detail}`,
      });
    }
  }
  c.lastTier = e.tier;
  return true;
}

/** An immutable copy for rendering; the live contract is mutated only in effects. */
const snapshot = (c: Contract): Contract => ({
  ...c,
  prices: [...c.prices],
  log: [...c.log],
  lock: c.lock && { ...c.lock },
});

const W = 600;
const H = 250;
const PAD = { l: 8, r: 8, t: 26, b: 18 };

function Chart({ c }: { c: Contract }) {
  const n = c.prices.length;
  const spanMin = c.target * SIGMA_MIN * 3;
  const span = Math.max(
    spanMin,
    ...c.prices.map((p) => Math.abs(p - c.target) * 1.25),
  );
  const x = (i: number) => PAD.l + (i / TICKS) * (W - PAD.l - PAD.r);
  const mid = PAD.t + (H - PAD.t - PAD.b) / 2;
  const y = (p: number) =>
    mid - ((p - c.target) / span) * ((H - PAD.t - PAD.b) / 2);
  const line = c.prices
    .map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(p).toFixed(1)}`)
    .join(" ");
  const last = c.prices[n - 1];
  const area = `${line} L${x(n - 1).toFixed(1)},${y(c.target).toFixed(1)} L${x(0).toFixed(1)},${y(c.target).toFixed(1)} Z`;
  const secondsLeft = Math.max(0, CONTRACT_S - (n - 1) * TICK_S);
  const clock = `T-${String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:${String(secondsLeft % 60).padStart(2, "0")}`;
  const staleNow = c.current && !c.current.fresh;
  return (
    <svg
      className="sim-chart"
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`Synthetic price ${last >= c.target ? "above" : "below"} the target with ${clock} left`}
    >
      <defs>
        <clipPath id={`above-${c.id}`}>
          <rect x="0" y="0" width={W} height={y(c.target)} />
        </clipPath>
        <clipPath id={`below-${c.id}`}>
          <rect x="0" y={y(c.target)} width={W} height={H} />
        </clipPath>
      </defs>
      {TIERS.map((tier) => {
        const tx = x(((15 - tier) * 60) / TICK_S);
        const reached = (n - 1) * TICK_S >= (15 - tier) * 60;
        return (
          <g key={tier} className={`sim-tier ${reached ? "is-reached" : ""}`}>
            <line x1={tx} x2={tx} y1={PAD.t - 6} y2={H - PAD.b} />
            <text x={tx + 3} y={PAD.t - 10}>
              T{tier}
            </text>
          </g>
        );
      })}
      <path
        d={area}
        className="sim-area is-up"
        clipPath={`url(#above-${c.id})`}
      />
      <path
        d={area}
        className="sim-area is-down"
        clipPath={`url(#below-${c.id})`}
      />
      <line
        x1={PAD.l}
        x2={W - PAD.r}
        y1={y(c.target)}
        y2={y(c.target)}
        className="sim-target"
      />
      <text x={PAD.l + 2} y={y(c.target) - 6} className="sim-target-label">
        target {money(c.target)}
      </text>
      <path d={line} className={`sim-line ${staleNow ? "is-stale" : ""}`} />
      {c.lock && (
        <g className={`sim-lock ${c.lock.side === 1 ? "is-up" : "is-down"}`}>
          <line
            x1={x(c.lock.tick)}
            x2={x(c.lock.tick)}
            y1={PAD.t - 6}
            y2={H - PAD.b}
          />
          <circle cx={x(c.lock.tick)} cy={y(c.prices[c.lock.tick])} r="4" />
        </g>
      )}
      {!c.settled && (
        <g className="sim-head">
          <circle cx={x(n - 1)} cy={y(last)} r="8" className="sim-head-ring" />
          <circle cx={x(n - 1)} cy={y(last)} r="3" />
        </g>
      )}
      <text x={W - PAD.r} y={H - 4} className="sim-clock">
        {c.settled ? "closed" : clock}
      </text>
    </svg>
  );
}

export function SentinelSim() {
  const contract = useRef<Contract | null>(null);
  const logId = useRef(0);
  const contractId = useRef(0);
  const [view, setView] = useState<Contract | null>(null);
  // Assume visible until the observer reports otherwise, so playback never depends on it firing.
  const [inView, setInView] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const nextLog = useCallback(() => ++logId.current, []);

  const fresh = useCallback(
    (instant: boolean) => {
      contractId.current += 1;
      const c = newContract(contractId.current);
      if (instant) while (step(c, nextLog));
      contract.current = c;
      setView(snapshot(c));
    },
    [nextLog],
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 },
    );
    if (panel.current) observer.observe(panel.current);
    return () => {
      query.removeEventListener("change", sync);
      observer.disconnect();
    };
  }, []);

  // Reduced motion shows one finished contract; otherwise contracts play back to back.
  useEffect(() => {
    const timer = setTimeout(() => fresh(reduced), 0);
    return () => clearTimeout(timer);
  }, [reduced, fresh]);

  useEffect(() => {
    if (reduced || paused || !inView) return;
    const timer = setInterval(() => {
      const c = contract.current;
      if (!c || c.settled) return;
      if (!step(c, nextLog)) {
        setView(snapshot(c));
        setTimeout(() => {
          if (contract.current === c) fresh(false);
        }, HOLD_MS);
        return;
      }
      setView(snapshot(c));
    }, TICK_MS);
    return () => clearInterval(timer);
  }, [reduced, paused, inView, fresh, nextLog]);

  const c = view;
  const e = c?.current;
  const price = c ? c.prices[c.prices.length - 1] : 0;
  const decision = !c
    ? null
    : c.lock
      ? {
          label: `LOCKED ${dir(c.lock.side)}`,
          sub: `at T${c.lock.tier}, frozen`,
          kind: c.lock.side === 1 ? "up" : "down",
        }
      : {
          label: "SIT OUT",
          sub: c.settled ? "no call this contract" : "not every gate passes",
          kind: "out",
        };

  return (
    <div className="graph sim" ref={panel}>
      <div className="graph-bar">
        <span>sentinel / signal engine · synthetic replay</span>
        <span className="graph-status">
          {!reduced && (
            <button
              type="button"
              className="sim-control"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
            >
              {paused ? "▶ resume" : "❚❚ pause"}
            </button>
          )}
          <button
            type="button"
            className="sim-control"
            onClick={() => fresh(reduced)}
          >
            ↻ new contract
          </button>
        </span>
      </div>
      <div className="sim-body">
        <div className="sim-chart-wrap">
          {c ? <Chart c={c} /> : <div className="sim-chart" />}
        </div>
        <div className="sim-side">
          <dl className="sim-facts">
            <dt>contract</dt>
            <dd>SYN-BTC15M #{c?.id ?? "—"}</dd>
            <dt>reference</dt>
            <dd>
              {c ? money(price) : "—"}
              {c && (
                <span className={price >= c.target ? "is-up" : "is-down"}>
                  {" "}
                  {price >= c.target ? "+" : "−"}
                  {money(Math.abs(price - c.target))}
                </span>
              )}
            </dd>
            <dt>tier</dt>
            <dd>
              {e
                ? `T${e.tier} · cushion ≥ ${rule(e.tier).cushion} · ${rule(e.tier).families}/3`
                : "—"}
            </dd>
          </dl>
          <ul className="sim-gates" aria-label="Gates">
            {(e?.gates ?? []).map((gate) => (
              <li key={gate.name} className={gate.ok ? "is-ok" : "is-fail"}>
                <span className="sim-mark" aria-hidden="true">
                  {gate.ok ? "✓" : "✗"}
                </span>
                <span className="sim-gate-name">{gate.name}</span>
                <span className="sim-gate-detail">{gate.detail}</span>
              </li>
            ))}
          </ul>
          {decision && (
            <div
              className={`sim-decision is-${decision.kind}`}
              aria-live="polite"
            >
              <b>{decision.label}</b>
              <span>{decision.sub}</span>
            </div>
          )}
        </div>
      </div>
      <ol className="graph-log sim-log">
        {(c?.log ?? []).slice(-6).map((line) => (
          <li
            key={line.id}
            className={`log-row ${line.kind ? `is-${line.kind}` : ""}`}
          >
            <span className="log-wave">{line.tag}</span>
            <span className="log-text">{line.text}</span>
          </li>
        ))}
        {c && c.log.length === 0 && (
          <li className="log-cmd">
            <span className="log-prompt">$</span> sentinel watch SYN-BTC15M
            <span className="log-caret" aria-hidden="true" />
          </li>
        )}
      </ol>
    </div>
  );
}
