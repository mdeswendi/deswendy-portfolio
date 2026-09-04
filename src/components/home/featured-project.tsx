"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { revealUp } from "@/components/home/motion";
import { ArrowRight } from "@/components/ui/icons";
import { TechTags } from "@/components/ui/tech-tags";
import type { Project } from "@/data/projects";

/**
 * The lead project gets a case-study treatment on the home page: the same
 * data the /projects pages use, but with the problem and the approach pulled
 * forward so the card tells a story rather than just showing a thumbnail.
 * Home-only — the shared ProjectCard is untouched.
 */
export default function FeaturedProject({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const kicker = project.category.replace(/\s*\|\s*/g, " · ");

  return (
    <motion.article variants={revealUp}>
      <Link
        href={`/projects/${project.slug}`}
        className="group block overflow-hidden rounded-2xl border border-line bg-ink-soft transition-all duration-500 hover:-translate-y-1 hover:border-gold/50"
      >
        <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[5/2]">
          <Image
            src={project.image}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <span className="absolute top-5 left-5 rounded-full bg-gold px-3 py-1 text-[0.625rem] font-medium tracking-[0.2em] text-ink uppercase">
            Featured
          </span>
        </div>

        <div className="grid gap-x-12 gap-y-8 p-7 lg:grid-cols-[1fr_1fr] lg:p-10">
          <div>
            <p className="text-[0.6875rem] tracking-[0.2em] text-gold uppercase">
              {String(index).padStart(2, "0")} &mdash; {kicker}
            </p>
            <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-cream transition-colors duration-300 group-hover:text-gold lg:text-[1.75rem]">
              {project.title}
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              {project.description}
            </p>
            <TechTags items={project.techStack} className="mt-6" />
            <span className="mt-8 inline-flex items-center gap-2 text-xs tracking-[0.2em] text-cream uppercase transition-colors duration-300 group-hover:text-gold">
              View case study
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>

          <dl className="grid gap-6 self-center sm:grid-cols-2 lg:grid-cols-1 lg:border-l lg:border-line lg:pl-12">
            <div>
              <dt className="text-[0.625rem] tracking-[0.2em] text-muted uppercase">
                The problem
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-cream/85">
                {project.problem}
              </dd>
            </div>
            <div>
              <dt className="text-[0.625rem] tracking-[0.2em] text-muted uppercase">
                The approach
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-cream/85">
                {project.solution}
              </dd>
            </div>
          </dl>
        </div>
      </Link>
    </motion.article>
  );
}
