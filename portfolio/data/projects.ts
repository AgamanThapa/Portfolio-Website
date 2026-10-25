/**
 * Project case studies. Add, edit or reorder freely — the UI is data-driven.
 *
 * HONESTY NOTES
 * - `status` communicates the real state of each project. Adjust these to match
 *   reality (see the legend in components/StatusBadge.tsx).
 * - Narrative fields (challenges, learned, future) were drafted from the feature
 *   lists you provided. Edit them so they match what actually happened.
 * - Add `links.github` / `links.demo` and screenshots (public/projects/…) when ready.
 */

export type Category =
  | "cybersecurity"
  | "software"
  | "web"
  | "data"
  | "fintech"
  | "business"
  | "creative";

export type Status =
  | "COMPLETED"
  | "IN DEVELOPMENT"
  | "RESEARCH"
  | "CONCEPT"
  | "ACADEMIC"
  | "EXPERIMENTAL";

export type ArtKey =
  | "journal"
  | "pos"
  | "pyviz"
  | "chart"
  | "brand"
  | "web"
  | "blueprint";

export interface Project {
  id: string; // e.g. "P01" — also shown as the project ID in the UI
  name: string;
  tagline: string;
  categories: Category[];
  status: Status[];
  art: ArtKey;
  overview: string;
  problem: string;
  idea: string;
  approach: string[];
  built: string[];
  tech: string[];
  development: string;
  challenges: string[];
  learned: string[];
  future: string[];
  links: { github?: string; demo?: string };
  /** Add real screenshots: { caption, src: "/projects/p01-dashboard.png" } */
  screenshots: { caption: string; src?: string }[];
  honestNote?: string;
}

export const categoryFilters: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "cybersecurity", label: "Cybersecurity" },
  { id: "software", label: "Software" },
  { id: "web", label: "Web" },
  { id: "data", label: "Data" },
  { id: "fintech", label: "Fintech" },
  { id: "business", label: "Business" },
  { id: "creative", label: "Creative" },
];

