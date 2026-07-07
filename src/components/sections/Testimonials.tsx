import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  return (
    <section id="testimonials" className="relative z-10 py-28 md:py-36">
      <div className="section-shell">
        <SectionHeading
          kicker="Word of mouth"
          title="What people say."
          align="center"
        />

        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.quote} index={i}>
              <figure className="card-surface flex h-full flex-col p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30">
                <Quote size={18} className="text-accent/60" aria-hidden />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-border/50 pt-4">
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{t.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
