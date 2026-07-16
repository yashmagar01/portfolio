import { useState, type ReactNode } from 'react';
import { posts, type Post } from '@/data/blog';
import { vlogs } from '@/data/vlogs';
import { CommentCaption, EditorContainer, Item, KeywordLabel } from './editor-shell';
import { Calendar, Clock, Play, FileText, Video, ExternalLink, Youtube } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useTabs } from '@/lib/ide/tabs-context';

function formatDate(d: string) {
  return new Date(d).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Very small markdown-ish renderer for our seed content */
function RenderBody({ body }: { body: string }) {
  const blocks = body.split(/\n\n+/);
  return (
    <div className="prose-editor">
      {blocks.map((block, i) => {
        if (block.startsWith('# ')) {
          return <h1 key={i}>{block.slice(2)}</h1>;
        }
        if (block.startsWith('## ')) {
          return <h2 key={i}>{block.slice(3)}</h2>;
        }
        if (block.startsWith('### ')) {
          return <h3 key={i}>{block.slice(4)}</h3>;
        }
        if (/^\s*[-*]\s/m.test(block) && block.split('\n').every((l) => /^\s*[-*]\s/.test(l))) {
          return (
            <ul key={i}>
              {block.split('\n').map((line, j) => (
                <li key={j}>{renderInline(line.replace(/^\s*[-*]\s/, ''))}</li>
              ))}
            </ul>
          );
        }
        if (/^\s*\d+\.\s/m.test(block) && block.split('\n').every((l) => /^\s*\d+\.\s/.test(l))) {
          return (
            <ol key={i}>
              {block.split('\n').map((line, j) => (
                <li key={j}>{renderInline(line.replace(/^\s*\d+\.\s/, ''))}</li>
              ))}
            </ol>
          );
        }
        return <p key={i}>{renderInline(block)}</p>;
      })}
    </div>
  );
}

function renderInline(text: string) {
  // handle **bold**, *italic*, `code`, [label](url)
  const parts: ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let k = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const token = match[0];
    if (token.startsWith('**')) parts.push(<strong key={k++}>{token.slice(2, -2)}</strong>);
    else if (token.startsWith('`')) parts.push(<code key={k++}>{token.slice(1, -1)}</code>);
    else if (token.startsWith('[')) {
      const m = /\[([^\]]+)\]\(([^)]+)\)/.exec(token);
      if (m)
        parts.push(
          <a key={k++} href={m[2]} target="_blank" rel="noreferrer">
            {m[1]}
          </a>
        );
    } else if (token.startsWith('*')) parts.push(<em key={k++}>{token.slice(1, -1)}</em>);
    last = match.index + token.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export function BlogIndexPane() {
  return (
    <EditorContainer>
      <Item>
        <KeywordLabel># blog/</KeywordLabel>
      </Item>
      <Item className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Writing</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} published
          </p>
        </div>
        <a
          href="/blog"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-primary/30 bg-primary/5 px-3 py-1.5 font-mono text-[11px] text-primary transition-colors hover:bg-primary/10"
        >
          <ExternalLink className="h-3 w-3" />
          Open blog
        </a>
      </Item>
      <Item className="mt-2">
        <CommentCaption>essays, notes, and things I've figured out along the way.</CommentCaption>
      </Item>

      {posts.length === 0 ? (
        <Item className="mt-8">
          <div className="rounded-xl border border-border bg-muted/40 p-8 text-center">
            <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
              <FileText className="h-6 w-6" strokeWidth={1.6} />
            </div>
            <h2 className="text-lg font-semibold">Writing coming soon</h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs mx-auto">
              Essays, notes, and things I've figured out along the way — once I start writing them
              down.
            </p>
            <div className="mt-6 rounded-lg border border-border bg-background/60 p-4 text-left font-mono text-[12px] text-muted-foreground">
              <span className="text-syntax-comment">// </span>
              This space is intentionally left blank... for now.
            </div>
          </div>
        </Item>
      ) : (
        <div className="mt-8 space-y-2">
          {posts.map((p) => (
            <Item key={p.slug}>
              <a
                href={`/blog/${p.slug}`}
                target="_blank"
                rel="noreferrer"
                className="group block w-full rounded-lg border border-transparent p-4 text-left transition-all hover:border-primary/30 hover:bg-hover"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>
                  <span className="font-mono text-[11px] text-muted-foreground shrink-0">
                    {formatDate(p.date)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{p.excerpt}</p>
                <div className="mt-3 flex items-center gap-3 font-mono text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {p.readingMinutes} min
                  </span>
                  <div className="flex gap-1">
                    {p.tags.map((t) => (
                      <span key={t} className="text-syntax-tag">
                        #{t}
                      </span>
                    ))}
                  </div>
                  <span className="ml-auto flex items-center gap-1 text-primary/60">
                    <ExternalLink className="h-2.5 w-2.5" />
                    read
                  </span>
                </div>
              </a>
            </Item>
          ))}
        </div>
      )}
    </EditorContainer>
  );
}

