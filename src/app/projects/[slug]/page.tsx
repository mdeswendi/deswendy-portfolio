import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import ProjectDetailHero from "@/components/projects/project-detail-hero";
import ScreenshotGallery from "@/components/projects/screenshot-gallery";
import { JsonLd } from "@/components/seo/json-ld";
import { ArrowRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { TechTags } from "@/components/ui/tech-tags";
import {
  getNextProject,
  getProjectBySlug,
  getProjectSlugs,
  type Project,
} from "@/data/projects";
import { site } from "@/lib/site";
import { getSiteUrl } from "@/lib/site-url";

/** The project list is fixed, so any other slug is a 404 rather than a render. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  const url = `/projects/${project.slug}`;

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: `${project.title} · ${site.name}`,
      description: project.description,
      url,
      images: [{ url: project.image, width: 1200, height: 750 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} · ${site.name}`,
      description: project.description,
      images: [project.image],
    },
  };
}

/** schema.org CreativeWork for the case study — reuses the shared <JsonLd>. */
function caseStudySchema(project: Project, base: string) {
  const sameAs = [project.liveUrl, project.githubUrl].filter(
    (href): href is string => Boolean(href),
  );

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.overview ?? project.fullDescription,
    url: `${base}/projects/${project.slug}`,
    image: `${base}${project.image}`,
    author: { "@type": "Person", name: site.name, url: base },
    keywords: project.techStack.join(", "),
    ...(project.year ? { dateCreated: project.year } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-[0.6875rem] tracking-[0.2em] text-muted uppercase">
      <span className="h-px w-6 bg-gold" />
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight text-cream lg:text-3xl">
      {children}
    </h2>
  );
}

export default async function ProjectDetailPage(
  props: PageProps<"/projects/[slug]">,
) {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const base = getSiteUrl();
  const nextProject = getNextProject(project.slug);

  return (
    <article className="pb-8">
      <JsonLd data={caseStudySchema(project, base)} />

      <ProjectDetailHero project={project} />

      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {project.overview && (
          <section className="border-t border-line py-20 lg:py-28">
            <Reveal>
              <SectionLabel>Overview</SectionLabel>
              <p className="mt-8 max-w-3xl text-lg leading-relaxed text-cream/90 lg:text-xl">
                {project.overview}
              </p>
            </Reveal>
          </section>
        )}

        <section className="border-t border-line py-20 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <SectionLabel>The Problem</SectionLabel>
              <SectionHeading>What needed solving</SectionHeading>
              <p className="mt-6 text-base leading-relaxed text-muted">
                {project.problem}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <SectionLabel>The Solution</SectionLabel>
              <SectionHeading>What I built</SectionHeading>
              <p className="mt-6 text-base leading-relaxed text-muted">
                {project.solution}
              </p>
            </Reveal>
          </div>
        </section>

        {project.features && project.features.length > 0 && (
          <section className="border-t border-line py-20 lg:py-28">
            <Reveal>
              <SectionLabel>Features</SectionLabel>
              <SectionHeading>What it does</SectionHeading>
            </Reveal>

            <ol className="mt-14 grid gap-x-12 gap-y-6 sm:grid-cols-2">
              {project.features.map((feature, index) => (
                <Reveal key={feature} delay={index * 0.06}>
                  <li className="flex gap-5 border-t border-line pt-5">
                    <span className="font-display text-sm text-gold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base leading-relaxed text-cream/90">
                      {feature}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ol>
          </section>
        )}

        {project.gallery && project.gallery.length > 0 && (
          <section className="border-t border-line py-20 lg:py-28">
            <Reveal>
              <SectionLabel>Screenshots</SectionLabel>
              <SectionHeading>A look inside</SectionHeading>
            </Reveal>

            <ScreenshotGallery
              title={project.title}
              shots={project.gallery}
            />
          </section>
        )}

        <section className="border-t border-line py-20 lg:py-28">
          <Reveal>
            <SectionLabel>Tech Stack</SectionLabel>
            <SectionHeading>Built with</SectionHeading>
            <TechTags
              items={project.techStack}
              variant="solid"
              className="mt-8 max-w-2xl"
            />
          </Reveal>
        </section>

        {project.process.length > 0 && (
          <section className="border-t border-line py-20 lg:py-28">
            <Reveal>
              <SectionLabel>Process</SectionLabel>
              <SectionHeading>How it came together</SectionHeading>
            </Reveal>

            <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {project.process.map((step, index) => (
                <Reveal key={step} delay={index * 0.08}>
                  <li className="h-full rounded-xl border border-line bg-ink-soft p-7 transition-colors duration-500 hover:border-gold/40">
                    <span className="font-display text-sm text-gold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-4 font-display text-lg tracking-tight text-cream">
                      {step}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </section>
        )}

        <section className="border-t border-line py-20">
          <Reveal>
            <SectionLabel>Next Project</SectionLabel>
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
            >
              <span className="font-display text-2xl font-semibold tracking-tight text-cream transition-colors duration-300 group-hover:text-gold sm:text-3xl lg:text-4xl">
                {nextProject.title}
              </span>
              <span className="inline-flex items-center gap-2 text-xs tracking-[0.2em] text-muted uppercase transition-colors duration-300 group-hover:text-gold">
                View Case Study
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        </section>
      </div>
    </article>
  );
}
