export type SectionKey =
  | "overview"
  | "problem"
  | "approach"
  | "architecture"
  | "decisions"
  | "challenges"
  | "outcome";
export type ProjectSection = {
  id: SectionKey;
  title: string;
  body: string[];
  placeholder?: boolean;
};
export type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
};
export type Project = {
  slug: string;
  name: string;
  year: number | null;
  category: string | null;
  shortDescription: string;
  longDescription: string;
  featured: boolean;
  technologies: string[];
  links: { live: string | null; source: string | null };
  images: ProjectImage[];
  sections: ProjectSection[];
  status: "case-study" | "placeholder";
  /** Homepage summary paragraph. */
  summary: string;
  /** Verifiable engineering facts, shown on the homepage spec sheet. */
  highlights: string[];
  /** Shown instead of links when the code is not public. */
  visibility: string | null;
  contentTodo: string[];
};

export const projects: Project[] = [
  {
    slug: "sentinel",
    name: "Sentinel",
    year: 2026,
    category: "Trading research terminal",
    featured: true,
    shortDescription:
      "A local, read-only Bitcoin research terminal that would rather say SIT OUT than guess.",
    longDescription:
      "Sentinel combines live market data, technical analysis, order flow and Kalshi’s 15-minute Bitcoin contracts into one dashboard. It is built for research, not trading: it can never place an order, it stores nothing it isn’t allowed to, and it makes no accuracy claims it hasn’t earned.",
    summary:
      "Live Bitcoin data, indicators, chart patterns and order flow, all evaluated against Kalshi’s 15-minute contracts. A rule-based engine calls UP, DOWN or SIT OUT, and every call has to clear each gate first. It can never trade, and it shows a dash rather than a number it can’t back up.",
    highlights: [
      "Python 3.12 + FastAPI backend, ~30k lines, mypy --strict",
      "1,000+ pytest tests, plus Playwright on desktop and mobile",
      "Read-only by construction: one GET-only HTTP client, allowlisted hosts, static tests that fail the build on order-entry code",
      "Default-deny data-rights registry checked at every point of use",
      "Append-only, hash-chained evaluation ledger enforced with Postgres triggers",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "Alembic",
      "Next.js",
      "React",
      "TypeScript",
      "Playwright",
    ],
    links: { live: null, source: null },
    visibility: "private repo · runs locally",
    images: [],
    status: "case-study",
    sections: [
      {
        id: "overview",
        title: "What it is",
        body: [
          "Sentinel is a research terminal for Bitcoin and Kalshi’s Bitcoin prediction markets that runs on one machine for one person. It streams live Coinbase data, computes indicators, chart patterns, market structure and order-flow pressure in the backend, and lines all of it up against the open Kalshi 15-minute contract.",
          "The dashboard only renders. Every number comes from the backend, where it is covered by tests, so the live path and any later backtest run the same code.",
        ],
      },
      {
        id: "problem",
        title: "The problem",
        body: [
          "Trading dashboards make it easy to look confident. They show a direction, a percentage and a streak, and very little about whether any of it holds up. I wanted the opposite: a tool that says SIT OUT whenever the evidence is thin, stale or contradictory, and refuses to show a number it can’t back up.",
          "There is also a legal side. Coinbase’s and Kalshi’s terms restrict storing their data or using it for modelling without written consent, so “just record everything” wasn’t an option.",
        ],
      },
      {
        id: "approach",
        title: "How a call gets made",
        body: [
          "Once a second, the engine evaluates the open contract against four gates in order: data quality (fresh feed, continuous order flow, enough history), cushion (distance to the target in typical moves left, from realized volatility), evidence (momentum, order flow and short-term technicals, none of which may disagree), and Kalshi’s own price for that side.",
          "The bar is highest at the open and relaxes at fixed checkpoints from T15 down to T1. A call locks the first moment every gate passes and is frozen from then on. A contract that closes without a lock is recorded as SIT OUT and never counted as a win. A separate Mentor model, which sees different evidence, can agree or disagree, and Sentinel never blends the two into a made-up consensus figure.",
        ],
      },
      {
        id: "architecture",
        title: "Architecture",
        body: [
          "A Python 3.12 FastAPI service, bound to loopback only, organised into packages for market data, indicators, structure, order flow, Kalshi, signals, the ledger and the journal. They talk through typed events stamped with exchange timestamps. PostgreSQL 18 sits behind SQLAlchemy 2 and Alembic. The dashboard is Next.js 16 with React 19 and TradingView Lightweight Charts.",
          "Quality gates are strict: ruff, mypy --strict and more than a thousand pytest tests on the backend, ESLint, tsc, Vitest and Playwright (desktop and mobile) on the frontend. Offline tests run on synthetic data, and a fixture blocks any non-loopback network lookup.",
        ],
      },
      {
        id: "decisions",
        title: "Technical decisions",
        body: [
          "Read-only, enforced in layers rather than promised. There is one HTTP client and it only exposes GET. A hook checks every request for HTTPS, an allowlisted host and a read-only path, with no credentials and no redirects. WebSocket frames go through a policy that only permits public market-data subscriptions. A static test fails the build if order-entry code appears anywhere outside the safety module.",
          "Data rights as configuration. A YAML registry lists every source and every use (persist, train, backtest, share and so on) as allowed, pending or denied. The schema refuses an “allowed” entry without written evidence, and code checks the registry at the point of use. Turning something on is a reviewed config change plus a test update, never a hidden toggle.",
          "A ledger you can audit. Signal decisions and outcomes go into an append-only Postgres table. Each record commits to its fields with salted hashes and chains to the previous record’s hash. Triggers reject updates and deletes, and a unique index allows one decision per contract window, so restarts can’t inflate the numbers. Live recording stays off until the data providers consent.",
        ],
      },
      {
        id: "challenges",
        title: "Challenges",
        body: [
          "Engineering notes on settlement references, missed checkpoints and the forecasting work are still to be written up.",
        ],
        placeholder: true,
      },
      {
        id: "outcome",
        title: "Outcome",
        body: [
          "No accuracy or profitability figures are published, on purpose. The rules are unvalidated until there is enough consented, verified data to test them out of sample.",
        ],
        placeholder: true,
      },
    ],
    contentTodo: ["Challenges and lessons", "Screenshots of the dashboard"],
  },
  {
    slug: "caltrack",
    name: "CalTrack",
    year: 2026,
    category: "Full-stack web app",
    featured: true,
    shortDescription:
      "Meal plans, groceries, pantry and budget in one app, so one change shows up everywhere it should.",
    longDescription:
      "A full-stack nutrition and grocery platform that connects meal planning, pantry inventory, grocery shopping, nutrition tracking and budgeting. CalTrack brings the decisions around eating, planning, shopping and progress into one system.",
    summary:
      "Most nutrition apps are good at logging what you ate. The rest of it — what to cook, what’s already in the cupboard, what to buy, what it costs — lives somewhere else. CalTrack keeps the whole loop in one place, so changing next week’s plan actually changes the shopping list.",
    highlights: [
      "Next.js + React + TypeScript on Supabase and PostgreSQL",
      "165+ automated tests, including Playwright end-to-end",
      "Postgres row-level security isolates every user’s data",
      "Transaction-safe inventory operations",
      "Multi-store price comparison and split carts",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind",
      "Supabase",
      "PostgreSQL",
      "Vitest",
      "Playwright",
      "Vercel",
    ],
    links: {
      live: "https://caltrack-nine-theta.vercel.app",
      source: "https://github.com/PrabhasDama/caltrack",
    },
    visibility: null,
    images: [],
    status: "case-study",
    sections: [
      {
        id: "overview",
        title: "What it is",
        body: [
          "Eating well involves more than tracking a meal. There is the plan, the food already in the pantry, the grocery run, the budget, and the progress over time.",
          "CalTrack puts all of that in one app, so a change in one place shows up everywhere it should.",
        ],
      },
      {
        id: "problem",
        title: "The problem",
        body: [
          "Nutrition apps often separate meal planning, grocery shopping, pantry inventory, nutrition tracking, and budgeting. Those are closely related decisions, but the information often lives in different places.",
        ],
      },
      {
        id: "approach",
        title: "How it works",
        body: [
          "CalTrack starts with authentication, onboarding, and personalized nutrition targets. Daily tracking, meal timestamps, saved nutrition labels, and adherence analytics connect day-to-day choices with longer-term goals.",
          "Meal planning and meal-prep workflows sit alongside pantry management, grocery list generation, budget tracking, purchase history, and receipt reconciliation. Store comparison and split-store carts support the shopping side of the system.",
        ],
      },
      {
        id: "architecture",
        title: "Stack and architecture",
        body: [
          "It’s a Next.js and React app written in TypeScript and styled with Tailwind. Server actions sit between the UI and Supabase, which provides PostgreSQL and authentication. It deploys on Vercel.",
          "The schema is built from versioned SQL migrations: tables, constraints, indexes, triggers and policies all live in the repo rather than being clicked together in a dashboard.",
        ],
      },
      {
        id: "decisions",
        title: "Technical decisions",
        body: [
          "Security at the database, not just the UI. PostgreSQL row-level security policies decide which rows each signed-in user can read or change, so a bug in a page can’t leak someone else’s pantry.",
          "Inventory changes are transaction-safe, and the UI updates optimistically so it stays fast. More than 165 automated tests cover it, using Vitest, Playwright for browser end-to-end flows, and PGlite to test database logic.",
        ],
      },
      {
        id: "challenges",
        title: "Challenges",
        body: [
          "Engineering notes on live/store pricing, receipt workflows, and connected product flows will be added after the implementation details are documented.",
        ],
        placeholder: true,
      },
      {
        id: "outcome",
        title: "Outcome",
        body: [
          "Verified outcomes and product learnings will be added here. No usage figures are published yet.",
        ],
        placeholder: true,
      },
    ],
    contentTodo: [
      "Actual product screenshots",
      "Challenges, outcomes, and lessons",
    ],
  },
];

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);
