import type { Metadata } from "next";

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

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Selected Work"
        title="Projects built to solve real problems."
        subtitle="A collection of web platforms, information systems, and automation tools — each one shipped, and each one a lesson in doing the next build better."
      />

      <section className="mx-auto max-w-6xl px-6 pb-28 lg:px-8 lg:pb-36">
        <ProjectsGrid projects={sortedProjects} />
      </section>
    </>
  );
}
