import { skills, education } from '@/data/portfolio';
import { CommentCaption, EditorContainer, Item, KeywordLabel } from './editor-shell';
import { Package, GraduationCap, Star } from 'lucide-react';

export function SkillsPane() {
  const grouped = skills.reduce<Record<string, typeof skills>>((acc, s) => {
    (acc[s.category] ??= []).push(s);
    return acc;
  }, {});

  return (
    <EditorContainer>
      <Item>
        <KeywordLabel># about/skills.json</KeywordLabel>
      </Item>
      <Item className="mt-3">
        <h1 className="text-3xl font-semibold tracking-tight">Extensions installed</h1>
      </Item>
      <Item className="mt-2">
        <CommentCaption>
          the tools I reach for most often, rated by how comfortable I actually am — not
          aspirationally.
        </CommentCaption>
      </Item>

      {Object.entries(grouped).map(([cat, items]) => (
        <Item key={cat} className="mt-8">
          <div className="mb-3 flex items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-wider text-syntax-tag">
              {cat}
            </span>
            <span className="h-px flex-1 bg-border" />
            <span className="font-mono text-[11px] text-muted-foreground">{items.length}</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {items.map((s) => (
              <div
                key={s.name}
                className="group flex items-start gap-3 rounded-lg border border-border bg-card p-3 transition-all hover:border-primary/30 hover:shadow-panel"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-muted text-primary">
                  <Package className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-[14px]">{s.name}</h3>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < s.level ? 'fill-syntax-number text-syntax-number' : 'text-muted-foreground/30'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-[11.5px] text-muted-foreground">{s.publisher}</p>
                </div>
              </div>
            ))}
          </div>
        </Item>
      ))}
    </EditorContainer>
  );
}

export function EducationPane() {
  return (
    <EditorContainer>
      <Item>
        <KeywordLabel># about/education.md</KeywordLabel>
      </Item>
      <Item className="mt-3">
        <h1 className="text-3xl font-semibold tracking-tight">Education</h1>
      </Item>
      <Item className="mt-2">
        <CommentCaption>where I've been taught, and where I've taught myself.</CommentCaption>
      </Item>

      <div className="mt-8 space-y-4">
        {education.map((e, i) => (
          <Item key={i}>
            <div className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-start gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
                  <GraduationCap className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-semibold">{e.school}</h3>
                    <span className="font-mono text-[12px] text-muted-foreground">{e.period}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-syntax-var">{e.program}</p>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{e.detail}</p>
                </div>
              </div>
            </div>
          </Item>
        ))}
      </div>
    </EditorContainer>
  );
}
