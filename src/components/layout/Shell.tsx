"use client";

import { useEffect, useState, useCallback } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";

/**
 * Client shell: owns global chrome (nav, cursor, palette, background)
 * and the ⌘K / Ctrl+K shortcut, so page.tsx can stay a server component.
 */
export function Shell({ children }: { children: React.ReactNode }) {
  const [paletteOpen, setPaletteOpen] = useState(false);

  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <AnimatedBackground />
      <ScrollProgress />
      <CustomCursor />
      <Navbar onOpenPalette={openPalette} />
      <CommandPalette open={paletteOpen} onClose={closePalette} />
      {children}
    </>
  );
}
