import type { Metadata } from "next";
import Image from "next/image";

import ContactForm from "@/components/contact/contact-form";
import PageHeader from "@/components/sections/page-header";
import { ArrowUpRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { site, socialLinks } from "@/lib/site";

const description = `Get in touch with ${site.name} — available for freelance projects, collaboration, and full-stack development work.`;

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact · ${site.name}`,
    description,
    url: "/contact",
    images: ["/opengraph-image"],
  },
};

const channels = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    external: false,
  },
  {
    label: "LinkedIn",
    value: "Muhammad Deswendi",
    href: socialLinks.find((link) => link.label === "LinkedIn")?.href ?? "#",
    external: true,
  },
  {
    label: "GitHub",
    value: "@mdeswendi",
    href: socialLinks.find((link) => link.label === "GitHub")?.href ?? "#",
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Let's Connect"
        title="Let's build something meaningful together."
        subtitle="Whether it's a project you need shipped, a role you're hiring for, or a question about something I've written — I read everything."
      />

      <section className="mx-auto max-w-6xl px-6 pb-28 lg:px-8 lg:pb-36">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
          <div>
            <Reveal>
              <div className="flex items-center gap-5">
                <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-line">
                  <Image
                    src="/about/portrait.jpg"
                    alt={site.name}
                    fill
                    sizes="64px"
                    className="object-cover object-center"
                  />
                </span>
                <span>
                  <span className="block font-display text-lg tracking-tight text-cream">
                    {site.name}
                  </span>
                  <span className="mt-1 block text-[0.6875rem] tracking-[0.2em] text-muted uppercase">
                    {site.role}
                  </span>
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-12 flex items-center gap-3 text-[0.6875rem] tracking-[0.2em] text-muted uppercase">
                <span className="h-px w-6 bg-gold" />
                Direct
              </p>
            </Reveal>

            <ul className="mt-10 border-t border-line">
              {channels.map((channel, index) => (
                <Reveal key={channel.label} delay={index * 0.08}>
                  <li className="border-b border-line">
                    <a
                      href={channel.href}
                      {...(channel.external
                        ? { target: "_blank", rel: "noreferrer noopener" }
                        : {})}
                      className="group flex items-center justify-between gap-6 py-6"
                    >
                      <span className="min-w-0">
                        <span className="block text-[0.6875rem] tracking-[0.2em] text-muted uppercase">
                          {channel.label}
                        </span>
                        <span className="mt-2 block truncate font-display text-lg tracking-tight text-cream transition-colors duration-300 group-hover:text-gold sm:text-xl">
                          {channel.value}
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
                    </a>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.24}>
              <p className="mt-10 max-w-sm text-sm leading-relaxed text-muted">
                Based in {site.location}. I usually reply within a couple of
                days.
              </p>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <p className="flex items-center gap-3 text-[0.6875rem] tracking-[0.2em] text-muted uppercase">
                <span className="h-px w-6 bg-gold" />
                Send a message
              </p>
            </Reveal>

            <div className="mt-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
