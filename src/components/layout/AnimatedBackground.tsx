"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Site-wide ambient background: a faint grid, two slow-drifting glow
 * blobs, a mouse-follow spotlight, and a grain overlay. Everything is
 * fixed, pointer-events-none, and moved via `transform` only.
 *
 * Perf note: the spotlight used to be a `radial-gradient(...)` string
 * recomputed every animation frame and applied as the `background` of
 * a full-viewport div — that forces the browser to repaint the whole
 * layer on every mouse move, which is expensive enough to stall
 * scrolling too. It's now a small, statically-styled circle that only
 * moves via `translate`, which the compositor handles for free.
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

      {/* Mouse-follow spotlight — static gradient, transform-only movement */}
      <motion.div
        className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full"
        style={{
          x: sx,
          y: sy,
          background:
            "radial-gradient(circle, hsl(var(--glow) / 0.10), transparent 70%)",
        }}
        transformTemplate={(_, t) => `translate3d(-50%, -50%, 0) ${t}`}
      />

      {/* Drifting blobs */}
      <motion.div
        className="absolute -top-40 left-[10%] h-[34rem] w-[34rem] rounded-full blur-[120px]"
        style={{ background: "hsl(var(--accent) / 0.12)" }}
        animate={{ x: [0, 60, -20, 0], y: [0, 30, 60, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-52 right-[5%] h-[30rem] w-[30rem] rounded-full blur-[120px]"
        style={{ background: "hsl(var(--accent-secondary) / 0.10)" }}
        animate={{ x: [0, -50, 20, 0], y: [0, -40, -10, 0] }}
        transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grain — Sarvam-style film texture, tied over everything else */}
      <div className="bg-grain absolute inset-0" />
    </div>
  );
}
