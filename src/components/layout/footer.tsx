"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { navLinks, site, socialLinks } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto max-w-6xl px-6 py-20 lg:px-8"
      >
        <div className="flex flex-col gap-14 md:flex-row md:justify-between">
          <motion.div variants={fadeUp} className="max-w-md">
            <p className="font-display text-2xl leading-snug tracking-tight text-cream sm:text-3xl">
              Let&rsquo;s build something
              <span className="text-gold"> worth shipping.</span>
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-block border-b border-line pb-1 text-sm text-muted transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              {site.email}
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="flex gap-16">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-muted">
                Site
              </p>
              <ul className="mt-5 space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream transition-colors duration-300 hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                {/* Static HTML under /public, not a router route — plain <a>
                    so it does a full navigation instead of client routing. */}
                <li>
                  <a
                    href="/cv"
                    className="text-sm text-cream transition-colors duration-300 hover:text-gold"
                  >
                    CV
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-muted">
                Elsewhere
              </p>
              <ul className="mt-5 space-y-3">
                {socialLinks.map((link) => {
                  const external = link.href.startsWith("http");
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        {...(external
                          ? { target: "_blank", rel: "noreferrer noopener" }
                          : {})}
                        className="text-sm text-cream transition-colors duration-300 hover:text-gold"
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          className="mt-16 border-t border-line pt-8 text-xs text-muted"
        >
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
