import { useMemo, useRef, useState } from 'react';
import { projects, type Project } from '@/data/projects';
import { CommentCaption, EditorContainer, Item, KeywordLabel } from './editor-shell';
import { useTabs } from '@/lib/ide/tabs-context';
import { motion } from 'motion/react';
import {
  Archive,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Github,
  Image,
  LayoutGrid,
  List,
  Pin,
  Tag,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const CATEGORY_LABEL: Record<string, string> = {
  web: 'web',
  mobile: 'mobile',
  tool: 'tool',
  ai: 'ai',
};

export function ProjectsIndexPane() {
  const { open } = useTabs();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<string | null>(null);

  const tags = useMemo(() => Array.from(new Set(projects.map((p) => p.category))), []);
  const shown = filter ? projects.filter((p) => p.category === filter) : projects;
  const featured = shown.filter((p) => p.featured);
  const archived = shown.filter((p) => !p.featured);

  return (
    <EditorContainer>
      <Item>
        <KeywordLabel># projects/</KeywordLabel>
      </Item>
      <Item className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {projects.length} repositories · {featured.length} featured
          </p>
        </div>
        <div className="flex items-center gap-1 rounded-md border border-border p-0.5">
          <button
            onClick={() => setView('grid')}
            className={cn(
              'grid h-7 w-7 place-items-center rounded',
              view === 'grid' ? 'bg-selection text-primary' : 'text-muted-foreground hover:bg-hover'
            )}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setView('list')}
            className={cn(
              'grid h-7 w-7 place-items-center rounded',
              view === 'list' ? 'bg-selection text-primary' : 'text-muted-foreground hover:bg-hover'
            )}
            aria-label="List view"
          >
            <List className="h-3.5 w-3.5" />
          </button>
        </div>
      </Item>

      <Item className="mt-4 flex flex-wrap gap-1.5">
        <FilterChip label="all" active={filter === null} onClick={() => setFilter(null)} />
        {tags.map((t) => (
          <FilterChip
            key={t}
            label={CATEGORY_LABEL[t] ?? t}
            active={filter === t}
            onClick={() => setFilter(t)}
          />
        ))}
      </Item>

      {featured.length > 0 && (
        <Item className="mt-6">
          <SectionHeader Icon={Pin} label="pinned" />
          <div
            className={cn(
              'mt-3',
              view === 'grid' ? 'grid gap-4 sm:grid-cols-2' : 'flex flex-col gap-2'
            )}
          >
            {featured.map((p) =>
              view === 'grid' ? (
                <ProjectCard key={p.slug} project={p} onOpen={open} />
              ) : (
                <ProjectRow key={p.slug} project={p} onOpen={open} />
              )
            )}
          </div>
        </Item>
      )}

      {archived.length > 0 && (
        <Item className="mt-10">
          <SectionHeader Icon={Archive} label="archive" />
          <div className="mt-3 flex flex-col gap-1.5">
            {archived.map((p) => (
              <ProjectRow key={p.slug} project={p} onOpen={open} muted />
            ))}
          </div>
        </Item>
      )}
    </EditorContainer>
  );
}

