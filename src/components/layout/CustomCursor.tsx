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
 * touch devices never pay for it. The ring expands over interactive
 * elements instead of a gimmicky blob.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hoveringLink, setHoveringLink] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.6 });

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
            transformTemplate={(_, t) => `translate(-50%, -50%) ${t}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-[99] rounded-full border border-foreground/30"
            style={{ x: ringX, y: ringY }}
            transformTemplate={(_, t) => `translate(-50%, -50%) ${t}`}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              width: hoveringLink ? 44 : 28,
              height: hoveringLink ? 44 : 28,
              backgroundColor: hoveringLink
                ? "hsl(var(--accent) / 0.08)"
                : "transparent",
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
