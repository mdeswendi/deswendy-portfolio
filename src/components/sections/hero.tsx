"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { ArrowRight } from "@/components/ui/icons";
import { easeOut, fadeUp, stagger } from "@/lib/motion";
import { site } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-5rem)] items-center overflow-hidden">
      {/* Ambient gold light — decorative only. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 right-[-15%] h-[540px] w-[540px] rounded-full bg-gold/10 blur-[160px]" />
        <div className="absolute bottom-[-25%] left-[-15%] h-[440px] w-[440px] rounded-full bg-gold/5 blur-[180px]" />
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative mx-auto w-full max-w-6xl px-6 py-24 lg:px-8"
      >
        <motion.p
          variants={fadeUp}
          className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
          </span>
          {site.role} &middot; {site.location}
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="mt-10 max-w-4xl text-balance font-display text-4xl leading-[1.08] font-semibold tracking-[-0.02em] text-cream sm:text-5xl lg:text-6xl xl:text-[4.25rem]"
        >
          Building Digital Solutions Through Code, Creativity, and{" "}
          <span className="text-gold">Continuous Learning.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
        >
          I&rsquo;m {site.name} — a full-stack developer turning ideas into fast,
          accessible, carefully crafted web products. This is where I ship work
          and write about what I learn along the way.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-gold-soft"
          >
            View Projects
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href="/journal"
            className="group inline-flex items-center gap-3 rounded-full border border-line px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-cream transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            Read Journal
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1, ease: easeOut }}
        className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
      >
        <span className="text-[0.625rem] uppercase tracking-[0.3em] text-muted">
          Scroll
        </span>
        <span className="h-12 w-px bg-gradient-to-b from-gold to-transparent" />
      </motion.div>
    </section>
  );
}
