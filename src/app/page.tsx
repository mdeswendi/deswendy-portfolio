import Hero from "@/components/sections/hero";
import { JsonLd } from "@/components/seo/json-ld";
import { site, socialLinks } from "@/lib/site";
import { getSiteUrl } from "@/lib/site-url";

/**
 * `sameAs` is the important part for ranking on his own name: it tells Google
 * these scattered profiles are one entity, so the site, the LinkedIn profile
 * and the Credly badges reinforce each other instead of competing.
 *
 * Email is deliberately left out — it is already a mailto link on the page,
 * and repeating it here only makes it easier to harvest.
 */
function personSchema(base: string) {
  const profiles = socialLinks
    .filter((link) => link.href.startsWith("http"))
    .map((link) => link.href);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: base,
    image: `${base}/about/portrait.jpg`,
    jobTitle: site.role,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      addressCountry: "ID",
    },
    sameAs: [...profiles, "https://www.credly.com/users/muhammad-deswendi"],
    knowsAbout: [
      "Web Development",
      "Next.js",
      "React",
      "TypeScript",
      "Laravel",
      "PHP",
      "MySQL",
      "Computer Networking",
      "AI Automation",
    ],
  };
}

function websiteSchema(base: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${site.name} — ${site.role}`,
    url: base,
    inLanguage: "en",
    author: { "@type": "Person", name: site.name, url: base },
  };
}

export default function Home() {
  const base = getSiteUrl();

  return (
    <>
      <JsonLd data={personSchema(base)} />
      <JsonLd data={websiteSchema(base)} />
      <Hero />
    </>
  );
}
