"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { aboutCopy, education, profile } from "@/data/portfolioData";
import { skillGroups } from "@/data/skills";
import { projects } from "@/data/projects";
import { isSet } from "@/lib/utils";

type Kind = "cmd" | "out" | "err" | "ok";
interface Line {
  id: number;
  kind: Kind;
  content: ReactNode;
}

const COMMANDS = [
  "help",
  "about",
  "whoami",
  "skills",
  "projects",
  "open",
  "education",
  "contact",
  "linkedin",
  "github",
  "clear",
  "ls",
  "cat",
  "pwd",
  "date",
  "echo",
  "nmap",
  "exit",
];

const SHORTCUTS = ["help", "whoami", "projects", "skills", "cat future.txt", "sudo hire agaman"];

const HELP: [string, string][] = [
  ["about", "who I am, in a paragraph"],
  ["whoami", "the short version"],
  ["skills", "what I work with and what I'm learning"],
  ["projects", "list projects (then: open P01)"],
  ["education", "where I'm studying"],
  ["contact", "how to reach me"],
  ["linkedin", "open my LinkedIn"],
  ["github", "open my GitHub"],
  ["clear", "clear the screen"],
];

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const idRef = useRef(0);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const push = useCallback((kind: Kind, content: ReactNode) => {
    setLines((l) => [...l, { id: idRef.current++, kind, content }]);
  }, []);

  // initial banner
  useEffect(() => {
    setLines([
      { id: idRef.current++, kind: "ok", content: "Welcome to Agaman's terminal." },
      { id: idRef.current++, kind: "out", content: "Type 'help' to list commands — or tap a shortcut below." },
    ]);
  }, []);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const exec = useCallback(
    (raw: string) => {
      const cmd = raw.trim();
      push("cmd", cmd);
      if (!cmd) return;
      setHistory((h) => [...h, cmd]);
      setHIdx(-1);

      const [name, ...args] = cmd.split(/\s+/);
      const arg = args.join(" ");
      const out = (t: ReactNode) => push("out", t);

      switch (name.toLowerCase()) {
        case "help":
          out("Available commands:");
          HELP.forEach(([c, d]) =>
            out(
              <span>
                <button type="button" className="text-accent hover:underline" onClick={() => exec(c)}>
                  {c.padEnd(10)}
                </button>
                <span className="text-dim"> {d}</span>
              </span>,
            ),
          );
          out(<span className="text-dim">…and a few things that aren't listed.</span>);
          break;

        case "about":
          out(aboutCopy.paragraphs[0]);
          out(aboutCopy.paragraphs[2]);
          break;

        case "whoami":
          ["Agaman Thapa", "Cybersecurity Student", "Developer", "Builder", profile.location].forEach((l) =>
            out(`> ${l}`),
          );
          break;

        case "skills":
          skillGroups.forEach((g) =>
            out(
              <span>
                <span className="text-accent">[{g.title}]</span> {g.skills.map((s) => s.name).join(", ")}
              </span>,
            ),
          );
          out(<span className="text-dim">Grouped honestly — see the Toolkit section for working vs learning.</span>);
          break;

        case "projects":
          projects.forEach((p) =>
            out(
              <button
                type="button"
                className="text-left hover:text-accent"
                onClick={() => exec(`open ${p.id}`)}
              >
                <span className="text-accent">{p.id}</span> {p.name} <span className="text-dim">[{p.status.join(" / ")}]</span>
              </button>,
            ),
          );
          out(<span className="text-dim">Tip: type `open P01` to read a case study.</span>);
          break;

        case "open": {
          const id = arg.toUpperCase();
          const p = projects.find((x) => x.id === id);
          if (!p) {
            push("err", id ? `open: no project '${arg}'. Try 'projects'.` : "usage: open <project id>, e.g. open P01");
          } else {
            push("ok", `Opening ${p.id} — ${p.name}…`);
            setTimeout(() => window.dispatchEvent(new CustomEvent("open-project", { detail: p.id })), 350);
          }
          break;
        }

        case "education": {
          const e = education[0];
          out(`${e.school} — ${e.degree}, ${e.field}`);
          out(`${e.location} · ${e.start} – ${e.end}`);
          break;
        }

        case "contact":
          out(`email:    ${isSet(profile.links.email) ? profile.links.email : "(not added yet)"}`);
          out(`linkedin: ${isSet(profile.links.linkedin) ? profile.links.linkedin : "(not added yet)"}`);
          out(`github:   ${isSet(profile.links.github) ? profile.links.github : "(not added yet)"}`);
          out(<span className="text-dim">Or use the form below — or type `sudo hire agaman`.</span>);
          break;

        case "linkedin":
        case "github": {
          const url = profile.links[name.toLowerCase() as "linkedin" | "github"];
          if (isSet(url)) {
            push("ok", `Opening ${url} …`);
            window.open(url, "_blank", "noopener,noreferrer");
          } else {
            push("err", `${name}: link not added yet.`);
          }
          break;
        }

        case "clear":
          setLines([]);
          break;

        case "ls":
          if (arg.replace(/\/$/, "") === "projects") out(projects.map((p) => p.id).join("  "));
          else out("about.txt   future.txt   skills.json   contact.md   projects/");
          break;

        case "pwd":
          out("/home/visitor/agaman");
          break;

        case "date":
          out(new Date().toString());
          break;

        case "echo":
          out(arg);
          break;

        case "cat":
          if (!arg) push("err", "usage: cat <file>");
          else if (arg === "future.txt") out("Building. Learning. Improving.");
          else if (arg === "about.txt") out(aboutCopy.lead);
          else if (arg === "contact.md") exec("contact");
          else push("err", `cat: ${arg}: No such file or directory`);
          break;

        case "sudo":
          if (/^hire\s+agaman$/i.test(arg)) {
            push("ok", "Permission granted. Opening contact channel...");
            setTimeout(() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 900);
          } else {
            push("err", "visitor is not in the sudoers file. This incident will be reported — to nobody. It's a portfolio.");
          }
          break;

        case "rm":
          push("err", "rm: permission denied. (Also: please don't.)");
          break;

        case "nmap":
          out("Starting scan of localhost… (authorised: it's my own site)");
          out("PORT      STATE  SERVICE");
          out("443/tcp   open   curiosity");
          break;

        case "exit":
          out("There is no exit. Only the next project.");
          break;

        default:
          push("err", `command not found: ${name}. Try 'help'.`);
      }
    },
    [push],
  );

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      exec(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const n = hIdx < 0 ? history.length - 1 : Math.max(0, hIdx - 1);
      setHIdx(n);
      setInput(history[n]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hIdx < 0) return;
      const n = hIdx + 1;
      if (n >= history.length) {
        setHIdx(-1);
        setInput("");
      } else {
        setHIdx(n);
        setInput(history[n]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const parts = input.split(/\s+/);
      if (parts.length === 1 && parts[0]) {
        const m = COMMANDS.filter((c) => c.startsWith(parts[0].toLowerCase()));
        if (m.length === 1) setInput(m[0] + " ");
      } else if (parts[0] === "open" && parts[1]) {
        const m = projects.filter((p) => p.id.startsWith(parts[1].toUpperCase()));
        if (m.length === 1) setInput(`open ${m[0].id}`);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  const color = (k: Kind) =>
    k === "err" ? "text-red-300" : k === "ok" ? "text-signal" : k === "cmd" ? "text-white" : "text-muted";

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-900/85 shadow-[0_40px_120px_-40px_rgb(var(--accent)/0.25)] backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/[0.07] bg-ink-800/60 px-4 py-3">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </div>
          <span className="font-mono text-xs text-dim">visitor@agaman: ~</span>
        </div>
        <span className="mono-label hidden sm:block">interactive · try `help`</span>
      </div>

      <div
        ref={bodyRef}
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
        className="h-[22rem] overflow-y-auto px-4 py-4 font-mono text-[0.8125rem] leading-6 sm:h-[26rem] sm:px-6 sm:text-sm"
      >
        {lines.map((l) => (
          <div key={l.id} className={`whitespace-pre-wrap break-words ${color(l.kind)}`}>
            {l.kind === "cmd" ? (
              <>
                <span className="text-accent">visitor@agaman:~$</span> {l.content}
              </>
            ) : (
              l.content
            )}
          </div>
        ))}

        <label className="flex items-center gap-2">
          <span className="shrink-0 text-accent">visitor@agaman:~$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Terminal command input"
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent text-white caret-accent outline-none"
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-white/[0.07] bg-ink-800/40 px-4 py-3">
        <span className="mono-label mr-1">Shortcuts</span>
        {SHORTCUTS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => exec(s)}
            className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-muted transition-colors hover:border-accent/50 hover:text-accent"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
