import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/projects';

interface RelatedProjectsProps {
  relatedSlugs: string[];
}

export function RelatedProjects({ relatedSlugs }: RelatedProjectsProps) {
  const related = projects.filter((p) => relatedSlugs.includes(p.slug));

  if (related.length === 0) return null;

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="mb-4 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        Related Projects
      </p>
      <div className="space-y-3">
        {related.map((project) => (
          <div
            key={project.slug}
            className="rounded-lg border border-border bg-background p-4 transition-colors hover:border-primary/30"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">{project.title}</p>
                <p className="mt-1 text-[12px] text-muted-foreground line-clamp-2">
                  {project.tagline}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-3">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-3.5 w-3.5" />
                  Repository
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 font-mono text-[11px] text-primary hover:text-primary/80 transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