export const projects: Project[] = [
  {
    id: "P01",
    name: "Trading Journal Application",
    tagline: "A desktop-style journal for logging, reviewing and learning from trades.",
    categories: ["software", "data", "fintech"],
    status: ["EXPERIMENTAL"],
    art: "journal",
    overview:
      "A desktop-style trading journal that brings trade logging, history and performance review into one place — an experiment in combining something I care about, trading, with software development, databases and data visualisation.",
    problem:
      "Trades tend to live in scattered notes and spreadsheets, which makes it hard to spot patterns, review a week honestly, or compare behaviour over time.",
    idea:
      "One focused tool where every trade is recorded, stored in a database and turned into reports and charts — wrapped in a calm, structured interface inspired by Notion.",
    approach: [
      "Sketch the core loop: sign in → choose a profile → log a trade → review history and reports.",
      "Model users, profiles and trades in a database layer.",
      "Design the interface around fast entry and easy review.",
      "Treat weekly reporting and performance analytics as the main outputs.",
    ],
    built: [
      "User authentication / login",
      "Multiple user profiles",
      "Trade logging and trade history",
      "Performance tracking and reports",
      "Database integration",
      "Data visualisation of results",
      "Weekly reporting concepts",
    ],
    tech: [
      "Software development",
      "Database integration",
      "Data visualisation",
      "Financial technology",
      "Notion-inspired UI",
    ],
    development:
      "The application is organised around a simple loop: a user signs in, works inside their own profile, records trades, and the stored data feeds history views, reports and charts.",
    challenges: [
      "Designing a data model that keeps each user's profile and trades separate.",
      "Making trade entry quick without losing the detail that makes review useful.",
      "Choosing analytics that help a trader reflect, rather than just decorate.",
    ],
    learned: [
      "How a database-backed application is structured end to end.",
      "That good reporting starts with a clean data model.",
      "How much interface design decides whether a tool actually gets used.",
      "Where my interests in markets and software overlap.",
    ],
    future: [
      "Import trades from broker exports.",
      "Richer analytics such as expectancy, drawdown and streaks.",
      "Automated weekly review reports.",
      "Stronger security around authentication and stored data.",
    ],
    links: {},
    screenshots: [
      { caption: "Dashboard — add screenshot" },
      { caption: "Trade log — add screenshot" },
    ],
  },
  {
    id: "P02",
    name: "Café POS System",
    tagline: "A table-to-bill workflow for a café, designed around how staff actually work.",
    categories: ["software"],
    status: ["CONCEPT"],
    art: "pos",
    overview:
      "A Point of Sale (POS) system concept for cafés: pick a table, take the order, manage the items and produce the final bill automatically.",
    problem:
      "Cafés run on fast, repeated workflows — seating customers, taking orders, changing them and settling bills. Doing it by hand invites mistakes in totals and in which items belong to which table.",
    idea:
      "Model the café floor as tables, each with a live order that staff can add to, edit and close out.",
    approach: [
      "Map the real-world flow: table → order → items → bill.",
      "Design a staff-first interface with very few steps per action.",
      "Back the workflow with a database so orders persist.",
      "Calculate prices and totals automatically.",
    ],
    built: [
      "Table management and table selection",
      "Adding customer orders",
      "Managing order items",
      "Automatic price calculation",
      "Final bill creation",
      "Simple staff-oriented interface",
    ],
    tech: [
      "Database-backed application",
      "UI design",
      "Transaction handling",
      "Application workflow design",
    ],
    development:
      "The system is organised around the table as the central object: everything an order needs — items, quantities, prices and totals — hangs off the table that placed it.",
    challenges: [
      "Keeping totals correct as items are added, changed and removed.",
      "Making the interface simple enough to use during a busy service.",
      "Handling an order's lifecycle from open to billed.",
    ],
    learned: [
      "How real-world business software is shaped by workflow.",
      "Why transactions matter whenever money is involved.",
      "How to translate a physical process into data and screens.",
    ],
    future: [
      "Staff accounts and roles.",
      "Sales reports and end-of-day summaries.",
      "Receipt export or printing.",
      "Basic inventory awareness.",
    ],
    links: {},
    screenshots: [
      { caption: "Table view — add screenshot" },
      { caption: "Bill screen — add screenshot" },
    ],
  },
  {
    id: "P03",
    name: "University Python + Database Project",
    tagline: "Python, a database and Matplotlib — turning stored data into something readable.",
    categories: ["software", "data"],
    status: ["ACADEMIC"],
    art: "pyviz",
    overview:
      "An academic project combining Python, database integration and Matplotlib to store information and present it visually. It reflects my growing understanding of programming, databases and visual representation of information.",
    problem:
      "Raw data in a database is hard to interpret. The aim was to connect the two worlds: store data properly, then make it visible.",
    idea:
      "Use Python as the bridge — read from a database, prepare the data and visualise it with Matplotlib.",
    approach: [
      "Design the database structure.",
      "Connect Python to the database.",
      "Query and prepare the data for plotting.",
      "Visualise the results with Matplotlib.",
    ],
    built: [
      "Python application logic",
      "Database integration",
      "Matplotlib charts",
    ],
    tech: ["Python", "Database integration", "Matplotlib", "Data visualisation"],
    development:
      "A deliberately focused academic build that shows the whole path from stored data to visual output.",
    challenges: [
      "Getting data out of the database in the shape plotting needs.",
      "Choosing chart types that communicate clearly.",
    ],
    learned: [
      "How Python and databases work together.",
      "The basics of representing information visually.",
      "Structuring a program into data, logic and presentation.",
    ],
    future: [
      "Interactive charts.",
      "A simple interface on top.",
      "More datasets and comparisons.",
    ],
    links: {},
    screenshots: [{ caption: "Chart output — add screenshot" }],
    honestNote: "A university project — shown as part of my learning, not as a production system.",
  },
  {
    id: "P04",
    name: "Trading Strategy & Backtesting",
    tagline: "Trading Systems & Market Research — structured thinking about gold (XAUUSD).",
    categories: ["fintech", "data"],
    status: ["RESEARCH", "EXPERIMENTAL"],
    art: "chart",
    overview:
      "A personal research project studying financial markets, focused on XAUUSD (gold). The interesting part is the structured thinking: defining rules, backtesting them, managing risk and reviewing performance honestly.",
    problem:
      "Discretionary trading is easy to rationalise after the fact. Without testing and review, it is hard to tell skill from luck.",
    idea:
      "Treat trading ideas as hypotheses — define the rules, test them, measure the results and review the behaviour behind them.",
    approach: [
      "Study market structure, liquidity concepts and Fair Value Gaps.",
      "Use higher-timeframe analysis for context.",
      "Define risk-to-reward models and position risk.",
      "Backtest ideas on TradingView and record the outcomes in a journal.",
      "Review performance and trading discipline regularly.",
    ],
    built: [
      "Strategy research notes",
      "Backtesting experiments",
      "Risk-management and risk-to-reward framework",
      "Journal-based performance review",
    ],
    tech: [
      "TradingView",
      "Backtesting",
      "Risk management",
      "Market structure",
      "Data analysis",
    ],
    development:
      "The work is iterative: observe, form a hypothesis, test it, review the result. The trading journal (P01) closes the loop by turning individual trades into data.",
    challenges: [
      "Avoiding hindsight bias when reading historical charts.",
      "Separating a few good results from a repeatable approach.",
      "Keeping discipline when the plan and emotions disagree.",
    ],
    learned: [
      "Risk management matters more than any single entry idea.",
      "Testing and journalling beat relying on memory.",
      "Structured thinking transfers directly to engineering work.",
    ],
    future: [
      "Automate more of the backtesting in Python.",
      "Test on larger and more varied samples.",
      "Link analytics dashboards to the journal.",
    ],
    links: {},
    screenshots: [{ caption: "Chart study — add screenshot" }],
    honestNote:
      "Personal research and learning only. Not financial advice, and no performance claims are made on this site.",
  },
  {
    id: "P05",
    name: "Fragrance Brand — Nepal",
    tagline: "A fragrance company concept for Nepal, researched end to end.",
    categories: ["business", "web", "creative"],
    status: ["RESEARCH", "CONCEPT"],
    art: "brand",
    overview:
      "One of my larger entrepreneurial projects: a business-strategy and product-research effort exploring how a fragrance company could be built in Nepal — positioning, pricing, branding, supply and a web presence. It is a research and concept-development project; no company is operating.",
    problem:
      "Starting a consumer brand means answering many questions at once: who it's for, what it costs to make, where it can be made and how it should look and feel.",
    idea:
      "Build on existing odour-control and fragrance-release technologies, paired with a clear brand and a considered price ladder, rather than trying to invent new chemistry.",
    approach: [
      "Define product positioning and customer segments.",
      "Explore pricing tiers — NPR 1,500, NPR 2,500 and NPR 4,000 — against positioning and fragrance category.",
      "Research suppliers and contract manufacturing.",
      "Consider Nepal–India supply logistics.",
      "Study existing technologies and companies such as Symrise, NeoFresh and Symcaps / Incaps.",
      "Sketch brand identity, an e-commerce concept and investment planning.",
    ],
    built: [
      "Positioning and pricing research",
      "Supplier and contract-manufacturing research",
      "Odour-control and fragrance-release technology research",
      "Brand identity direction",
      "E-commerce and website concepts",
      "Investment planning outline",
    ],
    tech: [
      "Business strategy",
      "Product research",
      "Branding",
      "UI/UX",
      "Web development",
      "Supplier research",
    ],
    development:
      "Research-driven: each decision — price, product type, supplier route — was weighed against the others. The website track is documented separately as P06.",
    challenges: [
      "Balancing premium positioning with local price sensitivity.",
      "Understanding what is realistic with contract manufacturers.",
      "Navigating cross-border supply considerations.",
    ],
    learned: [
      "Technology and business decisions are tightly linked.",
      "How to research an industry I'm new to.",
      "A good concept stays honest about what is validated and what isn't.",
    ],
    future: [
      "Validate demand with real customers.",
      "Pin down manufacturing partners and costs.",
      "Prototype a first product line.",
      "Turn the website concept into a live storefront (P06).",
    ],
    links: {},
    screenshots: [{ caption: "Brand board — add image" }],
    honestNote: "Status: Research / Concept Development. This is not an operating company.",
  },
  {
    id: "P06",
    name: "Fragrance Website",
    tagline: "A product-first website design, and the path to a full-stack build.",
    categories: ["web", "business", "creative"],
    status: ["EXPERIMENTAL"],
    art: "web",
    overview:
      "The web side of the fragrance concept: designing a perfume website and exploring how to turn that design into a complete front-end and back-end application.",
    problem:
      "A fragrance is sold on feeling. A website has to communicate that without letting anyone smell it — while still working as a store.",
    idea:
      "Let the brand drive the interface: refined product presentation, a consistent visual language and an e-commerce structure behind it.",
    approach: [
      "Design the UI and product presentation first.",
      "Keep the brand consistent across pages and components.",
      "Define the front-end / back-end split: catalogue, cart, orders.",
      "Plan the architecture before building it.",
    ],
    built: [
      "UI design",
      "Product presentation layouts",
      "E-commerce interface concepts",
      "A brand-consistent visual system",
      "Front-end / back-end architecture thinking",
    ],
    tech: ["UI/UX design", "Front-end development", "Back-end concepts", "E-commerce"],
    development:
      "Design came first, with architecture planned alongside: which parts are presentation, and which need a server, a database and secure handling of customers and orders.",
    challenges: [
      "Conveying a sensory product visually.",
      "Keeping the design consistent as pages multiply.",
      "Deciding what belongs on the front end versus the back end.",
    ],
    learned: [
      "How brand and interface design reinforce each other.",
      "What an e-commerce site needs behind the screen.",
      "Why security matters when customers and payments are involved.",
    ],
    future: [
      "Build the back end: catalogue, cart and checkout.",
      "Add payment options suited to Nepal.",
      "Security review of accounts and payments.",
      "Performance and SEO tuning.",
    ],
    links: {},
    screenshots: [
      { caption: "Landing page — add screenshot" },
      { caption: "Product page — add screenshot" },
    ],
  },
  {
    id: "P07",
    name: "Nepalese Heritage Blueprints",
    tagline: "Nepalese architecture and culture, documented as technical drawings.",
    categories: ["creative"],
    status: ["EXPERIMENTAL"],
    art: "blueprint",
    overview:
      "A creative-technology experiment documenting Nepalese traditional architecture, cultural objects and traditional elements in a blueprint style — technical illustration, exploded diagrams and architectural documentation.",
    problem:
      "Cultural heritage is often admired but rarely documented in a way that shows how it is structured and made.",
    idea:
      "Borrow the language of engineering drawings — plans, sections and exploded views — to explain traditional forms.",
    approach: [
      "Choose a structure or object and study its parts.",
      "Draw it in a consistent blueprint style.",
      "Use exploded diagrams to show how pieces fit together.",
      "Add annotations that make the documentation readable.",
    ],
    built: [
      "Blueprint-style illustrations",
      "Exploded diagrams",
      "Architectural documentation",
      "A visual system for technical drawings",
    ],
    tech: ["Technical illustration", "Documentation design", "Visual communication"],
    development:
      "This project is about presentation as much as accuracy — a consistent visual system so different subjects read as one documented collection.",
    challenges: [
      "Representing intricate traditional detail clearly.",
      "Balancing technical accuracy with visual appeal.",
    ],
    learned: [
      "Documentation is a design problem.",
      "The conventions of technical drawing.",
      "Technology can serve cultural preservation through visual design.",
    ],
    future: [
      "Cover more structures and objects.",
      "Interactive exploded views on the web.",
      "Publish as an open visual reference.",
    ],
    links: {},
    screenshots: [{ caption: "Blueprint sheet — add image" }],
    honestNote: "A creative technology and design experiment — not a cybersecurity project.",
  },
];

export const fieldsExplored = new Set(projects.flatMap((p) => p.categories)).size;
