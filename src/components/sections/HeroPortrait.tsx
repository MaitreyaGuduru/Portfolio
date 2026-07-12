"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { PortraitArt } from "@/components/sections/PortraitArt";
import { withBasePath } from "@/lib/basePath";
import { site } from "@/lib/data";
import { EASE } from "@/lib/motion";

/**
 * Hero portrait framed like a camera viewfinder — a nod to Maitreya's
 * photography. Renders `public/portrait.jpg`; if that file ever fails to
 * load it falls back to the illustrated avatar so the hero never shows a
 * broken image.
 *
 * The overlay markings are fixed navy tones (not theme tokens) because
 * the photo itself is always light — theme-relative colors would wash
 * out in dark mode.
 */
const MARK = "#20305a";

export function HeroPortrait() {
  const [errored, setErrored] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // The static HTML ships with the <img> already in it, so a missing file
  // 404s during parse — before React hydrates and can attach onError. Catch
  // that case on mount by inspecting the already-loaded image.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setErrored(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
      className="relative mx-auto w-full max-w-sm lg:ml-auto lg:mr-0 lg:max-w-md"
    >
      {/* Frame */}
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-border/70 bg-[#f4ece1] shadow-[0_24px_80px_-40px_rgb(32_48_90/0.45)]">
        {errored ? (
          <PortraitArt />
        ) : (
          <img
            ref={imgRef}
            src={withBasePath("/portrait.jpg")}
            alt={`Portrait of ${site.name}`}
            onError={() => setErrored(true)}
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
        )}

        {/* Grain over the photo to match the site texture */}
        <div className="bg-grain pointer-events-none absolute inset-0" aria-hidden />

        {/* Viewfinder corner brackets */}
        <span className="pointer-events-none absolute left-4 top-4 h-6 w-6 rounded-tl border-l-2 border-t-2" style={{ borderColor: `${MARK}66` }} aria-hidden />
        <span className="pointer-events-none absolute right-4 top-4 h-6 w-6 rounded-tr border-r-2 border-t-2" style={{ borderColor: `${MARK}66` }} aria-hidden />
        <span className="pointer-events-none absolute bottom-4 left-4 h-6 w-6 rounded-bl border-b-2 border-l-2" style={{ borderColor: `${MARK}66` }} aria-hidden />
        <span className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 rounded-br border-b-2 border-r-2" style={{ borderColor: `${MARK}66` }} aria-hidden />

        {/* EXIF strip along the left edge, inside the frame */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-5 top-1/2 hidden origin-left -translate-y-1/2 -rotate-90 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.32em] sm:block"
          style={{ color: `${MARK}80` }}
        >
          ISO 200 · f/2.8 · 1/125
        </div>

        {/* FOCUS, vertical on the right */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-5 top-1/2 hidden -translate-y-1/2 items-center font-mono text-[9px] uppercase tracking-[0.32em] sm:flex"
          style={{ color: `${MARK}70`, writingMode: "vertical-rl" }}
        >
          Focus <span className="text-accent">▸</span>
        </div>

        {/* Date stamp, camera-style — kept clear of the corner bracket */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-5 right-12 font-mono text-sm tracking-[0.2em] text-accent"
        >
          &apos;24 06 10
        </div>
      </div>
    </motion.div>
  );
}
