import type { LucideIcon } from 'lucide-react';
import {
  FileCode2,
  FileText,
  Braces,
  FileVideo,
  Folder,
  FolderOpen,
  FileCog,
  Hash,
} from 'lucide-react';

export function iconForFile(name: string): { Icon: LucideIcon; color: string } {
  const lower = name.toLowerCase();
  if (lower.endsWith('.tsx') || lower.endsWith('.ts'))
    return { Icon: FileCode2, color: 'text-syntax-fn' };
  if (lower.endsWith('.py')) return { Icon: FileCode2, color: 'text-syntax-number' };
  if (lower.endsWith('.md') || lower.endsWith('.mdx'))
    return { Icon: FileText, color: 'text-syntax-var' };
  if (lower.endsWith('.json')) return { Icon: Braces, color: 'text-syntax-number' };
  if (lower.endsWith('.mp4') || lower.endsWith('.mov'))
    return { Icon: FileVideo, color: 'text-syntax-keyword' };
  if (lower.endsWith('.yml') || lower.endsWith('.yaml'))
    return { Icon: FileCog, color: 'text-syntax-tag' };
  if (lower.startsWith('#')) return { Icon: Hash, color: 'text-muted-foreground' };
  return { Icon: FileText, color: 'text-muted-foreground' };
}

export function folderIcon(open: boolean) {
  return open ? FolderOpen : Folder;
}
