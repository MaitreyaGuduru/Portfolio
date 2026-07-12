"use client";

import { useState } from "react";
import { Mail, Copy, Check, Github, Linkedin, FileDown, Send } from "lucide-react";
import { site } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";

const channels = [
  { label: "GitHub", value: "github.com/maitreyaguduru", href: site.github, icon: Github },
  { label: "LinkedIn", value: "linkedin.com/in/maitreyaguduru", href: site.linkedin, icon: Linkedin },
  { label: "Resume", value: "One page, up to date", href: site.resumeUrl, icon: FileDown },
];

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(site.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(
      `Portfolio contact from ${data.get("name")}`
    );
    const body = encodeURIComponent(
      `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="relative z-10 py-28 md:py-36">
      <div className="section-shell">
        <SectionHeading
          kicker="Contact"
          title="Let's build something."
          lede="I'm open to backend and AI engineering roles, and always glad to talk systems. Email is the fastest way to reach me, and I reply."
        />

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: direct channels */}
          <div>
            <Reveal>
              <div className="card-surface flex items-center justify-between gap-4 p-5">
                <div className="flex min-w-0 items-center gap-4">
                  <span className="glass flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
                    <Mail size={17} className="text-accent" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="truncate text-sm font-medium">{site.email}</p>
                  </div>
                </div>
                <button
                  onClick={copyEmail}
                  aria-label={copied ? "Email copied" : "Copy email address"}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-all hover:border-accent/50 hover:text-foreground"
                >
                  {copied ? (
                    <Check size={15} className="text-emerald-400" aria-hidden />
                  ) : (
                    <Copy size={15} aria-hidden />
                  )}
                </button>
              </div>
            </Reveal>

            <div className="mt-4 space-y-4">
              {channels.map((channel, i) => (
                <Reveal key={channel.label} index={i + 1}>
                  <a
                    href={channel.href}
                    target={channel.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="card-surface group flex items-center gap-4 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40"
                  >
                    <span className="glass flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
                      <channel.icon
                        size={17}
                        className="text-accent transition-transform duration-300 group-hover:scale-110"
                        aria-hidden
                      />
                    </span>
                    <div>
                      <p className="text-xs text-muted-foreground">{channel.label}</p>
                      <p className="text-sm font-medium">{channel.value}</p>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>

            <Reveal index={4}>
              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.05] px-5 py-4">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Available now</span>
                  {" — "}
                  {site.availability.toLowerCase()}.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal index={1}>
            <form onSubmit={onSubmit} className="card-surface p-6 md:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-medium text-muted-foreground">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Ada Lovelace"
                    className="h-11 rounded-xl border border-border/60 bg-background/50 px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent/60"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-medium text-muted-foreground">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@company.com"
                    className="h-11 rounded-xl border border-border/60 bg-background/50 px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent/60"
                  />
                </div>
              </div>
              <div className="mt-5 flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-medium text-muted-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder="Tell me about the role, the problem, or the system you're building…"
                  className="resize-none rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent/60"
                />
              </div>
              <div className="mt-6">
                <Magnetic>
                  <Button type="submit" size="lg" className="w-full sm:w-auto">
                    {sent ? (
                      <>
                        <Check size={16} aria-hidden />
                        Opening your mail app…
                      </>
                    ) : (
                      <>
                        <Send size={15} aria-hidden />
                        Send message
                      </>
                    )}
                  </Button>
                </Magnetic>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
