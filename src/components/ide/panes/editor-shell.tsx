import { motion } from "motion/react";
import type { ReactNode } from "react";

export const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.04, delayChildren: 0.04 },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 400, damping: 30, mass: 0.8 } },
};

export function EditorContainer({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-10 sm:py-14"
    >
      {children}
    </motion.div>
  );
}

export function Item({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}

/** Comment-like caption for editor content */
export function CommentCaption({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[13px] text-syntax-comment">
      <span className="select-none opacity-70">// </span>
      {children}
    </p>
  );
}

export function KeywordLabel({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-wider text-syntax-keyword">
      {children}
    </span>
  );
}
