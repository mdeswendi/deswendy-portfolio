"use client";

import { motion } from "framer-motion";

import { SectionHeading } from "@/components/home/section-heading";
import ProjectCard from "@/components/projects/project-card";
import { sortedProjects } from "@/data/projects";
import { stagger } from "@/lib/motion";

/** Featured project first (renders wide), then the next two. */
const shown = sortedProjects.slice(0, 3);

export default function SelectedWork() {
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      // The featured card is tall, so trigger early rather than at 30%.
      viewport={{ once: true, amount: 0.05 }}
      className="mx-auto max-w-6xl border-t border-line px-6 py-20 lg:px-8 lg:py-28"
    >
      <SectionHeading
        eyebrow="Selected Work"
        title="A few things I've built to solve real problems."
        action={{ label: "All projects", href: "/projects" }}
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-8">
        {shown.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </motion.section>
  );
}
