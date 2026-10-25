# Design Brief — "Agaman's Digital Operating System"

## 1. Creative concept
The site is a personal operating system that boots, then lets the visitor explore a workspace: a hero that feels like a live network, a project "library" with real status labels, a Cyber Lab that is openly a *learning log*, and a terminal that actually runs commands.

The story is breadth with intent. One thread — **curiosity + building + experimentation + learning** — connects cybersecurity, software, data, markets, business and creative work. The recurring motif is **Learn. Build. Break. Understand. Improve.** (ticker, philosophy section, footer).

Honesty is a design feature: every project carries a status badge, skills are "working with" vs "learning" (no percentages), and stats are counted from the site's own data.

## 2. Colour system
| Token | Value | Use |
|---|---|---|
| `ink-950` | `#060708` | page background |
| `ink-900/800/700` | `#0b0d10 / #11141a / #181c23` | surfaces |
| `accent` | `94 220 255` (ice cyan) | single accent, via `--accent` |
| `signal` | `61 255 160` | status only (online, success) |
| `muted` / `dim` | `#a3aab8` / `#7b8494` | body / labels (AA on ink) |
| lines | `white / 8%` | hairlines, borders |

Status badges use soft tinted text (emerald, sky, violet, amber, blue, pink) at low opacity — never saturated blocks. Konami code swaps `--accent` to green.

## 3. Typography
- **Space Grotesk** — display / headings (tight tracking)
- **Inter** — body
- **JetBrains Mono** — labels, terminal, HUD readouts, section indices

## 4. Page structure
01 Hero → ticker → 02 Who I am → 03 What I work with (orbit) → 04 Toolkit → 05 Projects (+ case-study modal) → 06 Cyber Lab → 07 Journey → 08 Currently exploring → philosophy → 09 System stats → 10 Terminal → 11 Contact → footer.

## 5. Animation system
- Easing: `cubic-bezier(.22,1,.36,1)`; durations 0.3–0.9s; springs for cursor, magnets, tilt.
- Reveal on scroll (`Reveal`, `RevealWords`), scrambled section numbers, scroll-drawn timeline, scroll-linked word highlight, count-up stats.
- Hero: 2D canvas network (nodes, links, packets, cursor attraction) — paused offscreen/hidden tab, static for reduced motion.
- Everything respects `prefers-reduced-motion` (JS via `useReducedMotion`, CSS global override).
- No heavy 3D: Three.js was deliberately left out; the canvas is lighter and fits the concept.

## 6. Component architecture
```
app/            layout, page, api/contact, icon, opengraph-image
sections/       Hero, About, Interests, Skills, Projects, CyberLab, Journey,
                Exploring, Philosophy, Stats, TerminalSection, Contact
components/     Navbar, Cursor, BootSequence, NetworkCanvas, Terminal,
                ProjectShowcase, ProjectModal, ProjectArt, StatusBadge,
                SpotlightCard, MagneticButton, SocialLink, Reveal, SectionHeader …
data/           portfolioData, projects, skills, experience, explore, lab
hooks/ lib/     animations (scramble, count-up, boot), utils
```
All copy lives in `data/` — components are presentation only.

## 7. Project presentation strategy
Large alternating showcases (not identical cards): tilting art panel with scroll-scale, project ID, categories, status badge(s), headline tech, and a "Read the case study" action. Clicking opens an animated modal with the 8-part structure (Overview → Future Improvements), a section index, keyboard prev/next (←/→), focus trap and Esc to close. Art panels are original diagrammatic SVGs until real screenshots are added.
