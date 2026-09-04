"use client";

import { motion } from "framer-motion";

import FeaturedProject from "@/components/home/featured-project";
import { revealStagger } from "@/components/home/motion";
import { SectionHeading } from "@/components/home/section-heading";
import WorkCard from "@/components/home/work-card";
import { sortedProjects } from "@/data/projects";

const [lead, ...rest] = sortedProjects.slice(0, 3);

export default function SelectedWork() {
  return (
    <motion.section
      variants={revealStagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      className="mx-auto max-w-6xl border-t border-line px-6 py-14 lg:px-8 lg:py-20"
    >
      <SectionHeading
        eyebrow="Selected Work"
        title="Projects built to solve real problems."
        action={{ label: "All projects", href: "/projects" }}
      />

      <div className="mt-10 space-y-6">
        <FeaturedProject project={lead} index={1} />

        <div className="grid gap-6 md:grid-cols-2">
          {rest.map((project, i) => (
            <WorkCard key={project.id} project={project} index={i + 2} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
