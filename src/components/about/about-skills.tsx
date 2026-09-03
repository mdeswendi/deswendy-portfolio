"use client";

import { motion } from "framer-motion";

import { TechTags } from "@/components/ui/tech-tags";
import { fadeUp, stagger } from "@/lib/motion";

type SkillGroup = {
  title: string;
  items: string[];
};

const skillGroups: SkillGroup[] = [
  {
    title: "Web Development",
    items: ["HTML", "CSS", "JavaScript", "PHP", "Laravel", "Tailwind CSS"],
  },
  {
    title: "Backend",
    items: ["PHP", "MySQL", "Node.js"],
  },
  {
    title: "AI & Automation",
    items: ["Telegram Bot", "API Integration"],
  },
  {
    title: "Networking",
    items: ["Cisco", "IoT"],
  },
  {
    title: "Version Control",
    items: ["Git", "GitHub"],
  },
  {
    title: "Engineering Mindset",
    items: ["System Thinking", "Troubleshooting"],
  },
];

export default function AboutSkills() {
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="mx-auto max-w-6xl border-t border-line px-6 py-24 lg:px-8 lg:py-32"
    >
      <motion.p
        variants={fadeUp}
        className="flex items-center gap-3 text-[0.6875rem] tracking-[0.2em] text-muted uppercase"
      >
        <span className="h-px w-6 bg-gold" />
        Skills &amp; Technologies
      </motion.p>

      <motion.h2
        variants={fadeUp}
        className="mt-6 max-w-2xl font-display text-2xl font-semibold tracking-tight text-cream lg:text-3xl"
      >
        What I work with
      </motion.h2>

      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <motion.div
            key={group.title}
            variants={fadeUp}
            className="bg-ink-soft p-7 lg:p-8"
          >
            <h3 className="font-display text-base font-semibold tracking-tight text-cream">
              {group.title}
            </h3>
            <TechTags items={group.items} className="mt-5" />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
