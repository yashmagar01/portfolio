import { useState, useEffect } from 'react';
import type { Post } from '@/data/blog';
import {
  Calendar,
  Clock,
  RefreshCw,
  FileText,
} from 'lucide-react';

const difficultyColors: Record<string, string> = {
  beginner: 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800',
  intermediate: 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  advanced: 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800',
};

function RelativeTime({ date }: { date: string }) {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const diff = Date.now() - new Date(date).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) setLabel('today');
    else if (days === 1) setLabel('yesterday');
    else if (days < 7) setLabel(`${days} days ago`);
    else
      setLabel(
        new Date(date).toLocaleDateString('en-IN', {
          month: 'short',
          day: 'numeric',
        }),
      );
  }, [date]);

  if (!label) return null;

  return (
    <span className="flex items-center gap-1.5 text-primary/70">
      <RefreshCw className="h-3 w-3" />
      Updated {label}
    </span>
  );
}

interface ArticleMetadataProps {
  post: Post;
}

export function ArticleMetadata({ post }: ArticleMetadataProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 font-mono text-[12px] text-muted-foreground">
      <span className="flex items-center gap-1.5">
        <Calendar className="h-3.5 w-3.5" />
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString('en-IN', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </time>
      </span>

      {post.updatedDate && <RelativeTime date={post.updatedDate} />}

      <span className="flex items-center gap-1.5">
        <Clock className="h-3.5 w-3.5" />
        {post.readingMinutes} min read
      </span>

      <span className="flex items-center gap-1.5">
        <FileText className="h-3 w-3" />
        {post.wordCount.toLocaleString()} words
      </span>

      <span
        className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${difficultyColors[post.difficulty] || 'bg-muted text-muted-foreground'}`}
      >
        {post.difficulty}
      </span>

      {post.license && (
        <span className="flex items-center gap-1 text-muted-foreground/60 text-[10px]">
          {post.license}
        </span>
      )}
    </div>
  );
}
