"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Home,
  Briefcase,
  FolderGit2,
  Wrench,
  User,
  Mail,
  FileDown,
  Github,
  Linkedin,
  Copy,
  Check,
  CornerDownLeft,
} from "lucide-react";
import { site } from "@/lib/data";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

type CommandItem = {
  id: string;
  label: string;
  hint?: string;
  icon: React.ReactNode;
  keywords: string;
  action: () => void;
};

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const go = useCallback(
    (href: string) => {
      onClose();
      if (href.startsWith("#")) {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.open(href, "_blank", "noopener,noreferrer");
      }
    },
    [onClose]
  );

  const copyEmail = useCallback(async () => {
    await navigator.clipboard.writeText(site.email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 900);
  }, [onClose]);

  const items = useMemo<CommandItem[]>(
    () => [
      { id: "home", label: "Go to Home", icon: <Home size={15} />, keywords: "home top hero", action: () => go("#home") },
      { id: "experience", label: "Go to Experience", icon: <Briefcase size={15} />, keywords: "experience work proxgy job", action: () => go("#experience") },
      { id: "projects", label: "Go to Projects", icon: <FolderGit2 size={15} />, keywords: "projects work portfolio orbitlab resume finance", action: () => go("#projects") },
      { id: "skills", label: "Go to Skills", icon: <Wrench size={15} />, keywords: "skills stack java spring postgres aws", action: () => go("#skills") },
      { id: "about", label: "Go to About", icon: <User size={15} />, keywords: "about me bio philosophy", action: () => go("#about") },
      { id: "contact", label: "Go to Contact", icon: <Mail size={15} />, keywords: "contact email reach hire", action: () => go("#contact") },
      { id: "copy-email", label: copied ? "Copied!" : "Copy email address", hint: site.email, icon: copied ? <Check size={15} className="text-accent" /> : <Copy size={15} />, keywords: "copy email address clipboard", action: copyEmail },
      { id: "resume", label: "Download resume", icon: <FileDown size={15} />, keywords: "resume cv download pdf", action: () => go(site.resumeUrl) },
      { id: "github", label: "Open GitHub", icon: <Github size={15} />, keywords: "github code repos", action: () => go(site.github) },
      { id: "linkedin", label: "Open LinkedIn", icon: <Linkedin size={15} />, keywords: "linkedin profile connect", action: () => go(site.linkedin) },
    ],
    [go, copyEmail, copied]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) || item.keywords.includes(q)
    );
  }, [items, query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      // Wait for the enter animation before focusing.
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => setSelected(0), [query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      }
      if (e.key === "Enter" && filtered[selected]) {
        e.preventDefault();
        filtered[selected].action();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, selected, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[80] flex items-start justify-center bg-background/60 px-4 pt-[18vh] backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="glass w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl shadow-black/40"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-border/60 px-4">
              <Search size={15} className="text-muted-foreground" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sections, links, actions…"
                className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                aria-label="Search commands"
              />
              <kbd className="rounded border border-border/70 bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                esc
              </kbd>
            </div>
            <ul className="max-h-72 overflow-y-auto p-2" role="listbox">
              {filtered.length === 0 && (
                <li className="px-3 py-8 text-center text-sm text-muted-foreground">
                  No results for “{query}”
                </li>
              )}
              {filtered.map((item, i) => (
                <li key={item.id} role="option" aria-selected={i === selected}>
                  <button
                    onClick={item.action}
                    onMouseEnter={() => setSelected(i)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                      i === selected
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    <span className="text-muted-foreground">{item.icon}</span>
                    <span className="flex-1">{item.label}</span>
                    {item.hint && (
                      <span className="font-mono text-[11px] text-muted-foreground/70">
                        {item.hint}
                      </span>
                    )}
                    {i === selected && (
                      <CornerDownLeft
                        size={13}
                        className="text-muted-foreground/60"
                        aria-hidden
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
