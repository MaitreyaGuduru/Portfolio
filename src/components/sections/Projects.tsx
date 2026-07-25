"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight, Search } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { ProjectMedia } from "@/components/sections/ProjectArt";
import { ProjectModal } from "@/components/sections/ProjectModal";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const filters = ["All", "AI", "Platform", "Visualization"] as const;

export function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Project | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesFilter = filter === "All" || p.category === filter;
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q));
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  return (
    <section id="projects" className="relative z-10 py-28 md:py-36">
      <div className="section-shell">
        <SectionHeading
          kicker="Projects"
          title="Things I've built."
          lede="Each of these started with a real problem — some from work, some personal. Open any card for the architecture, the hard parts, and the outcome."
        />

        {/* Filter + search */}
        <Reveal className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
            {filters.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm transition-all duration-300",
                  filter === f
                    ? "border-accent/60 bg-accent/10 text-foreground"
                    : "border-border/60 text-muted-foreground hover:border-border hover:text-foreground"
                )}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative sm:w-64">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects…"
              aria-label="Search projects"
              className="h-10 w-full rounded-full border border-border/60 bg-card/50 pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent/50"
            />
          </div>
        </Reveal>

        {/* Cards */}
        <motion.div layout className="grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <motion.article
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.05 }}
                className={cn(
                  "card-surface animated-border group flex flex-col overflow-hidden transition-shadow duration-500 hover:shadow-[0_24px_64px_-32px_hsl(var(--glow)/0.35)]",
                  project.featured && i === 0 && "md:col-span-2"
                )}
              >
                <button
                  onClick={() => setSelected(project)}
                  className="relative block h-52 w-full cursor-pointer overflow-hidden border-b border-border/60 text-left md:h-60"
                  aria-label={`Open ${project.title} details`}
                >
                  <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                    <ProjectMedia project={project} />
                  </div>
                  <span className="glass absolute right-4 top-4 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight size={15} aria-hidden />
                  </span>
                </button>

                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                        {project.category}
                      </p>
                      <h3 className="mt-2 font-display text-lg font-semibold tracking-tight md:text-xl">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {project.tagline}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 5).map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-4 border-t border-border/50 pt-5">
                    <button
                      onClick={() => setSelected(project)}
                      className="link-underline text-sm font-medium text-foreground"
                    >
                      Case study
                    </button>
                    <span className="flex-1" />
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} on GitHub`}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Github size={17} aria-hidden />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} live demo`}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <ExternalLink size={17} aria-hidden />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 && (
          <p className="py-16 text-center text-sm text-muted-foreground">
            Nothing matches “{query}” — try a different search.
          </p>
        )}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
