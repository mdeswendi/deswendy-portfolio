"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { ArrowLeft, ArrowUpRight, GitHubMark } from "@/components/ui/icons";
import type { Project } from "@/data/projects";
import { fadeUp, stagger } from "@/lib/motion";

export default function ProjectDetailHero({ project }: { project: Project }) {
  return (
    <motion.header
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-6xl px-6 pt-16 lg:px-8 lg:pt-24"
    >
      <motion.div variants={fadeUp}>
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 text-xs tracking-[0.2em] text-muted uppercase transition-colors duration-300 hover:text-gold"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Projects
        </Link>
      </motion.div>

      <motion.p
        variants={fadeUp}
        className="mt-12 text-[0.6875rem] tracking-[0.2em] text-gold uppercase"
      >
        {project.category}
      </motion.p>

      <motion.h1
        variants={fadeUp}
        className="mt-6 max-w-4xl text-balance font-display text-3xl leading-[1.12] font-semibold tracking-[-0.02em] text-cream sm:text-4xl lg:text-5xl"
      >
        {project.title}
      </motion.h1>

      {(project.year || project.role) && (
        <motion.p
          variants={fadeUp}
          className="mt-5 text-[0.6875rem] tracking-[0.2em] text-muted uppercase"
        >
          {[project.year, project.role].filter(Boolean).join(" · ")}
        </motion.p>
      )}

      {/* When the case study has an Overview section, that carries the
          description — don't repeat it in the hero. */}
      {!project.overview && (
        <motion.p
          variants={fadeUp}
          className="mt-8 max-w-2xl text-base leading-relaxed text-muted lg:text-lg"
        >
          {project.fullDescription}
        </motion.p>
      )}

      {(project.liveUrl || project.githubUrl) && (
        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-3 rounded-full bg-gold px-7 py-3.5 text-xs font-medium tracking-[0.2em] text-ink uppercase transition-colors duration-300 hover:bg-gold-soft"
            >
              Visit Live Site
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-3 rounded-full border border-line px-7 py-3.5 text-xs font-medium tracking-[0.2em] text-cream uppercase transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              <GitHubMark className="h-3.5 w-3.5" />
              View Source
            </a>
          )}
        </motion.div>
      )}

      <motion.div
        variants={fadeUp}
        // 16/10 matches the 1200x751 cover artwork, so object-cover has
        // nothing to crop — these mockups carry text near the edges.
        className="relative mt-16 aspect-[16/10] overflow-hidden rounded-2xl border border-line lg:mt-20"
      >
        <Image
          src={project.image}
          alt={`${project.title} cover image`}
          fill
          priority
          sizes="(min-width: 1152px) 1088px, 100vw"
          className="object-cover"
        />
      </motion.div>
    </motion.header>
  );
}
