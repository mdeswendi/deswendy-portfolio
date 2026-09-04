"use client";

import { motion } from "framer-motion";

import { SectionHeading } from "@/components/home/section-heading";
import { ArrowRight } from "@/components/ui/icons";
import { fadeUp, stagger } from "@/lib/motion";

type Capability = { no: string; title: string; body: string };

const capabilities: Capability[] = [
  {
    no: "01",
    title: "Web Applications",
    body: "Responsive websites and web apps built with modern tooling — from a village information platform to company profiles.",
  },
  {
    no: "02",
    title: "Business Systems",
    body: "Turning manual, paper-based workflows into structured digital systems, like a deed-and-client records manager for a notary office.",
  },
  {
    no: "03",
    title: "AI & Automation",
    body: "Bots and integrations that handle repetitive work on their own — including a Telegram bot wired to an AI model on a live server.",
  },
  {
    no: "04",
    title: "Networking & IT Support",
    body: "A Cisco-certified foundation in networking and infrastructure, carried over from years of hands-on industrial technical work.",
  },
];

export default function Capabilities() {
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="mx-auto max-w-6xl border-t border-line px-6 py-20 lg:px-8 lg:py-28"
    >
      <SectionHeading
        eyebrow="What I Build"
        title="Four things I keep coming back to."
      />

      <div className="mt-14 border-t border-line">
        {capabilities.map((item) => (
          <motion.div
            key={item.no}
            variants={fadeUp}
            className="group grid grid-cols-[auto_1fr] items-start gap-x-6 gap-y-3 border-b border-line py-8 sm:grid-cols-[auto_1fr_auto] sm:gap-x-10 lg:py-10"
          >
            <span className="font-display text-sm text-gold">{item.no}</span>

            <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-10">
              <h3 className="font-display text-xl font-semibold tracking-tight text-cream transition-colors duration-300 group-hover:text-gold lg:text-2xl">
                {item.title}
              </h3>
              <p className="max-w-xl text-sm leading-relaxed text-muted lg:text-base">
                {item.body}
              </p>
            </div>

            <ArrowRight
              aria-hidden="true"
              className="col-start-2 hidden h-4 w-4 -translate-x-2 text-gold opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:col-start-3 sm:block"
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
