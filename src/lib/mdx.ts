import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

/**
 * SERVER ONLY — this module reads from disk. Import it from Server Components
 * (pages, generateMetadata, generateStaticParams) only. Client Components may
 * import the `Post` type with `import type`, which is erased at compile time.
 */

export interface PostFrontmatter {
  title: string;
  category: string;
  /** ISO date, e.g. "2026-08-15". */
  date: string;
  readingTime: string;
  coverImage: string;
  excerpt: string;
  featured: boolean;
}

export interface Post extends PostFrontmatter {
  slug: string;
}

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "journal");

const REQUIRED_FIELDS = [
  "title",
  "category",
  "date",
  "readingTime",
  "coverImage",
  "excerpt",
] as const;

function readPost(slug: string): Post {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const { data } = matter(fs.readFileSync(filePath, "utf8"));

  const missing = REQUIRED_FIELDS.filter((field) => !data[field]);
  if (missing.length > 0) {
    throw new Error(
      `Journal post "${slug}.mdx" is missing frontmatter: ${missing.join(", ")}`,
    );
  }

  return {
    slug,
    title: data.title,
    category: data.category,
    date: data.date,
    readingTime: data.readingTime,
    coverImage: data.coverImage,
    excerpt: data.excerpt,
    featured: data.featured === true,
  };
}

/** Slugs for generateStaticParams — filename without the .mdx extension. */
export function getPostSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/** Returns undefined for an unknown slug so the caller can call notFound(). */
export function getPostBySlug(slug: string): Post | undefined {
  if (!getPostSlugs().includes(slug)) {
    return undefined;
  }
  return readPost(slug);
}

/** All posts, newest first. */
export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map(readPost)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Used for the "next article" link at the bottom of a post. */
export function getNextPost(slug: string): Post | undefined {
  const posts = getAllPosts();
  if (posts.length < 2) {
    return undefined;
  }
  const index = posts.findIndex((post) => post.slug === slug);
  return posts[(index + 1) % posts.length];
}
