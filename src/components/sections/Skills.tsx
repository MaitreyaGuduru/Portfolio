"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { skillGroups } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { EASE, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Skills() {
  const [activeGroup, setActiveGroup] = useState(0);
  const group = skillGroups[activeGroup];

  return (
    <section id="skills" className="relative z-10 py-28 md:py-36">
      <div className="section-shell">
        <SectionHeading
          kicker="Skills"
          title="Tools I reach for."
          lede="Proficiency is what you can debug at 2am, not what's on a list. These are honest levels — the things I use in production, weighted by how deep I've had to go."
        />

        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          {/* Category selector */}
          <Reveal>
            <div className="flex flex-row flex-wrap gap-2 lg:flex-col">
              {skillGroups.map((sg, i) => (
                <button
                  key={sg.category}
                  onClick={() => setActiveGroup(i)}
                  aria-pressed={activeGroup === i}
                  className={cn(
                    "rounded-2xl border px-5 py-4 text-left transition-all duration-300",
                    activeGroup === i
                      ? "border-accent/50 bg-card shadow-[0_0_24px_-12px_hsl(var(--glow)/0.5)]"
                      : "border-border/60 bg-transparent hover:border-border hover:bg-card/50"
                  )}
                >
                  <span
                    className={cn(
                      "block text-sm font-medium",
                      activeGroup === i ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {sg.category}
                  </span>
                  <span className="mt-1 hidden text-xs leading-relaxed text-muted-foreground lg:block">
                    {sg.blurb}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>

          {/* Skill bars */}
          <Reveal index={1}>
            <div className="card-surface p-6 md:p-10">
              <ul key={group.category} className="space-y-7">
                {group.skills.map((skill, i) => (
                  <li key={skill.name}>
                    <div className="mb-2 flex items-baseline justify-between gap-4">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {skill.note}
                      </span>
                    </div>
                    <div
                      className="h-1.5 overflow-hidden rounded-full bg-muted"
                      role="meter"
                      aria-label={`${skill.name} proficiency`}
                      aria-valuenow={skill.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-accent to-accent-secondary"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={viewportOnce}
                        transition={{
                          duration: 1,
                          ease: EASE,
                          delay: 0.15 + i * 0.08,
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