export function PostPane({ slug }: { slug: string }) {
  const post = posts.find((p) => p.slug === slug);
  const [view, setView] = useState<'rendered' | 'raw'>('rendered');
  if (!post) return null;
  return (
    <EditorContainer>
      <Item className="flex items-center justify-between">
        <KeywordLabel># blog/{post.file}</KeywordLabel>
        <div className="flex items-center gap-1 rounded-md border border-border p-0.5 font-mono text-[11px]">
          <button
            onClick={() => setView('rendered')}
            className={cn(
              'rounded px-2 py-0.5',
              view === 'rendered' ? 'bg-selection text-primary' : 'text-muted-foreground'
            )}
          >
            rendered
          </button>
          <button
            onClick={() => setView('raw')}
            className={cn(
              'rounded px-2 py-0.5',
              view === 'raw' ? 'bg-selection text-primary' : 'text-muted-foreground'
            )}
          >
            raw
          </button>
        </div>
      </Item>

      <Item className="mt-4 flex items-center gap-3 text-[12px] text-muted-foreground font-mono">
        <span className="flex items-center gap-1">
          <Calendar className="h-3 w-3" /> {formatDate(post.date)}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" /> {post.readingMinutes} min read
        </span>
        <div className="flex gap-1">
          {post.tags.map((t) => (
            <span key={t} className="text-syntax-tag">
              #{t}
            </span>
          ))}
        </div>
      </Item>

      <Item className="mt-4">
        {view === 'rendered' ? (
          <RenderBody body={post.body} />
        ) : (
          <pre className="ide-scrollbar overflow-x-auto rounded-md bg-muted p-4 font-mono text-[12.5px] leading-relaxed">
            {post.body}
          </pre>
        )}
      </Item>
    </EditorContainer>
  );
}

export function VlogsIndexPane() {
  const { open } = useTabs();
  return (
    <EditorContainer>
      <Item>
        <KeywordLabel># vlogs/</KeywordLabel>
      </Item>
      <Item className="mt-3">
        <h1 className="text-3xl font-semibold tracking-tight">Vlogs</h1>
      </Item>
      <Item className="mt-2">
        <CommentCaption>short films from the desk. process, life, occasional rants.</CommentCaption>
      </Item>

      {vlogs.length === 0 ? (
        <Item className="mt-8">
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            {/* Recording indicator strip */}
            <div className="flex items-center gap-2.5 border-b border-border bg-muted/40 px-4 py-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                rec · standby
              </span>
              <Youtube className="ml-auto h-4 w-4 text-muted-foreground/50" />
            </div>

            <div className="p-8">
              <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <Video className="h-6 w-6" strokeWidth={1.6} />
              </div>
              <h2 className="text-lg font-semibold text-center">First video is in the edit bay.</h2>
              <p className="mt-3 text-sm text-muted-foreground text-center max-w-sm mx-auto leading-relaxed">
                I film the build process — building real software from a hostel room, the wins, the
                debugging sessions that go nowhere at 2am, the shipping moments. Coming soon.
              </p>

              <div className="mt-6 flex justify-center">
                <a
                  href={`mailto:${"yashajaymagar10@gmail.com"}?subject=Notify%20me%20when%20vlogs%20drop`}
                  className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
                >
                  <span>Notify me when they drop</span>
                </a>
              </div>

              <div className="mt-6 rounded-lg border border-border bg-background/60 p-4 text-left font-mono text-[12px] text-muted-foreground">
                <span className="text-syntax-comment">// </span>
                No videos uploaded yet. Subscribe on YouTube for updates.
              </div>
            </div>
          </div>
        </Item>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {vlogs.map((v) => (
            <Item key={v.slug}>
              <button
                onClick={() =>
                  open({
                    id: `vlogs/${v.slug}`,
                    label: v.file,
                    path: `vlogs/${v.file}`,
                    kind: 'file',
                  })
                }
                className="group block w-full overflow-hidden rounded-lg border border-border bg-card text-left transition-all hover:border-primary/40 hover:shadow-panel"
              >
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <img
                    src={`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 grid place-items-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-white/90 text-foreground shadow-float">
                      <Play className="h-5 w-5 translate-x-0.5 fill-current" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[10px] text-white">
                    {v.duration}
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-[14px] group-hover:text-primary">{v.title}</h3>
                  <p className="mt-1 text-[12px] text-muted-foreground line-clamp-2">
                    {v.description}
                  </p>
                  <p className="mt-2 font-mono text-[10.5px] text-muted-foreground">
                    {formatDate(v.date)}
                  </p>
                </div>
              </button>
            </Item>
          ))}
        </div>
      )}
    </EditorContainer>
  );
}

export function VlogPane({ slug }: { slug: string }) {
  const v = vlogs.find((x) => x.slug === slug);
  if (!v) return null;
  return (
    <EditorContainer>
      <Item>
        <KeywordLabel># vlogs/{v.file}</KeywordLabel>
      </Item>
      <Item className="mt-3">
        <h1 className="text-3xl font-semibold tracking-tight">{v.title}</h1>
      </Item>
      <Item className="mt-2 flex items-center gap-3 font-mono text-[12px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <Calendar className="h-3 w-3" /> {formatDate(v.date)}
        </span>
        <span>·</span>
        <span>{v.duration}</span>
      </Item>
      <Item className="mt-6 overflow-hidden rounded-lg border border-border bg-black">
        <div className="aspect-video">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${v.youtubeId}`}
            title={v.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </Item>
      <Item className="mt-4">
        <p className="text-[15px] leading-relaxed text-foreground/85">{v.description}</p>
      </Item>
    </EditorContainer>
  );
}
