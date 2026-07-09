import { withBasePath } from "@/lib/basePath";

// All NEXT_PUBLIC_* vars are inlined into the client bundle at build time
// (static export has no server), so none of these are secret — they're just
// configurable. Defaults below match production and keep `next dev`/`next build`
// working even without a .env file present.
export const site = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "Maitreya Guduru",
  role: process.env.NEXT_PUBLIC_SITE_ROLE ?? "Software Engineer",
  tagline:
    process.env.NEXT_PUBLIC_SITE_TAGLINE ??
    "Building scalable backend systems and AI-powered products.",
  // GitHub Pages project-site URL. Swap this if a custom domain is added later.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://maitreyaguduru.github.io/Portfolio",
  email: process.env.NEXT_PUBLIC_SITE_EMAIL ?? "gudurumaitreya@gmail.com",
  github: process.env.NEXT_PUBLIC_SITE_GITHUB ?? "https://github.com/maitreyaguduru",
  linkedin:
    process.env.NEXT_PUBLIC_SITE_LINKEDIN ??
    "https://www.linkedin.com/in/maitreya-guduru-25468522b/",
  resumeUrl: withBasePath("/resume.pdf"),
  location: process.env.NEXT_PUBLIC_SITE_LOCATION ?? "India",
  availability:
    process.env.NEXT_PUBLIC_SITE_AVAILABILITY ??
    "Open to connections",
} as const;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

/* ---------------------------------- Skills --------------------------------- */

export type SkillGroup = {
  category: string;
  blurb: string;
  skills: { name: string; level: number; note?: string }[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Backend",
    blurb: "The core of what I do — services that stay up and stay fast.",
    skills: [
      { name: "Java", level: 92, note: "Primary language in production" },
      { name: "Spring Boot", level: 90, note: "REST APIs, security, scheduling" },
      { name: "Node.js", level: 78, note: "Services & tooling" },
      { name: "NestJS", level: 74, note: "Structured TypeScript backends" },
    ],
  },
  {
    category: "Data & Cloud",
    blurb: "Where state lives and how it scales.",
    skills: [
      { name: "PostgreSQL", level: 86, note: "Query tuning, indexing, migrations" },
      { name: "SQL", level: 88, note: "Analytical & transactional workloads" },
      { name: "AWS", level: 80, note: "EC2, S3, RDS, IAM, deployments" },
      { name: "MQTT", level: 76, note: "IoT device messaging at Proxgy" },
    ],
  },
  {
    category: "DevOps & Observability",
    blurb: "Shipping safely, then watching it like a hawk.",
    skills: [
      { name: "Docker", level: 82, note: "Containerized every service I own" },
      { name: "Jenkins", level: 75, note: "CI/CD pipelines" },
      { name: "GitHub Actions", level: 80, note: "Build, test, deploy workflows" },
      { name: "Prometheus / Grafana", level: 78, note: "Metrics, dashboards, Alertmanager" },
    ],
  },
  {
    category: "Architecture & AI",
    blurb: "Designing systems, and teaching them to think.",
    skills: [
      { name: "Microservices", level: 80, note: "Service boundaries, contracts" },
      { name: "Distributed Systems", level: 76, note: "Queues, retries, idempotency" },
      { name: "REST API Design", level: 88, note: "Versioning, pagination, auth" },
      { name: "LLM / OpenAI APIs", level: 74, note: "RAG, embeddings, agents" },
    ],
  },
];

/* -------------------------------- Experience ------------------------------- */

export type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  achievements: string[];
  tech: string[];
};

export const experiences: Experience[] = [
  {
    company: "Proxgy",
    role: "Software Engineer",
    period: "2023 — Present",
    summary:
      "Backend engineer across Proxgy's IoT and logistics products — owning services from design through production monitoring.",
    achievements: [
      "Designed and shipped backend services for a logistics platform handling live shipment tracking, orchestrating data from IoT devices over MQTT into PostgreSQL-backed APIs.",
      "Built payment integrations end to end — provider webhooks, reconciliation, and failure handling — treating idempotency and auditability as first-class requirements.",
      "Automated merchant onboarding with an internal platform that replaced manual spreadsheet-driven workflows, cutting operational back-and-forth for the ops team.",
      "Stood up the monitoring stack (Prometheus, Grafana, Alertmanager) for production services, turning silent failures into paged, diagnosable incidents.",
      "Implemented access-control and role-based permission systems used across internal tools.",
      "Optimized hot PostgreSQL queries and indexes on high-traffic tables, measurably reducing API latency on core endpoints.",
      "Owned CI/CD pipelines (Jenkins, GitHub Actions) and AWS deployments, making releases boring — in the good way.",
    ],
    tech: [
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "AWS",
      "MQTT",
      "Docker",
      "Prometheus",
      "Grafana",
      "Jenkins",
    ],
  },
];

