"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { cn, isSet } from "@/lib/utils";
import ProjectArt from "./ProjectArt";
import StatusBadge from "./StatusBadge";

const SECTIONS = [
  "Overview",
  "Problem",
  "Approach",
  "Technology",
  "Development",
  "Challenges",
  "What I Learned",
  "Future Improvements",
];

function Block({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={`cs-${n}`} data-cs={n} className="scroll-mt-6 border-t border-white/[0.07] py-9 first:border-t-0 first:pt-2">
      <h3 className="mono-label mb-4 flex items-center gap-3">
        <span className="text-accent">{String(n).padStart(2, "0")}</span>
        <span aria-hidden="true">—</span>
        <span className="text-white/80">{title}</span>
      </h3>
      {children}
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-base leading-relaxed text-muted">
          <span aria-hidden="true" className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-accent" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function Content({ p }: { p: Project }) {
  return (
    <>
      <div className="relative aspect-[8/5] max-h-72 w-full overflow-hidden rounded-2xl border border-white/10 bg-ink-800 sm:aspect-[16/7] sm:max-h-none">
        <ProjectArt art={p.art} />
        <span aria-hidden="true" className="absolute right-4 top-3 font-display text-6xl font-bold tracking-tighter text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.18)]">
          {p.id}
        </span>
      </div>

      <div className="mt-8">
        <p className="mono-label">{p.categories.join(" · ")}</p>
        <h2 id="cs-title" className="mt-3 text-balance font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
          {p.name}
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-muted">{p.tagline}</p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {p.status.map((s) => (
            <StatusBadge key={s} status={s} />
          ))}
        </div>
      </div>

      <div className="mt-10">
        <Block n={1} title="Overview">
          <p className="text-lg leading-relaxed text-white/90">{p.overview}</p>
          {p.honestNote && (
            <p className="mt-5 rounded-xl border border-amber-300/20 bg-amber-300/[0.05] px-4 py-3 text-sm text-amber-100/90">
              {p.honestNote}
            </p>
          )}
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs uppercase tracking-[0.14em]">
            <span className="flex items-center gap-2 text-dim">
              GITHUB:{" "}
              {isSet(p.links.github) ? (
                <a href={p.links.github} target="_blank" rel="noopener noreferrer" className="link-u inline-flex items-center gap-1 text-accent">
                  OPEN <ArrowUpRight className="h-3 w-3" />
                </a>
              ) : (
                <span>not published yet</span>
              )}
            </span>
            <span className="flex items-center gap-2 text-dim">
              LIVE DEMO:{" "}
              {isSet(p.links.demo) ? (
                <a href={p.links.demo} target="_blank" rel="noopener noreferrer" className="link-u inline-flex items-center gap-1 text-accent">
                  OPEN <ArrowUpRight className="h-3 w-3" />
                </a>
              ) : (
                <span>n/a</span>
              )}
            </span>
          </div>
        </Block>

        <Block n={2} title="Problem">
          <p className="text-base leading-relaxed text-muted">{p.problem}</p>
        </Block>

        <Block n={3} title="Approach">
          <p className="mb-5 text-base leading-relaxed text-white/90">{p.idea}</p>
          <List items={p.approach} />
        </Block>

        <Block n={4} title="Technology">
          <div className="flex flex-wrap gap-2">
            {p.tech.map((t) => (
              <span key={t} className="glass rounded-full px-3.5 py-1.5 text-sm text-white/90">
                {t}
              </span>
            ))}
          </div>
          <p className="mono-label mb-3 mt-8">What I built / explored</p>
          <List items={p.built} />
        </Block>

        <Block n={5} title="Development">
          <p className="mb-6 text-base leading-relaxed text-muted">{p.development}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {p.screenshots.map((s) => (
              <figure key={s.caption} className="overflow-hidden rounded-xl border border-white/10 bg-ink-800">
                {s.src ? (
                  <div className="relative aspect-[16/10]">
                    <Image src={s.src} alt={s.caption} fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover" loading="lazy" />
                  </div>
                ) : (
                  <div className="grid aspect-[16/10] place-items-center border-b border-dashed border-white/10 bg-[repeating-linear-gradient(45deg,rgb(255_255_255/0.02)_0_8px,transparent_8px_16px)]">
                    <span className="mono-label px-4 text-center">Screenshot placeholder</span>
                  </div>
                )}
                <figcaption className="px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-dim">
                  {s.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </Block>

        <Block n={6} title="Challenges">
          <List items={p.challenges} />
        </Block>
        <Block n={7} title="What I Learned">
          <List items={p.learned} />
        </Block>
        <Block n={8} title="Future Improvements">
          <List items={p.future} />
        </Block>
      </div>
    </>
  );
}

export default function ProjectModal({
  activeId,
  onClose,
  onNavigate,
}: {
  activeId: string | null;
  onClose: () => void;
  onNavigate: (id: string) => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const prevIdx = useRef(0);
  const [dir, setDir] = useState(1);
  const [section, setSection] = useState(1);

  const idx = projects.findIndex((p) => p.id === activeId);
  const project = idx >= 0 ? projects[idx] : null;
  const open = !!project;

  const go = useCallback(
    (delta: number) => {
      if (idx < 0) return;
      const next = (idx + delta + projects.length) % projects.length;
      setDir(delta);
      onNavigate(projects[next].id);
    },
    [idx, onNavigate],
  );

  // remember direction for animation
  useEffect(() => {
    if (idx >= 0) prevIdx.current = idx;
  }, [idx]);

  // scroll lock, focus management, keyboard
  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight" && !(e.target instanceof HTMLInputElement)) go(1);
      else if (e.key === "ArrowLeft" && !(e.target instanceof HTMLInputElement)) go(-1);
      else if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])',
        );
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      lastFocus.current?.focus?.();
    };
  }, [open, onClose, go]);

  // reset scroll + section index on project change
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
    setSection(1);
  }, [activeId]);

  // scroll-spy for the side index
  useEffect(() => {
    const root = scrollRef.current;
    if (!root || !open) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setSection(Number((e.target as HTMLElement).dataset.cs));
        });
      },
      { root, rootMargin: "-10% 0px -75% 0px" },
    );
    const t = setTimeout(() => root.querySelectorAll("[data-cs]").forEach((el) => io.observe(el)), 400);
    return () => {
      clearTimeout(t);
      io.disconnect();
    };
  }, [activeId, open]);

  const jump = (n: number) => {
    scrollRef.current?.querySelector(`#cs-${n}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="modal"
          className="fixed inset-0 z-[120] flex items-stretch justify-center p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            aria-hidden="true"
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cs-title"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex w-full max-w-6xl flex-col overflow-hidden border border-white/10 bg-ink-900 shadow-2xl sm:rounded-3xl"
          >
            {/* top bar */}
            <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-3 sm:px-6">
              <div className="mono-label flex items-center gap-3">
                <span className="text-accent">{project.id}</span>
                <span aria-hidden="true" className="hidden h-px w-6 bg-white/15 sm:block" />
                <span className="hidden sm:block">CASE STUDY</span>
                <span className="text-dim">
                  {idx + 1}/{projects.length}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous project"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-muted transition-colors hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next project"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-muted transition-colors hover:text-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close case study"
                  className="ml-1 grid h-9 w-9 place-items-center rounded-full bg-white text-ink-950 transition-colors hover:bg-accent"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex min-h-0 flex-1">
              <div ref={scrollRef} className="min-w-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-10 sm:py-8">
                <AnimatePresence mode="wait" custom={dir} initial={false}>
                  <motion.div
                    key={project.id}
                    custom={dir}
                    initial={{ opacity: 0, x: dir * 48, filter: "blur(8px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: dir * -48, filter: "blur(8px)" }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                  >
                    <Content p={project} />
                  </motion.div>
                </AnimatePresence>
              </div>

              <nav aria-label="Case study sections" className="hidden w-56 shrink-0 border-l border-white/[0.07] p-6 lg:block">
                <p className="mono-label mb-4">Index</p>
                <ol className="space-y-1">
                  {SECTIONS.map((s, i) => (
                    <li key={s}>
                      <button
                        type="button"
                        onClick={() => jump(i + 1)}
                        aria-current={section === i + 1 ? "true" : undefined}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm transition-colors",
                          section === i + 1 ? "bg-white/[0.05] text-white" : "text-dim hover:text-white",
                        )}
                      >
                        <span className={cn("font-mono text-xs", section === i + 1 && "text-accent")}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {s}
                      </button>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
