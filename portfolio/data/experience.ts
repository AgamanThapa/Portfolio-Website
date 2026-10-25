/**
 * Journey timeline + experience.
 *
 * Only the degree start has a real date. Other steps are shown as phases
 * (no dates) until you add real ones from LinkedIn.
 *
 * `experience` is intentionally empty: no work experience has been provided.
 * Add real entries from LinkedIn and they will render in the Journey section.
 */

export interface JourneyStep {
  when?: string; // only set when the date is real
  phase: string;
  title: string;
  text: string;
  projects?: string[];
}

export const journey: JourneyStep[] = [
  {
    when: "Oct 2025",
    phase: "Start",
    title: "Started my Bachelor's at The British College",
    text: "Began studying Cybersecurity in Kathmandu — a four-year programme running October 2025 to October 2029.",
  },
  {
    phase: "Cybersecurity",
    title: "Building the fundamentals",
    text: "Networking, Linux and core security concepts — the foundation everything else sits on.",
  },
  {
    phase: "Python",
    title: "Python becomes my main tool",
    text: "Coursework, data work and experiments, with Python as the thread running through most of what I build.",
    projects: ["P03"],
  },
  {
    phase: "Web development",
    title: "Designing for the web",
    text: "HTML, CSS and front-end thinking — interfaces, product presentation and responsive layouts.",
    projects: ["P06"],
  },
  {
    phase: "Databases",
    title: "Connecting applications to data",
    text: "Database design and integration, and the Matplotlib work that makes stored data readable.",
    projects: ["P03"],
  },
  {
    phase: "Software projects",
    title: "Building real workflows",
    text: "A trading journal and a café POS concept — applications shaped by how people actually work.",
    projects: ["P01", "P02"],
  },
  {
    phase: "Financial technology",
    title: "Experimenting with markets and systems",
    text: "Backtesting, risk management and structured research — as a personal learning project.",
    projects: ["P04"],
  },
  {
    phase: "Business & creative research",
    title: "Ideas beyond code",
    text: "A fragrance brand concept for Nepal and a heritage blueprint series — technology, culture and entrepreneurship together.",
    projects: ["P05", "P07"],
  },
  {
    when: "Now",
    phase: "Ongoing",
    title: "Still building. Still learning.",
    text: "Year by year, project by project — the common thread is curiosity.",
  },
];

export interface ExperienceItem {
  role: string;
  org: string;
  period: string;
  summary: string;
}

// TODO: add real roles from LinkedIn. Left empty on purpose — nothing invented.
export const experience: ExperienceItem[] = [];
