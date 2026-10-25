"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { profile, systemStatus } from "@/data/portfolioData";
import { useBootDone } from "@/hooks/animations";
import MagneticButton from "@/components/MagneticButton";
import SocialLink from "@/components/SocialLink";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

const NetworkCanvas = dynamic(() => import("@/components/NetworkCanvas"), { ssr: false });

const EASE = [0.22, 1, 0.36, 1] as const;

function Typewriter({ text, start }: { text: string; start: boolean }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (reduce) {
      setN(text.length);
      return;
    }
    const id = setInterval(() => setN((v) => (v >= text.length ? v : v + 1)), 26);
    return () => clearInterval(id);
  }, [start, text, reduce]);
  return (
    <span>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{text.slice(0, n)}</span>
      <span aria-hidden="true" className="ml-0.5 inline-block h-[1.05em] w-[0.5ch] translate-y-[0.15em] animate-blink bg-accent" />
    </span>
  );
}

function Clock() {
  const [t, setT] = useState("--:--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: profile.timeZone,
    });
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{t} NPT</span>;
}

export default function Hero() {
  const go = useBootDone();
  const reduce = useReducedMotion();
  const letters = (word: string, base: number) =>
    word.split("").map((c, i) => (
      <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
        <motion.span
          className="inline-block"
          initial={reduce ? false : { y: "105%" }}
          animate={go ? { y: 0 } : undefined}
          transition={{ duration: 0.9, delay: base + i * 0.045, ease: EASE }}
        >
          {c}
        </motion.span>
      </span>
    ));

  return (
    <section id="home" data-nav="home" className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pb-28 pt-32">
      <NetworkCanvas className="absolute inset-0 -z-10 h-full w-full opacity-90" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_30%_40%,transparent_0%,rgb(6_7_8/0.55)_55%,rgb(6_7_8)_100%)]"
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink-950 to-transparent" />

      <div className="container-x">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={go ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
          className="mono-label mb-6 flex flex-wrap items-center gap-x-4 gap-y-2"
        >
          <span className="flex items-center gap-2 text-signal">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-pulseRing rounded-full bg-signal" />
              <span className="relative h-2 w-2 rounded-full bg-signal" />
            </span>
            SYSTEM: ONLINE
          </span>
          <span>{profile.locationShort}</span>
          <Clock />
        </motion.p>

        <h1 className="font-display text-[clamp(3.4rem,13.5vw,10.5rem)] font-bold leading-[0.88] tracking-[-0.045em]">
          <span className="sr-only">{profile.name}</span>
          <span aria-hidden="true" className="block">{letters("AGAMAN", 0.05)}</span>
          <span aria-hidden="true" className="block text-gradient">{letters("THAPA", 0.35)}</span>
        </h1>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={go ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
          className="mt-8 font-display text-2xl leading-tight tracking-tight sm:text-4xl md:text-5xl"
        >
          <p className="text-white">{profile.roles[0]}</p>
          <p className="text-white/70">{profile.roles[1]}</p>
          <p className="text-accent">{profile.roles[2]}</p>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={go ? { opacity: 1 } : undefined}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <p className="mt-8 min-h-[3.2em] max-w-xl font-mono text-sm leading-relaxed text-muted sm:min-h-[1.6em] sm:text-base">
            <span className="text-accent">&gt; </span>
            <Typewriter text={profile.tagline} start={go} />
          </p>
          <p className="mt-6 max-w-3xl text-sm font-medium leading-relaxed text-white/85 sm:text-base">
            {profile.headline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <MagneticButton href="#projects" cursor="VIEW">View My Work</MagneticButton>
            <MagneticButton href="#about" variant="ghost" arrow={false}>About Me</MagneticButton>
            <MagneticButton href="#contact" variant="ghost" cursor="CONNECT">Connect With Me</MagneticButton>
          </div>

          <div className="mt-8 flex items-center gap-2">
            <SocialLink href={profile.links.linkedin} label="LinkedIn" icon={<LinkedinIcon className="h-4 w-4" />} />
            <SocialLink href={profile.links.github} label="GitHub" icon={<GithubIcon className="h-4 w-4" />} />
          </div>
        </motion.div>
      </div>

      {/* HUD */}
      <div className="container-x absolute inset-x-0 bottom-6 hidden items-end justify-between sm:flex">
        <dl className="flex gap-8">
          {systemStatus.slice(2).map((s) => (
            <div key={s.k}>
              <dt className="mono-label">{s.k}</dt>
              <dd className="mt-1 font-mono text-xs text-white/85">{s.v}</dd>
            </div>
          ))}
        </dl>
        <a href="#about" aria-label="Scroll to About" className="mono-label flex items-center gap-2 hover:text-white">
          SCROLL <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
