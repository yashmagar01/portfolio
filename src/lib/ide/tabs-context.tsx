import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type FileId = string; // e.g. "about/README.md"

export interface OpenTab {
  id: FileId;
  label: string; // basename
  path: string; // full path e.g. about/README.md
  kind: 'file';
}

interface TabsContextValue {
  tabs: OpenTab[];
  activeId: FileId | null;
  open: (tab: OpenTab) => void;
  close: (id: FileId) => void;
  activate: (id: FileId) => void;

  // panels state
  sidebarView: SidebarView;
  setSidebarView: (v: SidebarView) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  terminalOpen: boolean;
  setTerminalOpen: (v: boolean) => void;
  paletteOpen: boolean;
  setPaletteOpen: (v: boolean) => void;
  mobileNavOpen: boolean;
  setMobileNavOpen: (v: boolean) => void;

  // status bar cursor pos
  cursor: { line: number; col: number };
  setCursor: (c: { line: number; col: number }) => void;
}

export type SidebarView = 'explorer' | 'search' | 'projects' | 'blog' | 'contact';

const TabsContext = createContext<TabsContextValue | null>(null);

const DEFAULT_TAB: OpenTab = {
  id: 'about/README.md',
  label: 'README.md',
  path: 'about/README.md',
  kind: 'file',
};

export function TabsProvider({ children }: { children: ReactNode }) {
  const [tabs, setTabs] = useState<OpenTab[]>([DEFAULT_TAB]);
  const [activeId, setActiveId] = useState<FileId | null>(DEFAULT_TAB.id);
  const [sidebarView, setSidebarView] = useState<SidebarView>('explorer');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [cursor, setCursor] = useState({ line: 1, col: 1 });

  const open = useCallback((tab: OpenTab) => {
    setTabs((prev) => (prev.find((t) => t.id === tab.id) ? prev : [...prev, tab]));
    setActiveId(tab.id);
    setMobileNavOpen(false);
  }, []);

  const close = useCallback((id: FileId) => {
    setTabs((prev) => {
      const idx = prev.findIndex((t) => t.id === id);
      if (idx === -1) return prev;
      const next = prev.filter((t) => t.id !== id);
      setActiveId((current) => {
        if (current !== id) return current;
        if (next.length === 0) return null;
        const newIdx = Math.max(0, idx - 1);
        return next[newIdx]?.id ?? null;
      });
      return next;
    });
  }, []);

  const activate = useCallback((id: FileId) => setActiveId(id), []);

  // Global shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === '`') {
        e.preventDefault();
        setTerminalOpen((v) => !v);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setSidebarOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const value = useMemo<TabsContextValue>(
    () => ({
      tabs,
      activeId,
      open,
      close,
      activate,
      sidebarView,
      setSidebarView,
      sidebarOpen,
      setSidebarOpen,
      terminalOpen,
      setTerminalOpen,
      paletteOpen,
      setPaletteOpen,
      mobileNavOpen,
      setMobileNavOpen,
      cursor,
      setCursor,
    }),
    [
      tabs,
      activeId,
      open,
      close,
      activate,
      sidebarView,
      sidebarOpen,
      terminalOpen,
      paletteOpen,
      mobileNavOpen,
      cursor,
    ]
  );

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
}

export function useTabs() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('useTabs must be used within TabsProvider');
  return ctx;
}
