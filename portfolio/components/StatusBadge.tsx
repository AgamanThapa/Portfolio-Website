import type { Status } from "@/data/projects";
import { cn } from "@/lib/utils";

const STYLES: Record<Status, string> = {
  COMPLETED: "text-emerald-300 border-emerald-300/25 bg-emerald-300/[0.07]",
  "IN DEVELOPMENT": "text-sky-300 border-sky-300/25 bg-sky-300/[0.07]",
  RESEARCH: "text-violet-300 border-violet-300/25 bg-violet-300/[0.07]",
  CONCEPT: "text-amber-300 border-amber-300/25 bg-amber-300/[0.07]",
  ACADEMIC: "text-blue-300 border-blue-300/25 bg-blue-300/[0.07]",
  EXPERIMENTAL: "text-pink-300 border-pink-300/25 bg-pink-300/[0.07]",
};

export default function StatusBadge({
  status,
  className,
}: {
  status: Status;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em]",
        STYLES[status],
        className,
      )}
    >
      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-current" />
      {status}
    </span>
  );
}
