"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { credentials, education } from "@/data/portfolioData";
import { experience, journey } from "@/data/experience";
import { projects } from "@/data/projects";
import { cn, isSet } from "@/lib/utils";
import SectionHeader from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import SpotlightCard from "@/components/SpotlightCard";

function openProject(id: string) {
  window.dispatchEvent(new CustomEvent("open-project", { detail: id }));
}

export default function Journey() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const edu = education[0];

  const credGroups = (
    [
      ["Certifications", credentials.certifications],
      ["Courses", credentials.courses],
      ["Languages", credentials.languages],
      ["Achievements", credentials.achievements],
    ] as const
  ).filter(([, items]) => items.length > 0);

  return (
    <section id="journey" data-nav="journey" className="section-y border-t border-white/[0.05]">
      <div className="container-x">
        <SectionHeader
          index="07"
          label="Journey"
          title="From first semester to the next project."
          kicker="Only the degree start has a fixed date. Everything after it is shown as a phase — the order things happened, not a made-up calendar."
        />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* education */}
          <Reveal className="lg:col-span-4">
            <SpotlightCard className="p-6 lg:sticky lg:top-28">
              <p className="mono-label text-accent">Education</p>
              <h3 className="mt-4 font-display text-2xl tracking-tight">{edu.school}</h3>
              <p className="mt-1 text-muted">
                {edu.degree} — {edu.field}
              </p>
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between gap-4 border-t border-white/[0.07] pt-3">
                  <dt className="text-dim">Location</dt>
                  <dd>{edu.location}</dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-white/[0.07] pt-3">
                  <dt className="text-dim">Period</dt>
                  <dd>
                    {edu.start} – {edu.end}
                  </dd>
                </div>
              </dl>
              {isSet(edu.linkedinWording) && (
                <p className="mt-5 border-t border-white/[0.07] pt-4 text-sm leading-relaxed text-muted">
                  {edu.linkedinWording}
                </p>
              )}

              {experience.length > 0 && (
                <div className="mt-6 border-t border-white/[0.07] pt-4">
                  <p className="mono-label mb-3">Experience</p>
                  <ul className="space-y-4">
                    {experience.map((x) => (
                      <li key={x.role + x.org}>
                        <p className="font-medium">{x.role}</p>
                        <p className="text-sm text-dim">
                          {x.org} · {x.period}
                        </p>
                        <p className="mt-1 text-sm text-muted">{x.summary}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {credGroups.map(([title, items]) => (
                <div key={title} className="mt-6 border-t border-white/[0.07] pt-4">
                  <p className="mono-label mb-3">{title}</p>
                  <ul className="space-y-1.5 text-sm text-muted">
                    {items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </SpotlightCard>
          </Reveal>

          {/* timeline */}
          <div className="relative lg:col-span-8">
            <div aria-hidden="true" className="absolute bottom-2 left-[0.6875rem] top-2 w-px bg-white/10" />
            <motion.div
              aria-hidden="true"
              className="absolute bottom-2 left-[0.6875rem] top-2 w-px origin-top bg-gradient-to-b from-accent to-accent/30"
              style={{ scaleY: reduce ? 1 : fill }}
            />
            <ol ref={ref} className="space-y-10">
              {journey.map((s, i) => (
                <li key={s.title} className="relative pl-10">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute left-0 top-1.5 grid h-6 w-6 place-items-center rounded-full border bg-ink-950",
                      s.when === "Now" ? "border-signal" : "border-accent/60",
                    )}
                  >
                    <span className={cn("h-2 w-2 rounded-full", s.when === "Now" ? "bg-signal" : "bg-accent")} />
                  </span>
                  <Reveal delay={0.04}>
                    <p className="mono-label flex flex-wrap items-center gap-x-3">
                      <span className="text-accent">{s.when ?? `PHASE ${String(i).padStart(2, "0")}`}</span>
                      <span>{s.phase}</span>
                    </p>
                    <h3 className="mt-2 font-display text-2xl tracking-tight sm:text-3xl">{s.title}</h3>
                    <p className="mt-2 max-w-xl text-pretty text-muted">{s.text}</p>
                    {s.projects && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {s.projects.map((code) => {
                          const p = projects.find((x) => x.id === code);
                          return (
                            <button
                              key={code}
                              type="button"
                              data-cursor="OPEN"
                              onClick={() => openProject(code)}
                              className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-muted transition-colors hover:border-accent/50 hover:text-accent"
                            >
                              {code} · {p?.name}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
