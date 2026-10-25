"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const SCRAMBLE_CHARS = "01#/<>_-+*";

/** Scrambles text into place once `active` flips to true. */
export function useScramble(text: string, active: boolean, duration = 700) {
  const reduce = useReducedMotion();
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (!active || reduce) {
      setOut(text);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const reveal = Math.floor(p * text.length);
      setOut(
        text
          .split("")
          .map((c, i) =>
            i < reveal || c === " "
              ? c
              : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)],
          )
          .join(""),
      );
      if (p < 1) raf = requestAnimationFrame(tick);
      else setOut(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, text, duration, reduce]);

  return out;
}

/** Counts from 0 to `target` once `active` flips to true. */
export function useCountUp(target: number, active: boolean, duration = 1200) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (reduce) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration, reduce]);

  return value;
}

/** True once the boot sequence has finished (or was skipped). */
export function useBootDone() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (document.documentElement.dataset.boot === "done") {
      setDone(true);
      return;
    }
    const onDone = () => setDone(true);
    window.addEventListener("boot:done", onDone);
    return () => window.removeEventListener("boot:done", onDone);
  }, []);
  return done;
}
