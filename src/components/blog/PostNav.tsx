import { Link } from '@tanstack/react-router';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Post } from '@/data/blog';

interface PostNavProps {
  prev: Post | null;
  next: Post | null;
}

export function PostNav({ prev, next }: PostNavProps) {
  if (!prev && !next) return null;

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {prev ? (
        <Link
          to="/blog/$slug"
          params={{ slug: prev.slug }}
          className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-[0_2px_12px_oklch(0_0_0/0.05)]"
        >
          <ChevronLeft className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" />
          <div className="min-w-0">
            <p className="font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">
              Previous
            </p>
            <p className="mt-1 line-clamp-2 text-sm font-medium group-hover:text-primary transition-colors">
              {prev.title}
            </p>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          to="/blog/$slug"
          params={{ slug: next.slug }}
          className="group flex items-start justify-end gap-3 rounded-xl border border-border bg-card p-4 text-right transition-all hover:border-primary/30 hover:shadow-[0_2px_12px_oklch(0_0_0/0.05)]"
        >
          <div className="min-w-0">
            <p className="font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">
              Next
            </p>
            <p className="mt-1 line-clamp-2 text-sm font-medium group-hover:text-primary transition-colors">
              {next.title}
            </p>
          </div>
          <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
