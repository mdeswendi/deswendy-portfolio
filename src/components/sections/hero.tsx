"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { revealStagger, revealUp } from "@/components/home/motion";
import { ArrowRight } from "@/components/ui/icons";
import { easeOut } from "@/lib/motion";
import { site } from "@/lib/site";

const focusAreas = [
  "Web Development",
  "Business Systems",
  "AI & Automation",
  "Cisco Certified",
];

export default function Hero() {
  return (
    <section className="relative">
      {/* Ambient gold light — decorative only, clipped to the hero. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 right-[-12%] h-[520px] w-[520px] rounded-full bg-gold/10 blur-[170px]" />
        <div className="absolute bottom-[-30%] left-[-15%] h-[420px] w-[420px] rounded-full bg-gold/[0.06] blur-[180px]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-8 lg:py-16">
        <motion.div
          variants={revealStagger}
          initial="hidden"
          animate="visible"
          className="lg:flex lg:flex-col lg:justify-center"
        >
          <motion.p
            variants={revealUp}
            className="flex items-center gap-3 text-xs tracking-[0.25em] text-muted uppercase"
          >
            <span className="h-px w-8 bg-gold" />
            {site.role} &middot; {site.location}
          </motion.p>

          <motion.h1
            variants={revealUp}
            className="mt-6 font-display text-[2rem] leading-[1.14] font-semibold tracking-[-0.02em] text-cream sm:text-[2.5rem] sm:leading-[1.12] lg:text-[2.625rem]"
          >
            {/* Below sm the clauses flow as one paragraph; from sm up they
                break into two deliberate lines. */}
            <span className="sm:block">Building digital solutions </span>
            <span className="sm:block">
              that <span className="text-gold">solve real problems.</span>
            </span>
          </motion.h1>

          <motion.p
            variants={revealUp}
            className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg"
          >
            I&rsquo;m {site.name} — a full-stack developer building websites,
            business systems, and automation, turning real-world problems into
            practical digital tools.
          </motion.p>

          <motion.div variants={revealUp} className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 rounded-full bg-gold px-7 py-3.5 text-xs font-medium tracking-[0.2em] text-ink uppercase transition-colors duration-300 hover:bg-gold-soft"
            >
              View Projects
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full border border-line px-7 py-3.5 text-xs font-medium tracking-[0.2em] text-cream uppercase transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              Let&rsquo;s Talk
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.p
            variants={revealUp}
            className="mt-7 flex items-center gap-2.5 text-[0.6875rem] tracking-[0.2em] text-muted uppercase"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for freelance &amp; collaboration
          </motion.p>

          {/* Focus areas — a quiet, non-numeric strip in place of stats. */}
          <motion.ul
            variants={revealUp}
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-6 text-[0.625rem] tracking-[0.2em] text-muted uppercase"
          >
            {focusAreas.map((area, i) => (
              <li key={area} className="flex items-center gap-5">
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="hidden h-1 w-1 rounded-full bg-line sm:block"
                  />
                )}
                {area}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Portrait — the visual anchor. Low-key studio shot, so it sits on the
            dark ground with a hairline frame and a deep, soft shadow. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.25 }}
          className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-none"
        >
          <span
            aria-hidden="true"
            className="absolute -bottom-4 -left-4 h-full w-full rounded-[1.75rem] border border-gold/40"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-line bg-ink-soft shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)]">
            <Image
              src="/about/portrait.jpg"
              alt={`${site.name}, ${site.role}`}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 24rem, 80vw"
              className="object-cover object-[center_22%]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
