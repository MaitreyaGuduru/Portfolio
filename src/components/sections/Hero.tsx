"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, FileDown, Mail } from "lucide-react";
import { useRef } from "react";
import { site, stats } from "@/lib/data";
import { ButtonLink } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { Counter } from "@/components/ui/Counter";
import { EASE, blurReveal, stagger } from "@/lib/motion";

const techMarquee = [
  "Java",
  "Spring Boot",
  "PostgreSQL",
  "AWS",
  "Docker",
  "Node.js",
  "NestJS",
  "MQTT",
  "Prometheus",
  "Grafana",
  "OpenAI",
  "GitHub Actions",
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-svh flex-col justify-center overflow-hidden pt-24"
    >
      <motion.div style={{ y, opacity }} className="section-shell relative z-10">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.p variants={blurReveal} className="kicker mb-5">
            {site.role} — Backend &amp; AI Engineering
          </motion.p>

          <motion.h1
            variants={blurReveal}
            className="font-display text-5xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          >
            {site.name}
          </motion.h1>

          <motion.p
            variants={blurReveal}
            className="mt-5 max-w-2xl font-display text-xl font-medium tracking-tight text-muted-foreground md:text-3xl"
          >
            Building <span className="text-gradient">scalable backend systems</span>{" "}
            and AI-powered products.
          </motion.p>

          <motion.p
            variants={blurReveal}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground/80 md:text-lg"
          >
            I&apos;m a backend engineer working with Java, Spring Boot, and
            distributed systems on AWS — the kind of engineer who designs the
            API, ships the service, and owns the dashboard that watches it.
          </motion.p>

          <motion.div
            variants={blurReveal}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <ButtonLink href="#projects" size="lg">
                View Projects
                <ArrowRight size={16} aria-hidden />
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink href={site.resumeUrl} variant="secondary" size="lg" download>
                <FileDown size={16} aria-hidden />
                Resume
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink href="#contact" variant="ghost" size="lg">
                <Mail size={16} aria-hidden />
                Contact Me
              </ButtonLink>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* Stats row */}
        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.9 }}
          className="mt-14 grid grid-cols-2 gap-6 border-t border-border/60 pt-8 md:mt-16 md:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <dd className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={"decimals" in stat ? stat.decimals : 0}
                />
              </dd>
              <dt className="mt-1 text-xs text-muted-foreground">
                {stat.label}
              </dt>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      {/* Tech marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="relative z-10 mt-10 w-full overflow-hidden pb-8"
        aria-hidden
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="flex w-max animate-marquee gap-12">
          {[...techMarquee, ...techMarquee].map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground/60"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
