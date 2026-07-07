import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { principles } from "@/lib/data";
import { ArchitectureDiagram } from "@/components/sections/ArchitectureDiagram";

export function Architecture() {
  return (
    <section id="architecture" className="relative z-10 py-28 md:py-36">
      <div className="section-shell">
        <SectionHeading
          kicker="How I think"
          title="Architecture is a set of promises."
          lede="Every system I design starts with the same questions: what breaks first, who gets paged, and how do we know? Here's the shape most of my systems take — and the principles behind it."
        />

        <Reveal variant="blur">
          <ArchitectureDiagram />
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle, i) => (
            <Reveal key={principle.title} index={i}>
              <div className="group h-full rounded-2xl border border-border/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-card/60">
                <span className="font-mono text-[10px] text-muted-foreground/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-sm font-semibold">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {principle.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
