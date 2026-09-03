"use client";

import { motion } from "framer-motion";

import { fadeUp, stagger } from "@/lib/motion";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

/** Shared editorial header for listing pages (/projects, /journal, ...). */
export default function PageHeader({
  eyebrow,
  title,
  subtitle,
}: PageHeaderProps) {
  return (
    <motion.header
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-6xl px-6 pt-20 pb-16 lg:px-8 lg:pt-28 lg:pb-24"
    >
      <motion.p
        variants={fadeUp}
        className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted"
      >
        <span className="h-px w-8 bg-gold" />
        {eyebrow}
      </motion.p>

      <motion.h1
        variants={fadeUp}
        className="mt-8 max-w-3xl text-balance font-display text-4xl leading-[1.1] font-semibold tracking-[-0.02em] text-cream sm:text-5xl lg:text-6xl"
      >
        {title}
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
      >
        {subtitle}
      </motion.p>
    </motion.header>
  );
}
