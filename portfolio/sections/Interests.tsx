"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  Code2,
  Palette,
  Rocket,
  Shield,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { interests, type Interest } from "@/data/portfolioData";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import SectionHeader from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";

const ICONS: Record<Interest["icon"], LucideIcon> = {
  shield: Shield,
  code: Code2,
  chart: BarChart3,
  trend: TrendingUp,
  rocket: Rocket,
  palette: Palette,
};

const R = 38; // orbit radius in % of the square container

function pos(i: number, n: number) {
  const a = ((-90 + (360 / n) * i) * Math.PI) / 180;
  return { x: 50 + R * Math.cos(a), y: 50 + R * Math.sin(a) };
}

function openProject(id: string) {
  window.dispatchEvent(new CustomEvent("open-project", { detail: id }));
}

export default function Interests() {
  const [active, setActive] = useState(0);
  const cur = interests[active];

  return (
    <section id="focus" data-nav="about" className="section-y border-t border-white/[0.05]">
      <div className="container-x">
        <SectionHeader
          index="03"
          label="What I work with"
          title="Six sides of the same curiosity."
          kicker="Hover, tap or focus a node. The breadth is intentional: each area feeds the others."
        />

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Orbit */}
          <Reveal>
            <div className="relative mx-auto aspect-square w-full max-w-[540px]">
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
                <circle cx="50" cy="50" r={R} fill="none" stroke="rgb(255 255 255 / 0.08)" />
                <circle cx="50" cy="50" r={R - 14} fill="none" stroke="rgb(255 255 255 / 0.05)" strokeDasharray="0.6 1.6" />
                <g className="orbit-spin">
                  <circle cx="50" cy="50" r={R + 7} fill="none" stroke="rgb(var(--accent) / 0.25)" strokeDasharray="1 3" />
                  <circle cx="50" cy={50 - R - 7} r="0.9" fill="rgb(var(--accent))" />
                </g>
                {interests.map((_, i) => {
                  const p = pos(i, interests.length);
                  return (
                    <line
                      key={i}
                      x1="50"
                      y1="50"
                      x2={p.x}
                      y2={p.y}
                      stroke={i === active ? "rgb(var(--accent) / 0.7)" : "rgb(255 255 255 / 0.07)"}
                      strokeWidth={i === active ? 0.35 : 0.2}
                      style={{ transition: "stroke .3s" }}
                    />
                  );
                })}
              </svg>

              <div className="absolute left-1/2 top-1/2 grid h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-ink-900 text-center">
                <span className="font-display text-sm font-bold leading-tight tracking-tight sm:text-lg">
                  AGAMAN
                  <span className="mono-label mt-1 block text-[0.5rem] sm:text-[0.6rem]">builder</span>
                </span>
              </div>

              {interests.map((it, i) => {
                const p = pos(i, interests.length);
                const Icon = ICONS[it.icon];
                const on = i === active;
                return (
                  <button
                    key={it.id}
                    type="button"
                    onPointerEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    aria-label={it.title}
                    data-cursor="EXPLORE"
                    className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  >
                    <motion.span
                      animate={{ scale: on ? 1.18 : 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                      className={cn(
                        "grid h-12 w-12 place-items-center rounded-full border transition-colors sm:h-16 sm:w-16",
                        on
                          ? "border-accent bg-accent/15 text-accent shadow-[0_0_40px_-6px_rgb(var(--accent)/0.6)]"
                          : "border-white/12 bg-ink-800 text-muted group-hover:text-white",
                      )}
                    >
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </motion.span>
                    <span
                      className={cn(
                        "hidden whitespace-nowrap font-mono text-[0.6rem] uppercase tracking-[0.14em] transition-colors sm:block",
                        on ? "text-white" : "text-dim",
                      )}
                    >
                      {it.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Detail panel */}
          <div className="min-h-[22rem]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={cur.id}
                initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
              >
                <p className="mono-label text-accent">
                  0{active + 1} / 0{interests.length}
                </p>
                <h3 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">{cur.title}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {cur.verbs.map((v, i) => (
                    <motion.span
                      key={v}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 * i + 0.1 }}
                      className="rounded-full border border-accent/30 bg-accent/[0.07] px-4 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-accent"
                    >
                      {v}
                    </motion.span>
                  ))}
                </div>
                <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted">{cur.blurb}</p>

                <div className="mt-8">
                  <p className="mono-label mb-3">Related</p>
                  {cur.projects.length ? (
                    <ul className="flex flex-wrap gap-2">
                      {cur.projects.map((code) => {
                        const p = projects.find((x) => x.id === code);
                        if (!p) return null;
                        return (
                          <li key={code}>
                            <button
                              type="button"
                              data-cursor="OPEN"
                              onClick={() => openProject(code)}
                              className="glass rounded-full px-4 py-2 text-sm text-white/90 transition-colors hover:border-accent/50 hover:text-accent"
                            >
                              <span className="mr-2 font-mono text-xs text-dim">{code}</span>
                              {p.name}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <a href="#lab" className="link-u text-sm text-accent">
                      See what I'm learning in the Cyber Lab →
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
