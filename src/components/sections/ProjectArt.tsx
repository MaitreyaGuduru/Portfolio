"use client";

import { useState } from "react";
import type { Project } from "@/lib/data";

/**
 * Generative "app window" artwork for project cards. Deterministic per
 * slug so cards are stable across renders, and drawn as SVG so it stays
 * crisp, tiny, and theme-aware — no fake screenshots.
 */

function seededRandom(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822519);
    h = Math.imul(h ^ (h >>> 13), 3266489917);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

export function ProjectArt({
  slug,
  accent,
  title,
}: {
  slug: string;
  accent: string;
  title: string;
}) {
  const rand = seededRandom(slug);
  const codeLines = Array.from({ length: 9 }, (_, i) => ({
    y: 78 + i * 17,
    x: 24 + (i % 3 === 1 ? 16 : i % 3 === 2 ? 32 : 0),
    width: 60 + rand() * 160,
    emphasis: rand() > 0.72,
  }));
  const bars = Array.from({ length: 12 }, (_, i) => ({
    x: 328 + i * 22,
    height: 16 + rand() * 78,
  }));

  return (
    <svg
      viewBox="0 0 620 260"
      role="img"
      aria-label={`Abstract interface artwork for ${title}`}
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`bg-${slug}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={`hsl(${accent} / 0.16)`} />
          <stop offset="100%" stopColor={`hsl(${accent} / 0.02)`} />
        </linearGradient>
        <linearGradient id={`bar-${slug}`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={`hsl(${accent} / 0.55)`} />
          <stop offset="100%" stopColor={`hsl(${accent} / 0.15)`} />
        </linearGradient>
      </defs>

      <rect width="620" height="260" fill={`url(#bg-${slug})`} />

      {/* Window chrome */}
      <rect
        x="12"
        y="14"
        width="596"
        height="246"
        rx="12"
        fill="hsl(var(--card))"
        stroke="hsl(var(--border) / 0.8)"
      />
      <circle cx="34" cy="38" r="4.5" fill="hsl(var(--border))" />
      <circle cx="50" cy="38" r="4.5" fill="hsl(var(--border))" />
      <circle cx="66" cy="38" r="4.5" fill={`hsl(${accent} / 0.7)`} />
      <rect
        x="200"
        y="30"
        width="220"
        height="16"
        rx="8"
        fill="hsl(var(--muted))"
      />
      <line x1="12" y1="58" x2="608" y2="58" stroke="hsl(var(--border) / 0.6)" />

      {/* Code pane */}
      {codeLines.map((line, i) => (
        <rect
          key={i}
          x={line.x}
          y={line.y}
          width={line.width}
          height="8"
          rx="4"
          fill={
            line.emphasis ? `hsl(${accent} / 0.65)` : "hsl(var(--muted-foreground) / 0.25)"
          }
        />
      ))}

      {/* Divider */}
      <line x1="308" y1="58" x2="308" y2="260" stroke="hsl(var(--border) / 0.6)" />

      {/* Chart pane */}
      {bars.map((bar, i) => (
        <rect
          key={i}
          x={bar.x}
          y={218 - bar.height}
          width="13"
          height={bar.height}
          rx="3"
          fill={`url(#bar-${slug})`}
        />
      ))}
      <line
        x1="322"
        y1="218"
        x2="596"
        y2="218"
        stroke="hsl(var(--border))"
      />

      {/* Status pill */}
      <rect
        x="322"
        y="232"
        width="96"
        height="14"
        rx="7"
        fill={`hsl(${accent} / 0.18)`}
      />
      <circle cx="333" cy="239" r="3" fill={`hsl(${accent})`} />
    </svg>
  );
}

/**
 * Renders a project's real screenshot (`project.image`) when it's set and
 * loads successfully; otherwise falls back to the generated art above.
 * `variantKey` keeps the card and modal art visually distinct.
 */
export function ProjectMedia({
  project,
  variantKey = "",
}: {
  project: Project;
  variantKey?: string;
}) {
  const [errored, setErrored] = useState(false);

  if (project.image && !errored) {
    return (
      <img
        src={project.image}
        alt={`${project.title} screenshot`}
        onError={() => setErrored(true)}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover object-top"
      />
    );
  }

  return (
    <ProjectArt
      slug={`${project.slug}${variantKey}`}
      accent={project.accent}
      title={project.title}
    />
  );
}
