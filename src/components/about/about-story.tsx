"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { site } from "@/lib/site";

type Chapter = {
  label: string;
  heading: string;
  body: string;
};

const chapters: Chapter[] = [
  {
    label: "Where it started",
    heading: "Keeping complex systems running",
    body: "My journey started in industrial technical work, maintaining cold storage systems and gensets. I learned how complex systems operate, how to troubleshoot under pressure, and the importance of reliability.",
  },
  {
    label: "The turn",
    heading: "Choosing software, deliberately",
    body: "After years in the industrial field, I decided to pursue my passion for technology and software. I already held a D1, so I am continuing to a bachelor's in Information Systems at Universitas Subang — studying alongside work, through the Recognition of Prior Learning (RPL) track that credits the experience I already had. The foundation now is programming, databases, system design, and AI.",
  },
  {
    label: "Now",
    heading: "Applying the same principles to software",
    body: "Today I'm building digital solutions that solve real problems — village information systems, records management for small offices, automation that removes repetitive work. The domain changed. The method didn't.",
  },
];

export default function AboutStory() {
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="mx-auto max-w-4xl px-6 pb-24 lg:px-8 lg:pb-32"
    >
      <div className="grid items-start gap-12 sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] sm:gap-14 lg:gap-16">
        <motion.figure variants={fadeUp} className="relative">
          {/* Offset hairline, like the mat board behind a framed print. */}
          <span
            aria-hidden="true"
            className="absolute -top-3 -left-3 h-full w-full rounded-2xl border border-gold/30"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-ink-soft">
            <Image
              src="/about/portrait.jpg"
              alt={`${site.name}, ${site.role}`}
              fill
              priority
              sizes="(min-width: 640px) 40vw, 100vw"
              // The source is landscape in a 4:5 box, so cover crops
              // horizontally only — centre keeps the subject framed.
              className="object-cover object-center"
            />
          </div>
          <figcaption className="mt-5 text-[0.6875rem] tracking-[0.2em] text-muted uppercase">
            {site.name} &middot; {site.location}
          </figcaption>
        </motion.figure>

        <motion.p
          variants={fadeUp}
          className="font-display text-xl leading-relaxed text-cream sm:pt-4 sm:text-2xl"
        >
          From industrial technician to software developer — I combine
          real-world problem-solving experience with modern software
          development.
        </motion.p>
      </div>

      {/* Timeline: a hairline rail with a gold node per chapter. */}
      <ol className="mt-20 border-l border-line">
        {chapters.map((chapter) => (
          <motion.li
            key={chapter.label}
            variants={fadeUp}
            className="relative pb-16 pl-8 last:pb-0 lg:pl-12"
          >
            <span className="absolute top-1.5 -left-[4.5px] h-2 w-2 rounded-full bg-gold" />

            <p className="text-[0.6875rem] tracking-[0.2em] text-gold uppercase">
              {chapter.label}
            </p>

            <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-cream lg:text-3xl">
              {chapter.heading}
            </h2>

            <p className="mt-5 max-w-xl text-base leading-[1.85] text-muted">
              {chapter.body}
            </p>
          </motion.li>
        ))}
      </ol>

      <motion.blockquote
        variants={fadeUp}
        className="mt-20 border-l-2 border-gold pl-8 font-display text-xl leading-relaxed text-cream italic lg:text-2xl"
      >
        Building digital solutions through code, creativity, and continuous
        learning.
      </motion.blockquote>
    </motion.section>
  );
}
