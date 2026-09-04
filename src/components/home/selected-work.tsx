"use client";

import { motion } from "framer-motion";

import FeaturedProject from "@/components/home/featured-project";
import { revealStagger } from "@/components/home/motion";
import { SectionHeading } from "@/components/home/section-heading";
import WorkCard from "@/components/home/work-card";
import { getProjectBySlug } from "@/data/projects";

/**
 * The home page tells its own order and framing — the Notary & PPAT system
 * leads as the case study, then two supporting projects. The /projects pages
 * keep their own ordering and copy from `data/projects`.
 */
const lead = getProjectBySlug("notaris-ppat-management-system")!;

const leadContent = {
  kicker: "Business Management System",
  title: "Notary & PPAT Office Management System",
  description:
    "A business management system designed to help Notary & PPAT offices organize client data, legal documents, workflows, and daily operations in one centralized platform.",
  problem:
    "Notary and PPAT offices handle complex processes involving clients, documents, deadlines, and administrative workflows. Manual processes make tracking progress and operational coordination difficult.",
  approach:
    "Built a centralized digital platform that connects client management, matters, documents, workflows, tasks, and office activities into a structured system.",
};

// Placeholder screenshots — swap the files in public/projects for the real
// captures later, keeping these names.
const leadMedia = {
  main: { src: "/projects/notaris-ppat-dashboard.png", caption: "Dashboard" },
  secondary: [
    {
      src: "/projects/notaris-ppat-documents.png",
      caption: "Document & deed list",
    },
    { src: "/projects/notaris-ppat-deed-detail.png", caption: "Deed detail" },
  ],
} as const;

const supporting = [
  {
    project: getProjectBySlug("website-desa-wanasari")!,
    kicker: "Community Platform",
  },
  {
    project: getProjectBySlug("ai-telegram-bot")!,
    kicker: "AI Automation",
  },
];

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
        <FeaturedProject
          project={lead}
          index={1}
          content={leadContent}
          media={leadMedia}
          // Remove once the real application screenshots replace the
          // placeholders in public/projects/notaris-ppat-*.png.
          disclaimer="Interface preview — screenshots will be replaced with the live application version."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {supporting.map(({ project, kicker }, i) => (
            <WorkCard
              key={project.id}
              project={project}
              index={i + 2}
              kicker={kicker}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
