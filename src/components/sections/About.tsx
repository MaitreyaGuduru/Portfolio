"use client";

import { motion } from "framer-motion";
import { Compass, Layers, Sparkles, Target } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { withBasePath } from "@/lib/basePath";
import { site } from "@/lib/data";

const mindset = [
  {
    icon: Layers,
    title: "Systems thinking",
    body: "I care about how the whole system fits together — where the data flows, what happens when something fails, and the paths nobody celebrates. The code itself is rarely the hard part.",
  },
  {
    icon: Target,
    title: "Ship, then improve",
    body: "A running service teaches me more than a perfect plan. I ship, watch how it behaves in production, and improve it from there.",
  },
  {
    icon: Compass,
    title: "End-to-end ownership",
    body: "Writing the service, setting up the pipeline, wiring the alerts — if it pages, it's mine. That ownership is where the deepest learning happens.",
  },
  {
    icon: Sparkles,
    title: "Building with AI",
    body: "I build with LLMs the way I build with any other component — with structure around the output and a reliable way to tell when it's wrong.",
  },
];

const journey = [
  {
    year: "The start",
    text: "Got hooked on programming through the puzzle of making things work, and then the harder puzzle of keeping them working.",
  },
  {
    year: "College",
    text: "Learned the fundamentals in class — and learned the most from the side projects I built outside it.",
  },
  {
    year: "Proxgy",
    text: "My first real production work — payments, logistics, IoT, and the humbling experience of a first on-call incident.",
  },
  {
    year: "Now",
    text: "Going deeper into backend systems and building with AI. The long-term goal: take a product from idea all the way to something people use.",
  },
];

export function About() {
  return (
    <section id="about" className="relative z-10 py-28 md:py-36">
      <div className="section-shell">
        <SectionHeading
          kicker="About"
          title="A bit about me."
          lede="I build backend systems that are reliable and pleasant to work on, and products people genuinely use. Here's how I got here and how I work."
        />

        <div className="grid gap-12 lg:grid-cols-[380px_1fr] lg:gap-16">
          {/* Portrait + quick facts */}
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4 }}
                className="card-surface animated-border relative aspect-square overflow-hidden"
              >
                <img
                  src={withBasePath("/portrait.jpg")}
                  alt={`Portrait of ${site.name}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="bg-grain pointer-events-none absolute inset-0" aria-hidden />
                <div className="glass absolute inset-x-4 bottom-4 rounded-xl p-4">
                  <p className="text-sm font-medium">{site.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {site.role} · {site.location}
                  </p>
                </div>
              </motion.div>

              <blockquote className="mt-8 border-l-2 border-accent/60 pl-5 text-sm italic leading-relaxed text-muted-foreground">
                “The backend I&apos;m proudest of is the one nobody notices —
                it just quietly works.”
              </blockquote>
            </div>
          </Reveal>

          <div>
            {/* Mindset grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {mindset.map((item, i) => (
                <Reveal key={item.title} index={i}>
                  <div className="card-surface group h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
                    <item.icon
                      size={20}
                      className="text-accent transition-transform duration-300 group-hover:scale-110"
                      aria-hidden
                    />
                    <h3 className="mt-4 text-sm font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Journey timeline */}
            <div className="mt-14">
              <Reveal>
                <h3 className="mb-8 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  The path so far
                </h3>
              </Reveal>
              <ol className="relative border-l border-border/70 pl-8">
                {journey.map((step, i) => (
                  <Reveal key={step.year} index={i} as="li">
                    <div className="relative pb-8 last:pb-0">
                      <span
                        className="absolute -left-[37px] top-1.5 h-2 w-2 rounded-full bg-accent/80 ring-4 ring-accent/10"
                        aria-hidden
                      />
                      <p className="font-mono text-xs uppercase tracking-widest text-accent">
                        {step.year}
                      </p>
                      <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                        {step.text}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
