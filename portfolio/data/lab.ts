/**
 * Cyber Lab — a learning log, not a list of credentials.
 * Only topics consistent with my studies. Update as I actually progress.
 */

export type LabStatus = "LEARNING" | "EXPERIMENTING" | "EXPLORING";

export interface LabModule {
  id: string;
  title: string;
  file: string;
  status: LabStatus;
  topics: string[];
  note: string;
}

export const labModules: LabModule[] = [
  {
    id: "net",
    title: "Networking",
    file: "networking.md",
    status: "LEARNING",
    topics: [
      "TCP/IP and the OSI model",
      "IP addressing and subnetting",
      "DNS, HTTP and how a request travels",
      "Reading network traffic (concepts first)",
    ],
    note: "You can't secure what you don't understand — networks first.",
  },
  {
    id: "linux",
    title: "Linux",
    file: "linux.md",
    status: "LEARNING",
    topics: [
      "Command line fundamentals",
      "Users, groups and file permissions",
      "Processes and services",
      "Enrolled in an RHCSA foundations course",
    ],
    note: "Most of the internet runs on it. Getting comfortable in the terminal.",
  },
  {
    id: "sys",
    title: "System Fundamentals",
    file: "systems.md",
    status: "LEARNING",
    topics: [
      "Operating system concepts",
      "Memory, processes and the file system",
      "How software and hardware interact",
    ],
    note: "The base layer under every security topic.",
  },
  {
    id: "web",
    title: "Web Security",
    file: "web-security.md",
    status: "EXPLORING",
    topics: [
      "How the web works: requests, sessions, cookies",
      "Common classes of web vulnerabilities (concepts)",
      "Authentication and secure design thinking",
    ],
    note: "Connected to what I build — login, profiles and storefronts.",
  },
  {
    id: "py",
    title: "Python for Security",
    file: "python-security.md",
    status: "EXPERIMENTING",
    topics: [
      "Scripting small utilities",
      "Working with files, text and data",
      "Automating repetitive checks",
    ],
    note: "Python is already my main tool — pointing it at security problems.",
  },
  {
    id: "eth",
    title: "Ethical Hacking Concepts",
    file: "ethical-hacking.md",
    status: "EXPLORING",
    topics: [
      "Methodology: recon → analysis → reporting",
      "Legal and ethical boundaries",
      "Why authorised practice environments matter",
    ],
    note: "Concepts and ethics before tools.",
  },
  {
    id: "research",
    title: "Security Research",
    file: "research.md",
    status: "EXPLORING",
    topics: [
      "Reading advisories and write-ups",
      "Understanding how issues are found and fixed",
      "Taking structured notes",
    ],
    note: "Learning by reading how others found and fixed real problems.",
  },
  {
    id: "ctf",
    title: "CTF Learning",
    file: "ctf.md",
    status: "EXPLORING",
    topics: [
      "Beginner-friendly challenges",
      "Learning from solutions and write-ups",
      "Building problem-solving habits",
    ],
    note: "Puzzles as practice — slowly, and with plenty of mistakes.",
  },
];
