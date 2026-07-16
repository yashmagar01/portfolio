import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronRight } from "lucide-react";
import { useTabs } from "@/lib/ide/tabs-context";
import { profile } from "@/data/portfolio";
import { projects } from "@/data/projects";
import { posts } from "@/data/blog";

type Line = { kind: "in" | "out"; text: string };

const HELP = `available commands:
  whoami           who is this site about
  projects --list  list featured projects
  blog --list      list latest blog posts
  contact          how to reach me
  clear            clear the terminal
  help             show this message`;

function runCommand(input: string): string {
  const cmd = input.trim().toLowerCase();
  if (!cmd) return "";
  if (cmd === "help") return HELP;
  if (cmd === "whoami")
    return `${profile.name} — ${profile.role}\nbased in ${profile.location}. ${profile.tagline}.`;
  if (cmd.startsWith("projects")) {
    return projects
      .filter((p) => p.featured)
      .map((p) => `  ${p.file.padEnd(28)} ${p.tagline}`)
      .join("\n");
  }
  if (cmd.startsWith("blog"))
    return posts.map((p) => `  ${p.date}  ${p.title}`).join("\n");
  if (cmd === "contact")
    return `email:    ${profile.email}\ngithub:   ${profile.github}\nlinkedin: ${profile.linkedin}\ntwitter:  ${profile.twitter}`;
  if (cmd === "clear") return "__clear__";
  if (cmd === "sudo make me a sandwich") return "nice try.";
  return `command not found: ${cmd}. type 'help' for options.`;
}

export function Terminal({ isMobile }: { isMobile?: boolean }) {
  const { terminalOpen, setTerminalOpen } = useTabs();
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: `Welcome to yash-portfolio v1.0.0` },
    { kind: "out", text: `type 'help' to see what you can do.` },
  ]);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalOpen) inputRef.current?.focus();
  }, [terminalOpen]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const out = runCommand(value);
    if (out === "__clear__") {
      setLines([]);
    } else {
      setLines((prev) => [...prev, { kind: "in", text: value }, ...(out ? [{ kind: "out" as const, text: out }] : [])]);
    }
    setValue("");
  };

  return (
    <AnimatePresence>
      {terminalOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 240 }}
          exit={{ height: 0 }}
          transition={isMobile ? { duration: 0.12 } : { type: "spring", stiffness: 500, damping: 35, mass: 0.8 }}
          className="shrink-0 overflow-hidden border-t border-border bg-background"
        >
          <div className="flex h-8 items-center justify-between border-b border-border bg-sidebar-bg px-3">
            <div className="flex items-center gap-4 text-[11px] font-mono uppercase tracking-wider">
              <span className="text-foreground border-b-2 border-primary pb-1.5">Terminal</span>
              <span className="text-muted-foreground">Problems</span>
              <span className="text-muted-foreground">Output</span>
            </div>
            <button
              onClick={() => setTerminalOpen(false)}
              className="grid h-6 w-6 place-items-center rounded text-muted-foreground hover:bg-hover hover:text-foreground"
              aria-label="Close terminal"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <div
            ref={scrollRef}
            onClick={() => inputRef.current?.focus()}
            className="ide-scrollbar h-[calc(240px-2rem)] overflow-y-auto px-3 py-2 font-mono text-[12.5px] leading-relaxed"
          >
            {lines.map((l, i) => (
              <div key={i} className="whitespace-pre-wrap">
                {l.kind === "in" ? (
                  <span>
                    <span className="text-syntax-tag">yash@portfolio</span>
                    <span className="text-muted-foreground"> ~ </span>
                    <span className="text-primary">$</span> {l.text}
                  </span>
                ) : (
                  <span className="text-foreground/85">{l.text}</span>
                )}
              </div>
            ))}
            <form onSubmit={submit} className="flex items-center gap-1">
              <span className="text-syntax-tag">yash@portfolio</span>
              <span className="text-muted-foreground">~</span>
              <span className="text-primary">$</span>
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="flex-1 bg-transparent outline-none"
                autoComplete="off"
                spellCheck={false}
              />
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
