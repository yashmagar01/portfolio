import { useEffect } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useTabs } from "@/lib/ide/tabs-context";
import { projects } from "@/data/projects";
import { posts } from "@/data/blog";
import { vlogs } from "@/data/vlogs";
import { iconForFile } from "@/lib/ide/file-icons";
import { FolderGit2, BookText, User, Mail, Video } from "lucide-react";

export function CommandPalette() {
  const { paletteOpen, setPaletteOpen, open, setSidebarView, setSidebarOpen } = useTabs();

  const jumpTo = (id: string, label: string, path: string) => {
    open({ id, label, path, kind: "file" });
    setPaletteOpen(false);
  };

  return (
    <CommandDialog open={paletteOpen} onOpenChange={setPaletteOpen}>
      <CommandInput placeholder="Go to file, project, post…" />
      <CommandList className="max-h-[60vh] min-[420px]:max-h-[420px]">
        <CommandEmpty>No matches. Try a project or post name.</CommandEmpty>
        <CommandGroup heading="Quick jump">
          <CommandItem onSelect={() => jumpTo("about/README.md", "README.md", "about/README.md")}>
            <User className="h-4 w-4" />
            About / README
          </CommandItem>
          <CommandItem
            onSelect={() => jumpTo("about/skills.json", "skills.json", "about/skills.json")}
          >
            <User className="h-4 w-4" />
            Skills
          </CommandItem>
          <CommandItem onSelect={() => jumpTo("contact.json", "contact.json", "contact.json")}>
            <Mail className="h-4 w-4" />
            Contact
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Projects">
          {projects.map((p) => {
            const { Icon, color } = iconForFile(p.file);
            return (
              <CommandItem
                key={p.slug}
                value={`project ${p.title} ${p.tech.join(" ")} ${p.tagline}`}
                onSelect={() => jumpTo(`projects/${p.slug}`, p.file, `projects/${p.file}`)}
              >
                <Icon className={`h-4 w-4 ${color}`} />
                <span className="font-mono">{p.file}</span>
                <span className="ml-2 text-xs text-muted-foreground truncate">— {p.title}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>
        <CommandGroup heading="Blog">
          {posts.map((p) => (
            <CommandItem
              key={p.slug}
              value={`post ${p.title} ${p.tags.join(" ")}`}
              onSelect={() => jumpTo(`blog/${p.slug}`, p.file, `blog/${p.file}`)}
            >
              <BookText className="h-4 w-4" />
              <span className="truncate">{p.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Vlogs">
          {vlogs.map((v) => (
            <CommandItem
              key={v.slug}
              value={`vlog ${v.title}`}
              onSelect={() => jumpTo(`vlogs/${v.slug}`, v.file, `vlogs/${v.file}`)}
            >
              <Video className="h-4 w-4" />
              <span className="truncate">{v.title}</span>
              <span className="ml-auto text-xs text-muted-foreground">{v.duration}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Panels">
          <CommandItem
            onSelect={() => {
              setSidebarView("explorer");
              setSidebarOpen(true);
              setPaletteOpen(false);
            }}
          >
            <FolderGit2 className="h-4 w-4" /> Show Explorer
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setSidebarView("projects");
              setSidebarOpen(true);
              setPaletteOpen(false);
            }}
          >
            <FolderGit2 className="h-4 w-4" /> Show Projects panel
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
