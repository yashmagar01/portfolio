import { Link } from '@tanstack/react-router';
import type { Post } from '@/data/blog';
import { BookOpen, ChevronRight } from 'lucide-react';

interface SeriesCardProps {
  series: NonNullable<Post['series']>;
  currentSlug: string;
  allPosts: Post[];
}

export function SeriesCard({ series, currentSlug, allPosts }: SeriesCardProps) {
  const seriesPosts = allPosts
    .filter((p) => p.series?.name === series.name)
    .sort((a, b) => (a.series?.part ?? 0) - (b.series?.part ?? 0));

  if (seriesPosts.length === 0) return null;

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="h-4 w-4 text-primary" />
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          Series: {series.name}
        </p>
      </div>

      <div className="space-y-1">
        {seriesPosts.map((p) => {
          const isCurrent = p.slug === currentSlug;
          return (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                isCurrent
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <span className="font-mono text-[11px] text-muted-foreground w-5">
                {p.series?.part}
              </span>
              <span className="flex-1 line-clamp-1">{p.title}</span>
              {isCurrent && <span className="text-[10px] font-mono text-primary">Reading</span>}
              {!isCurrent && <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100" />}
            </Link>
          );
        })}
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-[12px] text-muted-foreground mb-1.5">
          <span className="font-mono text-[11px]">
            {currentSlug
              ? seriesPosts.findIndex((p) => p.slug === currentSlug) + 1
              : 0}{' '}
            / {series.total} Complete
          </span>
          <span className="font-mono text-[11px]">
            {Math.round(
              ((seriesPosts.findIndex((p) => p.slug === currentSlug) + 1) / series.total) * 100,
            )}
            %
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{
              width: `${
                ((seriesPosts.findIndex((p) => p.slug === currentSlug) + 1) / series.total) * 100
              }%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
