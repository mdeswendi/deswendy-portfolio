"use client";

import { motion } from "framer-motion";

import ProjectCard from "@/components/projects/project-card";
import type { Project } from "@/data/projects";
import { stagger } from "@/lib/motion";

export default function ProjectsGrid({
  projects,
  startIndex = 1,
}: {
  projects: Project[];
  /** Number shown on the first card; the rest count up from it. */
  startIndex?: number;
}) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      // A low `amount` matters here: the grid is taller than the viewport, so
      // the shared 0.3 threshold would hold the cards hidden until scroll.
      viewport={{ once: true, amount: 0.05 }}
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {projects.map((project, i) => (
        <ProjectCard key={project.id} project={project} index={startIndex + i} />
      ))}
    </motion.div>
  );
}
