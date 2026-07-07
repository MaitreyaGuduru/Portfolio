import { cn } from "@/lib/utils";

export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border/70 bg-muted/60 px-3 py-1 font-mono text-[11px] tracking-wide text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}
