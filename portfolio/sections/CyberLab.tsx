"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { labModules, type LabStatus } from "@/data/lab";
import { cn } from "@/lib/utils";
import SectionHeader from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";

const STATUS_STYLE: Record<LabStatus, string> = {
  LEARNING: "text-accent",
  EXPERIMENTING: "text-amber-300",
  EXPLORING: "text-violet-300",
};

/** Types lines out one character at a time (instant for reduced motion). */
function useTyped(lines: string[], resetKey: string) {
  const reduce = useReducedMotion();
  const full = useMemo(() => lines.join("\n"), [lines]);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (reduce) {
      setN(full.length);
      return;
    }
    setN(0);
    const id = setInterval(() => {
      setN((v) => {
        if (v >= full.length) {
          clearInterval(id);
          return v;
        }
        return v + 2;
      });
    }, 14);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey, full, reduce]);

  return { text: full.slice(0, n), done: n >= full.length };
}

export default function CyberLab() {
  const [activeId, setActiveId] = useState(labModules[0].id);
  const mod = labModules.find((m) => m.id === activeId) ?? labModules[0];

  const lines = useMemo(
    () => [
      `$ cat ${mod.file}`,
      "",
      ...mod.topics.map((t) => `  > ${t}`),
      "",
      `# ${mod.note}`,
      "",
      `status: [ ${mod.status} ]`,
    ],
    [mod],
  );
  const { text, done } = useTyped(lines, mod.id);

  return (
    <section id="lab" data-nav="lab" className="section-y border-t border-white/[0.05]">
      <div className="container-x">
        <SectionHeader
          index="06"
          label="Cyber Lab"
          title="What I'm actively learning."
          kicker="My degree is in Cybersecurity, and this is the honest version of where I am: a learning log, not a list of credentials."
        />

        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-900/80 shadow-[0_40px_120px_-40px_rgb(var(--accent)/0.2)] backdrop-blur-xl">
            {/* title bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] bg-ink-800/60 px-4 py-3">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                </div>
                <span className="font-mono text-xs text-dim">lab@agaman:~/learning</span>
              </div>
              <span className="rounded-full border border-amber-300/30 bg-amber-300/[0.07] px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-amber-200">
                Learning / Experimenting
              </span>
            </div>

            <div className="grid md:grid-cols-[17rem_1fr]">
              {/* module list */}
              <div role="tablist" aria-label="Lab modules" aria-orientation="vertical" className="flex gap-1 overflow-x-auto border-b border-white/[0.07] p-3 md:flex-col md:overflow-visible md:border-b-0 md:border-r">
                {labModules.map((m, i) => {
                  const on = m.id === activeId;
                  return (
                    <button
                      key={m.id}
                      role="tab"
                      id={`tab-${m.id}`}
                      aria-selected={on}
                      aria-controls="lab-panel"
                      tabIndex={on ? 0 : -1}
                      onClick={() => setActiveId(m.id)}
                      onKeyDown={(e) => {
                        const dirn = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
                        if (!dirn) return;
                        e.preventDefault();
                        const next = labModules[(i + dirn + labModules.length) % labModules.length];
                        setActiveId(next.id);
                        document.getElementById(`tab-${next.id}`)?.focus();
                      }}
                      className={cn(
                        "group flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-left font-mono text-sm transition-colors",
                        on ? "bg-accent/10 text-white" : "text-muted hover:bg-white/[0.04] hover:text-white",
                      )}
                    >
                      <span className={cn("text-xs", on ? "text-accent" : "text-dim")}>{String(i + 1).padStart(2, "0")}</span>
                      <span className="whitespace-nowrap">{m.title}</span>
                      <span aria-hidden="true" className={cn("ml-auto hidden h-1.5 w-1.5 rounded-full md:block", on ? "bg-accent" : "bg-white/15")} />
                    </button>
                  );
                })}
              </div>

              {/* output */}
              <div
                id="lab-panel"
                role="tabpanel"
                aria-labelledby={`tab-${mod.id}`}
                className="relative min-h-[22rem] overflow-hidden p-5 font-mono text-sm leading-7 sm:p-8"
              >
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgb(255_255_255/0.012)_0_1px,transparent_1px_3px)]" />
                <AnimatePresence mode="wait">
                  <motion.div key={mod.id} initial={{ opacity: 0.6 }} animate={{ opacity: 1 }} className="relative">
                    <pre className="whitespace-pre-wrap break-words font-mono text-[0.8125rem] text-white/85 sm:text-sm">
                      {text.split("\n").map((l, i) => (
                        <span key={i} className={cn("block min-h-[1.75rem]", l.startsWith("$") && "text-signal", l.startsWith("#") && "text-dim", l.startsWith("status") && STATUS_STYLE[mod.status])}>
                          {l}
                        </span>
                      ))}
                      <span aria-hidden="true" className={cn("inline-block h-4 w-2 translate-y-0.5 bg-accent", done ? "animate-blink" : "")} />
                    </pre>
                    <span className="sr-only">
                      {mod.title}: {mod.topics.join("; ")}. Status: {mod.status}.
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="border-t border-white/[0.07] bg-ink-800/40 px-5 py-3 font-mono text-[0.7rem] text-dim">
              // learning log — not a claim of expertise. Updated as I actually progress.
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
