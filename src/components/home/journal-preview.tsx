"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { revealStagger, revealUp, revealView } from "@/components/home/motion";
import { SectionHeading } from "@/components/home/section-heading";
import { ArrowRight } from "@/components/ui/icons";
import { formatDate } from "@/lib/format";
import type { Post } from "@/lib/mdx";

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
      variants={revealStagger}
      initial="hidden"
      whileInView="visible"
      viewport={revealView}
      className="mx-auto max-w-6xl border-t border-line px-6 py-14 lg:px-8 lg:py-20"
    >
      <SectionHeading
        eyebrow="Journal"
        title="Notes from building and learning."
        action={{ label: "Read the journal", href: "/journal" }}
      />

      <ul className="mt-10 border-t border-line">
        {posts.map((post) => (
          <motion.li
            key={post.slug}
            variants={revealUp}
            className="border-b border-line"
          >
            <Link
              href={`/journal/${post.slug}`}
              className="group grid gap-3 py-6 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8"
            >
              <div>
                <h3 className="font-display text-lg tracking-tight text-cream transition-colors duration-300 group-hover:text-gold lg:text-xl">
                  {post.title}
                </h3>
                <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.6875rem] tracking-[0.15em] text-muted uppercase">
                  <span className="text-gold/90">{post.category}</span>
                  <span className="text-line">/</span>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="text-line">/</span>
                  <span>{post.readingTime}</span>
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
