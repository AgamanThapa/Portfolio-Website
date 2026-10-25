"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { philosophy } from "@/data/portfolioData";

function Word({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {word}
    </motion.span>
  );
}

export default function Philosophy() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const words = philosophy.quote.split(" ");

  return (
    <section aria-label="Philosophy" className="border-t border-white/[0.05] py-28 sm:py-40">
      <div className="container-x">
        <p className="mono-label mb-8">// how I approach learning</p>
        <p
          ref={ref}
          className="max-w-5xl text-balance font-display text-3xl leading-[1.2] tracking-tight sm:text-5xl md:text-6xl"
        >
          <span className="sr-only">{philosophy.quote}</span>
          <span aria-hidden="true">
            {reduce
              ? philosophy.quote
              : words.map((w, i) => (
                  <Word
                    key={i}
                    word={w}
                    progress={scrollYProgress}
                    range={[i / words.length, Math.min(1, (i + 3) / words.length)]}
                  />
                ))}
          </span>
        </p>
        <p className="mt-12 flex flex-wrap gap-x-4 gap-y-2 font-mono text-sm uppercase tracking-[0.18em] text-accent">
          {philosophy.motif.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </p>
      </div>
    </section>
  );
}
