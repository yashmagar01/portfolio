import { ArrowLeft, Home } from 'lucide-react';

interface BlogNavProps {
  postTitle?: string;
}

export function BlogNav({ postTitle }: BlogNavProps) {
  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <a
          href="/blog"
          className="flex items-center gap-1.5 font-mono text-[12px] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Writing
        </a>

        {postTitle && (
          <>
            <span className="text-border">/</span>
            <span className="min-w-0 flex-1 truncate font-mono text-[12px] text-muted-foreground">
              {postTitle}
            </span>
          </>
        )}

        <a
          href="/"
          className="ml-auto flex items-center gap-1.5 font-mono text-[12px] text-muted-foreground transition-colors hover:text-foreground"
        >
          <Home className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">magar.xyz</span>
        </a>
      </div>
    </nav>
  );
}
