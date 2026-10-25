"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import ProjectArt from "./ProjectArt";
import StatusBadge from "./StatusBadge";

export default function ProjectShowcase({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (id: string) => void;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const flip = index % 2 === 1;

  // tilt
  const rx = useSpring(useMotionValue(0), { stiffness: 140, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 140, damping: 18 });
  const onMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (reduce || e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 9);
    rx.set(-py * 7);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  // slight scale while scrolling
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [1, 1, 1] : [1.1, 1, 1.1]);

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14"
      aria-labelledby={`proj-${project.id}`}
    >
      <div className={cn("lg:col-span-7", flip && "lg:order-2")} style={{ perspective: 1100 }}>
        <motion.button
          type="button"
          onClick={() => onOpen(project.id)}
          onPointerMove={onMove}
          onPointerLeave={reset}
          data-cursor="VIEW"
          aria-label={`Open case study: ${project.name}`}
          style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
          className="group relative block aspect-[8/5] w-full overflow-hidden rounded-2xl border border-white/10 bg-ink-900 text-left transition-shadow duration-500 hover:shadow-[0_30px_80px_-30px_rgb(var(--accent)/0.35)]"
        >
          <motion.div className="absolute inset-0" style={{ scale }}>
            <ProjectArt art={project.art} />
          </motion.div>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent"
          />
          <span
            aria-hidden="true"
            className="absolute right-4 top-4 font-display text-6xl font-bold leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.18)] sm:text-7xl"
          >
            {project.id}
          </span>
          <span className="absolute bottom-4 left-4 flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            Open case study <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
          {/* scan line */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-1/3 animate-scan bg-gradient-to-b from-transparent via-accent/[0.06] to-transparent"
          />
        </motion.button>
      </div>

      <div className={cn("lg:col-span-5", flip && "lg:order-1")}>
        <p className="mono-label flex items-center gap-3">
          <span className="text-accent">{project.id}</span>
          <span aria-hidden="true" className="h-px w-8 bg-white/15" />
          <span>{project.categories.join(" · ")}</span>
        </p>
        <h3 id={`proj-${project.id}`} className="mt-4 text-balance font-display text-3xl leading-[1.08] tracking-tight sm:text-4xl">
          {project.name}
        </h3>
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">
          {project.tagline}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.status.map((s) => (
            <StatusBadge key={s} status={s} />
          ))}
        </div>

        <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-dim">
          {project.tech.slice(0, 5).map((t) => (
            <li key={t} className="flex items-center gap-2">
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent/60" />
              {t}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => onOpen(project.id)}
          data-cursor="VIEW"
          className="link-u mt-8 inline-flex items-center gap-2 text-sm font-medium text-white hover:text-accent"
        >
          Read the case study <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </motion.article>
  );
}
