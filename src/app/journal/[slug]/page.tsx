import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft, ArrowRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { formatDate } from "@/lib/format";
import { getNextPost, getPostBySlug, getPostSlugs } from "@/lib/mdx";
import { site } from "@/lib/site";

/** The post list comes from disk at build time, so any other slug is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/journal/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Article Not Found" };
  }

  const url = `/journal/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: `${post.title} · ${site.name}`,
      description: post.excerpt,
      url,
      publishedTime: post.date,
      authors: [site.name],
      images: [{ url: post.coverImage, width: 1200, height: 750 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} · ${site.name}`,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function JournalPostPage(
  props: PageProps<"/journal/[slug]">,
) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Compiled by the MDX loader; `dynamicParams = false` keeps this to the
  // known slugs from generateStaticParams.
  const { default: Content } = await import(`@/content/journal/${slug}.mdx`);
  const nextPost = getNextPost(post.slug);

  return (
    <article className="pb-8">
      <header className="mx-auto max-w-4xl px-6 pt-16 lg:px-8 lg:pt-24">
        <Reveal>
          <Link
            href="/journal"
            className="group inline-flex items-center gap-2 text-xs tracking-[0.2em] text-muted uppercase transition-colors duration-300 hover:text-gold"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Journal
          </Link>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.6875rem] tracking-[0.2em] uppercase">
            <span className="text-gold">{post.category}</span>
            <span className="text-line">/</span>
            <time dateTime={post.date} className="text-muted">
              {formatDate(post.date)}
            </time>
            <span className="text-line">/</span>
            <span className="text-muted">{post.readingTime}</span>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <h1 className="mt-6 text-balance font-display text-3xl leading-[1.12] font-semibold tracking-[-0.02em] text-cream sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted lg:text-lg">
            {post.excerpt}
          </p>
        </Reveal>
      </header>

      <Reveal delay={0.24} className="mx-auto mt-14 max-w-5xl px-6 lg:px-8">
        {/* 16/10 matches the generated covers, so nothing is cropped — the
            byline rail sits close to the bottom edge. */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line">
          <Image
            src={post.coverImage}
            alt={`${post.title} cover image`}
            fill
            priority
            sizes="(min-width: 1088px) 1024px, 100vw"
            className="object-cover"
          />
        </div>
      </Reveal>

      {/* `article-body` carries the descendant rules from globals.css:
          syntax-highlight tokens and the `code`-inside-`pre` reset. */}
      <div className="article-body mx-auto max-w-2xl px-6 py-20 lg:px-8 lg:py-24">
        <Content />
      </div>

      {nextPost && (
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <section className="border-t border-line py-16">
            <Reveal>
              <p className="flex items-center gap-3 text-[0.6875rem] tracking-[0.2em] text-muted uppercase">
                <span className="h-px w-6 bg-gold" />
                Next Article
              </p>
              <Link
                href={`/journal/${nextPost.slug}`}
                className="group mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
              >
                <span className="font-display text-2xl font-semibold tracking-tight text-cream transition-colors duration-300 group-hover:text-gold sm:text-3xl">
                  {nextPost.title}
                </span>
                <span className="inline-flex shrink-0 items-center gap-2 text-xs tracking-[0.2em] text-muted uppercase transition-colors duration-300 group-hover:text-gold">
                  Read Article
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          </section>
        </div>
      )}
    </article>
  );
}
