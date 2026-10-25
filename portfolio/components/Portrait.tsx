"use client";

import { useState } from "react";
import { profile } from "@/data/portfolioData";

/**
 * Profile photo with technical corner brackets. Renders nothing if the image
 * file is missing, so the site never shows a broken-image icon.
 */
export default function Portrait() {
  const [failed, setFailed] = useState(false);
  if (failed || !profile.photo) return null;

  return (
    <figure className="relative mx-auto w-full max-w-[22rem] lg:max-w-none">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-ink-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={profile.photo}
          alt={`Portrait of ${profile.name}`}
          width={800}
          height={1000}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-top"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-1/3 animate-scan bg-gradient-to-b from-transparent via-accent/[0.07] to-transparent"
        />
        {(["left-3 top-3 border-l border-t", "right-3 top-3 border-r border-t", "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"] as const).map((c) => (
          <span key={c} aria-hidden="true" className={`absolute h-4 w-4 border-accent/70 ${c}`} />
        ))}
        <figcaption className="absolute bottom-4 left-5 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white/80">
          ID: AGAMAN THAPA · {profile.locationShort}
        </figcaption>
      </div>
    </figure>
  );
}
