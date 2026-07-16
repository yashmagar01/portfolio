import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Search as SearchIcon, Mail, Github, Linkedin, Twitter } from "lucide-react";
import { useTabs, type OpenTab } from "@/lib/ide/tabs-context";
import { iconForFile, folderIcon } from "@/lib/ide/file-icons";
import { profile } from "@/data/portfolio";
import { projects } from "@/data/projects";
import { posts } from "@/data/blog";
import { vlogs } from "@/data/vlogs";
import { cn } from "@/lib/utils";

interface FileNode {
  name: string;
  path: string;
  id: string;
  meta?: string;
}
interface FolderNode {
  name: string;
  children: (FolderNode | FileNode)[];
  defaultOpen?: boolean;
}

function isFolder(n: FolderNode | FileNode): n is FolderNode {
  return (n as FolderNode).children !== undefined;
}

function buildTree(): FolderNode {
  const featured = projects.filter((p) => p.featured);
  const archived = projects.filter((p) => !p.featured);
  return {
    name: "yash-portfolio",
    defaultOpen: true,
    children: [
      {
        name: "about",
        defaultOpen: true,
        children: [
          { name: "README.md", path: "about/README.md", id: "about/README.md" },
          { name: "skills.json", path: "about/skills.json", id: "about/skills.json" },
          { name: "education.md", path: "about/education.md", id: "about/education.md" },
        ],
      },
      {
        name: "projects",
        defaultOpen: true,
        children: [
          ...featured.map((p) => ({
            name: p.file,
            path: `projects/${p.file}`,
            id: `projects/${p.slug}`,
            meta: p.tech[0],
          })),
          {
            name: "archive",
            defaultOpen: false,
            children: archived.map((p) => ({
              name: p.file,
              path: `projects/archive/${p.file}`,
              id: `projects/${p.slug}`,
            })),
          },
        ],
      },
      {
        name: "blog",
        defaultOpen: true,
        children: posts.map((p) => ({
          name: p.file,
          path: `blog/${p.file}`,
          id: `blog/${p.slug}`,
        })),
      },
      {
        name: "vlogs",
        defaultOpen: false,
        children: vlogs.map((v) => ({
          name: v.file,
          path: `vlogs/${v.file}`,
          id: `vlogs/${v.slug}`,
          meta: v.duration,
        })),
      },
      { name: "contact.json", path: "contact.json", id: "contact.json" },
    ],
  };
}

const tree = buildTree();

