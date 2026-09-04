"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { SectionHeading } from "@/components/home/section-heading";
import { ArrowRight } from "@/components/ui/icons";
import { formatDate } from "@/lib/format";
import type { Post } from "@/lib/mdx";
import { fadeUp, stagger } from "@/lib/motion";

/**
 * `Post` is a type-only import, so `lib/mdx`'s `node:fs` never reaches the
 * client bundle. Posts come in already sliced from the server component.
 */
export default function JournalPreview({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="mx-auto max-w-6xl border-t border-line px-6 py-20 lg:px-8 lg:py-28"
    >
      <SectionHeading
        eyebrow="Journal"
        title="Notes from building and learning."
        action={{ label: "Read the journal", href: "/journal" }}
      />

      <ul className="mt-14 border-t border-line">
        {posts.map((post) => (
          <motion.li
            key={post.slug}
            variants={fadeUp}
            className="border-b border-line"
          >
            <Link
              href={`/journal/${post.slug}`}
              className="group grid gap-3 py-7 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8"
            >
              <div>
                <h3 className="font-display text-lg tracking-tight text-cream transition-colors duration-300 group-hover:text-gold lg:text-xl">
                  {post.title}
                </h3>
                <p className="mt-2 text-[0.6875rem] tracking-[0.15em] text-muted uppercase">
                  {post.category}
                  <span className="mx-2 text-line">/</span>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </p>
              </div>

              <ArrowRight
                aria-hidden="true"
                className="hidden h-4 w-4 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold sm:block"
              />
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}
