"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "@/components/ui/icons";
import { TechTags } from "@/components/ui/tech-tags";
import type { Project } from "@/data/projects";
import { fadeUp } from "@/lib/motion";

/**
 * Renders inside a stagger parent, so it only declares `variants` — the
 * parent drives `initial`/`whileInView`.
 */
export default function ProjectCard({ project }: { project: Project }) {
  const { featured } = project;

  return (
    <motion.article variants={fadeUp} className={featured ? "md:col-span-2" : ""}>
      <Link
        href={`/projects/${project.slug}`}
        className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-soft transition-colors duration-500 hover:border-gold/50 ${
          featured ? "lg:min-h-[380px] lg:flex-row" : ""
        }`}
      >
        <div
          className={`relative shrink-0 overflow-hidden ${
            featured ? "aspect-[16/10] lg:aspect-auto lg:w-[55%]" : "aspect-[16/10]"
          }`}
        >
          <Image
            src={project.image}
            alt=""
            fill
            priority={featured}
            sizes={
              featured
                ? "(min-width: 1024px) 55vw, 100vw"
                : "(min-width: 768px) 50vw, 100vw"
            }
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          {featured && (
            <span className="absolute top-5 left-5 rounded-full bg-gold px-3 py-1 text-[0.625rem] font-medium tracking-[0.2em] text-ink uppercase">
              Featured
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-7 lg:p-9">
          <p className="text-[0.6875rem] tracking-[0.2em] text-gold uppercase">
            {project.category}
          </p>

          <h2
            className={`mt-4 font-display font-semibold tracking-tight text-cream transition-colors duration-300 group-hover:text-gold ${
              featured ? "text-2xl lg:text-3xl" : "text-xl"
            }`}
          >
            {project.title}
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-muted">
            {project.description}
          </p>

          <TechTags items={project.techStack} className="mt-6" />

          {/* mt-auto keeps the CTA on the baseline across uneven card heights */}
          <span className="mt-auto inline-flex items-center gap-2 pt-8 text-xs tracking-[0.2em] text-cream uppercase transition-colors duration-300 group-hover:text-gold">
            Read More
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
