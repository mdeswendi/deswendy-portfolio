"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { ArrowRight } from "@/components/ui/icons";
import { fadeUp, stagger } from "@/lib/motion";

export default function AboutPreview() {
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="mx-auto max-w-6xl border-t border-line px-6 py-20 lg:px-8 lg:py-28"
    >
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <motion.p
            variants={fadeUp}
            className="flex items-center gap-3 text-[0.6875rem] tracking-[0.2em] text-muted uppercase"
          >
            <span className="h-px w-6 bg-gold" />
            The Short Version
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="mt-5 text-balance font-display text-2xl font-semibold tracking-tight text-cream lg:text-4xl"
          >
            From real-world problems to digital solutions.
          </motion.h2>
        </div>

        <div>
          <motion.p
            variants={fadeUp}
            className="text-base leading-[1.85] text-muted"
          >
            I started in industrial technical work — maintaining cold storage
            systems and gensets — before moving deliberately into software. The
            domain changed; the method didn&rsquo;t: find the real problem, then
            build something reliable around it.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-base leading-[1.85] text-muted"
          >
            Today I build websites, business systems, and automation, while
            finishing a bachelor&rsquo;s in Information Systems and adding to a
            Cisco-certified networking foundation.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8">
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
