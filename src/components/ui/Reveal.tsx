"use client";

import { motion, type Variants } from "framer-motion";
import { fadeUp, blurReveal, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger index — multiplies the base delay. */
  index?: number;
  variant?: "fade" | "blur";
  as?: "div" | "section" | "span" | "li";
};

const variantMap: Record<string, Variants> = {
  fade: fadeUp,
  blur: blurReveal,
};

export function Reveal({
  children,
  className,
  index = 0,
  variant = "fade",
  as = "div",
}: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      className={cn(className)}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={variantMap[variant]}
    >
      {children}
    </Component>
  );
}
