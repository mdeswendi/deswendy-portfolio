import type { Metadata } from "next";

import AboutCertificates from "@/components/about/about-certificates";
import AboutSkills from "@/components/about/about-skills";
import AboutStory from "@/components/about/about-story";
import PageHeader from "@/components/sections/page-header";
import { certificates } from "@/data/certificates";
import { site } from "@/lib/site";

const description =
  "From industrial technician to software developer — how maintaining cold storage systems and gensets shaped the way I build software today.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About · ${site.name}`,
    description,
    url: "/about",
    // Declaring `openGraph` here overrides the inherited value wholesale, so
    // the root opengraph-image must be named explicitly or the page ships
    // with no preview image.
    images: ["/opengraph-image"],
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Me"
        title="From industrial technician to software developer."
        subtitle="I spent years keeping physical systems running before I started building digital ones. The diagnosis is the same — only the domain changed."
      />

      <AboutStory />
      <AboutSkills />
      <AboutCertificates certificates={certificates} />
    </>
  );
}
