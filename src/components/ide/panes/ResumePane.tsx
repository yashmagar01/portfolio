import { CommentCaption, EditorContainer, Item, KeywordLabel } from './editor-shell';
import { Download, Mail } from 'lucide-react';
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
        <CommentCaption>
          Yash Ajay Magar — AI Enthusiast • Developer • Entrepreneur • Diploma Student
        </CommentCaption>
      </Item>

      <Item className="mt-8">
        <div className="rounded-xl border border-border bg-muted/40 p-8 text-center">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
            <Download className="h-6 w-6" strokeWidth={1.6} />
          </div>
          <h2 className="text-lg font-semibold">Resume PDF coming soon</h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-xs mx-auto">
            A downloadable PDF resume is on the way. In the meantime, reach out directly for an
            up-to-date copy.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <a href="/resume.pdf" download>
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={`mailto:${profile.email}`}>
                <Mail className="h-4 w-4" />
                Request via email
              </a>
            </Button>
          </div>
          <div className="mt-6 rounded-lg border border-border bg-background/60 p-4 text-left font-mono text-[12px] text-muted-foreground">
            <span className="text-syntax-comment">// </span>
            Can't wait? Connect on{' '}
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
    </EditorContainer>
  );
}
