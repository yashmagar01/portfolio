import type { CollectionEntry } from 'astro:content';
import type { BlogPost, FileNode, OutlineItem } from '../types';

import type { MarkdownHeading } from 'astro';

export function transformDocsToPosts(
    docs: CollectionEntry<'docs'>[],
    headingsMap: Record<string, MarkdownHeading[]>
): Record<string, BlogPost> {
    const posts: Record<string, BlogPost> = {};

    docs.forEach(doc => {
        // The id in Content Collections is the filename (e.g. 'welcome.md' or 'welcome')
        // The slug is also available.
        // We map the doc to BlogPost format.

        // We assume the ID from mockData matches the slug or id from content collection
        // In mockData: 'welcome' -> id: 'welcome'
        // In content/docs/welcome.md -> slug: 'welcome'

        const headings = headingsMap[doc.id] || [];
        const outline: OutlineItem[] = headings.map(h => ({
            id: h.slug,
            label: h.text,
            level: h.depth
        }));

        posts[doc.id] = {
            id: doc.id,
            title: doc.data.title,
            slug: doc.id,
            language: 'markdown', // Default to markdown as they are md files
            date: doc.data.date,
            content: doc.body || "",
            outline: outline,
        };
    });

    return posts;
}

export function buildFileTree(docs: CollectionEntry<'docs'>[]): FileNode[] {
    const root: FileNode = {
        id: 'root',
        name: 'yash-ajay-magar',
        type: 'folder',
        isOpen: true,
        children: []
    };

    // Sort docs by id to ensure deterministic order.
    docs.sort((a, b) => a.id.localeCompare(b.id));

    docs.forEach(doc => {
        const parts = doc.id.split('/');
        let currentFolder = root;

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            const isLast = i === parts.length - 1;

            if (isLast) {
                // Get original extension from doc.id (e.g. .md or .mdx)
                const extension = doc.id.includes('.') ? doc.id.substring(doc.id.lastIndexOf('.')) : '.md';
                // Special case for root-level 'welcome' -> 'README.md'
                const fileName = (doc.id === 'welcome' && parts.length === 1) ? 'README.md' : `${part}${extension}`;
                currentFolder.children = currentFolder.children || [];
                currentFolder.children.push({
                    id: `file-${doc.id}`,
                    name: fileName,
                    type: 'file',
                    postId: doc.id
                });
            } else {
                currentFolder.children = currentFolder.children || [];
                let folder = currentFolder.children.find(child => child.type === 'folder' && child.name === part);
                if (!folder) {
                    folder = {
                        id: `folder-${parts.slice(0, i + 1).join('-')}`,
                        name: part,
                        type: 'folder',
                        isOpen: true,
                        children: []
                    };
                    currentFolder.children.push(folder);
                }
                currentFolder = folder;
            }
        }
    });

    return [root];
}

// Deprecate static FILE_TREE
export const FILE_TREE: FileNode[] = [];
