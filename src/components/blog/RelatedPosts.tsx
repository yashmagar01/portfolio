import { Link } from '@tanstack/react-router';
import { Calendar } from 'lucide-react';
import type { Post } from '@/data/blog';

interface RelatedPostsProps {
  current: Post;
  all: Post[];
}

export function RelatedPosts({ current, all }: RelatedPostsProps) {
  const related = all
    .filter((p) => p.slug !== current.slug)
    .filter((p) => p.tags.some((t) => current.tags.includes(t)))
    .sort((a, b) => {
      // Sort by number of shared tags descending
      const sharedA = a.tags.filter((t) => current.tags.includes(t)).length;
      const sharedB = b.tags.filter((t) => current.tags.includes(t)).length;
      return sharedB - sharedA;
    })
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="mb-4 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        related posts
      </p>
      <div className="space-y-4">
        {related.map((post) => (
          <Link
            key={post.slug}
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="group block"
          >
            <h3 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="mt-1 text-[12px] text-muted-foreground line-clamp-1">{post.excerpt}</p>
            <div className="mt-1.5 flex items-center gap-2 font-mono text-[10.5px] text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {new Date(post.date).toLocaleDateString('en-IN', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
              <span>·</span>
              <span>{post.readingMinutes} min</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
