import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { site } from "@/lib/data";

const socials = [
  { label: "GitHub", href: site.github, icon: Github },
  { label: "LinkedIn", href: site.linkedin, icon: Linkedin },
  { label: "Email", href: `mailto:${site.email}`, icon: Mail },
  { label: "Resume", href: site.resumeUrl, icon: FileText },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/60">
      <div className="section-shell flex flex-col items-center justify-between gap-6 py-10 md:flex-row">
        <div className="text-center md:text-left">
          <p className="font-display text-sm font-semibold">
            {site.name}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Designed and built from scratch. © {new Date().getFullYear()}
          </p>
        </div>

        <ul className="flex items-center gap-2">
          {socials.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-foreground"
              >
                <Icon size={16} aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
