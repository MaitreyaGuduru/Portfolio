import { BrainCircuit } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { aiFocus } from "@/lib/data";

export function AI() {
  return (
    <section id="ai" className="relative z-10 py-28 md:py-36">
      <div className="section-shell">
        <SectionHeading
          kicker="Working with AI"
          title="Backend habits, applied to AI."
          lede="I bring the discipline I've built on the backend — structure, validation, monitoring — to working with LLMs. These are the areas I'm focused on."
        />

        <div className="grid gap-4 md:grid-cols-2">
          {aiFocus.map((item, i) => (
            <Reveal key={item.title} index={i}>
              <div className="card-surface group relative h-full overflow-hidden p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
                <div
                  className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent-secondary/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 md:opacity-0"
                  aria-hidden
                />
                <BrainCircuit size={20} className="text-accent-secondary" aria-hidden />
                <h3 className="mt-4 text-sm font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
