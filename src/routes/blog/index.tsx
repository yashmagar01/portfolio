import { useState, useMemo } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { posts } from '@/data/blog';
import type { Post } from '@/data/blog';
import { BlogNav } from '@/components/blog/BlogNav';
import { AuthorCard } from '@/components/blog/AuthorCard';
import { SearchDialog } from '@/components/blog/SearchDialog';
import { FilterBar } from '@/components/blog/FilterBar';
import { ArchiveView } from '@/components/blog/ArchiveView';
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';
import {
  Calendar,
  Clock,
  ExternalLink,
  TrendingUp,
  Sparkles,
  BookOpen,
  Zap,
  ArrowRight,
  FileText,
} from 'lucide-react';

export const Route = createFileRoute('/blog/')({
  head: () => ({
    meta: [
      { title: 'Writing — Yash Magar' },
      {
        name: 'description',
        content:
          'Essays, opinions, and technical notes by Yash Magar — a developer and AI builder shipping software from Pune, India.',
      },
      { property: 'og:title', content: 'Writing — Yash Magar' },
      {
        property: 'og:description',
        content:
          'Essays, opinions, and technical notes by Yash Magar — a developer and AI builder shipping software from Pune, India.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://magar.xyz/blog' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: 'Writing — Yash Magar' },
    ],
    links: [{ rel: 'canonical', href: 'https://magar.xyz/blog' }],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Writing by Yash Magar',
          url: 'https://magar.xyz/blog',
          author: {
            '@type': 'Person',
            name: 'Yash Ajay Magar',
            url: 'https://magar.xyz',
          },
          blogPost: posts.map((p) => ({
            '@type': 'BlogPosting',
            headline: p.title,
            url: `https://magar.xyz/blog/${p.slug}`,
            datePublished: p.date,
            description: p.excerpt,
          })),
        }),
      },
    ],
  }),
  component: BlogIndexPage,
});

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

type ViewMode = 'grid' | 'archive';

function BlogIndexPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  useKeyboardShortcuts({ onSearch: () => setSearchOpen(true) });

  const allCategories = useMemo(
    () => Array.from(new Set(posts.map((p) => p.category))),
    [],
  );

  const allTags = useMemo(() => {
    const tagCounts = new Map<string, number>();
    for (const p of posts) {
      for (const t of p.tags) {
        tagCounts.set(t, (tagCounts.get(t) || 0) + 1);
      }
    }
    return Array.from(tagCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15);
  }, []);

  const filtered = useMemo(() => {
    let result = [...posts];

    if (categoryFilter) {
      result = result.filter((p) => p.category === categoryFilter);
    }
    if (difficultyFilter) {
      result = result.filter((p) => p.difficulty === difficultyFilter);
    }

    switch (sortBy) {
      case 'oldest':
        result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'longest':
        result.sort((a, b) => b.readingMinutes - a.readingMinutes);
        break;
      case 'shortest':
        result.sort((a, b) => a.readingMinutes - b.readingMinutes);
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    return result;
  }, [categoryFilter, difficultyFilter, sortBy]);

  const featured = useMemo(() => filtered.filter((p) => p.featured), [filtered]);
  const latest = useMemo(
    () => filtered.filter((p) => !p.featured),
    [filtered],
  );

  const totalReadingTime = useMemo(
    () => posts.reduce((s, p) => s + p.readingMinutes, 0),
    [],
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BlogNav />
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />

      <main className="mx-auto max-w-5xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 border-b border-border pb-10">
          <p className="font-mono text-[11px] uppercase tracking-widest text-primary mb-2">
            # blog/
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Writing</h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-xl">
            Essays, opinions, and technical notes. I write about AI, building software, and what
            it's like to ship real things as a self-taught developer.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 font-mono text-[12px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5" />
              {posts.length} {posts.length === 1 ? 'post' : 'posts'}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {totalReadingTime} min total
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5" />
              {posts.filter((p) => p.status === 'updated').length} recently updated
            </span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <FilterBar
              onCategoryChange={setCategoryFilter}
              onSortChange={setSortBy}
              onDifficultyChange={setDifficultyFilter}
              categories={allCategories}
              currentCategory={categoryFilter}
              currentSort={sortBy}
              currentDifficulty={difficultyFilter}
            />
            <div className="flex items-center gap-1 ml-4">
              <button
                onClick={() => setViewMode('grid')}
                className={`rounded-md p-1.5 transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-label="Grid view"
              >
                <BookOpen className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('archive')}
                className={`rounded-md p-1.5 transition-colors ${
                  viewMode === 'archive'
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-label="Archive view"
              >
                <Calendar className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {viewMode === 'archive' ? (
          <ArchiveView posts={filtered} />
        ) : (
          <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
            {/* Main content */}
            <div>
              {/* Filter active indicator */}
              {(categoryFilter || difficultyFilter) && (
                <div className="mb-6 flex flex-wrap items-center gap-2 font-mono text-[12px] text-muted-foreground">
                  <span>Filtered</span>
                  {categoryFilter && (
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] capitalize">
                      {categoryFilter}
                    </span>
                  )}
                  {difficultyFilter && (
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] capitalize">
                      {difficultyFilter}
                    </span>
                  )}
                  <span className="text-muted-foreground/60">
                    · {filtered.length} result{filtered.length !== 1 ? 's' : ''}
                  </span>
                </div>
              )}

              {/* Featured */}
              {featured.length > 0 && !categoryFilter && !difficultyFilter && (
                <section className="mb-10">
                  <div className="mb-5 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="font-mono text-[11px] uppercase tracking-wider text-foreground">
                      Featured
                    </span>
                    <span className="h-px flex-1 bg-border" />
                  </div>
                  <div className="space-y-5">
                    {featured.map((post) => (
                      <PostCard key={post.slug} post={post} featured />
                    ))}
                  </div>
                </section>
              )}

              {/* Latest */}
              {latest.length > 0 && !categoryFilter && !difficultyFilter && (
                <section className="mb-8">
                  <div className="mb-5 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="font-mono text-[11px] uppercase tracking-wider text-foreground">
                      Latest
                    </span>
                    <span className="h-px flex-1 bg-border" />
                  </div>
                  <div className="space-y-4">
                    {latest.map((post) => (
                      <PostCard key={post.slug} post={post} />
                    ))}
                  </div>
                </section>
              )}

              {/* Filtered results */}
              {(categoryFilter || difficultyFilter) && filtered.length > 0 && (
                <section>
                  <div className="space-y-4">
                    {filtered.map((post) => (
                      <PostCard key={post.slug} post={post} />
                    ))}
                  </div>
                </section>
              )}

              {filtered.length === 0 && (
                <div className="rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center">
                  <p className="text-muted-foreground">No posts match your filters.</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <AuthorCard />

              {/* Search */}
              <div
                className="rounded-xl border border-border bg-card p-5 cursor-pointer hover:border-primary/30 transition-colors"
                onClick={() => setSearchOpen(true)}
              >
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-3">
                  Search
                </p>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
                  <span>Search articles...</span>
                  <kbd className="ml-auto rounded border border-border px-1.5 py-0.5 font-mono text-[10px]">
                    /
                  </kbd>
                </div>
              </div>

              {/* Categories */}
              {allCategories.length > 0 && (
                <div className="rounded-xl border border-border bg-card p-5">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-3">
                    Categories
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {allCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCategoryFilter(cat === categoryFilter ? null : cat)}
                        className={`rounded-full px-3 py-1 font-mono text-[11px] transition-colors capitalize ${
                          cat === categoryFilter
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Tags */}
              {allTags.length > 0 && (
                <div className="rounded-xl border border-border bg-card p-5">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-3">
                    Tags
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {allTags.map(([tag, count]) => (
                      <span
                        key={tag}
                        className="rounded-full bg-muted px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground"
                      >
                        #{tag}
                        <span className="ml-1 text-muted-foreground/50">{count}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Series */}
              {posts.filter((p) => p.series).length > 0 && (
                <div className="rounded-xl border border-border bg-card p-5">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-3">
                    Series
                  </p>
                  <div className="space-y-2">
                    {Array.from(new Set(posts.filter((p) => p.series).map((p) => p.series!.name))).map(
                      (seriesName) => {
                        const seriesPosts = posts.filter((p) => p.series?.name === seriesName);
                        return (
                          <div key={seriesName} className="group flex items-center gap-2 text-sm">
                            <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                              {seriesName}
                            </span>
                            <span className="ml-auto font-mono text-[10px] text-muted-foreground/50">
                              {seriesPosts.length}
                            </span>
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>
              )}

              <div className="rounded-xl border border-border bg-card p-5">
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-3">
                  Portfolio
                </p>
                <a
                  href="/"
                  className="group flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Back to magar.xyz</span>
                </a>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}

const difficultyColors: Record<string, string> = {
  beginner: 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300',
  intermediate: 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300',
  advanced: 'border-red-200 dark:border-red-800 bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300',
};

function PostCard({ post, featured }: { post: Post; featured?: boolean }) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className={`group block rounded-xl border transition-all hover:shadow-[0_4px_20px_oklch(0_0_0/0.06)] ${
        featured
          ? 'border-primary/20 bg-primary/[0.02] p-6 hover:border-primary/40'
          : 'border-border bg-card p-5 hover:border-primary/30'
      }`}
    >
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="rounded-full bg-muted px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground capitalize">
          {post.category.replace('-', ' ')}
        </span>
        {featured && (
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] text-primary">
            featured
          </span>
        )}
        {post.difficulty && (
          <span
            className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] capitalize ${difficultyColors[post.difficulty]}`}
          >
            {post.difficulty}
          </span>
        )}
        {post.series && (
          <span className="rounded-full bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 px-2.5 py-0.5 font-mono text-[10px] text-purple-700 dark:text-purple-300">
            {post.series.part}/{post.series.total}
          </span>
        )}
      </div>

      <h2
        className={`font-bold tracking-tight group-hover:text-primary transition-colors ${featured ? 'text-xl' : 'text-lg'}`}
      >
        {post.title}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
        {post.excerpt}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-[11px] text-muted-foreground">
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
          {post.readingMinutes} min read
        </span>
        <div className="flex gap-1.5 flex-wrap">
          {post.tags.slice(0, 3).map((t) => (
            <span key={t} className="text-syntax-tag">
              #{t}
            </span>
          ))}
        </div>
        {post.updatedDate && (
          <span className="text-primary/60 text-[10px]">Updated</span>
        )}
        <span className="ml-auto text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          Read <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}
