import { Github, Linkedin, Twitter } from 'lucide-react';

interface AuthorCardProps {
  compact?: boolean;
}

export function AuthorCard({ compact }: AuthorCardProps) {
  return (
    <div className={`rounded-xl border border-border bg-card ${compact ? 'p-4' : 'p-5'}`}>
      <div className="flex items-center gap-3">
        {/* Avatar — letter-based, styled with IDE primary color */}
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
          Y
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-[14px]">Yash Ajay Magar</p>
          <p className="font-mono text-[11px] text-muted-foreground">AI Builder · Developer</p>
        </div>
      </div>

      {!compact && (
        <p className="mt-3 text-[13px] text-muted-foreground leading-relaxed">
          Diploma student in Computer Engineering at Government Polytechnic Awasari, Pune. Building
          real software — AI tools, PWAs, bots — from a college hostel room.
        </p>
      )}

      <div className={`flex items-center gap-2 ${compact ? 'mt-3' : 'mt-4'}`}>
        <a
          href="https://github.com/yashmagar01"
          target="_blank"
          rel="noreferrer"
          className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="GitHub"
        >
          <Github className="h-4 w-4" />
        </a>
        <a
          href="https://x.com/yashmag50534849"
          target="_blank"
          rel="noreferrer"
          className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Twitter / X"
        >
          <Twitter className="h-4 w-4" />
        </a>
        <a
          href="https://www.linkedin.com/in/yash-magar/"
          target="_blank"
          rel="noreferrer"
          className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-4 w-4" />
        </a>
        <a
          href="/"
          className="ml-auto font-mono text-[11px] text-primary hover:underline"
        >
          Portfolio →
        </a>
      </div>
    </div>
  );
}
