import type { ReactNode } from "react";
import { cn, isSet } from "@/lib/utils";

/**
 * External/profile link that degrades gracefully: while the URL is still a
 * TODO placeholder it renders as a muted, non-clickable chip instead of a
 * broken link.
 */
export default function SocialLink({
  href,
  label,
  icon,
  className,
  showLabel = true,
  cursor = "OPEN",
}: {
  href?: string;
  label: string;
  icon: ReactNode;
  className?: string;
  showLabel?: boolean;
  cursor?: string;
}) {
  const base = cn(
    "inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm transition-colors",
    !showLabel && "h-10 w-10 justify-center px-0",
    className,
  );

  if (!isSet(href)) {
    return (
      <span
        role="link"
        aria-disabled="true"
        title={`${label} link not added yet — set it in data/portfolioData.ts`}
        className={cn(base, "cursor-not-allowed text-dim")}
      >
        {icon}
        {showLabel ? <span>{label}</span> : <span className="sr-only">{label}</span>}
      </span>
    );
  }

  const mail = href.startsWith("mailto:");
  return (
    <a
      href={href}
      data-cursor={cursor}
      aria-label={showLabel ? undefined : label}
      {...(mail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      className={cn(base, "text-muted hover:border-accent/50 hover:text-accent")}
    >
      {icon}
      {showLabel && <span>{label}</span>}
    </a>
  );
}
