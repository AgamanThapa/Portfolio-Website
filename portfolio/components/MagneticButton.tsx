"use client";

import type { PointerEvent, ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  cursor?: string;
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  arrow?: boolean;
}

/** Button that leans slightly toward the pointer. */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  cursor,
  external,
  type = "button",
  disabled,
  className,
  arrow = true,
}: Props) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.22);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const classes = cn(
    "group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-tight transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60",
    variant === "primary"
      ? "bg-white text-ink-950 hover:bg-accent"
      : "glass text-white hover:border-accent/50 hover:text-accent",
    className,
  );

  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowUpRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="inline-block"
    >
      {href ? (
        <a
          href={href}
          className={classes}
          data-cursor={cursor}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          onClick={onClick}
        >
          {inner}
        </a>
      ) : (
        <button
          type={type}
          className={classes}
          data-cursor={cursor}
          onClick={onClick}
          disabled={disabled}
        >
          {inner}
        </button>
      )}
    </motion.div>
  );
}
