# Maitreya Guduru — Portfolio

Personal portfolio built with Next.js 15, React 19, TypeScript, Tailwind CSS, and Framer Motion. Dark-first design system with an electric-blue / soft-purple accent palette, fully statically generated.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (fully static)
npm run start    # serve the production build
```

## Before you deploy — personalize these

1. **Resume** — replace `public/resume.pdf` (currently a placeholder).
2. **Links & email** — edit the `site` object in `src/lib/data.ts` (GitHub/LinkedIn URLs are guesses from your name; verify them).
3. **Domain** — `metadataBase`, JSON-LD URL (`src/app/layout.tsx`), `robots.ts`, and `sitemap.ts` all reference `https://maitreyaguduru.dev`; change to your real domain.
4. **Portrait** — the About section has a labeled placeholder; drop a real photo in and swap the placeholder block in `src/components/sections/About.tsx`.
5. **Content** — every word of copy lives in `src/lib/data.ts` (experience, projects, skills, testimonials, stats). Testimonials are placeholders — replace with real quotes when you have them.
6. **Project links** — GitHub buttons currently point at your profile; point them at the actual repos, and set `demo` URLs where live demos exist.

## Architecture

```
src/
  lib/
    data.ts          # ALL site content — single source of truth
    motion.ts        # shared Framer Motion variants + easing
    utils.ts         # cn() class merger
  components/
    ui/              # primitives: Button, Reveal, Magnetic, Counter, Tag, SectionHeading
    layout/          # chrome: Navbar, Footer, Shell, CommandPalette, CustomCursor,
                     #         ScrollProgress, AnimatedBackground, ThemeProvider
    sections/        # page sections: Hero, Experience, Projects (+Modal/Art),
                     #                Architecture (+Diagram), Skills, AI, About,
                     #                Testimonials, Contact
  app/               # App Router: layout (fonts/SEO/JSON-LD), page, robots, sitemap
```

Notable details:

- **⌘K / Ctrl+K** opens the command palette (navigate, copy email, open links).
- Theme toggles dark/light; preference persists in `localStorage` and is applied pre-paint to avoid a flash.
- Custom cursor only mounts on fine pointers and respects `prefers-reduced-motion`.
- Project "screenshots" are deterministic generative SVG art (`ProjectArt.tsx`) — swap in real screenshots when you have them.
- `scripts/shoot.mjs` drives headless Chrome (via `puppeteer-core`, not a project dependency) to screenshot every section for design review: `node scripts/shoot.mjs <output-dir>` with the site running on port 4173.
