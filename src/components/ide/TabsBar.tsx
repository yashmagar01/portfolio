import { X } from 'lucide-react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { useTabs } from '@/lib/ide/tabs-context';
import { iconForFile } from '@/lib/ide/file-icons';
import { cn } from '@/lib/utils';

export function TabsBar({ isMobile }: { isMobile?: boolean }) {
  const { tabs, activeId, activate, close } = useTabs();

  if (tabs.length === 0)
    return (
      <div
        className={cn('shrink-0 border-b border-border bg-sidebar-bg', isMobile ? 'h-11' : 'h-9')}
      />
    );

  return (
    <LayoutGroup>
      <div
        className={cn(
          'flex shrink-0 items-stretch border-b border-border bg-sidebar-bg ide-scrollbar overflow-x-auto',
          isMobile ? 'h-11' : 'h-9'
        )}
      >
        <AnimatePresence mode="popLayout">
          {tabs.map((tab) => {
            const { Icon, color } = iconForFile(tab.label);
            const active = tab.id === activeId;
            return (
              <motion.div
                key={tab.id}
                layout={!isMobile}
                initial={isMobile ? false : { opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={isMobile ? { opacity: 0 } : { opacity: 0, x: 20, scale: 0.95 }}
                transition={
                  isMobile
                    ? { duration: 0.1 }
                    : { type: 'spring', stiffness: 450, damping: 35, mass: 0.8 }
                }
                className={cn(
                  'group relative flex items-center gap-2 border-r border-border pl-3',
                  isMobile ? 'pr-2' : 'pr-1.5',
                  active
                    ? 'bg-tab-active text-foreground'
                    : 'bg-tab-inactive text-muted-foreground hover:text-foreground'
                )}
              >
                <button
                  onClick={() => activate(tab.id)}
                  className={cn(
                    'flex items-center gap-2 font-mono',
                    isMobile ? 'py-2 text-[13px]' : 'py-1 text-[12.5px]'
                  )}
                >
                  <Icon
                    className={cn(isMobile ? 'h-4 w-4' : 'h-3.5 w-3.5', color)}
                    strokeWidth={1.6}
                  />
                  <span className={cn('whitespace-nowrap', isMobile && 'hidden sm:inline')}>
                    {tab.label}
                  </span>
                </button>
                <button
                  onClick={() => close(tab.id)}
                  aria-label={`Close ${tab.label}`}
                  className={cn(
                    'ml-1 grid place-items-center rounded text-muted-foreground opacity-60 hover:bg-hover hover:opacity-100',
                    isMobile ? 'h-7 w-7' : 'h-5 w-5'
                  )}
                >
                  <X className={isMobile ? 'h-3.5 w-3.5' : 'h-3 w-3'} />
                </button>
                {active && (
                  <motion.span
                    layoutId="active-tab-underline"
                    className="absolute inset-x-0 top-0 h-[2px] bg-primary"
                    transition={
                      isMobile ? { duration: 0.1 } : { type: 'spring', stiffness: 500, damping: 40 }
                    }
                  />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div className="flex-1 bg-sidebar-bg" />
      </div>
    </LayoutGroup>
  );
}
