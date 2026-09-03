"use client";

import { motion } from "framer-motion";

import JournalCard from "@/components/journal/journal-card";
import type { Post } from "@/lib/mdx";
import { stagger } from "@/lib/motion";

export default function JournalGrid({ posts }: { posts: Post[] }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      // Low `amount` so cards aren't held hidden when the grid is taller
      // than the viewport — same reasoning as the projects grid.
      viewport={{ once: true, amount: 0.05 }}
      className="grid gap-6 md:grid-cols-2 lg:gap-8"
    >
      {posts.map((post) => (
        <JournalCard key={post.slug} post={post} />
      ))}
    </motion.div>
  );
}
