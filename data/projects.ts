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
      "A nutrition tracker that grew into meal planning, groceries, pantry and budget.",
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
          "Meal planning and meal-prep workflows sit alongside pantry management, grocery list generation, budget tracking, purchase history, and receipt workflows. Store comparison and split-store carts support the shopping side of the system.",
        ],
      },
      {
        id: "architecture",
        title: "Stack and architecture",
        body: [
          "It's a Next.js and React app written in TypeScript, with Supabase and PostgreSQL underneath. It deploys on Vercel and sends email through Resend.",
          "The work also covers a responsive UI, automated tests and security testing. A proper diagram of the services and data flow comes with the engineering write-up.",
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
      "A project on mouse telemetry and machine learning. The full write-up is still in progress.",
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
    shortDescription: "Write-up in progress.",
    longDescription:
      "I haven't written up CampusSync yet. Notes on what it does and how it's built will go here.",
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
    shortDescription: "Write-up in progress.",
    longDescription:
      "I haven't written up SmartWaste yet. Notes on what it does and how it's built will go here.",
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
