/**
 * Single source of truth for site-wide copy, links and metadata.
 * Edit here instead of hunting through components.
 */
export const site = {
  name: "Muhammad Deswendi",
  role: "Full-Stack Developer",
  location: "Indonesia",
  // Local fallback only. In production `getSiteUrl()` in lib/site-url.ts uses
  // the domain Vercel reports, so this is not what ships. Replace it with your
  // own domain once you have one, for `next build` runs outside Vercel.
  url: "http://localhost:3000",
  description:
    "Personal site and journal of Muhammad Deswendi — a full-stack developer building web products with clean architecture, thoughtful design, and a habit of learning in public.",
  email: "mdeswendi@gmail.com",
} as const;

export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/**
 * The CV is self-contained static HTML in /public/cv, not a Next route, so it
 * is always linked with a plain <a> (full navigation) — kept out of navLinks
 * because those render as next/link.
 */
export const cvHref = "/cv";

export const socialLinks: NavLink[] = [
  { label: "GitHub", href: "https://github.com/mdeswendi" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/muhammad-deswendi-889703297/",
  },
  { label: "Email", href: `mailto:${site.email}` },
];
