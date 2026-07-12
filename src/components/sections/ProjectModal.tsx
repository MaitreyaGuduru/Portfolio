"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, Puzzle, Boxes, Flame, TrendingUp } from "lucide-react";
import type { Project } from "@/lib/data";
import { Tag } from "@/components/ui/Tag";
import { ButtonLink } from "@/components/ui/Button";
import { ProjectMedia } from "@/components/sections/ProjectArt";
import { EASE } from "@/lib/motion";

const blocks = [
  { key: "problem", label: "The problem", icon: Puzzle },
  { key: "architecture", label: "Architecture", icon: Boxes },
] as const;

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  // Portal target — sections create stacking contexts (z-10), so the
  // modal must mount at document.body to layer above the fixed navbar.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-background/70 p-4 backdrop-blur-md md:p-8"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} details`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="glass relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close project details"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/60 text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
            >
              <X size={16} />
            </button>

            <div className="h-56 w-full overflow-hidden rounded-t-3xl border-b border-border/60 md:h-64">
              <ProjectMedia project={project} variantKey="-modal" />
            </div>

            <div className="p-6 md:p-10">
              <p className="kicker mb-3">{project.category}</p>
              <h3 className="heading-md md:text-3xl">{project.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">
                {project.tagline}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>

              <div className="mt-8 space-y-7">
                {blocks.map(({ key, label, icon: Icon }) => (
                  <div key={key}>
                    <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold">
                      <Icon size={15} className="text-accent" aria-hidden />
                      {label}
                    </h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {project[key]}
                    </p>
                  </div>
                ))}

                <div>
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                    <Flame size={15} className="text-accent" aria-hidden />
                    Engineering challenges
                  </h4>
                  <ul className="space-y-2.5">
                    {project.challenges.map((challenge) => (
                      <li
                        key={challenge}
                        className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span
                          className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70"
                          aria-hidden
                        />
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <TrendingUp size={15} className="text-accent" aria-hidden />
                    Results
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {project.results}
                  </p>
                </div>
              </div>

              <div className="mt-9 flex flex-wrap gap-3 border-t border-border/60 pt-7">
                {project.github && (
                  <ButtonLink
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    size="sm"
                  >
                    <Github size={14} aria-hidden />
                    GitHub
                  </ButtonLink>
                )}
                {project.demo && (
                  <ButtonLink
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="sm"
                  >
                    <ExternalLink size={14} aria-hidden />
                    Live Demo
                  </ButtonLink>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
