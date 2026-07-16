import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from '@tanstack/react-router';
import Fuse from 'fuse.js';
import { posts, type Post } from '@/data/blog';
import { Search, Calendar, Clock, Tag, ArrowRight } from 'lucide-react';

const fuse = new Fuse(posts, {
  keys: [
    { name: 'title', weight: 3 },
    { name: 'excerpt', weight: 2 },
    { name: 'tags', weight: 2 },
    { name: 'category', weight: 1.5 },
    { name: 'series.name', weight: 1 },
    { name: 'body', weight: 0.5 },
  ],
  threshold: 0.4,
  includeScore: true,
});

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setQuery('');
      setResults([]);
      setSelectedIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const res = fuse.search(query);
    setResults(res.map((r) => r.item).slice(0, 8));
    setSelectedIdx(0);
  }, [query]);

  const goTo = useCallback(
    (slug: string) => {
      onClose();
      navigate({ to: '/blog/$slug', params: { slug } });
    },
    [navigate, onClose],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIdx]) {
      goTo(results[selectedIdx].slug);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl rounded-xl border border-border bg-card shadow-2xl">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search articles..."
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            ESC
          </kbd>
        </div>

        {results.length > 0 && (
          <div className="max-h-80 overflow-y-auto p-2">
            {results.map((post, idx) => (
              <button
                key={post.slug}
                onClick={() => goTo(post.slug)}
                className={`w-full rounded-lg px-3 py-2.5 text-left transition-colors ${
                  idx === selectedIdx ? 'bg-muted' : 'hover:bg-muted/50'
                }`}
              >
                <p className="text-sm font-medium text-foreground line-clamp-1">{post.title}</p>
                <p className="mt-0.5 text-[12px] text-muted-foreground line-clamp-1">
                  {post.excerpt}
                </p>
                <div className="mt-1 flex items-center gap-3 font-mono text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.date).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readingMinutes} min
                  </span>
                  <div className="flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    {post.category}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {query && results.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground">No articles found for "{query}"</p>
          </div>
        )}

        {!query && (
          <div className="p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Search by title, tags, category, or content
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {['ai', 'open-source', 'career', 'opinion'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="rounded-full border border-border bg-muted px-3 py-1 font-mono text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-4 border-t border-border px-4 py-2 font-mono text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-border px-1">↑</kbd>
            <kbd className="rounded border border-border px-1">↓</kbd>
            Navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-border px-1.5">↵</kbd>
            Open
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-border px-1.5">ESC</kbd>
            Close
          </span>
        </div>
      </div>
    </div>
  );
}
