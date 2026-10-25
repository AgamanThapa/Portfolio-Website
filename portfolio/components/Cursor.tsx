"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Subtle custom cursor for fine-pointer devices only. Elements opt in to a
 * label with data-cursor="VIEW" | "OPEN" | "CONNECT" …
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [interactive, setInteractive] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { stiffness: 900, damping: 50, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 900, damping: 50, mass: 0.2 });
  const ringX = useSpring(x, { stiffness: 190, damping: 24, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 190, damping: 24, mass: 0.5 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as Element | null;
      const tagged = t?.closest?.("[data-cursor]") as HTMLElement | null;
      setLabel(tagged?.dataset.cursor ?? null);
      setInteractive(
        !!t?.closest?.("a,button,[role=button],[role=tab],input,textarea,select,[data-cursor]"),
      );
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = label ? 84 : interactive ? 52 : 34;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[200]">
      <motion.div
        className="fixed left-0 top-0"
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border border-accent/60 backdrop-blur-[2px]"
          animate={{
            width: size,
            height: size,
            backgroundColor: label ? "rgb(var(--accent) / 0.14)" : "rgb(var(--accent) / 0)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
        >
          {label && (
            <span className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.18em] text-white">
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>
      <motion.div
        className="fixed left-0 top-0"
        style={{ x: dotX, y: dotY, opacity: visible && !label ? 1 : 0 }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-accent" />
      </motion.div>
    </div>
  );
}
