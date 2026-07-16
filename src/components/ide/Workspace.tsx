import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TabsProvider, useTabs } from "@/lib/ide/tabs-context";
import { useIsMobile } from "@/hooks/use-mobile";
import { TitleBar } from "@/components/ide/TitleBar";
import { ActivityBar } from "@/components/ide/ActivityBar";
import { Sidebar } from "@/components/ide/Sidebar";
import { TabsBar } from "@/components/ide/TabsBar";
import { EditorPane } from "@/components/ide/panes/EditorPane";
import { StatusBar } from "@/components/ide/StatusBar";
import { Terminal } from "@/components/ide/Terminal";
import { CommandPalette } from "@/components/ide/CommandPalette";
import { Toaster } from "@/components/ui/sonner";
import { X, Search } from "lucide-react";
import { cn } from "@/lib/utils";

function TrackScroll() {
  const { setCursor } = useTabs();
  useEffect(() => {
    const handler = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target || !target.scrollTop) return;
      const line = Math.max(1, Math.floor(target.scrollTop / 20) + 1);
      setCursor({ line, col: 1 });
    };
    document.addEventListener("scroll", handler, true);
    return () => document.removeEventListener("scroll", handler, true);
  }, [setCursor]);
  return null;
}

function Workspace() {
  const { sidebarOpen, mobileNavOpen, setMobileNavOpen, setPaletteOpen } = useTabs();
  const isMobile = useIsMobile();

  return (
    <div className="flex h-dvh min-h-0 w-full flex-col overflow-hidden bg-background text-foreground">
      <TitleBar />

      {/* Mobile top bar */}
      {isMobile && (
        <div className="flex h-11 shrink-0 items-center gap-2 border-b border-border bg-sidebar-bg px-2">
          <button
            onClick={() => setMobileNavOpen(true)}
            className="flex items-center gap-2 rounded-md px-2 py-1.5 font-mono text-[13px] hover:bg-hover"
            aria-label="Open explorer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
            explorer
          </button>
          <button
            onClick={() => setPaletteOpen(true)}
            className="ml-auto flex items-center gap-1.5 rounded-md border border-border bg-primary/10 px-3 py-1.5 font-mono text-[12px] text-primary font-medium hover:bg-primary/20"
          >
            <Search className="h-3.5 w-3.5" />
            search…
          </button>
        </div>
      )}

      <div className="flex min-h-0 flex-1">
        {!isMobile && <ActivityBar />}

        {/* Desktop sidebar */}
        {!isMobile && (
          <AnimatePresence initial={false}>
            {sidebarOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 280, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={isMobile ? { duration: 0.1 } : { type: "spring", stiffness: 500, damping: 35, mass: 0.8 }}
                className="min-h-0 shrink-0 overflow-hidden"
              >
                <div className="h-full w-[280px]">
                  <Sidebar />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Mobile drawer */}
        {isMobile && (
          <AnimatePresence>
            {mobileNavOpen && (
              <motion.div
                className="fixed inset-0 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
              >
                <div
                  className="absolute inset-0 bg-black/40"
                  onClick={() => setMobileNavOpen(false)}
                />
                <motion.aside
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", stiffness: 400, damping: 35, mass: 1 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={{ left: 0.3, right: 0 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -80) setMobileNavOpen(false);
                  }}
                  className="absolute inset-y-0 left-0 flex w-[86%] max-w-[320px]"
                >
                  <ActivityBar mobile />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex h-11 shrink-0 items-center gap-2 border-b border-border bg-sidebar-bg px-3">
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Explorer
                      </span>
                      <button
                        onClick={() => setMobileNavOpen(false)}
                        className="ml-auto grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:bg-hover"
                        aria-label="Close drawer"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <Sidebar />
                    </div>
                  </div>
                </motion.aside>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <TabsBar isMobile={isMobile} />
          <EditorPane isMobile={isMobile} />
          <Terminal isMobile={isMobile} />
        </div>
      </div>

      {/* Mobile FAB — command palette */}
      {isMobile && !mobileNavOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          onClick={() => setPaletteOpen(true)}
          className="fixed bottom-20 right-4 z-30 grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg"
          aria-label="Open command palette"
        >
          <Search className="h-5 w-5" />
        </motion.button>
      )}

      <StatusBar />
      <CommandPalette />
      <TrackScroll />
      <Toaster position="bottom-right" />
    </div>
  );
}

export function IDEWorkspace() {
  return (
    <TabsProvider>
      <Workspace />
    </TabsProvider>
  );
}
