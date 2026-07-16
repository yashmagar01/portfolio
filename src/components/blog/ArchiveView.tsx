import { Link } from '@tanstack/react-router';
import { ChevronRight } from 'lucide-react';
import type { Post } from '@/data/blog';

interface ArchiveViewProps {
  posts: Post[];
}

export function ArchiveView({ posts }: ArchiveViewProps) {
  const grouped: Record<string, Record<string, Post[]>> = {};

  for (const p of posts) {
    const d = new Date(p.date);
    const year = d.getFullYear().toString();
    const month = d.toLocaleDateString('en-IN', { month: 'long' });
    if (!grouped[year]) grouped[year] = {};
    if (!grouped[year][month]) grouped[year][month] = [];
    grouped[year][month].push(p);
  }

  const sortedYears = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="space-y-8">
      {sortedYears.map((year) => (
        <div key={year}>
          <h3 className="font-mono text-[13px] font-bold text-foreground mb-4">{year}</h3>
          <div className="space-y-3">
            {Object.entries(grouped[year])
              .sort(
                ([a], [b]) =>
                  new Date(`2000 ${b}`).getMonth() - new Date(`2000 ${a}`).getMonth(),
              )
              .map(([month, monthPosts]) => (
                <div key={month}>
                  <p className="font-mono text-[11px] text-muted-foreground mb-2 ml-1">{month}</p>
                  <div className="space-y-1">
                    {monthPosts.map((p) => (
                      <Link
                        key={p.slug}
                        to="/blog/$slug"
                        params={{ slug: p.slug }}
                        className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                      >
                        <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="font-mono text-[11px] text-muted-foreground/60 w-8">
                          {new Date(p.date).toLocaleDateString('en-IN', { day: '2-digit' })}
                        </span>
                        <span className="flex-1 line-clamp-1">{p.title}</span>
                        <span className="font-mono text-[10px] text-muted-foreground/40">
                          {p.readingMinutes} min
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
