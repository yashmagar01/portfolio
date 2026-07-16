'use client';

import { useState } from 'react';
import { Link2, Twitter, Linkedin } from 'lucide-react';
import { toast } from 'sonner';

interface ShareRowProps {
  title: string;
  slug: string;
}

export function ShareRow({ title, slug }: ShareRowProps) {
  const url = `https://magar.xyz/blog/${slug}`;
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('Link copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Could not copy link');
    }
  };

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${title}" by @yashmag50534849`)}&url=${encodeURIComponent(url)}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        share this post
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={copyLink}
          className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 font-mono text-[12px] text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
        >
          <Link2 className="h-3.5 w-3.5" />
          {copied ? 'Copied!' : 'Copy link'}
        </button>
        <a
          href={tweetUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 font-mono text-[12px] text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
        >
          <Twitter className="h-3.5 w-3.5" />
          Share on X
        </a>
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 font-mono text-[12px] text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
        >
          <Linkedin className="h-3.5 w-3.5" />
          Share on LinkedIn
        </a>
      </div>
    </div>
  );
}
