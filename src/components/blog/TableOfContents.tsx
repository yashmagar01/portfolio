'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { List } from 'lucide-react';

interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function extractHeadings(body: string): Heading[] {
  const lines = body.split('\n');
  const headings: Heading[] = [];
  for (const line of lines) {
    if (line.startsWith('## ')) {
      headings.push({ id: slugify(line.slice(3)), text: line.slice(3), level: 2 });
    } else if (line.startsWith('### ')) {
      headings.push({ id: slugify(line.slice(4)), text: line.slice(4), level: 3 });
    }
  }
  return headings;
}

interface TableOfContentsProps {
  body: string;
}

export function TableOfContents({ body }: TableOfContentsProps) {
  const headings = useMemo(() => extractHeadings(body), [body]);
  const [activeId, setActiveId] = useState<string>('');
  const [open, setOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (headings.length === 0) return;

    const callback: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
          break;
        }
      }
    };

    observerRef.current = new IntersectionObserver(callback, {
      rootMargin: '-80px 0px -70% 0px',
    });

    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observerRef.current.observe(el);
    }

    return () => observerRef.current?.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const tocList = (
    <ul className="space-y-1">
      {headings.map((h) => (
        <li key={h.id}>
          <a
            href={`#${h.id}`}
            className={cn(
              'block py-0.5 font-mono text-[11.5px] leading-relaxed transition-colors',
              h.level === 3 && 'pl-3',
              activeId === h.id
                ? 'text-primary font-medium'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Desktop: static sidebar */}
      <div className="hidden lg:block">
        <p className="mb-3 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          <List className="h-3 w-3" />
          Contents
        </p>
        {tocList}
      </div>

      {/* Mobile: collapsible */}
      <div className="lg:hidden rounded-lg border border-border bg-card mb-8">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between px-4 py-3 font-mono text-[12px] text-muted-foreground"
          aria-expanded={open}
        >
          <span className="flex items-center gap-2">
            <List className="h-3.5 w-3.5" />
            Table of contents
          </span>
          <span className={`transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
        </button>
        {open && <div className="border-t border-border px-4 pb-4 pt-3">{tocList}</div>}
      </div>
    </>
  );
}
