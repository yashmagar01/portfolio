import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';

interface KeyboardShortcutsProps {
  onSearch: () => void;
  posts?: { slug: string }[];
  currentSlug?: string;
}

export function useKeyboardShortcuts({ onSearch, posts, currentSlug }: KeyboardShortcutsProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

      if (e.key === '/' && !isInput) {
        e.preventDefault();
        onSearch();
        return;
      }

      if (!posts || !currentSlug) return;

      const currentIdx = posts.findIndex((p) => p.slug === currentSlug);

      if (e.key === 'j' && !isInput) {
        e.preventDefault();
        if (currentIdx < posts.length - 1) {
          const next = posts[currentIdx + 1];
          navigate({ to: '/blog/$slug', params: { slug: next.slug } });
        }
      }

      if (e.key === 'k' && !isInput) {
        e.preventDefault();
        if (currentIdx > 0) {
          const prev = posts[currentIdx - 1];
          navigate({ to: '/blog/$slug', params: { slug: prev.slug } });
        }
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onSearch, posts, currentSlug, navigate]);
}
