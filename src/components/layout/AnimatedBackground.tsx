"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

/**
 * Site-wide ambient background: a faint grid, two slow-drifting glow
 * blobs, and a mouse-follow radial highlight. Everything is fixed,
 * pointer-events-none, and GPU-composited — it never touches layout.
 */
export function AnimatedBackground() {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.3);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const spotlight = useMotionTemplate`radial-gradient(600px circle at calc(${sx} * 100%) calc(${sy} * 100%), hsl(var(--glow) / 0.07), transparent 70%)`;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Grid, faded toward edges */}
      <div
        className="bg-grid absolute inset-0 opacity-60"
        style={{
          maskImage:
            "radial-gradient(ellipse 90% 70% at 50% 30%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 70% at 50% 30%, black 30%, transparent 75%)",
        }}
      />

      {/* Mouse-follow spotlight */}
      <motion.div className="absolute inset-0" style={{ background: spotlight }} />

      {/* Drifting blobs */}
      <motion.div
        className="absolute -top-40 left-[10%] h-[34rem] w-[34rem] rounded-full blur-[120px]"
        style={{ background: "hsl(var(--accent) / 0.10)" }}
        animate={{ x: [0, 60, -20, 0], y: [0, 30, 60, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-52 right-[5%] h-[30rem] w-[30rem] rounded-full blur-[120px]"
        style={{ background: "hsl(var(--accent-purple) / 0.08)" }}
        animate={{ x: [0, -50, 20, 0], y: [0, -40, -10, 0] }}
        transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
