import { philosophy } from "@/data/portfolioData";

/** Recurring motif: Learn. Build. Break. Understand. Improve. */
export default function Ticker() {
  const row = (
    <div className="flex shrink-0 items-center">
      {philosophy.motif.map((w) => (
        <span key={w} className="flex items-center">
          <span className="px-6 font-display text-2xl tracking-tight text-white/80 sm:px-10 sm:text-4xl">
            {w}
          </span>
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent/70" />
        </span>
      ))}
    </div>
  );
  return (
    <div
      aria-label={philosophy.motif.join(" ")}
      role="img"
      className="group overflow-hidden border-y border-white/[0.06] bg-ink-900/40 py-5"
    >
      <div
        aria-hidden="true"
        className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
      >
        {row}
        {row}
        {row}
        {row}
      </div>
    </div>
  );
}
