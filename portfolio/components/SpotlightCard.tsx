"use client";

import type { HTMLAttributes, PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Glass card with a cursor-following glow (see .spotlight in globals.css). */
export default function SpotlightCard({
  children,
  className,
  ...rest
}: { children: ReactNode } & HTMLAttributes<HTMLDivElement>) {
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--sx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--sy", `${e.clientY - r.top}px`);
  };
  return (
    <div
      {...rest}
      onPointerMove={onMove}
      className={cn("spotlight glass relative overflow-hidden rounded-2xl", className)}
    >
      {children}
    </div>
  );
}
