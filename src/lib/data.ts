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
    blurb: "My primary toolkit for building services.",
    skills: [
      { name: "NestJS", level: 88, note: "Daily driver in production" },
      { name: "TypeScript", level: 86, note: "Primary language" },
      { name: "Node.js", level: 84, note: "Services and tooling" },
      { name: "Java / Spring Boot", level: 78, note: "Where I started; used in side projects" },
    ],
  },
  {
    category: "Data & Cloud",
    blurb: "Where the data lives and how it stays available.",
    skills: [
      { name: "PostgreSQL", level: 85, note: "Queries, indexes, migrations" },
      { name: "SQL", level: 85, note: "Transactional and analytical work" },
      { name: "AWS", level: 78, note: "EC2, S3, RDS, IAM" },
      { name: "MQTT", level: 76, note: "IoT device messaging" },
    ],
  },
  {
    category: "DevOps & Monitoring",
    blurb: "Shipping safely and knowing when something breaks.",
    skills: [
      { name: "Docker", level: 82, note: "Every service I own is containerized" },
      { name: "GitHub Actions", level: 80, note: "Build, test, deploy" },
      { name: "Jenkins", level: 72, note: "Maintained existing pipelines" },
      { name: "Prometheus / Grafana", level: 78, note: "Metrics, dashboards, alerts" },
    ],
  },
  {
    category: "Working with AI",
    blurb: "The area I'm investing in most right now.",
    skills: [
      { name: "OpenAI APIs", level: 78, note: "Shipped side projects on them" },
      { name: "RAG & Embeddings", level: 72, note: "Retrieval over real documents" },
      { name: "REST API Design", level: 85, note: "Versioning, pagination, auth" },
      { name: "Microservices", level: 76, note: "Service boundaries and contracts" },
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
    period: "Jun 2024 — Present",
    summary:
      "I work on the backend of Proxgy's IoT and logistics products in NestJS and TypeScript — from designing the service to monitoring it in production.",
    achievements: [
      "Build and maintain backend services for the logistics platform in NestJS and TypeScript, taking features from API design through to production.",
      "Integrate IoT devices over MQTT and land their data cleanly in PostgreSQL, behind APIs the rest of the team builds on.",
      "Handled payment integrations end to end — webhooks, reconciliation, and the failure cases that appear once real money moves.",
      "Replaced a spreadsheet-driven merchant onboarding process with an internal tool that gave it clear stages and an audit trail.",
      "Set up monitoring with Prometheus, Grafana, and Alertmanager so problems surface before customers report them.",
      "Tuned slow PostgreSQL queries and added missing indexes, bringing response times down on the busiest endpoints.",
      "Keep releases uneventful with CI/CD on GitHub Actions and AWS.",
    ],
    tech: [
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "AWS",
      "MQTT",
      "Docker",
      "Prometheus",
      "Grafana",
      "GitHub Actions",
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
  accent: string; // hsl accent for the generative card art (fallback)
  /**
   * Optional real screenshot. To use one: drop an image at
   * `public/projects/<slug>.png` and set `image: withBasePath("/projects/<slug>.png")`.
   * When set it replaces the generated art on both the card and the modal.
   * If the file is missing, it quietly falls back to the generated art.
   */
  image?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "personal-finance-ai",
    title: "Personal Finance AI",
    tagline: "Reads your bank statements and tells you where the money went.",
    category: "AI",
    tech: ["Java", "Spring Boot", "PostgreSQL", "OpenAI API"],
    problem:
      "Bank statements pile up as PDFs and CSVs that never get read. I wanted something that could take that pile and turn it into a clear, plain-language picture of my spending.",
    architecture:
      "A Spring Boot backend takes in statements and normalizes the different bank formats into one common transaction shape. From there it categorizes each transaction — leaning on an LLM when the rules aren't sure — and stores everything in PostgreSQL. The insights are generated from the totals, not the raw rows, so the prompts stay small and my account details stay out of it.",
    challenges: [
      "Every bank exports statements differently, so I wrote a small adapter per format behind one common interface instead of one giant parser.",
      "Deciding when to trust the model's category and when to fall back to rules — confidence thresholds ended up doing most of that work.",
      "Keeping it private: the model only ever sees categories and totals, never account numbers or balances.",
    ],
    results:
      "It turns a folder of statements into a searchable ledger with a monthly summary of where the money goes. I built it because I wanted to use it — and I still do.",
    github: "https://github.com/maitreyaguduru",
    accent: "160 84% 45%",
    featured: true,
  },
  {
    slug: "orbitlab",
    title: "OrbitLab",
    tagline: "Live satellites, drawn on a 3D globe you can spin.",
    category: "Visualization",
    tech: ["FastAPI", "React", "Cesium", "PostgreSQL"],
    problem:
      "Satellite data is public, but it arrives as rows of numbers no one can read. I wanted to see what's overhead right now, on a globe I could spin and search.",
    architecture:
      "A FastAPI backend reads the raw orbital data, works out where each satellite is over time, and streams those positions to a React frontend that draws them with Cesium. PostgreSQL holds the satellite info, and the backend works out short windows of the path ahead so the browser can move things smoothly instead of asking the server constantly.",
    challenges: [
      "Getting thousands of moving dots to render at a smooth 60fps meant batching them and letting the browser fill in the motion between updates.",
      "There's a trade-off between how accurate the orbits are and how much math you do — I recompute paths on a schedule rather than on every request.",
      "Designing one API that handles both 'show me everything up there' and 'just follow this one satellite'.",
    ],
    results:
      "You can search for a satellite, watch its track across the Earth, and see when it will pass overhead next. My favorite kind of project — real backend work behind something visible.",
    github: "https://github.com/maitreyaguduru",
    demo: "#",
    accent: "222 45% 32%",
    featured: true,
  },
  {
    slug: "merchant-tracker",
    title: "Merchant Tracker",
    tagline: "Turned merchant onboarding from a spreadsheet into a real tool.",
    category: "Platform",
    tech: ["NestJS", "TypeScript", "PostgreSQL", "AWS"],
    problem:
      "Onboarding merchants at work lived in spreadsheets and Slack threads. It was slow, easy to lose track of, and nobody could tell you where a given merchant was stuck.",
    architecture:
      "A NestJS service that treats onboarding as a set of clear stages — verification, documents, activation — with permissions on who can move a merchant between them. PostgreSQL holds the state, and every change is logged so there's always a trail of what happened and when.",
    challenges: [
      "Turning a messy human process into defined stages without blocking the odd exception — the exceptions get logged, not forbidden.",
      "Building permissions that matched how the team really worked, not an idealized org chart.",
    ],
    results:
      "It replaced the spreadsheet with one source of truth. People stopped asking 'where's this merchant stuck?' because they could just look.",
    accent: "35 92% 55%",
  },
  {
    slug: "indoor-navigation",
    title: "Indoor Navigation",
    tagline: "AR directions for the places GPS gives up on.",
    category: "Visualization",
    tech: ["AR", "Node.js", "Graph Algorithms"],
    problem:
      "GPS stops working the moment you walk indoors. I wanted to see if you could guide someone through a big building — a mall or an office — with directions drawn right on their phone's camera.",
    architecture:
      "The building's map is stored as a graph of walkable points, and a small pathfinding service works out the route. An AR layer then draws that route onto the live camera view so it lines up with the real hallway in front of you.",
    challenges: [
      "Figuring out where you are without GPS — anchoring to known points and correcting as the tracking drifts.",
      "Making the routes feel natural to walk: fewer turns usually beats the mathematically shortest path.",
    ],
    results:
      "A working proof that AR directions can feel natural indoors — and a useful lesson in the gap between an algorithm that is correct and one that is pleasant to use.",
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
    body: "An API is a promise to whoever's calling it. I try to keep them predictable — clear versioning, sensible pagination, and honest error responses — so nobody has to guess what happens next.",
  },
  {
    title: "Scaling",
    body: "I'd rather measure than assume. Most things that feel slow have one real bottleneck, and fixing that beats reaching for something clever you'll have to maintain later.",
  },
  {
    title: "Caching",
    body: "A cache is really a bet about how stale you can afford to be. I try to make that bet on purpose — what's cached, for how long, and what happens when it's wrong — instead of bolting one on and hoping.",
  },
  {
    title: "Databases",
    body: "The database usually outlives the code around it, so it deserves care. I want indexes I can justify with a query plan and migrations that have been rehearsed before they run.",
  },
  {
    title: "Cloud",
    body: "I like infrastructure I can tear down and bring back without ceremony. If spinning up a fresh environment takes more than a command or two, that's something to fix.",
  },
  {
    title: "Monitoring",
    body: "If I can't see what a service is doing, I don't truly own it. I ship metrics and alerts that fire on symptoms users would notice — not noise that trains people to ignore alerts.",
  },
];

/* ------------------------------------ AI ----------------------------------- */

export const aiFocus = [
  {
    title: "Building on LLMs",
    body: "I treat a model like any other part of the system — something that needs structure around its output, checks when it's wrong, and an eye on what it costs. Not magic, just another component.",
  },
  {
    title: "RAG & Embeddings",
    body: "Pointing a model at real documents so its answers are grounded in something instead of guessed. I've been learning how much the chunking and retrieval matter to whether the answer's any good.",
  },
  {
    title: "Agents & Tools",
    body: "Letting a model plan and call tools, then handling the moments it goes sideways — which feels a lot like the retries and timeouts I'm already used to on the backend.",
  },
  {
    title: "Prompting",
    body: "Treating prompts less like a lucky phrase and more like code — something worth testing, keeping constrained, and checking again when the model underneath changes.",
  },
] as const;

/* ------------------------------- Testimonials ------------------------------ */

export const testimonials = [
  {
    quote:
      "Maitreya doesn't just close the ticket — he pays attention to the system around it. The monitoring he set up caught problems we didn't even know we had.",
    name: "Engineering Colleague",
    role: "Proxgy",
  },
  {
    quote:
      "You can hand him something vague and get back a service that's shipped and documented. The merchant tool quietly took a whole chunk of manual work off the ops team.",
    name: "Product Stakeholder",
    role: "Proxgy",
  },
  {
    quote:
      "He cares about the query plan and about how the feature feels to use. That's the whole job, and most people only do half of it.",
    name: "Senior Engineer",
    role: "Mentor",
  },
] as const;
