"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Site-wide ambient background: a faint grid, a centered warm glow at the
 * top (Sarvam-style), a mouse-follow spotlight, and a grain overlay.
 * Everything is fixed, pointer-events-none, and moved via `transform` only.
 *
 * Perf note: the spotlight is a small, statically-styled circle that only
 * moves via `translate` — the compositor handles that for free, so it never
 * repaints the page or stalls scrolling.
 */
export function AnimatedBackground() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 22, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 55, damping: 22, mass: 0.4 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Grid, faded toward edges */}
      <div
        className="bg-grid absolute inset-0 opacity-50"
        style={{
          maskImage:
            "radial-gradient(ellipse 90% 70% at 50% 30%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 70% at 50% 30%, black 30%, transparent 75%)",
        }}
      />

      {/* Centered warm glow at the top — the focal point of the page.
          Centered with left-1/2 + negative margin (NOT translate) because
          framer's animated transform would overwrite a translate class. */}
      <motion.div
        className="absolute -top-[26rem] left-1/2 -ml-[26rem] h-[42rem] w-[52rem] rounded-full blur-[130px]"
        style={{ background: "hsl(var(--accent) / 0.16)" }}
        animate={{ opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* A cooler navy wash just beneath it, for depth. */}
      <motion.div
        className="absolute -top-[16rem] left-1/2 -ml-[32rem] h-[36rem] w-[64rem] rounded-full blur-[130px]"
        style={{ background: "hsl(var(--accent-secondary) / 0.07)" }}
        animate={{ opacity: [0.6, 0.85, 0.6] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Mouse-follow spotlight — static gradient, transform-only movement */}
      <motion.div
        className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full"
        style={{
          x: sx,
          y: sy,
          background:
            "radial-gradient(circle, hsl(var(--glow) / 0.08), transparent 70%)",
        }}
        transformTemplate={(_, t) => `translate3d(-50%, -50%, 0) ${t}`}
      />

      {/* Grain — Sarvam-style film texture, over everything else */}
      <div className="bg-grain absolute inset-0" />
    </div>
  );
}
