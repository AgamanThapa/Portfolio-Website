export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/** A value counts as "set" once the TODO placeholder has been replaced. */
export function isSet(value?: string): value is string {
  return !!value && !value.includes("TODO");
}

export const DEGREE_START = new Date(2025, 9, 1); // October 2025
export const DEGREE_END = new Date(2029, 9, 1); // October 2029
export const DEGREE_YEARS = 4;

/** Current year of study (1-based), derived from the real start date. */
export function studyYear(now: Date = new Date()): number {
  const months =
    (now.getFullYear() - DEGREE_START.getFullYear()) * 12 +
    (now.getMonth() - DEGREE_START.getMonth());
  return Math.min(DEGREE_YEARS, Math.max(1, Math.floor(months / 12) + 1));
}

export function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function pad(n: number, size = 2): string {
  return String(n).padStart(size, "0");
}
