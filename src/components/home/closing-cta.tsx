"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { revealStagger, revealUp, revealView } from "@/components/home/motion";
import { ArrowRight } from "@/components/ui/icons";

export default function ClosingCta() {
  return (
    <motion.section
      variants={revealStagger}
      initial="hidden"
      whileInView="visible"
      viewport={revealView}
      className="mx-auto max-w-6xl border-t border-line px-6 py-14 lg:px-8 lg:py-20"
    >
      <motion.p
        variants={revealUp}
        className="flex items-center gap-3 text-[0.6875rem] tracking-[0.2em] text-muted uppercase"
      >
        <span className="h-px w-6 bg-gold" />
        Have a project idea?
      </motion.p>

      <motion.h2
        variants={revealUp}
        className="mt-6 max-w-3xl text-balance font-display text-3xl leading-[1.12] font-semibold tracking-tight text-cream sm:text-4xl lg:text-5xl"
      >
        Let&rsquo;s discuss how technology can solve your problem.
      </motion.h2>

      <motion.p
        variants={revealUp}
        className="mt-6 max-w-lg text-base leading-relaxed text-muted"
      >
        Tell me what you&rsquo;re working on — I&rsquo;ll tell you how I&rsquo;d
        approach it.
      </motion.p>

      <motion.div variants={revealUp} className="mt-9">
        <Link
          href="/contact"
          className="group inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-xs font-medium tracking-[0.2em] text-ink uppercase transition-colors duration-300 hover:bg-gold-soft"
        >
          Start a conversation
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </motion.section>
  );
}
