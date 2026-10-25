/** "Currently Exploring" cards. Edit this array to update the section. */

export type Phase = "FUNDAMENTALS" | "BUILDING" | "EXPERIMENTING";

export interface ExploreItem {
  id: string;
  title: string;
  phase: Phase;
  line: string;
}

export const exploring: ExploreItem[] = [
  { id: "cyber", title: "Cybersecurity", phase: "FUNDAMENTALS", line: "Core concepts through my degree at The British College." },
  { id: "net", title: "Networking", phase: "FUNDAMENTALS", line: "Understanding how data moves before worrying about how it's attacked." },
  { id: "py", title: "Python", phase: "BUILDING", line: "My main tool for projects, data work and security experiments." },
  { id: "sec", title: "Security Concepts", phase: "FUNDAMENTALS", line: "Threats, controls and secure design thinking." },
  { id: "sw", title: "Software Development", phase: "BUILDING", line: "Turning real-world workflows into applications." },
  { id: "ai", title: "Artificial Intelligence", phase: "EXPERIMENTING", line: "Testing where AI genuinely helps — and where it doesn't." },
  { id: "fin", title: "Financial Technology", phase: "EXPERIMENTING", line: "Markets, backtesting and risk — as a research project." },
];
