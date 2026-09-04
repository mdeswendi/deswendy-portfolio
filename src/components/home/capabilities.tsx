"use client";

import { motion } from "framer-motion";

import { revealStagger, revealUp, revealView } from "@/components/home/motion";
import { SectionHeading } from "@/components/home/section-heading";
import { ArrowRight } from "@/components/ui/icons";

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
    title: "Digital Experiences",
    body: "Interfaces that stay clean, fast, and accessible — whichever screen they open on.",
  },
];

export default function Capabilities() {
  return (
    <motion.section
      variants={revealStagger}
      initial="hidden"
      whileInView="visible"
      viewport={revealView}
      className="mx-auto max-w-6xl border-t border-line px-6 py-14 lg:px-8 lg:py-16"
    >
      <SectionHeading
        eyebrow="What I Build"
        title="Four things I keep coming back to."
      />

      <div className="mt-10 border-t border-line">
        {capabilities.map((item) => (
          <motion.div
            key={item.no}
            variants={revealUp}
            className="group grid grid-cols-[auto_1fr] gap-x-6 border-b border-line py-7 sm:gap-x-12 lg:py-8"
          >
            <span className="font-display text-sm text-gold">{item.no}</span>

            <div>
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display text-xl font-semibold tracking-tight text-cream transition-colors duration-300 group-hover:text-gold lg:text-2xl">
                  {item.title}
                </h3>
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 -translate-x-2 text-gold opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                />
              </div>

              <span
                aria-hidden="true"
                className="mt-3 block h-px w-10 bg-gold/60 transition-all duration-300 group-hover:w-20 group-hover:bg-gold"
              />

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted lg:text-base">
                {item.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
