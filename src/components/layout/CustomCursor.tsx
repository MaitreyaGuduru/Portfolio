"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

/**
 * A minimal dot + trailing ring cursor. Only mounts on fine pointers;
 * touch devices never pay for it.
 *
 * Perf note: the ring's hover-grow used to animate `width`/`height`,
 * which forces a layout reflow on every hover transition across the
 * whole page. It now animates `scale` on an inner element instead —
 * transform-only, compositor-cheap — while the outer element (which
 * tracks the spring-smoothed position) never changes size.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hoveringLink, setHoveringLink] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 28, mass: 0.45 });
  const ringY = useSpring(y, { stiffness: 300, damping: 28, mass: 0.45 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!fine || reducedMotion) return;

    setEnabled(true);
    document.body.dataset.customCursor = "true";

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as HTMLElement;
      setHoveringLink(
        Boolean(target.closest("a, button, [role='button'], input, textarea"))
      );
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      delete document.body.dataset.customCursor;
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-foreground"
            style={{ x, y }}
            transformTemplate={(_, t) => `translate3d(-50%, -50%, 0) ${t}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-[99] h-7 w-7"
            style={{ x: ringX, y: ringY }}
            transformTemplate={(_, t) => `translate3d(-50%, -50%, 0) ${t}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="h-full w-full rounded-full border border-foreground/30"
              animate={{
                scale: hoveringLink ? 1.55 : 1,
                backgroundColor: hoveringLink
                  ? "hsl(var(--accent) / 0.1)"
                  : "hsl(var(--accent) / 0)",
              }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
