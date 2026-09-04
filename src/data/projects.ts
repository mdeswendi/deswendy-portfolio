export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  /**
   * Case-study fields — optional. The detail page renders each related
   * section only when its field is present, so older entries stay valid.
   */
  year?: string;
  role?: string;
  overview?: string;
  problem: string;
  solution: string;
  features?: string[];
  outcome?: string;
  process: string[];
  techStack: string[];
  image: string;
  /** Standalone captioned screenshots for the detail page (never a collage). */
  gallery?: { src: string; caption: string }[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

/**
 * All copy below comes from you — no drafted placeholder text remains.
 *
 * `githubUrl` is set only where a public repository exists. Adding one makes
 * the "View Source" button appear on that project's detail page automatically.
 *
 * `process` is left empty until a project has a real, project-specific
 * process to show — an empty array hides the section rather than printing a
 * generic "Planning / Design / Development / Testing" list.
 */
export const projects: Project[] = [
  {
    id: "01",
    slug: "notaris-ppat-management-system",
    title: "Notary & PPAT Office Management System",
    category: "Business Management System",
    description:
      "A centralized office management system designed to help Notary and PPAT offices manage clients, legal documents, workflows, and operational activities in one structured platform.",
    fullDescription:
      "A centralized office management system designed to help Notary and PPAT offices manage clients, legal documents, workflows, and operational activities in one structured platform.",
    role: "Full-Stack Developer",
    overview:
      "A centralized office management system designed to help Notary and PPAT offices manage clients, legal documents, workflows, and operational activities in one structured platform.",
    problem:
      "Notary and PPAT offices handle complex administrative processes involving clients, documents, deadlines, and legal workflows. Without a centralized system, monitoring progress and managing daily operations becomes inefficient.",
    solution:
      "Built a digital management platform that connects client management, matter tracking, document organization, workflow processes, and operational activities into a unified system.",
    features: [
      "Client and party management",
      "Project and matter tracking",
      "Document management",
      "Workflow and task management",
      "Calendar and activity scheduling",
      "Role-based access control",
    ],
    process: [],
    techStack: ["Laravel", "MySQL", "Tailwind CSS", "JavaScript"],
    image: "/projects/notaris-ppat-dashboard.png",
    gallery: [
      {
        src: "/projects/notaris-ppat-dashboard.png",
        caption: "Dashboard Overview",
      },
      {
        src: "/projects/notaris-ppat-documents.png",
        caption: "Document & Deed Management",
      },
      {
        src: "/projects/notaris-ppat-deed-detail.png",
        caption: "Deed Detail",
      },
    ],
    githubUrl: "https://github.com/mdeswendi/notary-ppat-office-management",
    featured: true,
  },
  {
    id: "02",
    slug: "website-desa-wanasari",
    title: "Website Profil Desa Wanasari",
    category: "Web Development | Village Digitalization",
    description:
      "A digital information platform developed to improve public access to village information and promote local potential.",
    fullDescription:
      "Developed a village profile website for Desa Wanasari, Subang, as a digital platform to improve public access to village information and promote local potential.",
    problem:
      "Village information needed a better digital platform. Existing methods were not easily accessible to the community.",
    solution:
      "Developed a responsive website for village information management, including profiles, history, vision & mission, community organizations, and public information.",
    process: [],
    techStack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "Web Hosting"],
    image: "/projects/website-desa-wanasari.png",
    liveUrl: "https://wanasari-subang.id/",
    featured: false,
  },
  {
    id: "03",
    slug: "ai-telegram-bot",
    title: "AI Telegram Bot Automation",
    category: "AI Automation | Bot Development",
    description:
      "A Telegram bot integrated with AI to automate tasks and provide intelligent responses.",
    fullDescription:
      "A Telegram bot integrated with the Hermes AI model to deliver intelligent responses and automate tasks. It runs on an IDCloudHost server, so it answers user commands inside a chat people already keep open.",
    problem:
      "There was a need for a digital assistant reachable through Telegram for a range of purposes — information, education, and everyday tasks.",
    solution:
      "Built a Telegram bot with AI API integration, hosted on a server (IDCloudHost), that responds to user commands automatically.",
    process: [],
    techStack: ["Python", "Telegram Bot API", "AI API", "Server"],
    image: "/projects/ai-telegram-bot.png",
    featured: false,
  },
  {
    id: "04",
    slug: "company-profile",
    title: "Company Profile Website",
    category: "Web Development",
    description:
      "A professional company profile website built with PHP and MySQL.",
    fullDescription:
      "A modern, professional company profile website built to strengthen a business's credibility online, presenting company information, services, portfolio, and contact details in one place.",
    problem: "Many companies still do not have a strong online presence.",
    solution:
      "Built a company profile website with PHP and MySQL presenting company information, services, portfolio, and contact details.",
    process: [],
    techStack: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    image: "/projects/company-profile.png",
    featured: false,
  },
];

/** Featured projects first, then the rest in their declared order. */
export const sortedProjects: Project[] = [...projects].sort(
  (a, b) => Number(b.featured) - Number(a.featured),
);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}

/** Used for the "next project" link at the bottom of a detail page. */
export function getNextProject(slug: string): Project {
  const index = sortedProjects.findIndex((project) => project.slug === slug);
  return sortedProjects[(index + 1) % sortedProjects.length];
}
