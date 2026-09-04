"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { ArrowRight } from "@/components/ui/icons";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

export default function ClosingCta() {
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="mx-auto max-w-6xl border-t border-line px-6 py-24 lg:px-8 lg:py-36"
    >
      <motion.p
        variants={fadeUp}
        className="flex items-center gap-3 text-[0.6875rem] tracking-[0.2em] text-muted uppercase"
      >
        <span className="h-px w-6 bg-gold" />
        Have an idea?
      </motion.p>

      <motion.h2
        variants={fadeUp}
        className="mt-6 max-w-3xl text-balance font-display text-3xl leading-[1.1] font-semibold tracking-tight text-cream sm:text-4xl lg:text-5xl"
      >
        Let&rsquo;s turn it into something real.
      </motion.h2>

      <motion.p
        variants={fadeUp}
        className="mt-6 max-w-lg text-base leading-relaxed text-muted"
      >
        A website, a business system, an automation — or something that
        doesn&rsquo;t have a name yet. Tell me what you&rsquo;re working on.
      </motion.p>

      <motion.div variants={fadeUp} className="mt-10">
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
