"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, FileDown, Mail } from "lucide-react";
import { useRef } from "react";
import { site } from "@/lib/data";
import { ButtonLink } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { HeroPortrait } from "@/components/sections/HeroPortrait";
import { blurReveal, stagger } from "@/lib/motion";

const techMarquee = [
  "NestJS",
  "TypeScript",
  "PostgreSQL",
  "AWS",
  "Docker",
  "Node.js",
  "MQTT",
  "Prometheus",
  "Grafana",
  "GitHub Actions",
  "Java",
  "Spring Boot",
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-svh flex-col justify-center overflow-hidden pb-8 pt-28 md:pt-24"
    >
      <motion.div style={{ y, opacity }} className="section-shell relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: intro */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.p variants={blurReveal} className="kicker mb-5">
              {site.role} — Backend &amp; AI Engineering
            </motion.p>

            <motion.h1
              variants={blurReveal}
              className="font-display text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl md:text-7xl"
            >
              Maitreya
              <br />
              Guduru<span className="text-accent">.</span>
            </motion.h1>

            <motion.p
              variants={blurReveal}
              className="mt-6 max-w-xl font-display text-xl font-medium tracking-tight text-muted-foreground md:text-2xl"
            >
              Building <span className="text-gradient">scalable backend systems</span>{" "}
              and AI-powered products.
            </motion.p>

            <motion.p
              variants={blurReveal}
              className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground/80"
            >
              I&apos;m a backend engineer at Proxgy, working with NestJS and
              TypeScript on AWS. I own services end to end — designing the
              API, shipping it, and monitoring it in production.
            </motion.p>

            <motion.div
              variants={blurReveal}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <ButtonLink href="#projects">
                  View Projects
                  <ArrowRight size={15} aria-hidden />
                </ButtonLink>
              </Magnetic>
              <Magnetic>
                <ButtonLink href={site.resumeUrl} variant="secondary" download>
                  <FileDown size={15} aria-hidden />
                  Resume
                </ButtonLink>
              </Magnetic>
              <Magnetic>
                <ButtonLink href="#contact" variant="ghost">
                  <Mail size={15} aria-hidden />
                  Contact Me
                </ButtonLink>
              </Magnetic>
            </motion.div>
          </motion.div>

          {/* Right: framed portrait */}
          <div>
            <HeroPortrait />
          </div>
        </div>
      </motion.div>

      {/* Tech marquee — aligned to the same shell as the content above */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="section-shell relative z-10 mt-16 md:mt-20"
        aria-hidden
      >
        <div className="border-t border-border/60 pt-6">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">
            Tools I work with
          </p>
          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
            <div className="flex w-max animate-marquee items-center gap-10">
              {[...techMarquee, ...techMarquee].map((tech, i) => (
                <span
                  key={`${tech}-${i}`}
                  className="flex items-center gap-10 font-mono text-sm uppercase tracking-[0.18em] text-muted-foreground/70"
                >
                  {tech}
                  <span className="text-accent/50">•</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
