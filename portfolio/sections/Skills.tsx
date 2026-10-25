"use client";

import { useState } from "react";
import {
  BarChart3,
  Brain,
  Code2,
  Database,
  Globe,
  Layers,
  Shield,
  TrendingUp,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { skillGroups, type SkillGroup } from "@/data/skills";
import { cn } from "@/lib/utils";
import SectionHeader from "@/components/SectionHeader";
import SpotlightCard from "@/components/SpotlightCard";
import { Reveal } from "@/components/Reveal";

const ICONS: Record<SkillGroup["icon"], LucideIcon> = {
  shield: Shield,
  code: Code2,
  layers: Layers,
  globe: Globe,
  database: Database,
  chart: BarChart3,
  brain: Brain,
  trend: TrendingUp,
  wrench: Wrench,
};

function Dot({ level }: { level: "working" | "learning" }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "h-1.5 w-1.5 shrink-0 rounded-full",
        level === "working" ? "bg-accent" : "border border-accent/70",
      )}
    />
  );
}

function GroupCard({ group, index }: { group: SkillGroup; index: number }) {
  const [hover, setHover] = useState<string | null>(null);
  const Icon = ICONS[group.icon];
  const detail = group.skills.find((s) => s.name === hover);

  return (
    <Reveal delay={(index % 3) * 0.07}>
      <SpotlightCard className="flex h-full flex-col p-6">
        <div className="flex items-start justify-between">
          <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-accent">
            <Icon className="h-5 w-5" />
          </span>
          <span className="font-mono text-xs text-dim">{String(group.skills.length).padStart(2, "0")}</span>
        </div>
        <h3 className="mt-5 font-display text-xl tracking-tight">{group.title}</h3>
        <p className="mt-1 text-sm text-dim">{group.blurb}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {group.skills.map((s) => (
            <li key={s.name}>
              <button
                type="button"
                onPointerEnter={() => setHover(s.name)}
                onPointerLeave={() => setHover(null)}
                onFocus={() => setHover(s.name)}
                onBlur={() => setHover(null)}
                onClick={() => setHover(s.name)}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-all duration-200",
                  hover === s.name
                    ? "border-accent/60 bg-accent/10 text-white"
                    : "border-white/10 text-muted hover:border-white/25",
                )}
              >
                <Dot level={s.level} />
                {s.name}
              </button>
            </li>
          ))}
        </ul>

        <p
          aria-live="polite"
          className="mt-auto min-h-[3.5rem] pt-5 font-mono text-xs leading-relaxed text-dim"
        >
          {detail ? (
            <>
              <span className="text-accent">{detail.level === "working" ? "WORKING WITH" : "LEARNING"} · </span>
              {detail.note}
            </>
          ) : (
            <span className="opacity-60">// hover a skill for context</span>
          )}
        </p>
      </SpotlightCard>
    </Reveal>
  );
}

export default function Skills() {
  return (
    <section id="skills" data-nav="skills" className="section-y border-t border-white/[0.05]">
      <div className="container-x">
        <SectionHeader
          index="04"
          label="Toolkit"
          title="What I use — and what I'm still learning."
          kicker="No percentage bars. Skills are grouped honestly by whether I'm actively working with them or still building the fundamentals."
        />

        <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.14em] text-dim">
          <span className="flex items-center gap-2"><Dot level="working" /> Working with</span>
          <span className="flex items-center gap-2"><Dot level="learning" /> Learning</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <GroupCard key={g.id} group={g} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
