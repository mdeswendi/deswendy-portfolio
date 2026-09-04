"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { revealStagger, revealUp, revealView } from "@/components/home/motion";
import { ArrowRight } from "@/components/ui/icons";
import { site } from "@/lib/site";

export default function AboutPreview() {
  return (
    <motion.section
      variants={revealStagger}
      initial="hidden"
      whileInView="visible"
      viewport={revealView}
      className="mx-auto max-w-6xl border-t border-line px-6 py-14 lg:px-8 lg:py-16"
    >
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <motion.p
            variants={revealUp}
            className="flex items-center gap-3 text-[0.6875rem] tracking-[0.2em] text-muted uppercase"
          >
            <span className="h-px w-6 bg-gold" />
            The Short Version
          </motion.p>

          <motion.h2
            variants={revealUp}
            className="mt-5 text-balance font-display text-2xl font-semibold tracking-tight text-cream lg:text-4xl"
          >
            From real-world problems to digital solutions.
          </motion.h2>
        </div>

        <div>
          <motion.p
            variants={revealUp}
            className="text-base leading-[1.8] text-muted"
          >
            I&rsquo;m {site.name} — a full-stack developer who builds digital
            solutions for real-world problems. My work focuses on websites,
            business systems, automation, and practical technology.
          </motion.p>

          <motion.p
            variants={revealUp}
            className="mt-4 text-base leading-[1.8] text-muted"
          >
            I came to software from industrial technical work — maintaining cold
            storage systems and gensets — and kept the same habit: find the real
            problem first, then build something reliable around it.
          </motion.p>

          <motion.div variants={revealUp} className="mt-7">
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-xs tracking-[0.2em] text-cream uppercase transition-colors duration-300 hover:text-gold"
            >
              More about me
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
