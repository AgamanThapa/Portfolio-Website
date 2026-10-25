/**
 * Core portfolio data. Edit this file to update identity, links and copy.
 *
 * Any value containing "TODO" is treated as a placeholder: the UI shows the
 * link as "not added yet" instead of pointing somewhere wrong.
 */

export const profile = {
  name: "Agaman Thapa",
  shortName: "AGAMAN",
  headline:
    "Cybersecurity Student at The British College | Python | Software Development | Web Development",
  roles: ["Cybersecurity Student.", "Developer.", "Builder."],
  tagline:
    "Exploring cybersecurity, software, systems and ideas worth building.",
  location: "Kathmandu, Nepal",
  locationShort: "KATHMANDU, NP",
  timeZone: "Asia/Kathmandu",
  // Put your photo at public/profile.jpg (any .jpg/.png works: change the name here).
  // If the file is missing, the portrait block simply doesn't render.
  photo: "",
  links: {
    linkedin: "https://www.linkedin.com/in/agaman-thapa-58bb4b2a3/",
    // TODO: replace with your real GitHub profile URL.
    github: "https://github.com/AgamanThapa",
    email: "agaman.thapa@gmail.com",
  },
};

export const education = [
  {
    school: "The British College",
    degree: "Bachelor's Degree",
    field: "Cybersecurity",
    location: "Kathmandu, Nepal",
    start: "October 2025",
    end: "October 2029",
    // TODO: paste the exact wording from your LinkedIn education entry here
    // (description, activities, grade) and it will be shown on the site.
    linkedinWording: "TODO",
  },
];

export const aboutCopy = {
  lead: "Technology gets interesting for me the moment I can build something with it.",
  paragraphs: [
    "I'm Agaman Thapa, a Cybersecurity student at The British College in Kathmandu. My interests run across cybersecurity, Python, software and web development, databases, artificial intelligence, financial technology and system design — and I try to learn each of them the same way: by making something real.",
    "Outside traditional IT, I've explored financial markets, trading systems, entrepreneurship and product development. I like taking an idea from “what if?” and slowly turning it into something tangible — an app, a strategy study, a brand concept, a website.",
    "I'm still learning, and this portfolio is meant to show that journey honestly: the things I've built, the experiments, and the work still in progress.",
  ],
};

export interface Interest {
  id: string;
  title: string;
  icon: "shield" | "code" | "chart" | "trend" | "rocket" | "palette";
  verbs: [string, string, string];
  blurb: string;
  /** Project codes (see data/projects.ts) that relate to this interest. */
  projects: string[];
}

export const interests: Interest[] = [
  {
    id: "cyber",
    title: "Cybersecurity",
    icon: "shield",
    verbs: ["Protect", "Analyse", "Understand"],
    blurb:
      "My degree focus. I'm learning how systems are attacked and defended so I can build things that hold up — fundamentals first, in the Cyber Lab below.",
    projects: [],
  },
  {
    id: "dev",
    title: "Development",
    icon: "code",
    verbs: ["Build", "Experiment", "Improve"],
    blurb:
      "Python, databases and web technologies, applied to real workflows — a trading journal, a café point of sale, a fragrance storefront.",
    projects: ["P01", "P02", "P03", "P06"],
  },
  {
    id: "data",
    title: "Data",
    icon: "chart",
    verbs: ["Visualise", "Interpret", "Learn"],
    blurb:
      "Turning stored records into something you can read at a glance — charts, reports and weekly summaries.",
    projects: ["P01", "P03"],
  },
  {
    id: "markets",
    title: "Financial Markets",
    icon: "trend",
    verbs: ["Analyse", "Backtest", "Manage Risk"],
    blurb:
      "Personal research into how markets behave and how to test ideas honestly. A study project, not financial advice.",
    projects: ["P04", "P01"],
  },
  {
    id: "venture",
    title: "Entrepreneurship",
    icon: "rocket",
    verbs: ["Research", "Plan", "Execute"],
    blurb:
      "Product positioning, pricing, suppliers and brand — exploring what it takes to start something in Nepal.",
    projects: ["P05", "P06"],
  },
  {
    id: "creative",
    title: "Creative Technology",
    icon: "palette",
    verbs: ["Design", "Document", "Explore"],
    blurb:
      "Where technology meets culture and visual communication — like documenting Nepalese heritage as technical blueprints.",
    projects: ["P07", "P06"],
  },
];

export const philosophy = {
  quote:
    "I don't want to only learn how systems work. I want to understand them deeply enough to build, break, improve and secure them.",
  motif: ["Learn.", "Build.", "Break.", "Understand.", "Improve."],
};

export const contactInterests = [
  "Cybersecurity opportunities",
  "Internships",
  "Developer projects",
  "Collaborations",
  "Technology projects",
  "Learning opportunities",
];

/**
 * LinkedIn extras. Fill these in and they appear automatically in the
 * Journey section. Empty groups are not rendered — nothing is invented.
 */
export const credentials = {
  certifications: [] as string[], // TODO
  courses: [] as string[], // TODO
  languages: [] as string[], // TODO
  achievements: [] as string[], // TODO
};

export const systemStatus = [
  { k: "SYSTEM", v: "ONLINE" },
  { k: "LOCATION", v: "KATHMANDU, NP" },
  { k: "STATUS", v: "LEARNING" },
  { k: "FOCUS", v: "CYBERSECURITY" },
  { k: "MODE", v: "BUILD" },
];

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "lab", label: "Lab" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];