/* --------------------------------- Projects -------------------------------- */

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  category: "AI" | "Platform" | "Visualization";
  tech: string[];
  problem: string;
  architecture: string;
  challenges: string[];
  results: string;
  github?: string;
  demo?: string;
  accent: string; // hsl accent for the card art
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "ai-resume-optimizer",
    title: "AI Resume Optimizer",
    tagline: "Tailors your resume to every job description using LLMs.",
    category: "AI",
    tech: ["Next.js", "Node.js", "OpenAI API", "PostgreSQL", "Tailwind"],
    problem:
      "Applying to many roles means rewriting the same resume over and over — and most people guess at what a job description is actually asking for. The optimizer reads both sides and closes the gap.",
    architecture:
      "A Next.js frontend talks to a Node.js API that orchestrates a multi-step LLM pipeline: the job description is parsed into structured requirements, the resume is embedded section-by-section, and a matching pass scores alignment before a rewrite pass proposes targeted edits. Results are cached per (resume, JD) pair to keep token costs predictable.",
    challenges: [
      "Keeping LLM output structured and diff-able — solved with strict JSON schemas and a validation/retry loop rather than trusting free-form output.",
      "Preventing the model from inventing experience: every suggested edit must trace back to content that already exists in the source resume.",
      "Token cost control via section-level embeddings and caching instead of re-processing whole documents.",
    ],
    results:
      "Produces recruiter-readable, ATS-friendly tailored resumes in under a minute, with every change explainable back to the job description.",
    github: "https://github.com/maitreyaguduru",
    accent: "213 100% 60%",
    featured: true,
  },
  {
    slug: "personal-finance-ai",
    title: "Personal Finance AI",
    tagline: "Statement parsing and spending insights, powered by LLMs.",
    category: "AI",
    tech: ["NestJS", "TypeScript", "OpenAI API", "PostgreSQL", "React"],
    problem:
      "Bank statements are where financial data goes to die — PDFs and CSVs in a dozen formats that no one reads. This turns them into categorized, queryable spending data with plain-language insights.",
    architecture:
      "A NestJS backend ingests statements through a parsing layer that normalizes heterogeneous bank formats into a common transaction schema. An LLM-assisted categorizer labels transactions with confidence scores; low-confidence rows fall back to rules and user feedback, which is stored and reused. Insights are generated over aggregated data, never raw rows, keeping prompts small and private.",
    challenges: [
      "Parsing wildly inconsistent statement formats — solved with a per-bank adapter pattern behind a single normalized interface.",
      "Trustworthy auto-categorization: confidence thresholds decide when the model labels silently vs. asks the user.",
      "Privacy by construction — the LLM sees aggregates and categories, not account numbers or balances.",
    ],
    results:
      "Turns a shoebox of statements into a searchable ledger with monthly insight summaries — the kind of tool I built because I wanted to use it.",
    github: "https://github.com/maitreyaguduru",
    accent: "160 84% 45%",
    featured: true,
  },
  {
    slug: "orbitlab",
    title: "OrbitLab",
    tagline: "Real-time satellite visualization on a 3D globe.",
    category: "Visualization",
    tech: ["FastAPI", "React", "Cesium", "PostgreSQL"],
    problem:
      "Orbital data is public but unreadable — TLE sets are just rows of numbers. OrbitLab renders live satellite positions and orbits on an interactive 3D Earth so you can actually see what's overhead.",
    architecture:
      "A FastAPI backend ingests TLE data, propagates orbits server-side, and serves position streams to a React + Cesium frontend. PostgreSQL stores satellite metadata and orbital elements; the API precomputes trajectory windows so the client interpolates smoothly instead of hammering the server.",
    challenges: [
      "Rendering thousands of moving objects at 60fps — solved by batching Cesium entities and interpolating client-side between server keyframes.",
      "Orbit propagation accuracy vs. compute cost: trajectory windows are recomputed on a schedule, not per-request.",
      "Designing an API that serves both 'show me everything' and 'track this one satellite' access patterns cleanly.",
    ],
    results:
      "A living map of low Earth orbit — search a satellite, watch its ground track, and see its next pass. My favorite intersection of backend engineering and something you can point at.",
    github: "https://github.com/maitreyaguduru",
    demo: "#",
    accent: "222 45% 32%",
    featured: true,
  },
  {
    slug: "merchant-tracker",
    title: "Merchant Tracker",
    tagline: "Internal platform that made merchant onboarding self-serve.",
    category: "Platform",
    tech: ["Java", "Spring Boot", "PostgreSQL", "AWS"],
    problem:
      "Merchant onboarding at Proxgy lived in spreadsheets and Slack threads — slow, error-prone, and invisible to leadership. This platform gave the process states, owners, and an audit trail.",
    architecture:
      "A Spring Boot service modeling onboarding as an explicit state machine — each merchant moves through verification, documentation, and activation stages with role-based permissions on every transition. PostgreSQL holds the canonical state; every change is event-logged for auditability.",
    challenges: [
      "Translating a messy human process into a state machine without blocking legitimate edge cases — escape hatches are logged, not forbidden.",
      "Role-based access control that matched real team boundaries instead of an idealized org chart.",
    ],
    results:
      "Replaced manual tracking with a single source of truth. Ops stopped asking 'where is this merchant stuck?' because the platform answers it.",
    accent: "35 92% 55%",
  },
  {
    slug: "indoor-navigation",
    title: "Indoor Navigation",
    tagline: "AR wayfinding for spaces GPS can't see.",
    category: "Visualization",
    tech: ["AR", "Node.js", "Graph Algorithms"],
    problem:
      "GPS dies indoors. This project overlays AR direction cues on a phone camera feed to guide people through large indoor spaces — malls, offices, hospitals.",
    architecture:
      "Indoor maps are modeled as weighted graphs of walkable nodes; a pathfinding service computes routes that an AR layer renders as on-screen guidance anchored to the real world.",
    challenges: [
      "Reliable indoor positioning without GPS — anchoring AR sessions to known reference points and recalibrating as drift accumulates.",
      "Making graph-based routes feel human: fewer turns beats mathematically shortest.",
    ],
    results:
      "A working proof that AR wayfinding can feel natural — and a crash course in the gap between a correct algorithm and a usable product.",
    accent: "190 90% 50%",
  },
];

