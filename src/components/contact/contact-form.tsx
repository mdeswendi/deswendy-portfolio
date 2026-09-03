"use client";

import { motion } from "framer-motion";
// React 19 types deprecate FormEvent ("doesn't actually exist") in favour of
// the specific SubmitEvent / ChangeEvent types.
import { useState, type SubmitEvent } from "react";

import { ArrowRight } from "@/components/ui/icons";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { site } from "@/lib/site";

/**
 * The site is statically generated with no backend, so this composes a
 * `mailto:` link and hands off to the visitor's email client rather than
 * posting anywhere. That keeps it honest — nothing is silently swallowed —
 * and needs no third-party form service or API key.
 *
 * To switch to a hosted service later (Formspree, Resend, a route handler),
 * replace the body of `handleSubmit` and keep the markup.
 */
export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const subject = `Portfolio enquiry from ${name || "a visitor"}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  const fieldClass =
    "w-full rounded-xl border border-line bg-ink-soft px-4 py-3.5 text-sm text-cream transition-colors duration-300 outline-none placeholder:text-muted/70 focus:border-gold";

  const labelClass =
    "block text-[0.6875rem] tracking-[0.2em] text-muted uppercase";

  return (
    <motion.form
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      onSubmit={handleSubmit}
      className="rounded-2xl border border-line bg-ink-soft/40 p-7 lg:p-9"
    >
      <div className="space-y-6">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            className={`${fieldClass} mt-3`}
          />
        </div>

        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className={`${fieldClass} mt-3`}
          />
        </div>

        <div>
          <label htmlFor="contact-message" className={labelClass}>
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="What would you like to build?"
            className={`${fieldClass} mt-3 resize-y`}
          />
        </div>
      </div>

      <button
        type="submit"
        className="group mt-8 inline-flex items-center gap-3 rounded-full bg-gold px-7 py-3.5 text-xs font-medium tracking-[0.2em] text-ink uppercase transition-colors duration-300 hover:bg-gold-soft"
      >
        Send Message
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </button>

      <p className="mt-5 text-xs leading-relaxed text-muted">
        This opens your email app with the message ready to send. Prefer to
        write directly?{" "}
        <a
          href={`mailto:${site.email}`}
          className="text-gold underline decoration-gold/40 underline-offset-4 transition-colors hover:decoration-gold"
        >
          {site.email}
        </a>
      </p>
    </motion.form>
  );
}
