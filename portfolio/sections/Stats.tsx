"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { projects, fieldsExplored } from "@/data/projects";
import { uniqueSkillCount } from "@/data/skills";
import { exploring } from "@/data/explore";
import { systemStatus } from "@/data/portfolioData";
import { DEGREE_YEARS, studyYear } from "@/lib/utils";
import { useCountUp } from "@/hooks/animations";
import SectionHeader from "@/components/SectionHeader";
import SpotlightCard from "@/components/SpotlightCard";
import { Reveal } from "@/components/Reveal";

function Tile({
  label,
  value,
  prefix = "",
  suffix = "",
  sub,
  active,
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  sub: string;
  active: boolean;
}) {
  const n = useCountUp(value, active);
  return (
    <SpotlightCard className="h-full p-6">
      <p className="mono-label">{label}</p>
      <p className="mt-6 font-display text-6xl font-bold tracking-tighter sm:text-7xl" aria-label={`${prefix}${value}${suffix}`}>
        <span aria-hidden="true">
          {prefix}
          {String(n).padStart(2, "0")}
          {suffix}
        </span>
      </p>
      <p className="mt-3 text-sm text-dim">{sub}</p>
    </SpotlightCard>
  );
}

/** Every number here is derived from the site's own data files. */
export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [year, setYear] = useState(1);
  useEffect(() => setYear(studyYear()), []);

  return (
    <section id="stats" data-nav="journey" className="section-y border-t border-white/[0.05]">
      <div className="container-x">
        <SectionHeader
          index="09"
          label="System stats"
          title="The numbers, straight from the data."
          kicker="Nothing here is invented — no commit counts, no certifications. These are counted from the same files that power this site."
        />
        <div ref={ref} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Reveal><Tile label="PROJECTS" value={projects.length} sub="documented on this site" active={inView} /></Reveal>
          <Reveal delay={0.06}><Tile label="FIELDS EXPLORED" value={fieldsExplored} sub="across the project categories" active={inView} /></Reveal>
          <Reveal delay={0.12}><Tile label="CURRENT YEAR" value={year} prefix="Y" sub={`of ${DEGREE_YEARS} · Bachelor's, Cybersecurity`} active={inView} /></Reveal>
          <Reveal delay={0.18}><Tile label="TECHNOLOGIES" value={uniqueSkillCount} sub="skills, tools & concepts listed" active={inView} /></Reveal>
          <Reveal delay={0.24}><Tile label="CURRENTLY LEARNING" value={exploring.length} sub="topics on the workbench" active={inView} /></Reveal>
        </div>

        <Reveal delay={0.1}>
          <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] sm:grid-cols-5">
            {systemStatus.map((s) => (
              <div key={s.k} className="bg-ink-900 px-5 py-4">
                <dt className="mono-label">{s.k}</dt>
                <dd className="mt-1 font-mono text-sm text-white">{s.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
