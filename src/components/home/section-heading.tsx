"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { revealUp } from "@/components/home/motion";
import { ArrowRight } from "@/components/ui/icons";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  /** Optional trailing link, e.g. "All projects →". */
  action?: { label: string; href: string };
};

/**
 * Shared header for the home-page sections. Renders `variants` only — it
 * expects a `stagger` parent so its lines reveal in the section's rhythm.
 */
export function SectionHeading({ eyebrow, title, action }: SectionHeadingProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
      <div>
        <motion.p
          variants={revealUp}
          className="flex items-center gap-3 text-[0.6875rem] tracking-[0.2em] text-muted uppercase"
        >
          <span className="h-px w-6 bg-gold" />
          {eyebrow}
        </motion.p>

        <motion.h2
          variants={revealUp}
          className="mt-5 max-w-2xl text-balance font-display text-2xl font-semibold tracking-tight text-cream lg:text-3xl"
        >
          {title}
        </motion.h2>
      </div>

      {action && (
        <motion.div variants={revealUp}>
          <Link
            href={action.href}
            className="group inline-flex items-center gap-2 text-xs tracking-[0.2em] text-cream uppercase transition-colors duration-300 hover:text-gold"
          >
            {action.label}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      )}
    </div>
  );
}
