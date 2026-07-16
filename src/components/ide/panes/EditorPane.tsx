import { AnimatePresence, motion } from "motion/react";
import { useTabs } from "@/lib/ide/tabs-context";
import { ReadmePane } from "./ReadmePane";
import { SkillsPane, EducationPane } from "./AboutPanes";
import { ProjectsIndexPane, ProjectPane, NotFoundPane } from "./ProjectPanes";
import { BlogIndexPane, PostPane, VlogsIndexPane, VlogPane } from "./ContentPanes";
import { ContactPane } from "./ContactPane";

export function EditorPane({ isMobile }: { isMobile?: boolean }) {
  const { activeId } = useTabs();

  return (
    <div className="relative min-h-0 flex-1 overflow-hidden bg-editor">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId ?? "empty"}
          initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={isMobile ? { opacity: 0 } : { opacity: 0, y: -6 }}
          transition={isMobile ? { duration: 0.08 } : { type: "spring", stiffness: 450, damping: 30, mass: 0.8 }}
          className="ide-scrollbar absolute inset-0 overflow-y-auto"
        >
          <PaneRouter id={activeId} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function PaneRouter({ id }: { id: string | null }) {
  if (!id) return <EmptyPane />;
  if (id === "about/README.md") return <ReadmePane />;
  if (id === "about/skills.json") return <SkillsPane />;
  if (id === "about/education.md") return <EducationPane />;
  if (id === "contact.json") return <ContactPane />;

  if (id === "projects") return <ProjectsIndexPane />;
  if (id.startsWith("projects/")) return <ProjectPane slug={id.slice("projects/".length)} />;

  if (id === "blog") return <BlogIndexPane />;
  if (id.startsWith("blog/")) return <PostPane slug={id.slice("blog/".length)} />;

  if (id === "vlogs") return <VlogsIndexPane />;
  if (id.startsWith("vlogs/")) return <VlogPane slug={id.slice("vlogs/".length)} />;

  return <NotFoundPane path={id} />;
}

function EmptyPane() {
  return (
    <div className="grid h-full place-items-center p-8 text-center">
      <div>
        <p className="font-mono text-sm text-muted-foreground">
          No file open. Click something in the explorer, or press{" "}
          <kbd className="rounded border border-border bg-background px-1.5 py-0.5">⌘K</kbd>.
        </p>
      </div>
    </div>
  );
}
