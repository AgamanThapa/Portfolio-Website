/**
 * Skills are grouped, never scored. "working" = something I actively use in
 * projects; "learning" = something I'm still building fundamentals in.
 *
 * TODO: cross-check against your LinkedIn "Skills" list. Add anything real that
 * is missing (e.g. JavaScript, SQL, specific tools) and remove anything you
 * don't want to claim. Do not add skills you haven't used.
 */

export type SkillLevel = "working" | "learning";

export interface Skill {
  name: string;
  level: SkillLevel;
  note: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  icon:
    | "shield"
    | "code"
    | "layers"
    | "globe"
    | "database"
    | "chart"
    | "brain"
    | "trend"
    | "wrench";
  blurb: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "cyber",
    title: "Cybersecurity",
    icon: "shield",
    blurb: "My degree focus — fundamentals first.",
    skills: [
      { name: "Cybersecurity fundamentals", level: "learning", note: "Core of my Bachelor's at The British College." },
      { name: "Networking fundamentals", level: "learning", note: "How data moves, and how that gets attacked and defended." },
      { name: "Linux fundamentals", level: "learning", note: "Command line, users, permissions and system basics." },
      { name: "Security concepts", level: "learning", note: "Threats, controls and thinking like both sides." },
      { name: "Authentication concepts", level: "learning", note: "Explored while designing login and profiles for the trading journal." },
    ],
  },
  {
    id: "programming",
    title: "Programming",
    icon: "code",
    blurb: "The languages I build with.",
    skills: [
      { name: "Python", level: "working", note: "Coursework and project experiments, including data and database work." },
      { name: "HTML", level: "working", note: "Structure for the web projects and this portfolio." },
      { name: "CSS", level: "working", note: "Layout, responsive design and visual polish." },
    ],
  },
  {
    id: "software",
    title: "Software Development",
    icon: "layers",
    blurb: "Turning workflows into applications.",
    skills: [
      { name: "Application development", level: "working", note: "Trading journal and café POS concepts." },
      { name: "Problem solving", level: "working", note: "Breaking real workflows down into data and screens." },
      { name: "System design", level: "learning", note: "Thinking about how the parts of an application fit together." },
      { name: "Software architecture concepts", level: "learning", note: "Front-end / back-end separation and structure." },
    ],
  },
  {
    id: "web",
    title: "Web Development",
    icon: "globe",
    blurb: "Interfaces that feel considered.",
    skills: [
      { name: "Frontend development", level: "working", note: "Fragrance website design and this portfolio." },
      { name: "Responsive design", level: "working", note: "Layouts that adapt from phone to desktop." },
      { name: "UI/UX design", level: "working", note: "Café POS flow, fragrance site and brand work." },
      { name: "Backend concepts", level: "learning", note: "Exploring how a design becomes a full-stack application." },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    icon: "database",
    blurb: "Where application data lives.",
    skills: [
      { name: "Database design", level: "working", note: "Modelling users, orders and trades." },
      { name: "Database integration", level: "working", note: "Connecting applications to stored data." },
    ],
  },
  {
    id: "data",
    title: "Data & Visualisation",
    icon: "chart",
    blurb: "Making information readable.",
    skills: [
      { name: "Python", level: "working", note: "Preparing and processing data." },
      { name: "Matplotlib", level: "working", note: "Charts for the university database project." },
      { name: "Data visualisation", level: "working", note: "Reports and charts in the trading journal." },
      { name: "Data analysis concepts", level: "learning", note: "Interpreting results, not just drawing them." },
    ],
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    icon: "brain",
    blurb: "Using and understanding AI tools.",
    skills: [
      { name: "AI applications", level: "learning", note: "Where AI genuinely helps in software and research." },
      { name: "AI experimentation", level: "learning", note: "Trying ideas to see what works and what doesn't." },
      { name: "Prompt engineering", level: "working", note: "Getting useful, checkable output from AI tools." },
    ],
  },
  {
    id: "fintech",
    title: "Financial Technology",
    icon: "trend",
    blurb: "Markets meet software.",
    skills: [
      { name: "Trading systems", level: "working", note: "Structured research and journalling around gold (XAUUSD)." },
      { name: "Backtesting", level: "working", note: "Testing ideas against history before trusting them." },
      { name: "Risk management", level: "working", note: "Risk-to-reward thinking and position risk." },
      { name: "TradingView", level: "working", note: "Charting and backtesting platform." },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    icon: "wrench",
    blurb: "What shows up in my project history.",
    skills: [
      { name: "TradingView", level: "working", note: "Market charting and strategy testing." },
      { name: "Matplotlib", level: "working", note: "Python plotting library." },
    ],
  },
];

export const uniqueSkillCount = new Set(
  skillGroups.flatMap((g) => g.skills.map((s) => s.name.toLowerCase())),
).size;
