"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "@/components/ui/icons";
import { formatDate } from "@/lib/format";
import type { Post } from "@/lib/mdx";
import { fadeUp } from "@/lib/motion";

/**
 * Renders inside a stagger parent, so it only declares `variants`.
 * `Post` is a type-only import, so `lib/mdx`'s `node:fs` never reaches
 * the client bundle.
 */
export default function JournalCard({ post }: { post: Post }) {
  const { featured } = post;

  return (
    <motion.article variants={fadeUp} className={featured ? "md:col-span-2" : ""}>
      <Link
        href={`/journal/${post.slug}`}
        className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-soft transition-colors duration-500 hover:border-gold/50 ${
          featured ? "lg:min-h-[360px] lg:flex-row" : ""
        }`}
      >
        <div
          className={`relative shrink-0 overflow-hidden ${
            featured ? "aspect-[16/10] lg:aspect-auto lg:w-[52%]" : "aspect-[16/10]"
          }`}
        >
          <Image
            src={post.coverImage}
            alt=""
            fill
            priority={featured}
            sizes={
              featured
                ? "(min-width: 1024px) 52vw, 100vw"
                : "(min-width: 768px) 50vw, 100vw"
            }
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          {featured && (
            <span className="absolute top-5 left-5 rounded-full bg-gold px-3 py-1 text-[0.625rem] font-medium tracking-[0.2em] text-ink uppercase">
              Featured
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-7 lg:p-9">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.6875rem] tracking-[0.2em] uppercase">
            <span className="text-gold">{post.category}</span>
            <span className="text-line">/</span>
            <time dateTime={post.date} className="text-muted">
              {formatDate(post.date)}
            </time>
            <span className="text-line">/</span>
            <span className="text-muted">{post.readingTime}</span>
          </div>

          <h2
            className={`mt-4 font-display font-semibold tracking-tight text-cream transition-colors duration-300 group-hover:text-gold ${
              featured ? "text-2xl lg:text-3xl" : "text-xl"
            }`}
          >
            {post.title}
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-muted">
            {post.excerpt}
          </p>

          <span className="mt-auto inline-flex items-center gap-2 pt-8 text-xs tracking-[0.2em] text-cream uppercase transition-colors duration-300 group-hover:text-gold">
            Read More
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
