import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Let .md / .mdx files be treated as routable/importable modules.
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],

  // The CV is a self-contained static site living in public/cv/. Next only
  // serves the exact file paths (/cv/index.html), not the directory, so map
  // the clean URLs onto the real files. `afterFiles` runs once the public
  // lookup for /cv has already missed.
  async rewrites() {
    return [
      { source: "/cv", destination: "/cv/index.html" },
      { source: "/cv/en", destination: "/cv/en/index.html" },
    ];
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // Plugins MUST be named as strings here, not imported functions: this
    // project builds with Turbopack, which passes plugin config to Rust and
    // cannot serialize JS function references.
    //
    // remark-frontmatter makes the YAML `---` block a frontmatter node so it
    // is not rendered as article body. It is read separately, from disk, by
    // gray-matter in src/lib/mdx.ts.
    remarkPlugins: ["remark-frontmatter", "remark-gfm"],
    rehypePlugins: ["rehype-highlight"],
  },
});

export default withMDX(nextConfig);
