import type { Metadata } from "next";

import FeaturedCase from "@/components/projects/featured-case";
import ProjectsGrid from "@/components/projects/projects-grid";
import PageHeader from "@/components/sections/page-header";
import { sortedProjects } from "@/data/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description: `Selected work by ${site.name} — web platforms, information systems, and automation built with clean architecture and thoughtful design.`,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `Projects · ${site.name}`,
    description: `Selected work by ${site.name} — web platforms, information systems, and automation.`,
    url: "/projects",
    images: ["/opengraph-image"],
  },
};

const featured = sortedProjects.find((project) => project.featured);
const others = sortedProjects.filter((project) => project !== featured);

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Selected Work"
        title="Projects built to solve real problems."
        subtitle="A collection of web platforms, information systems, and automation tools — each one shipped, and each one a lesson in doing the next build better."
      />

      <div className="mx-auto max-w-6xl px-6 pb-24 lg:px-8 lg:pb-32">
        {featured && <FeaturedCase project={featured} index={1} />}

        <section
          className={
            featured
              ? "mt-20 border-t border-line pt-16 lg:mt-28 lg:pt-20"
              : ""
          }
        >
          <h2 className="flex items-center gap-3 text-[0.6875rem] tracking-[0.2em] text-muted uppercase">
            <span className="h-px w-6 bg-gold" />
            Other Projects
          </h2>

          <div className="mt-12">
            <ProjectsGrid projects={others} startIndex={featured ? 2 : 1} />
          </div>
        </section>
      </div>
    </>
  );
}
