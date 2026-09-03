import type { Metadata } from "next";

import JournalGrid from "@/components/journal/journal-grid";
import PageHeader from "@/components/sections/page-header";
import { getAllPosts } from "@/lib/mdx";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Journal",
  description: `Notes on building software by ${site.name} — development journeys, lessons from shipped projects, and what I'm learning along the way.`,
  alternates: { canonical: "/journal" },
  openGraph: {
    title: `Journal · ${site.name}`,
    description: `Notes on building software by ${site.name} — development journeys and lessons from shipped projects.`,
    url: "/journal",
    images: ["/opengraph-image"],
  },
};

export default function JournalPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHeader
        eyebrow="Writing"
        title="Notes from the build."
        subtitle="What I learned shipping real projects — the decisions, the trade-offs, and the things I would do differently next time."
      />

      <section className="mx-auto max-w-6xl px-6 pb-28 lg:px-8 lg:pb-36">
        {posts.length > 0 ? (
          <JournalGrid posts={posts} />
        ) : (
          <p className="text-muted">No articles published yet.</p>
        )}
      </section>
    </>
  );
}
