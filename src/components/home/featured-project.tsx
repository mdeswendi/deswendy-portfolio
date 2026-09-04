"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { revealUp } from "@/components/home/motion";
import { ArrowRight } from "@/components/ui/icons";
import { TechTags } from "@/components/ui/tech-tags";
import type { Project } from "@/data/projects";

type CaseImage = { src: string; caption: string };

/** Optional home-only copy, layered over the shared project data. */
type CaseContent = {
  kicker?: string;
  title?: string;
  description?: string;
  problem?: string;
  approach?: string;
};

type CaseMedia = {
  /** Large lead screenshot. */
  main: CaseImage;
  /** Supporting screenshots, shown separately (never a collage). */
  secondary?: readonly CaseImage[];
};

/**
 * The lead project gets a case-study treatment on the home page: the shared
 * project data, optionally overlaid with home-specific copy, plus a proper
 * screenshot set — one lead shot and two supporting shots, each captioned and
 * kept apart so it reads as a real product rather than a mockup collage.
 * Home-only — the shared ProjectCard is untouched.
 */
export default function FeaturedProject({
  project,
  index,
  content,
  media,
}: {
  project: Project;
  index: number;
  content?: CaseContent;
  media?: CaseMedia;
}) {
  const kicker =
    content?.kicker ?? project.category.replace(/\s*\|\s*/g, " · ");
  const title = content?.title ?? project.title;
  const description = content?.description ?? project.description;
  const problem = content?.problem ?? project.problem;
  const approach = content?.approach ?? project.solution;
  const main: CaseImage = media?.main ?? { src: project.image, caption: "" };

  return (
    <motion.article variants={revealUp}>
      <Link
        href={`/projects/${project.slug}`}
        className="group block overflow-hidden rounded-2xl border border-line bg-ink-soft transition-all duration-500 hover:-translate-y-1 hover:border-gold/50"
      >
        {/* Lead screenshot */}
        <figure>
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={main.src}
              alt={main.caption ? `${title} — ${main.caption}` : ""}
              fill
              priority
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>
          {main.caption && (
            <figcaption className="border-y border-line px-7 py-2.5 text-[0.625rem] tracking-[0.2em] text-muted uppercase lg:px-10">
              {main.caption}
            </figcaption>
          )}
        </figure>

        {/* Story */}
        <div className="grid gap-x-12 gap-y-8 p-7 lg:grid-cols-[1fr_1fr] lg:p-10">
          <div>
            <p className="text-[0.6875rem] tracking-[0.2em] text-gold uppercase">
              {String(index).padStart(2, "0")} &mdash; {kicker}
            </p>
            <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-cream transition-colors duration-300 group-hover:text-gold lg:text-[1.75rem]">
              {title}
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              {description}
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
                {problem}
              </dd>
            </div>
            <div>
              <dt className="text-[0.625rem] tracking-[0.2em] text-muted uppercase">
                The approach
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-cream/85">
                {approach}
              </dd>
            </div>
          </dl>
        </div>

        {/* Supporting screenshots — two separate framed shots, not a collage */}
        {media?.secondary && (
          <div className="grid gap-px border-t border-line bg-line sm:grid-cols-2">
            {media.secondary.map((shot) => (
              <figure key={shot.src} className="bg-ink-soft">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={shot.src}
                    alt={`${title} — ${shot.caption}`}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                <figcaption className="px-7 py-3 text-[0.625rem] tracking-[0.2em] text-muted uppercase">
                  {shot.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </Link>
    </motion.article>
  );
}