function SectionHeader({ Icon, label }: { Icon: typeof Pin; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full border px-3 py-1 font-mono text-[11px] transition-colors',
        active
          ? 'border-primary bg-primary/10 text-primary'
          : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
      )}
    >
      {label}
    </button>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (t: any) => void }) {
  return (
    <motion.button
      whileHover={{ y: -4, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={() =>
        onOpen({
          id: `projects/${project.slug}`,
          label: project.file,
          path: `projects/${project.file}`,
          kind: 'file',
        })
      }
      className="group flex flex-col rounded-lg border border-border bg-card p-4 text-left transition-all hover:border-primary/40 hover:shadow-float"
    >
      <div className="flex items-center gap-2">
        <span className="font-mono text-[12px] text-syntax-fn group-hover:text-primary">
          {project.file}
        </span>
        <span className="ml-auto font-mono text-[10px] text-muted-foreground">{project.year}</span>
      </div>
      <h3 className="mt-3 text-lg font-semibold leading-tight">{project.title}</h3>
      <p className="mt-1.5 text-[13.5px] text-muted-foreground line-clamp-2">{project.tagline}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tech.slice(0, 4).map((t) => (
          <span
            key={t}
            className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10.5px] text-syntax-var"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.button>
  );
}

function ProjectRow({
  project,
  onOpen,
  muted,
}: {
  project: Project;
  onOpen: (t: any) => void;
  muted?: boolean;
}) {
  return (
    <button
      onClick={() =>
        onOpen({
          id: `projects/${project.slug}`,
          label: project.file,
          path: `projects/${project.file}`,
          kind: 'file',
        })
      }
      className={cn(
        'group flex items-center gap-3 rounded-md border border-transparent px-3 py-2 text-left transition-colors hover:border-primary/30 hover:bg-hover',
        muted && 'opacity-80'
      )}
    >
      <span className="font-mono text-[12.5px] text-syntax-fn group-hover:text-primary min-w-0 truncate">
        {project.file}
      </span>
      <span className="text-[13px] text-muted-foreground truncate">{project.tagline}</span>
      <div className="ml-auto flex shrink-0 items-center gap-1.5">
        {project.tech.slice(0, 2).map((t) => (
          <span
            key={t}
            className="hidden sm:inline rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
          >
            {t}
          </span>
        ))}
        <span className="font-mono text-[10.5px] text-muted-foreground">{project.year}</span>
      </div>
    </button>
  );
}

// ─── Category-based gradient palette for fallback banners ───
const categoryGradients: Record<string, string> = {
  web: 'linear-gradient(135deg, oklch(0.55 0.17 240) 0%, oklch(0.4 0.2 260) 50%, oklch(0.35 0.15 280) 100%)',
  mobile:
    'linear-gradient(135deg, oklch(0.6 0.15 165) 0%, oklch(0.5 0.18 185) 50%, oklch(0.4 0.15 200) 100%)',
  tool: 'linear-gradient(135deg, oklch(0.65 0.18 75) 0%, oklch(0.55 0.22 55) 50%, oklch(0.45 0.2 35) 100%)',
  ai: 'linear-gradient(135deg, oklch(0.55 0.2 305) 0%, oklch(0.45 0.25 290) 50%, oklch(0.4 0.2 270) 100%)',
};

function statusLabel(featured: boolean): string {
  return featured ? 'shipped · maintained' : 'archived';
}

// ─── Hero Banner ───
function HeroBanner({ project }: { project: Project }) {
  const bannerBg = project.bannerImage
    ? `url(${project.bannerImage})`
    : (categoryGradients[project.category] ?? categoryGradients.web);

  return (
    <div
      className="relative flex h-[360px] w-full flex-col justify-end overflow-hidden"
      style={{
        background: bannerBg,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-6 sm:px-10">
        <div className="flex items-center gap-2">
          <KeywordLabel>
            <span className="text-white/70">
              # projects/{project.featured ? '' : 'archive/'}
              {project.file}
            </span>
          </KeywordLabel>
        </div>

        <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {project.title}
        </h1>

        <p className="mt-1 text-lg text-white/80">
          by Yash · {project.tech[0] ?? project.category}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[12px] font-medium text-white backdrop-blur-sm">
            <Tag className="h-3 w-3" />
            {CATEGORY_LABEL[project.category] ?? project.category}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[12px] font-medium text-white backdrop-blur-sm">
            <Calendar className="h-3 w-3" />
            {project.year}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[12px] font-medium text-white backdrop-blur-sm">
            <CheckCircle2 className="h-3 w-3" />
            {statusLabel(project.featured)}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── CTA Row ───
function CTARow({ project }: { project: Project }) {
  return (
    <div className="-mt-px flex flex-wrap items-center gap-3 border-b border-border bg-background px-6 py-4 sm:px-10">
      {project.liveUrl && (
        <Button asChild size="lg" className="gap-2">
          <a href={project.liveUrl} target="_blank" rel="noreferrer">
            <ExternalLink className="h-4 w-4" />
            Live Demo
          </a>
        </Button>
      )}
      {project.repoUrl && (
        <Button asChild variant="outline" size="lg" className="gap-2">
          <a href={project.repoUrl} target="_blank" rel="noreferrer">
            <Github className="h-4 w-4" />
            View Source
          </a>
        </Button>
      )}
    </div>
  );
}

// ─── Screenshot Carousel ───
function ScreenshotCarousel({ project }: { project: Project }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const shots = project.screenshots && project.screenshots.length > 0 ? project.screenshots : null;

  return (
    <div className="border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-6 py-6 sm:px-10">
        <CommentCaption>
          {shots ? 'screenshots / previews' : 'screenshots (coming soon)'}
        </CommentCaption>

        {shots ? (
          <div
            ref={scrollRef}
            className="ide-scrollbar -mx-6 mt-3 flex gap-4 overflow-x-auto px-6 pb-2 sm:-mx-10 sm:px-10"
          >
            {shots.map((src, i) => (
              <div
                key={i}
                className="shrink-0 overflow-hidden rounded-lg border border-border shadow-panel"
              >
                <img
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  className="h-[200px] w-[356px] object-cover md:h-[240px] md:w-[427px]"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-3 flex gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex h-[200px] w-[356px] shrink-0 items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 md:h-[240px] md:w-[427px]"
              >
                <div className="text-center">
                  <Image className="mx-auto h-8 w-8 text-muted-foreground/40" />
                  <p className="mt-2 font-mono text-[11px] text-muted-foreground/50">
                    screenshot_{i}.png
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── About Section (left column) ───
function AboutSection({ project }: { project: Project }) {
  return (
    <div className="min-w-0">
      <div className="mb-1">
        <KeywordLabel># about</KeywordLabel>
      </div>

      <h2 className="text-2xl font-semibold tracking-tight">About this project</h2>
      <p className="mt-3 text-[15px] leading-relaxed text-foreground/85">{project.description}</p>

      <div className="mt-8">
        <CommentCaption>the problem I ran into</CommentCaption>
        <h3 className="mt-2 text-xl font-semibold">Problem</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-foreground/85">{project.problem}</p>
      </div>

      <div className="mt-8">
        <CommentCaption>how I approached it</CommentCaption>
        <h3 className="mt-2 text-xl font-semibold">Approach</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-foreground/85">{project.approach}</p>
      </div>

      {project.highlights.length > 0 && (
        <div className="mt-8">
          <CommentCaption>what actually matters here</CommentCaption>
          <h3 className="mt-2 text-xl font-semibold">Highlights</h3>
          <ul className="mt-3 space-y-2">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-[14.5px] leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ─── Tech Stack Card ───
function TechStackCard({ tech }: { tech: string[] }) {
  return (
    <div className="rounded-lg border border-border bg-card shadow-panel">
      <div className="border-b border-border px-4 py-3">
        <span className="font-mono text-[11px] uppercase tracking-wider text-syntax-keyword">
          tech stack
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5 p-4">
        {tech.map((t) => (
          <span
            key={t}
            className="rounded-md border border-border bg-muted/50 px-2.5 py-1 font-mono text-[12px] text-syntax-var"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Details Card ───
function DetailsCard({ project }: { project: Project }) {
  const rows: { label: string; value: string }[] = [
    { label: 'Category', value: CATEGORY_LABEL[project.category] ?? project.category },
    { label: 'Status', value: statusLabel(project.featured) },
    { label: 'Year', value: String(project.year) },
  ];

  return (
    <div className="rounded-lg border border-border bg-card shadow-panel">
      <div className="border-b border-border px-4 py-3">
        <span className="font-mono text-[11px] uppercase tracking-wider text-syntax-keyword">
          details
        </span>
      </div>
      <div className="divide-y divide-border">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between px-4 py-2.5">
            <span className="font-mono text-[11px] text-muted-foreground">{row.label}</span>
            <span className="font-mono text-[12px] text-syntax-string">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── More Projects Card ───
function MoreProjectsCard({ current, onOpen }: { current: Project; onOpen: (tab: any) => void }) {
  const others = projects
    .filter((p) => p.slug !== current.slug)
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return b.year - a.year;
    })
    .slice(0, 4);

  return (
    <div className="rounded-lg border border-border bg-card shadow-panel">
      <div className="border-b border-border px-4 py-3">
        <span className="font-mono text-[11px] uppercase tracking-wider text-syntax-keyword">
          more projects
        </span>
      </div>
      <div className="divide-y divide-border">
        {others.map((p) => (
          <button
            key={p.slug}
            onClick={() =>
              onOpen({
                id: `projects/${p.slug}`,
                label: p.file,
                path: `projects/${p.file}`,
                kind: 'file',
              })
            }
            className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-hover"
          >
            <div
              className="h-10 w-10 shrink-0 rounded-md"
              style={{
                background: categoryGradients[p.category] ?? categoryGradients.web,
                backgroundSize: 'cover',
              }}
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-medium">{p.title}</p>
              <p className="truncate font-mono text-[11px] text-muted-foreground">{p.file}</p>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Right Rail ───
function RightRail({
  project,
  currentSlug,
  onOpen,
}: {
  project: Project;
  currentSlug: string;
  onOpen: (tab: any) => void;
}) {
  return (
    <aside className="flex flex-col gap-4">
      <TechStackCard tech={project.tech} />
      <DetailsCard project={project} />
      <MoreProjectsCard current={project} onOpen={onOpen} />
    </aside>
  );
}

// ─── Main Project Pane ───
export function ProjectPane({ slug }: { slug: string }) {
  const project = projects.find((p) => p.slug === slug);
  const { open } = useTabs();
  if (!project) return <NotFoundPane path={`projects/${slug}`} />;

  return (
    <div className="min-h-full">
      <HeroBanner project={project} />
      <CTARow project={project} />
      <ScreenshotCarousel project={project} />

      <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-8 sm:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <AboutSection project={project} />
          <RightRail project={project} currentSlug={slug} onOpen={open} />
        </div>
      </div>
    </div>
  );
}

export function NotFoundPane({ path }: { path: string }) {
  return (
    <EditorContainer>
      <Item>
        <KeywordLabel># 404</KeywordLabel>
      </Item>
      <Item className="mt-3">
        <h1 className="text-3xl font-semibold">Cannot resolve file</h1>
      </Item>
      <Item className="mt-2">
        <p className="font-mono text-sm text-muted-foreground">
          <span className="text-syntax-string">"{path}"</span> was not found in this workspace.
        </p>
      </Item>
    </EditorContainer>
  );
}
