import { useEffect, useState } from "react";
import { GitBranch, Github, Linkedin, Twitter, Mail, Bell, Circle, TerminalSquare } from "lucide-react";
import { useTabs } from "@/lib/ide/tabs-context";
import { profile } from "@/data/portfolio";

export function StatusBar() {
  const { tabs, activeId, cursor, terminalOpen, setTerminalOpen } = useTabs();
  const activeTab = tabs.find((t) => t.id === activeId);
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer
      className="flex h-6 shrink-0 items-center gap-3 bg-statusbar px-2 text-[11px] font-mono text-statusbar-fg select-none"
      aria-label="Status bar"
    >
      <span className="flex items-center gap-1">
        <GitBranch className="h-3 w-3" />
        {profile.branch}
      </span>
      <span className="flex items-center gap-1">
        <Circle className="h-2 w-2 fill-current" />
        {activeTab?.path ?? "no file"}
      </span>
      <span className="hidden sm:inline text-white/70">
        Ln {cursor.line}, Col {cursor.col}
      </span>
      <div className="ml-auto flex items-center gap-3">
        <button
          onClick={() => setTerminalOpen(!terminalOpen)}
          className="hidden sm:flex items-center gap-1 hover:text-white/80"
          aria-label="Toggle terminal"
        >
          <TerminalSquare className="h-3 w-3" />
          <span>terminal</span>
        </button>
        <span className="hidden md:inline text-white/70">UTF-8</span>
        <span className="hidden md:inline text-white/70">TypeScript React</span>
        <span>{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
        <div className="flex items-center gap-2 pl-2 border-l border-white/20">
          <SocialIcon href={`mailto:${profile.email}`} Icon={Mail} />
          <SocialIcon href={profile.github} Icon={Github} />
          <SocialIcon href={profile.linkedin} Icon={Linkedin} />
          <SocialIcon href={profile.twitter} Icon={Twitter} />
        </div>
        <Bell className="h-3 w-3 opacity-70" />
      </div>
    </footer>
  );
}

function SocialIcon({ href, Icon }: { href: string; Icon: typeof Github }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-white/80 transition-all hover:text-white hover:scale-110"
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
    </a>
  );
}
