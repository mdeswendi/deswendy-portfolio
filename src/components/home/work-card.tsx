"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { revealUp } from "@/components/home/motion";
import { ArrowRight } from "@/components/ui/icons";
import { TechTags } from "@/components/ui/tech-tags";
import type { Project } from "@/data/projects";

/**
 * Compact project card for the home page's "selected work" grid. Home-only,
 * so its hover treatment can be tuned without touching the shared ProjectCard
 * used on /projects.
 */
export default function WorkCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const kicker = project.category.replace(/\s*\|\s*/g, " · ");

  return (
    <motion.article variants={revealUp} className="h-full">
      <Link
        href={`/projects/${project.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-soft transition-all duration-500 hover:-translate-y-1 hover:border-gold/50"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex flex-1 flex-col p-7">
          <p className="text-[0.6875rem] tracking-[0.2em] text-gold uppercase">
            {String(index).padStart(2, "0")} &mdash; {kicker}
          </p>

          <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-cream transition-colors duration-300 group-hover:text-gold">
            {project.title}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-muted">
            {project.description}
          </p>

          <TechTags items={project.techStack} className="mt-6" />

          <span className="mt-auto inline-flex items-center gap-2 pt-8 text-xs tracking-[0.2em] text-cream uppercase transition-colors duration-300 group-hover:text-gold">
            View case study
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
