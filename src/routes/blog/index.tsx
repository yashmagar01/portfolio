import { createFileRoute, Link } from '@tanstack/react-router';
import { posts } from '@/data/blog';
import { BlogNav } from '@/components/blog/BlogNav';
import { AuthorCard } from '@/components/blog/AuthorCard';
import { Calendar, Clock, ExternalLink } from 'lucide-react';

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

function BlogIndexPage() {
  const featured = posts.filter((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);
  const allCategories = Array.from(new Set(posts.map((p) => p.category)));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BlogNav />

      <main className="mx-auto max-w-5xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 border-b border-border pb-10">
          <p className="font-mono text-[11px] uppercase tracking-widest text-primary mb-2">
            # blog/
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Writing</h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-xl">
            Essays, opinions, and technical notes. I write about AI, building software, and what
            it's like to ship real things as a self-taught developer.
          </p>
          <p className="mt-3 font-mono text-[12px] text-muted-foreground">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} ·{' '}
            {posts.reduce((s, p) => s + p.readingMinutes, 0)} min total reading
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
          {/* Post list */}
          <div>
            {featured.length > 0 && (
              <section className="mb-12">
                <div className="mb-5 flex items-center gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    featured
                  </span>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <div className="space-y-6">
                  {featured.map((post) => (
                    <PostCard key={post.slug} post={post} featured />
                  ))}
                </div>
              </section>
            )}

            {rest.length > 0 && (
              <section>
                <div className="mb-5 flex items-center gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    all posts
                  </span>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <div className="space-y-4">
                  {rest.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              </section>
            )}

            {posts.length === 0 && (
              <div className="rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center">
                <p className="text-muted-foreground">No posts yet. Check back soon.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <AuthorCard />

            {allCategories.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-3">
                  topics
                </p>
                <div className="flex flex-wrap gap-2">
                  {allCategories.map((cat) => (
                    <span
                      key={cat}
                      className="rounded-full border border-border bg-muted px-3 py-1 font-mono text-[11px] text-muted-foreground"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-xl border border-border bg-card p-5">
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-3">
                portfolio
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
      </main>
    </div>
  );
}

function PostCard({ post, featured }: { post: (typeof posts)[0]; featured?: boolean }) {
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
      <div className="flex items-center gap-2 mb-3">
        <span className="rounded-full bg-muted px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground capitalize">
          {post.category.replace('-', ' ')}
        </span>
        {featured && (
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] text-primary">
            featured
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
          {new Date(post.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
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
        <span className="ml-auto text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          Read →
        </span>
      </div>
    </Link>
  );
}
