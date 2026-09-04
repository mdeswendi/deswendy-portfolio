"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "@/components/ui/icons";
import { TechTags } from "@/components/ui/tech-tags";
import type { Project } from "@/data/projects";
import { fadeUp } from "@/lib/motion";

/**
 * The lead project on /projects — a two-column editorial block that reads
 * heavier than the "Other Projects" cards. Every string comes from
 * `data/projects`; nothing is hard-coded here. Scoped to /projects (Home has
 * its own featured component).
 */
export default function FeaturedCase({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const kicker = project.category.replace(/\s*\|\s*/g, " · ");

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group grid overflow-hidden rounded-2xl border border-line bg-ink-soft transition-all duration-500 hover:-translate-y-1 hover:border-gold/50 focus-visible:-translate-y-1 focus-visible:border-gold/50 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div className="relative aspect-[16/11] overflow-hidden border-b border-line lg:aspect-auto lg:h-full lg:border-r lg:border-b-0">
          <Image
            src={project.image}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex flex-col justify-center gap-4 p-8 lg:p-10">
          <p className="text-[0.6875rem] tracking-[0.2em] text-gold uppercase">
            {String(index).padStart(2, "0")} &mdash; {kicker}
          </p>

          <h2 className="font-display text-2xl font-semibold tracking-tight text-cream transition-colors duration-300 group-hover:text-gold group-focus-visible:text-gold lg:text-[1.875rem]">
            {project.title}
          </h2>

          <p className="text-sm leading-relaxed text-muted lg:text-base">
            {project.description}
          </p>

          <TechTags items={project.techStack} className="pt-1" />

          <span className="inline-flex items-center gap-2 pt-2 text-xs tracking-[0.2em] text-cream uppercase transition-colors duration-300 group-hover:text-gold group-focus-visible:text-gold">
            View case study
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
