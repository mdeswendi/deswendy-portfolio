"use client";

import { motion } from "framer-motion";

import { SectionHeading } from "@/components/home/section-heading";
import { TechTags } from "@/components/ui/tech-tags";
import { fadeUp, stagger } from "@/lib/motion";

type Group = { title: string; items: string[] };

/** Only tools that actually show up in the projects or the about-page skills. */
const groups: Group[] = [
  { title: "Frontend", items: ["HTML", "CSS", "JavaScript", "Tailwind CSS"] },
  { title: "Backend", items: ["PHP", "Laravel", "Node.js"] },
  { title: "Database", items: ["MySQL"] },
  {
    title: "AI & Automation",
    items: ["Python", "Telegram Bot API", "API Integration"],
  },
  { title: "Tooling", items: ["Git", "GitHub"] },
];

export default function TechStack() {
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="mx-auto max-w-6xl border-t border-line px-6 py-20 lg:px-8 lg:py-28"
    >
      <SectionHeading
        eyebrow="Technology"
        title="The stack I reach for."
      />

      <dl className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <motion.div variants={fadeUp} key={group.title}>
            <dt className="text-[0.6875rem] tracking-[0.2em] text-gold uppercase">
              {group.title}
            </dt>
            <dd className="mt-4">
              <TechTags items={group.items} />
            </dd>
          </motion.div>
        ))}
      </dl>
    </motion.section>
  );
}
