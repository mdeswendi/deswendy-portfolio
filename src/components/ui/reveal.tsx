"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay before this block starts, in seconds. */
  delay?: number;
};

/** Fade-up on scroll — the same motion the homepage uses. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Parent container whose direct `Reveal`-style children animate in sequence.
 * Children must use `variants={fadeUp}` without their own `initial`/`animate`.
 */
export function RevealGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={className}
    >
      {children}
    </motion.div>
  );
}
