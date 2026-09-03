"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { easeOut } from "@/lib/motion";
import { navLinks, site } from "@/lib/site";

/**
 * "/" only matches exactly; every other link also matches its children, so
 * /projects/some-slug still highlights Projects.
 */
function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: easeOut }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? "border-line bg-ink/80 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 lg:px-8">
        <Link
          href="/"
          className="font-display text-base font-semibold tracking-tight text-cream transition-opacity hover:opacity-70"
        >
          {site.name}
          <span className="text-gold">.</span>
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`group relative text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
                    active ? "text-cream" : "text-muted hover:text-cream"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-gold transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Now that /contact exists, the CTA routes there rather than
            opening a mail client straight from the nav. */}
        <Link
          href="/contact"
          className="hidden rounded-full border border-line px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-cream transition-colors duration-300 hover:border-gold hover:text-gold md:inline-block"
        >
          Let&rsquo;s Talk
        </Link>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: easeOut }}
            className="block h-px w-6 bg-cream"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: easeOut }}
            className="block h-px w-6 bg-cream"
          />
        </button>
      </nav>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: easeOut }}
            className="overflow-hidden border-t border-line md:hidden"
          >
            {/* Closing on click (rather than on a pathname effect) also
                collapses the menu when tapping the current route. */}
            <ul className="flex flex-col gap-1 px-6 py-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block py-3 font-display text-2xl tracking-tight transition-colors ${
                      isActive(pathname, link.href)
                        ? "text-gold"
                        : "text-cream hover:text-gold"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-4">
                <a
                  href={`mailto:${site.email}`}
                  onClick={() => setOpen(false)}
                  className="text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-gold"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
