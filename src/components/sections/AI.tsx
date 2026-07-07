import { BrainCircuit, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { aiFocus, aiRoadmap } from "@/lib/data";

export function AI() {
  return (
    <section id="ai" className="relative z-10 py-28 md:py-36">
      <div className="section-shell">
        <SectionHeading
          kicker="AI Engineering"
          title="Backend discipline, applied to LLMs."
          lede="AI products fail the same way distributed systems do — silently, at the edges, under load. I bring the same engineering rigor to LLM pipelines that I bring to payment systems."
        />

        <div className="grid gap-4 md:grid-cols-2">
          {aiFocus.map((item, i) => (
            <Reveal key={item.title} index={i}>
              <div className="card-surface group relative h-full overflow-hidden p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
                <div
                  className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent-purple/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 md:opacity-0"
                  aria-hidden
                />
                <BrainCircuit size={20} className="text-accent-purple" aria-hidden />
                <h3 className="mt-4 text-sm font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal index={2} className="mt-10">
          <div className="rounded-2xl border border-accent-purple/30 bg-gradient-to-br from-accent-purple/[0.07] to-transparent p-7 md:p-9">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-accent-purple">
              What I want to build next
            </h3>
            <ul className="mt-5 space-y-3">
              {aiRoadmap.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <ArrowRight
                    size={14}
                    className="mt-1 shrink-0 text-accent-purple"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
