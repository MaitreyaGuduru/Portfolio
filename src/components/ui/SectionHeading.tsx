import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  kicker,
  title,
  lede,
  align = "left",
}: {
  kicker: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "mb-14 max-w-2xl md:mb-20",
        align === "center" && "mx-auto text-center"
      )}
    >
      <Reveal>
        <p className="kicker mb-4">{kicker}</p>
      </Reveal>
      <Reveal index={1} variant="blur">
        <h2 className="heading-lg text-balance">{title}</h2>
      </Reveal>
      {lede && (
        <Reveal index={2}>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}