/* ------------------------------- Architecture ------------------------------ */

export type Principle = {
  title: string;
  body: string;
};

export const principles: Principle[] = [
  {
    title: "API Design",
    body: "APIs are promises. I version them, paginate them, document failure modes, and never make a client guess. A good API survives the team that wrote it.",
  },
  {
    title: "Scalability",
    body: "Scale the bottleneck, not the ego. Measure first, cache second, shard last. Most systems need boring horizontal scaling and honest capacity math — not exotic architecture.",
  },
  {
    title: "Caching",
    body: "Every cache is a bet about staleness. I make the bet explicit: what's cached, for how long, and what happens when it's wrong. Invalidation strategy comes before the cache does.",
  },
  {
    title: "Databases",
    body: "The database outlives the code. Schemas get designed deliberately, indexes get justified by query plans, and migrations are rehearsed — never improvised at 2am.",
  },
  {
    title: "Cloud",
    body: "Infrastructure should be reproducible, observable, and cheap to throw away. If bringing up a new environment takes more than one command, that's a bug.",
  },
  {
    title: "Observability",
    body: "If you can't see it, you don't own it. Every service I ship comes with metrics, structured logs, and alerts that page on symptoms users feel — not on noise.",
  },
];

/* ------------------------------------ AI ----------------------------------- */

export const aiFocus = [
  {
    title: "LLM Integrations",
    body: "Building products on OpenAI APIs with structured outputs, validation loops, and cost-aware pipelines — treating the model as a component, not magic.",
  },
  {
    title: "RAG & Embeddings",
    body: "Retrieval-augmented generation over real documents: chunking strategies, embedding pipelines, and vector search that returns grounded answers instead of confident guesses.",
  },
  {
    title: "Agents & Tool Use",
    body: "Agentic systems that plan, call tools, and recover from failure — with the same discipline as any distributed system: retries, timeouts, observability.",
  },
  {
    title: "Prompt Engineering",
    body: "Prompts as versioned, tested artifacts. Schema-constrained outputs, eval sets before deploys, and regression tests when models change underneath you.",
  },
] as const;

export const aiRoadmap = [
  "An AI code-review companion trained on a team's own conventions",
  "Self-healing backend agents that triage production alerts before a human wakes up",
  "Developer tools where the LLM handles the boilerplate and the engineer keeps the judgment",
] as const;

/* ------------------------------- Testimonials ------------------------------ */

export const testimonials = [
  {
    quote:
      "Maitreya doesn't just close tickets — he understands the system around the ticket. The monitoring setup he built caught issues we didn't know we had.",
    name: "Engineering Colleague",
    role: "Proxgy",
  },
  {
    quote:
      "Give him an ambiguous problem and you get back a shipped, documented service. The merchant platform quietly removed an entire category of ops work.",
    name: "Product Stakeholder",
    role: "Proxgy",
  },
  {
    quote:
      "Rare combination: cares about query plans and cares about how the feature feels to use. That's the whole job, and most people only do half of it.",
    name: "Senior Engineer",
    role: "Mentor",
  },
] as const;

/* ---------------------------------- Stats ---------------------------------- */

export const stats = [
  { label: "Years shipping to production", value: 3, suffix: "+" },
  { label: "Services owned end-to-end", value: 8, suffix: "+" },
  { label: "Uptime mindset", value: 99.9, suffix: "%", decimals: 1 },
  { label: "Side projects that solve real problems", value: 5, suffix: "" },
] as const;
