import { useState } from "react";
import { profile } from "@/data/portfolio";
import { CommentCaption, EditorContainer, Item, KeywordLabel } from "./editor-shell";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, FolderGit2, Github, Sparkles } from "lucide-react";
import { useTabs } from "@/lib/ide/tabs-context";
import { motion } from "motion/react";

function TypedHeadline({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  const chars = text.split("");
  return (
    <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.05]">
      <motion.span
        initial="hidden"
        animate="show"
        onAnimationComplete={() => setDone(true)}
        className="inline-block align-bottom"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.03, delayChildren: 0.04 } },
        }}
      >
        {chars.map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={{
              hidden: { opacity: 0, x: -3 },
              show: {
                opacity: 1,
                x: 0,
                transition: { type: "spring", stiffness: 500, damping: 35, mass: 0.6 },
              },
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
      <span
        className={`ml-0.5 inline-block h-[0.9em] w-[3px] translate-y-1 bg-primary align-baseline ${done ? "caret-blink" : ""}`}
        aria-hidden
      />
    </h1>
  );
}

export function ReadmePane() {
  const { open } = useTabs();
  return (
    <EditorContainer>
      <Item>
        <KeywordLabel># about/README.md</KeywordLabel>
      </Item>
      <Item className="mt-3">
        <TypedHeadline text={`Hi, I'm ${profile.name}.`} />
      </Item>
      <Item className="mt-4">
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          {profile.role}. Based in {profile.location} —{" "}
          <span className="text-foreground">{profile.tagline}</span>.
        </p>
      </Item>

      <Item className="mt-8">
        <CommentCaption>the short version</CommentCaption>
      </Item>
      <Item>
        <div className="prose-editor mt-2">
          {profile.bio.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </Item>

      <Item className="mt-10 flex flex-wrap gap-3">
        <Button
          onClick={() =>
            open({
              id: "projects/anicafe",
              label: "anicafe.tsx",
              path: "projects/anicafe.tsx",
              kind: "file",
            })
          }
        >
          <FolderGit2 className="h-4 w-4" />
          Browse featured projects
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            open({ id: "contact.json", label: "contact.json", path: "contact.json", kind: "file" })
          }
        >
          <FileText className="h-4 w-4" />
          Get in touch
        </Button>
        <Button variant="ghost" asChild>
          <a href={profile.github} target="_blank" rel="noreferrer">
            <Github className="h-4 w-4" />
            @yash on GitHub
          </a>
        </Button>
      </Item>

      <Item className="mt-14 rounded-xl border border-border bg-muted/40 p-5">
        <div className="flex items-start gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <p className="font-mono text-[12px] text-syntax-comment">
              // press <kbd className="rounded border border-border bg-background px-1.5 py-0.5">⌘K</kbd>{" "}
              (or Ctrl+K) to open the command palette
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Everything on this site — projects, posts, sections — is one keystroke away. Try{" "}
              <span className="font-mono text-syntax-string">"anicafe"</span> or{" "}
              <span className="font-mono text-syntax-string">"blog"</span>.
            </p>
          </div>
        </div>
      </Item>
    </EditorContainer>
  );
}