function TreeNode({
  node,
  depth,
}: {
  node: FolderNode | FileNode;
  depth: number;
}) {
  const { open, activeId } = useTabs();
  const [openState, setOpenState] = useState(isFolder(node) ? node.defaultOpen ?? false : false);

  if (isFolder(node)) {
    const FolderIcon = folderIcon(openState);
    return (
      <div>
        <button
          onClick={() => setOpenState(!openState)}
          className="group flex w-full items-center gap-1 rounded px-1.5 py-[3px] text-left font-mono text-[13px] text-foreground hover:bg-hover transition-colors"
          style={{ paddingLeft: 6 + depth * 12 }}
        >
          <ChevronRight
            className={cn(
              "h-3.5 w-3.5 text-muted-foreground transition-transform duration-150",
              openState && "rotate-90",
            )}
          />
          <FolderIcon className="h-4 w-4 text-primary/80" strokeWidth={1.6} />
          <span className="truncate">{node.name}</span>
        </button>
        <AnimatePresence initial={false}>
          {openState && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
              className="overflow-hidden"
            >
              {node.children.map((c) => (
                <TreeNode key={c.name + (isFolder(c) ? "-f" : "")} node={c} depth={depth + 1} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  const { Icon, color } = iconForFile(node.name);
  const active = activeId === node.id;
  return (
    <button
      onClick={() =>
        open({
          id: node.id,
          label: node.name,
          path: node.path,
          kind: "file",
        } satisfies OpenTab)
      }
      className={cn(
        "group flex w-full items-center gap-1.5 rounded px-1.5 py-[3px] text-left font-mono text-[13px] transition-colors",
        active ? "bg-selection text-foreground" : "text-foreground/85 hover:bg-hover hover:pl-[7px]",
      )}
      style={{ paddingLeft: 6 + depth * 12 + 14 }}
    >
      <Icon className={cn("h-4 w-4 shrink-0", color)} strokeWidth={1.6} />
      <span className="truncate">{node.name}</span>
      {node.meta && (
        <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground/70">
          {node.meta}
        </span>
      )}
    </button>
  );
}

function ExplorerView() {
  return (
    <div className="flex h-full flex-col">
      <SidebarHeader title="Explorer" />
      <div className="ide-scrollbar flex-1 overflow-y-auto py-1">
        <TreeNode node={tree} depth={0} />
      </div>
    </div>
  );
}

function SidebarHeader({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="flex h-8 shrink-0 items-center justify-between px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
      <span>{title}</span>
      {children}
    </div>
  );
}

function SearchView() {
  const [q, setQ] = useState("");
  const { open } = useTabs();
  const results = useMemo(() => {
    if (!q.trim()) return [];
    const needle = q.toLowerCase();
    const projectResults = projects
      .filter(
        (p) =>
          p.title.toLowerCase().includes(needle) ||
          p.tagline.toLowerCase().includes(needle) ||
          p.tech.some((t) => t.toLowerCase().includes(needle)),
      )
      .map((p) => ({
        id: `projects/${p.slug}`,
        label: p.file,
        path: `projects/${p.file}`,
        preview: p.tagline,
      }));
    const postResults = posts
      .filter((p) => p.title.toLowerCase().includes(needle) || p.excerpt.toLowerCase().includes(needle))
      .map((p) => ({
        id: `blog/${p.slug}`,
        label: p.file,
        path: `blog/${p.file}`,
        preview: p.excerpt,
      }));
    return [...projectResults, ...postResults];
  }, [q]);

  return (
    <div className="flex h-full flex-col">
      <SidebarHeader title="Search" />
      <div className="px-3 pb-2">
        <div className="flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1.5 focus-within:ring-2 focus-within:ring-ring">
          <SearchIcon className="h-3.5 w-3.5 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search projects, posts…"
            className="w-full bg-transparent font-mono text-[13px] outline-none placeholder:text-muted-foreground/60"
          />
        </div>
      </div>
      <div className="ide-scrollbar flex-1 overflow-y-auto px-2 pb-2">
        {q && results.length === 0 && (
          <p className="px-2 py-4 text-center text-xs text-muted-foreground">No results.</p>
        )}
        {results.map((r) => (
          <button
            key={r.id}
            onClick={() => open({ id: r.id, label: r.label, path: r.path, kind: "file" })}
            className="w-full rounded px-2 py-1.5 text-left hover:bg-hover"
          >
            <div className="font-mono text-[12px] text-syntax-fn">{r.label}</div>
            <div className="truncate text-[11px] text-muted-foreground">{r.preview}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ListView({
  title,
  items,
}: {
  title: string;
  items: { id: string; label: string; path: string; meta?: string; sub?: string }[];
}) {
  const { open, activeId } = useTabs();
  return (
    <div className="flex h-full flex-col">
      <SidebarHeader title={title} />
      <div className="ide-scrollbar flex-1 overflow-y-auto py-1">
        {items.map((it) => {
          const { Icon, color } = iconForFile(it.label);
          const active = activeId === it.id;
          return (
            <button
              key={it.id}
              onClick={() => open({ id: it.id, label: it.label, path: it.path, kind: "file" })}
              className={cn(
                "flex w-full flex-col items-start gap-0.5 border-l-2 px-3 py-2 text-left transition-colors",
                active
                  ? "border-primary bg-selection"
                  : "border-transparent hover:border-primary/40 hover:bg-hover",
              )}
            >
              <div className="flex w-full items-center gap-2">
                <Icon className={cn("h-3.5 w-3.5", color)} strokeWidth={1.6} />
                <span className="font-mono text-[12.5px] truncate">{it.label}</span>
                {it.meta && (
                  <span className="ml-auto text-[10px] text-muted-foreground">{it.meta}</span>
                )}
              </div>
              {it.sub && (
                <span className="pl-5 text-[11px] leading-snug text-muted-foreground line-clamp-2">
                  {it.sub}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ContactView() {
  const { open } = useTabs();
  return (
    <div className="flex h-full flex-col">
      <SidebarHeader title="Contact" />
      <div className="px-3 py-2 space-y-3 text-sm">
        <button
          onClick={() =>
            open({ id: "contact.json", label: "contact.json", path: "contact.json", kind: "file" })
          }
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-left hover:border-primary/40 hover:bg-hover"
        >
          <div className="font-mono text-[12px] text-syntax-var">open contact.json</div>
          <div className="mt-1 text-[11px] text-muted-foreground">
            Fill in a quick message — it lands in my inbox.
          </div>
        </button>
        <div className="space-y-1.5">
          <SidebarLink href={`mailto:${profile.email}`} Icon={Mail} label={profile.email} />
          <SidebarLink href={profile.github} Icon={Github} label="github.com/yash" />
          <SidebarLink href={profile.linkedin} Icon={Linkedin} label="linkedin.com/in/yash" />
          <SidebarLink href={profile.twitter} Icon={Twitter} label="x.com/yash" />
        </div>
      </div>
    </div>
  );
}

function SidebarLink({
  href,
  Icon,
  label,
}: {
  href: string;
  Icon: typeof Mail;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-2 rounded px-2 py-1.5 font-mono text-[12px] text-foreground/85 hover:bg-hover hover:text-primary"
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={1.6} />
      <span className="truncate">{label}</span>
    </a>
  );
}

export function Sidebar() {
  const { sidebarView } = useTabs();
  const projectItems = projects.map((p) => ({
    id: `projects/${p.slug}`,
    label: p.file,
    path: `projects/${p.file}`,
    meta: String(p.year),
    sub: p.tagline,
  }));
  const postItems = posts.map((p) => ({
    id: `blog/${p.slug}`,
    label: p.file,
    path: `blog/${p.file}`,
    meta: new Date(p.date).toLocaleDateString(undefined, { month: "short", day: "numeric" }),
    sub: p.excerpt,
  }));

  return (
    <aside
      className="flex h-full min-w-0 flex-col bg-sidebar-bg border-r border-border"
      aria-label="Sidebar"
    >
      {sidebarView === "explorer" && <ExplorerView />}
      {sidebarView === "search" && <SearchView />}
      {sidebarView === "projects" && <ListView title="Projects" items={projectItems} />}
      {sidebarView === "blog" && <ListView title="Blog" items={postItems} />}
      {sidebarView === "contact" && <ContactView />}
    </aside>
  );
}
