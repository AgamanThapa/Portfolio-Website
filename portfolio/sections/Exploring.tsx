"use client";

import { exploring } from "@/data/explore";
import SectionHeader from "@/components/SectionHeader";
import SpotlightCard from "@/components/SpotlightCard";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

const PHASE_BARS = { FUNDAMENTALS: 2, BUILDING: 4, EXPERIMENTING: 3 } as const;

function Signal({ level, seed }: { level: number; seed: number }) {
  return (
    <span aria-hidden="true" className="flex h-5 items-end gap-[3px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "w-[3px] origin-bottom rounded-full",
            i < level ? "h-full animate-eq bg-accent" : "h-1/3 bg-white/10",
          )}
          style={{ animationDelay: `${((seed + i) % 5) * 0.18}s` }}
        />
      ))}
    </span>
  );
}

export default function Exploring() {
  return (
    <section id="exploring" data-nav="journey" className="section-y border-t border-white/[0.05]">
      <div className="container-x">
        <SectionHeader
          index="08"
          label="Currently exploring"
          title="What's on the workbench right now."
          kicker="Edit data/explore.ts to update these cards. Phases describe where I am with each topic — not how good I am at it."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {exploring.map((e, i) => (
            <Reveal key={e.id} delay={(i % 3) * 0.07}>
              <SpotlightCard className="h-full p-6">
                <div className="flex items-center justify-between">
                  <span className="mono-label">0{i + 1}</span>
                  <Signal level={PHASE_BARS[e.phase]} seed={i} />
                </div>
                <h3 className="mt-8 font-display text-2xl tracking-tight">{e.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{e.line}</p>
                <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/30 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-accent">
                  {e.phase}
                </p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
