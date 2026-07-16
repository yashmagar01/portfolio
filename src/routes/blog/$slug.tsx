import { useState } from 'react';
import { createFileRoute, notFound } from '@tanstack/react-router';
import { posts } from '@/data/blog';
import { BlogNav } from '@/components/blog/BlogNav';
import { ReadingProgress } from '@/components/blog/ReadingProgress';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { ShareRow } from '@/components/blog/ShareRow';
import { PostNav } from '@/components/blog/PostNav';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import { AuthorCard } from '@/components/blog/AuthorCard';
import { RenderBody } from '@/components/blog/RenderBody';
import { ArticleMetadata } from '@/components/blog/ArticleMetadata';
import { SeriesCard } from '@/components/blog/SeriesCard';
import { RelatedProjects } from '@/components/blog/RelatedProjects';
import { SearchDialog } from '@/components/blog/SearchDialog';
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';
import { Calendar, Clock, BookOpen } from 'lucide-react';

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { post } = loaderData;
    const url = `https://magar.xyz/blog/${post.slug}`;
    return {
      meta: [
        { title: `${post.title} — Yash Magar` },
        { name: 'description', content: post.description || post.excerpt },
        { name: 'author', content: 'Yash Ajay Magar' },
        { property: 'og:title', content: post.title },
        { property: 'og:description', content: post.description || post.excerpt },
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: url },
        { property: 'og:site_name', content: 'magar.xyz' },
        { property: 'article:published_time', content: post.date },
        ...(post.updatedDate
          ? [{ property: 'article:modified_time', content: post.updatedDate }]
          : []),
        ...post.tags.map((tag) => ({ property: 'article:tag', content: tag })),
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: post.title },
        { name: 'twitter:description', content: post.description || post.excerpt },
        { name: 'twitter:creator', content: '@yashmag50534849' },
      ],
      links: [
        { rel: 'canonical', href: post.canonical || url },
        ...(post.github ? [{ rel: 'alternate', href: post.github, type: 'text/html' }] : []),
      ],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description || post.excerpt,
            url: url,
            datePublished: post.date,
            ...(post.updatedDate ? { dateModified: post.updatedDate } : {}),
            keywords: post.tags.join(', '),
            wordCount: post.wordCount,
            author: {
              '@type': 'Person',
              name: 'Yash Ajay Magar',
              url: 'https://magar.xyz',
              sameAs: [
                'https://github.com/yashmagar01',
                'https://www.linkedin.com/in/yash-magar/',
                'https://x.com/yashmag50534849',
              ],
            },
            publisher: {
              '@type': 'Person',
              name: 'Yash Ajay Magar',
              url: 'https://magar.xyz',
            },
          }),
        },
      ],
    };
  },
  component: PostPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Post not found</h1>
        <p className="mt-3 text-muted-foreground">
          This article doesn&apos;t exist or may have been moved.
        </p>
        <a
          href="/blog"
          className="mt-6 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          ← Back to Writing
        </a>
      </div>
    </div>
  ),
});

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function PostPage() {
  const { post } = Route.useLoaderData();
  const [searchOpen, setSearchOpen] = useState(false);

  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const currentIndex = sortedPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = sortedPosts[currentIndex + 1] ?? null;
  const nextPost = sortedPosts[currentIndex - 1] ?? null;

  useKeyboardShortcuts({
    onSearch: () => setSearchOpen(true),
    posts: sortedPosts,
    currentSlug: post.slug,
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ReadingProgress />
      <BlogNav postTitle={post.title} />
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Hero */}
      <div className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-5xl px-4 pb-10 pt-12 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="rounded-full bg-muted px-3 py-1 font-mono text-[11px] text-muted-foreground capitalize">
              {post.category.replace('-', ' ')}
            </span>
            {post.featured && (
              <span className="rounded-full bg-primary/10 px-3 py-1 font-mono text-[11px] text-primary">
                featured
              </span>
            )}
            {post.series && (
              <span className="rounded-full bg-purple-50 border border-purple-200 px-3 py-1 font-mono text-[11px] text-purple-700">
                {post.series.name} · Part {post.series.part}
              </span>
            )}
            {post.difficulty && (
              <span
                className={`rounded-full border px-3 py-1 font-mono text-[11px] capitalize ${
                  post.difficulty === 'beginner'
                    ? 'border-green-200 bg-green-50 text-green-700'
                    : post.difficulty === 'intermediate'
                      ? 'border-amber-200 bg-amber-50 text-amber-700'
                      : 'border-red-200 bg-red-100 text-red-700'
                }`}
              >
                {post.difficulty}
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl max-w-3xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {post.excerpt}
          </p>

          <div className="mt-6">
            <ArticleMetadata post={post} />
          </div>

          {/* GitHub / Demo links */}
          {(post.github || post.demo) && (
            <div className="mt-4 flex flex-wrap gap-3">
              {post.github && (
                <a
                  href={post.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 font-mono text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  GitHub
                </a>
              )}
              {post.demo && (
                <a
                  href={post.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 font-mono text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-5xl px-4 pt-10 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_260px]">
          {/* Article */}
          <article>
            <RenderBody body={post.body} />

            {/* Divider */}
            <hr className="my-12 border-border" />

            {/* Author + share */}
            <div className="space-y-8">
              <ShareRow title={post.title} slug={post.slug} />
              <PostNav prev={prevPost} next={nextPost} />
              <RelatedPosts current={post} all={posts} />
              {post.relatedProjects && post.relatedProjects.length > 0 && (
                <RelatedProjects relatedSlugs={post.relatedProjects} />
              )}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {post.series && (
                <SeriesCard series={post.series} currentSlug={post.slug} allPosts={posts} />
              )}
              <TableOfContents body={post.body} />
              <AuthorCard compact />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
