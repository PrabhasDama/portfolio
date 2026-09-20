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
  contentTodo: string[];
};

const pendingSections = (): ProjectSection[] => [
  {
    id: "overview",
    title: "Overview",
    body: ["Project overview to be added."],
    placeholder: true,
  },
  {
    id: "problem",
    title: "The problem",
    body: ["Problem statement to be added."],
    placeholder: true,
  },
  {
    id: "approach",
    title: "The approach",
    body: ["Approach and implementation details to be added."],
    placeholder: true,
  },
  {
    id: "architecture",
    title: "Architecture",
    body: ["Verified system architecture to be added."],
    placeholder: true,
  },
  {
    id: "decisions",
    title: "Technical decisions",
    body: ["Technical decisions and tradeoffs to be added."],
    placeholder: true,
  },
  {
    id: "challenges",
    title: "Challenges",
    body: ["Engineering challenges and lessons to be added."],
    placeholder: true,
  },
  {
    id: "outcome",
    title: "Outcome",
    body: ["Verified outcomes to be added."],
    placeholder: true,
  },
];

export const projects: Project[] = [
  {
    slug: "caltrack",
    name: "CalTrack",
    year: null,
    category: "Full-stack platform",
    featured: true,
    shortDescription:
      "Nutrition planning that connects your goals, groceries, and budget.",
    longDescription:
      "A full-stack nutrition, meal planning, grocery, pantry, budgeting, and body-recomposition platform. CalTrack brings the decisions around eating, planning, shopping, and progress into one system.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Vercel",
      "Resend",
    ],
    links: { live: null, source: null },
    images: [],
    status: "case-study",
    sections: [
      {
        id: "overview",
        title: "The whole picture.",
        body: [
          "Eating well involves more than tracking a meal. There is the plan, the food already in the pantry, the grocery run, the budget, and the progress over time.",
          "CalTrack connects these everyday workflows in a single full-stack product.",
        ],
      },
      {
        id: "problem",
        title: "One goal. Too many disconnected tools.",
        body: [
          "Nutrition apps often separate meal planning, grocery shopping, pantry inventory, nutrition tracking, and budgeting. Those are closely related decisions, but the information often lives in different places.",
        ],
      },
      {
        id: "approach",
        title: "Connect the routine.",
        body: [
          "CalTrack starts with authentication, onboarding, and personalized nutrition targets. Daily tracking, meal timestamps, saved nutrition labels, and adherence analytics connect day-to-day choices with longer-term goals.",
          "Meal planning and meal-prep workflows sit alongside pantry management, grocery list generation, budget tracking, purchase history, and receipt workflows. Store comparison and split-store carts support the shopping side of the system.",
        ],
      },
      {
        id: "architecture",
        title: "Built as a full-stack product.",
        body: [
          "The known stack brings together Next.js, React, and TypeScript with Supabase and PostgreSQL. Vercel and Resend are also part of the project.",
          "Responsive UI, automated testing, and security testing are part of the work. Detailed service boundaries and data-flow diagrams will be added with the engineering write-up.",
        ],
      },
      {
        id: "decisions",
        title: "Technical decisions",
        body: [
          "Detailed tradeoffs, implementation choices, and supporting code will be added to this case study.",
        ],
        placeholder: true,
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
          "Verified outcomes and product learnings will be added here. No usage figures or performance claims are published yet.",
        ],
        placeholder: true,
      },
    ],
    contentTodo: [
      "Project dates",
      "Live and source URLs",
      "Actual product screenshots",
      "Verified architecture and tradeoffs",
      "Challenges, outcomes, and lessons",
    ],
  },
  {
    slug: "mouse-telemetry",
    name: "Mouse Telemetry",
    year: null,
    category: "Machine learning & data",
    shortDescription: "An exploration of mouse telemetry and machine learning.",
    longDescription:
      "A mouse telemetry and machine learning project. The full project story is being prepared.",
    featured: false,
    technologies: [],
    links: { live: null, source: null },
    images: [],
    sections: pendingSections(),
    status: "placeholder",
    contentTodo: [
      "Overview, problem, approach, and verified outcomes",
      "Technology, architecture, dates, links, and screenshots",
    ],
  },
  {
    slug: "campussync",
    name: "CampusSync",
    year: null,
    category: null,
    shortDescription: "A project story to come.",
    longDescription:
      "The CampusSync case study is being prepared. Product details and engineering notes will be added here.",
    featured: false,
    technologies: [],
    links: { live: null, source: null },
    images: [],
    sections: pendingSections(),
    status: "placeholder",
    contentTodo: [
      "Project description and all case study sections",
      "Technology, dates, links, and screenshots",
    ],
  },
  {
    slug: "smartwaste",
    name: "SmartWaste",
    year: null,
    category: null,
    shortDescription: "More from the workbench.",
    longDescription:
      "The SmartWaste case study is being prepared. Product details and engineering notes will be added here.",
    featured: false,
    technologies: [],
    links: { live: null, source: null },
    images: [],
    sections: pendingSections(),
    status: "placeholder",
    contentTodo: [
      "Project description and all case study sections",
      "Technology, dates, links, and screenshots",
    ],
  },
];

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);
export const caltrack = projects.find(
  (project) => project.slug === "caltrack",
)!;

export const caltrackCapabilities = [
  {
    title: "Nutrition, with context.",
    summary: "Targets, daily tracking, and progress",
    body: "Personalized nutrition targets, daily tracking, saved nutrition labels, and meal timestamps. Measurements and progress tracking connect everyday choices with body-recomposition goals.",
    tags: ["Nutrition targets", "Meal tracking", "Measurements"],
  },
  {
    title: "A plan that becomes a meal.",
    summary: "Meal planning and pantry awareness",
    body: "Meal planning, meal-prep workflows, and pantry management bring the planning and preparation sides of nutrition into the same product.",
    tags: ["Meal planning", "Pantry", "Meal prep"],
  },
  {
    title: "The grocery run, connected.",
    summary: "Shopping, store comparison, and budgeting",
    body: "Grocery list generation, budget tracking, purchase history, and receipt workflows sit alongside store comparison, split-store carts, and live/store pricing work.",
    tags: ["Grocery lists", "Budgeting", "Store comparison"],
  },
  {
    title: "Room to reflect and adjust.",
    summary: "Analytics and adherence over time",
    body: "Analytics, meal-time and adherence analysis, and progress tracking help bring patterns into view across the product.",
    tags: ["Analytics", "Meal timing", "Adherence"],
  },
];
