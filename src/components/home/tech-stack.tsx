"use client";

import { motion } from "framer-motion";

import { revealStagger, revealUp, revealView } from "@/components/home/motion";
import { SectionHeading } from "@/components/home/section-heading";
import { TechTags } from "@/components/ui/tech-tags";

type Group = { title: string; note: string; items: string[] };

/** Only tools that actually show up in the projects or the about-page skills. */
const groups: Group[] = [
  {
    title: "Frontend",
    note: "Building responsive interfaces",
    items: ["HTML", "CSS", "JavaScript", "Tailwind CSS"],
  },
  {
    title: "Backend",
    note: "Building scalable systems",
    items: ["PHP", "Laravel", "Node.js"],
  },
  {
    title: "Database",
    note: "Structured data management",
    items: ["MySQL"],
  },
  {
    title: "AI & Automation",
    note: "Wiring services together",
    items: ["Python", "Telegram Bot API", "API Integration"],
  },
  {
    title: "Tooling",
    note: "Day-to-day workflow",
    items: ["Git", "GitHub", "VS Code"],
  },
];

export default function TechStack() {
  return (
    <motion.section
      variants={revealStagger}
      initial="hidden"
      whileInView="visible"
      viewport={revealView}
      className="mx-auto max-w-6xl border-t border-line px-6 py-14 lg:px-8 lg:py-16"
    >
      <SectionHeading eyebrow="Technology" title="The stack I reach for." />

      <dl className="mt-10 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <motion.div variants={revealUp} key={group.title}>
            <dt className="text-[0.6875rem] tracking-[0.2em] text-gold uppercase">
              {group.title}
            </dt>
            <p className="mt-2 text-xs text-muted">{group.note}</p>
            <dd className="mt-4">
              <TechTags items={group.items} />
            </dd>
          </motion.div>
        ))}
      </dl>
    </motion.section>
  );
}
