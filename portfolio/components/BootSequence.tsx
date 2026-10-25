"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const LINES = [
  "Loading identity...",
  "Loading projects...",
  "Loading systems...",
  "Establishing secure connection...",
];

const STEP_MS = 260;
const KEY = "boot-seen";

function markDone() {
  document.documentElement.dataset.boot = "done";
  window.dispatchEvent(new Event("boot:done"));
}

/**
 * ~1.7s boot sequence, shown once per browser session. Click or press any key
 * to skip. Skipped entirely for reduced-motion users and returning visitors.
 */
export default function BootSequence() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = !!sessionStorage.getItem(KEY);
    } catch {
      /* storage unavailable: just play it */
    }
    if (reduce || seen) {
      setShow(false);
      markDone();
      return;
    }
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }

    document.body.style.overflow = "hidden";
    const timers: ReturnType<typeof setTimeout>[] = [];
    LINES.forEach((_, i) => timers.push(setTimeout(() => setStep(i + 1), STEP_MS * (i + 1))));
    timers.push(setTimeout(() => setStep(LINES.length + 1), STEP_MS * (LINES.length + 1)));
    timers.push(setTimeout(() => setShow(false), STEP_MS * (LINES.length + 1) + 650));

    const skip = () => setShow(false);
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("pointerdown", skip, { once: true });

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = "";
        markDone();
      }}
    >
      {show && (
        <motion.div
          key="boot"
          role="status"
          aria-label="Loading portfolio"
          className="boot fixed inset-0 z-[300] flex items-center justify-center bg-ink-950 px-6"
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="w-full max-w-md font-mono text-xs leading-relaxed text-muted sm:text-sm">
            <p className="text-accent">INITIALIZING PORTFOLIO...</p>
            <div className="mt-3 space-y-1">
              {LINES.map((l, i) => (
                <p
                  key={l}
                  className={step > i ? "opacity-100" : "opacity-0"}
                  style={{ transition: "opacity .2s" }}
                >
                  <span className="text-signal">✓</span> {l}
                </p>
              ))}
            </div>
            <div
              className={`mt-6 transition-opacity duration-300 ${
                step > LINES.length ? "opacity-100" : "opacity-0"
              }`}
            >
              <p className="text-signal">ACCESS GRANTED</p>
              <p className="mt-2 font-display text-3xl tracking-tight text-white sm:text-4xl">
                AGAMAN THAPA
              </p>
            </div>
            <div className="mt-8 h-px w-full overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: (STEP_MS * (LINES.length + 1)) / 1000, ease: "linear" }}
              />
            </div>
            <p className="mt-3 text-[0.65rem] uppercase tracking-[0.2em] text-dim">
              Press any key to skip
            </p>
          </div>
          <noscript>
            <style>{`.boot{display:none!important}`}</style>
          </noscript>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
