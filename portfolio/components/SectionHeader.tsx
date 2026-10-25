"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { Reveal, RevealWords } from "./Reveal";
import { useScramble } from "@/hooks/animations";

export default function SectionHeader({
  index,
  label,
  title,
  kicker,
}: {
  index: string;
  label: string;
  title: string;
  kicker?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const num = useScramble(index, inView, 600);
  const lab = useScramble(label, inView, 900);

  return (
    <div ref={ref} className="mb-12 sm:mb-16">
      <div className="mono-label flex items-center gap-3">
        <span className="text-accent">[{num}]</span>
        <span aria-hidden="true" className="h-px w-10 bg-white/15" />
        <span>{lab}</span>
      </div>
      <h2 className="mt-5 max-w-4xl text-balance font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
        <RevealWords text={title} />
      </h2>
      {kicker && (
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            {kicker}
          </p>
        </Reveal>
      )}
    </div>
  );
}
