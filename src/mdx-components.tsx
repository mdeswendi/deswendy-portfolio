import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Global element mapping for every MDX file. Descendant-dependent rules
 * (syntax-highlight tokens, resetting `code` inside `pre`) live in
 * globals.css under `.article-body`, since they can't be expressed here.
 */
const components: MDXComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mt-16 mb-6 font-display text-2xl font-semibold tracking-tight text-cream lg:text-3xl"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="mt-12 mb-4 font-display text-xl font-semibold tracking-tight text-cream"
      {...props}
    />
  ),
  h4: (props: ComponentPropsWithoutRef<"h4">) => (
    <h4
      className="mt-10 mb-3 font-display text-base font-semibold tracking-tight text-cream"
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mb-6 text-base leading-[1.85] text-muted" {...props} />
  ),
  a: ({ href = "", ...props }: ComponentPropsWithoutRef<"a">) => {
    const external = href.startsWith("http");
    const className =
      "text-gold underline decoration-gold/40 underline-offset-4 transition-colors hover:decoration-gold";

    return external ? (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={className}
        {...props}
      />
    ) : (
      <Link href={href} className={className} {...props} />
    );
  },
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="mb-6 list-disc space-y-2 pl-5 text-base leading-[1.85] text-muted marker:text-gold"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="mb-6 list-decimal space-y-2 pl-5 text-base leading-[1.85] text-muted marker:text-gold"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="pl-1.5" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-cream" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-10 border-l-2 border-gold pl-6 font-display text-lg leading-relaxed text-cream italic"
      {...props}
    />
  ),
  hr: () => <hr className="my-14 border-line" />,
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="rounded-md border border-line bg-ink-soft px-1.5 py-0.5 font-mono text-[0.85em] text-gold"
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="mb-8 overflow-x-auto rounded-xl border border-line bg-ink-soft p-5 text-sm leading-relaxed"
      {...props}
    />
  ),
  // GFM tables can overflow on mobile, so each one scrolls in its own box.
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="mb-8 overflow-x-auto rounded-xl border border-line">
      <table className="w-full border-collapse text-left text-sm" {...props} />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th
      className="border-b border-line bg-ink-soft px-4 py-3 text-xs font-medium tracking-[0.15em] text-cream uppercase"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="border-b border-line px-4 py-3 text-muted" {...props} />
  ),
  // `alt` is destructured rather than spread so it is statically visible —
  // markdown's ![alt](src) supplies it, and it defaults to decorative.
  img: ({ alt = "", ...props }: ComponentPropsWithoutRef<"img">) => (
    <Image
      alt={alt}
      sizes="(min-width: 768px) 720px, 100vw"
      className="my-8 rounded-xl border border-line"
      style={{ width: "100%", height: "auto" }}
      width={1200}
      height={750}
      {...(props as Omit<ImageProps, "alt">)}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
