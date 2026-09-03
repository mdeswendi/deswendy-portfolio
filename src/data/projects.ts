export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  problem: string;
  solution: string;
  process: string[];
  techStack: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

/**
 * All copy below comes from you — no drafted placeholder text remains.
 *
 * `githubUrl` is set only where a public repository exists. Adding one makes
 * the "View Source" button appear on that project's detail page automatically.
 */
export const projects: Project[] = [
  {
    id: "01",
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
    process: ["Planning", "UI Design", "Development", "Testing", "Deployment"],
    techStack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "Web Hosting"],
    image: "/projects/website-desa-wanasari.png",
    liveUrl: "https://wanasari-subang.id/",
    featured: true,
  },
  {
    id: "02",
    slug: "notaris-ppat-management-system",
    title: "Sistem Manajemen Notaris & PPAT",
    category: "Web Development | Information System",
    description:
      "A web-based management system for Notary & PPAT offices to streamline document management.",
    fullDescription:
      "A web application that digitises how a notary office handles its documents and daily work. Deed records and client data live in one structured system rather than a physical archive.",
    problem:
      "Staff had to search for old documents manually, which took a long time.",
    solution:
      "A web-based management system for storing, organising, and searching deed documents and client data quickly and in a structured way.",
    process: [
      "Requirements Analysis",
      "Database Design",
      "Web Development",
      "Testing",
      "Implementation",
    ],
    techStack: ["Laravel", "MySQL", "Tailwind CSS", "JavaScript"],
    image: "/projects/notaris-ppat-management-system.png",
    githubUrl: "https://github.com/mdeswendi/notary-ppat-office-management",
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
    process: [
      "Architecture Design",
      "API Integration",
      "Bot Development",
      "Testing",
      "Deployment",
    ],
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
    problem:
      "Many companies still do not have a strong online presence.",
    solution:
      "Built a company profile website with PHP and MySQL presenting company information, services, portfolio, and contact details.",
    process: [
      "UI Design",
      "Frontend & Backend Development",
      "Testing",
      "Deployment",
    ],
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
