"use client";

import { useEffect, useState } from "react";
import { aboutCopy, education, profile } from "@/data/portfolioData";
import { ordinal, studyYear, DEGREE_YEARS } from "@/lib/utils";
import SectionHeader from "@/components/SectionHeader";
import { Reveal, RevealWords } from "@/components/Reveal";
import SpotlightCard from "@/components/SpotlightCard";
import Portrait from "@/components/Portrait";

export default function About() {
  const edu = education[0];
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => setYear(studyYear()), []);

  const rows: [string, string][] = [
    ["NAME", profile.name],
    ["ROLE", "Cybersecurity student · developer · builder"],
    ["INSTITUTION", edu.school],
    ["PROGRAMME", `${edu.degree} — ${edu.field}`],
    ["PERIOD", `${edu.start} – ${edu.end}`],
    ["PROGRESS", year ? `${ordinal(year)} year of ${DEGREE_YEARS}` : "—"],
    ["LOCATION", profile.location],
    ["STATUS", "LEARNING"],
  ];

  return (
    <section id="about" data-nav="about" className="section-y">
      <div className="container-x">
        <SectionHeader index="02" label="Who I am" title="A student who builds things." />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="font-display text-2xl leading-snug tracking-tight text-white sm:text-3xl">
              <RevealWords text={aboutCopy.lead} />
            </p>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted sm:text-lg">
              {aboutCopy.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.05 * i}>
                  <p className="text-pretty">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="space-y-4 lg:col-span-5" delay={0.1}>
            <Portrait />
            <SpotlightCard className="p-0">
              <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-3">
                <span className="mono-label">identity.json</span>
                <span className="flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-signal">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal" /> verified by curiosity
                </span>
              </div>
              <dl className="divide-y divide-white/[0.05]">
                {rows.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-4 px-5 py-3.5 sm:grid-cols-[9rem_1fr]">
                    <dt className="mono-label pt-0.5">{k}</dt>
                    <dd className="text-sm text-white/90" suppressHydrationWarning>{v}</dd>
                  </div>
                ))}
              </dl>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
