"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { categoryFilters, projects, type Category } from "@/data/projects";
import { cn } from "@/lib/utils";
import SectionHeader from "@/components/SectionHeader";
import ProjectShowcase from "@/components/ProjectShowcase";
import ProjectModal from "@/components/ProjectModal";

type Filter = "all" | Category;

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const [activeId, setActiveId] = useState<string | null>(null);

  const visible = projects.filter((p) => filter === "all" || p.categories.includes(filter));

  const close = useCallback(() => setActiveId(null), []);

  // Other sections (interest map, terminal) can open a case study by event.
  useEffect(() => {
    const onOpen = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (projects.some((p) => p.id === id)) setActiveId(id);
    };
    window.addEventListener("open-project", onOpen);
    return () => window.removeEventListener("open-project", onOpen);
  }, []);

  const count = (f: Filter) =>
    f === "all" ? projects.length : projects.filter((p) => p.categories.includes(f)).length;

  return (
    <section id="projects" data-nav="projects" className="section-y border-t border-white/[0.05]">
      <div className="container-x">
        <SectionHeader
          index="05"
          label="Featured projects"
          title="Things I've built, researched and explored."
          kicker="Each project is labelled with its real status — some are finished builds, some are academic work, and some are research or concepts."
        />

        <div role="group" aria-label="Filter projects by category" className="mb-14 flex flex-wrap gap-2">
          <LayoutGroup id="filters">
            {categoryFilters.map((f) => {
              const on = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "relative rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] transition-colors",
                    on ? "border-transparent text-ink-950" : "border-white/10 text-muted hover:border-white/25 hover:text-white",
                  )}
                >
                  {on && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-white"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">
                    {f.label}
                    <span className={cn("ml-2", on ? "text-ink-950/50" : "text-dim")}>{count(f.id)}</span>
                  </span>
                </button>
              );
            })}
          </LayoutGroup>
        </div>

        <div className="space-y-24 sm:space-y-32" aria-live="polite">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p, i) => (
              <ProjectShowcase key={p.id} project={p} index={i} onOpen={setActiveId} />
            ))}
          </AnimatePresence>

          {visible.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-8 sm:p-12"
            >
              <p className="mono-label text-accent">0 results</p>
              <h3 className="mt-3 font-display text-3xl tracking-tight">
                No published cybersecurity projects yet.
              </h3>
              <p className="mt-4 max-w-xl text-muted">
                Cybersecurity is my degree focus and I'm still building the fundamentals — that work
                lives in the Cyber Lab rather than being dressed up as a project.
              </p>
              <a href="#lab" className="link-u mt-6 inline-block text-accent">
                Go to the Cyber Lab →
              </a>
            </motion.div>
          )}
        </div>
      </div>

      <ProjectModal activeId={activeId} onClose={close} onNavigate={setActiveId} />
    </section>
  );
}
