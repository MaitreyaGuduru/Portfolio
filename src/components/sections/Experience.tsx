"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Building2 } from "lucide-react";
import { experiences } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Experience() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section id="experience" className="relative z-10 py-28 md:py-36">
      <div className="section-shell">
        <SectionHeading
          kicker="Experience"
          title="Where I work."
          lede="Backend engineering at Proxgy since 2024, across their IoT and logistics products. Here's what that looks like in practice."
        />

        <div className="relative ml-2 border-l border-border/70 pl-8 md:ml-4 md:pl-12">
          {experiences.map((exp, i) => {
            const isOpen = expanded === i;
            return (
              <Reveal key={exp.company} index={i} className="relative pb-12">
                {/* Timeline node */}
                <span className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center md:-left-[57px]">
                  <span className="absolute h-5 w-5 animate-pulse-soft rounded-full bg-accent/20" />
                  <span className="h-2.5 w-2.5 rounded-full border-2 border-accent bg-background" />
                </span>

                <div className="card-surface animated-border overflow-hidden">
                  <button
                    onClick={() => setExpanded(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-4 p-6 text-left md:p-8"
                  >
                    <div className="flex items-start gap-4">
                      <span className="glass hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl md:flex">
                        <Building2 size={20} className="text-accent" aria-hidden />
                      </span>
                      <div>
                        <h3 className="heading-md">{exp.role}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          <span className="text-foreground">{exp.company}</span>
                          {" · "}
                          {exp.period}
                        </p>
                        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                          {exp.summary}
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      size={18}
                      aria-hidden
                      className={cn(
                        "mt-1 shrink-0 text-muted-foreground transition-transform duration-300",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-border/60 px-6 pb-8 pt-6 md:px-8">
                          <ul className="grid gap-3 md:grid-cols-2">
                            {exp.achievements.map((achievement) => (
                              <li
                                key={achievement}
                                className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                              >
                                <span
                                  className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70"
                                  aria-hidden
                                />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-7 flex flex-wrap gap-2">
                            {exp.tech.map((tech) => (
                              <Tag key={tech}>{tech}</Tag>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}

          {/* Timeline start marker */}
          <Reveal index={2} className="relative">
            <span
              className="absolute -left-[37px] top-0 h-2 w-2 rounded-full bg-border md:-left-[53px]"
              aria-hidden
            />
            <p className="text-sm text-muted-foreground">
              Before this: engineering degree, a lot of side projects, and the
              slow realization that I enjoy the backend more than anything else.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
