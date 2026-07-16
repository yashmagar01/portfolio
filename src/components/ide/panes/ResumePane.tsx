import { CommentCaption, EditorContainer, Item, KeywordLabel } from './editor-shell';
import { Download, Mail, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { profile } from '@/data/portfolio';

export function ResumePane() {
  return (
    <EditorContainer>
      <Item>
        <KeywordLabel># about/resume.md</KeywordLabel>
      </Item>
      <Item className="mt-3">
        <h1 className="text-3xl font-semibold tracking-tight">Resume</h1>
      </Item>
      <Item className="mt-2">
        <CommentCaption>Yash Ajay Magar — AI Builder · Developer · Diploma Student</CommentCaption>
      </Item>

      <Item className="mt-8">
        <div className="rounded-xl border border-border bg-card p-8">
          <div className="flex items-start gap-5">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <FileText className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-semibold">Yash Magar — Resume</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Full-stack developer & AI builder · Pune, India · Available for freelance &
                internships
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg" className="gap-2">
              <a href="/resume.pdf" download="Yash_Magar_Resume.pdf">
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <a href={`mailto:${profile.email}?subject=Resume%20Request`}>
                <Mail className="h-4 w-4" />
                Request via email
              </a>
            </Button>
          </div>

          <div className="mt-6 rounded-lg border border-border bg-muted/40 p-4 font-mono text-[12px] text-muted-foreground">
            <span className="text-syntax-comment">// </span>
            Can&apos;t wait? Connect on{' '}
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              LinkedIn
            </a>{' '}
            for a quick look at my background.
          </div>
        </div>
      </Item>

      <Item className="mt-6">
        <div className="rounded-lg border border-border bg-muted/30 px-4 py-3 font-mono text-[12px] text-muted-foreground">
          <span className="text-syntax-comment">// last updated · July 2025</span>
        </div>
      </Item>
    </EditorContainer>
  );
}
