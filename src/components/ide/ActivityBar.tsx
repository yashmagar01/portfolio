import { Files, Search, FolderGit2, BookText, Mail } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTabs, type SidebarView } from "@/lib/ide/tabs-context";
import { cn } from "@/lib/utils";

const items: { view: SidebarView; label: string; Icon: typeof Files }[] = [
  { view: "explorer", label: "Explorer", Icon: Files },
  { view: "search", label: "Search", Icon: Search },
  { view: "projects", label: "Projects", Icon: FolderGit2 },
  { view: "blog", label: "Blog", Icon: BookText },
  { view: "contact", label: "Contact", Icon: Mail },
];

export function ActivityBar({ mobile = false }: { mobile?: boolean }) {
  const { sidebarView, setSidebarView, sidebarOpen, setSidebarOpen, setMobileNavOpen } = useTabs();

  const handleClick = (view: SidebarView) => {
    if (mobile) {
      setSidebarView(view);
      setMobileNavOpen(true);
      return;
    }
    if (view === sidebarView) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarView(view);
      setSidebarOpen(true);
    }
  };

  return (
    <nav
      aria-label="Activity bar"
      className={cn(
        "flex shrink-0 flex-col items-center bg-activity-bg border-r border-border",
        mobile ? "w-12 py-2" : "w-12 py-2",
      )}
    >
      {items.map(({ view, label, Icon }) => {
        const active = sidebarView === view && (sidebarOpen || mobile);
        return (
          <motion.button
            key={view}
            onClick={() => handleClick(view)}
            title={label}
            aria-label={label}
            whileHover={mobile ? {} : { scale: 1.1 }}
            whileTap={mobile ? { scale: 0.95 } : { scale: 0.92 }}
            transition={mobile ? { duration: 0.08 } : { type: "spring", stiffness: 500, damping: 30, mass: 0.6 }}
            className={cn(
              "relative grid h-10 w-10 place-items-center rounded-md text-muted-foreground",
              "hover:bg-hover hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              active && "text-foreground",
            )}
          >
            <AnimatePresence>
              {active && (
                <motion.span
                  aria-hidden
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "calc(100% - 12px)", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={mobile ? { duration: 0.08 } : { type: "spring", stiffness: 500, damping: 35, mass: 0.6 }}
                  className="absolute left-0 top-1.5 w-[2px] rounded-r bg-primary"
                />
              )}
            </AnimatePresence>
            <Icon className="h-5 w-5" strokeWidth={1.6} />
          </motion.button>
        );
      })}
    </nav>
  );
}
