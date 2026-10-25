"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/** Console message + Konami code (toggles the cyber-green accent). */
export default function EasterEggs() {
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    console.log(
      "%cCurious enough to check the console? We should probably talk.",
      "color:#5ee7ff;font:600 14px ui-monospace,monospace;padding:6px 0",
    );
    console.log(
      "%c// try the terminal near the bottom of the page — `sudo hire agaman`",
      "color:#7b8494;font:12px ui-monospace,monospace",
    );

    let pos = 0;
    let timer: ReturnType<typeof setTimeout>;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === KONAMI[pos]) {
        pos += 1;
        if (pos === KONAMI.length) {
          pos = 0;
          const root = document.documentElement;
          const on = root.dataset.mode !== "green";
          if (on) root.dataset.mode = "green";
          else delete root.dataset.mode;
          setToast(on ? "ACCESS LEVEL: CURIOUS — green mode on" : "Back to cyan mode");
          clearTimeout(timer);
          timer = setTimeout(() => setToast(null), 2800);
        }
      } else {
        pos = key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[150] flex justify-center px-4">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            className="rounded-full border border-accent/40 bg-ink-900/90 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-accent backdrop-blur-xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
