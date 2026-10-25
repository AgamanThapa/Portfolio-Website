"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems } from "@/data/portfolioData";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [logoHover, setLogoHover] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  // Active section highlighting
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-nav]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive((e.target as HTMLElement).dataset.nav ?? "home");
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Close mobile menu with Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[90] h-[2px] origin-left bg-accent"
        style={{ scaleX: progress }}
      />
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[80] flex justify-center px-3 pt-3 sm:px-4 sm:pt-4">
        <nav
          aria-label="Primary"
          className={cn(
            "pointer-events-auto flex w-full items-center justify-between gap-2 rounded-full border px-2 py-2 transition-all duration-500 sm:gap-4",
            scrolled
              ? "max-w-3xl border-white/10 bg-ink-900/70 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl"
              : "max-w-6xl border-transparent bg-transparent",
          )}
        >
          <a
            href="#home"
            aria-label="Agaman Thapa — home"
            data-cursor="HOME"
            onPointerEnter={() => setLogoHover(true)}
            onPointerLeave={() => setLogoHover(false)}
            onFocus={() => setLogoHover(true)}
            onBlur={() => setLogoHover(false)}
            className="flex items-center gap-2 rounded-full pr-3"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-ink-800 font-display text-sm font-bold tracking-tight">
              AT
            </span>
            <motion.span
              aria-hidden="true"
              initial={false}
              animate={{ width: logoHover ? "auto" : 0, opacity: logoHover ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="hidden overflow-hidden whitespace-nowrap font-mono text-[0.65rem] uppercase tracking-[0.16em] text-accent sm:block"
            >
              AGAMAN // SYSTEM ONLINE
            </motion.span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  className={cn(
                    "relative block rounded-full px-3.5 py-2 text-sm transition-colors",
                    active === item.id ? "text-white" : "text-muted hover:text-white",
                  )}
                >
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/[0.07]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              data-cursor="CONNECT"
              className="hidden rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-950 transition-colors hover:bg-accent sm:block"
            >
              Connect
            </a>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto absolute inset-x-3 top-[4.5rem] rounded-3xl border border-white/10 bg-ink-900/95 p-3 backdrop-blur-xl sm:inset-x-4 md:hidden"
            >
              <ul>
                {navItems.map((item, i) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg",
                        active === item.id ? "bg-white/[0.06] text-white" : "text-muted",
                      )}
                    >
                      <span>{item.label}</span>
                      <span className="font-mono text-xs text-dim">0{i + 1}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
