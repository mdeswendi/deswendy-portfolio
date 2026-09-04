"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "@/components/ui/icons";
import { easeOut, fadeUp, stagger } from "@/lib/motion";
import { site } from "@/lib/site";

const focusAreas = [
  "Web Development",
  "Business Systems",
  "AI & Automation",
  "Cisco Certified",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient gold light — decorative only. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-[-12%] h-[520px] w-[520px] rounded-full bg-gold/10 blur-[170px]" />
        <div className="absolute bottom-[-30%] left-[-15%] h-[420px] w-[420px] rounded-full bg-gold/[0.06] blur-[180px]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.9fr] lg:gap-16">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.p
              variants={fadeUp}
              className="flex items-center gap-3 text-xs tracking-[0.25em] text-muted uppercase"
            >
              <span className="h-px w-8 bg-gold" />
              {site.role} &middot; {site.location}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="mt-8 text-balance font-display text-4xl leading-[1.08] font-semibold tracking-[-0.02em] text-cream sm:text-5xl lg:text-[3.5rem] xl:text-6xl"
            >
              Building digital solutions that{" "}
              <span className="text-gold">solve real problems.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            >
              I&rsquo;m {site.name} — a full-stack developer building websites,
              business systems, and automation. I turn real-world problems into
              practical digital tools, and write about what I learn along the
              way.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
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
              variants={fadeUp}
              className="mt-8 flex items-center gap-2.5 text-[0.6875rem] tracking-[0.2em] text-muted uppercase"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for freelance &amp; collaboration
            </motion.p>
          </motion.div>

          {/* Portrait — the source is a low-key studio shot, so it sits happily
              on the dark ground with only a hairline frame. */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.3 }}
            className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-none"
          >
            <span
              aria-hidden="true"
              className="absolute -top-3 -right-3 h-full w-full rounded-3xl border border-gold/25"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-ink-soft">
              <Image
                src="/about/portrait.jpg"
                alt={`${site.name}, ${site.role}`}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 24rem, 80vw"
                className="object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent"
              />
            </div>
          </motion.div>
        </div>

        {/* Focus areas — a quiet, non-numeric strip in place of vanity stats. */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8, ease: easeOut }}
          className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-8 text-[0.6875rem] tracking-[0.2em] text-muted uppercase lg:mt-20"
        >
          {focusAreas.map((area, i) => (
            <li key={area} className="flex items-center gap-6">
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
      </div>
    </section>
  );
}
