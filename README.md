# yash ajay magar — Portfolio

A VS Code-inspired personal portfolio and digital workspace for **yash ajay magar** — AI journalist, full-stack developer, and builder of practical AI-driven tools.

> **Live site:** [magar.xyz](https://magar.xyz)

---

## 🧠 About

This portfolio is built as a VS Code 2025-style interface — complete with an explorer sidebar, tab strip, command-center title bar, and status bar — serving as both a portfolio and a content hub.

**Sections:**
- 🏠 **Home** — Hero, featured projects, connect links
- 👤 **About** — Bio, skills, GitHub stats
- 📄 **Resume** — Full resume with PDF download
- 🚀 **Projects** — The Future You, Persona, Generation Tools
- 📺 **Vlogs** — Video content (coming soon)
- ✉️ **Contact** — Email and social links
- 🔍 **Search** — Full-text search across all content
- 🏷️ **Tags** — Browse content by topic

---

## 🛠️ Tech Stack

- **[Astro](https://astro.build)** — Static site generator (MPA, content-focused)
- **[React](https://react.dev)** — Interactive components (Explorer sidebar, search)
- **[Tailwind CSS](https://tailwindcss.com)** — Utility-first styling
- **[MDX](https://mdxjs.com)** — Markdown + JSX for rich content pages
- **[Lucide Icons](https://lucide.dev)** — VS Code-style icons
- **[Inter + JetBrains Mono](https://fonts.google.com)** — Typography

---

## 🚀 Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm run dev

# Build for production
pnpm run build
```

---

## 📁 Project Structure

```
src/
├── components/          # VS Code UI components
│   ├── TitleBar.astro   # Command-center header bar
│   ├── ActivityBar.astro# Left icon nav bar
│   ├── Explorer.tsx     # File tree sidebar
│   ├── EditorShell.astro# Tab strip + content area
│   ├── StatusBar.astro  # Bottom status bar
│   └── RightSidebar.tsx # Outline, tags, related
├── content/docs/        # All portfolio content (Markdown/MDX)
│   ├── welcome.md       # Homepage hero
│   ├── about.mdx        # About page
│   ├── resume.md        # Resume page
│   ├── projects/        # Projects
│   ├── vlogs/           # Video content
│   └── contact.md       # Contact
├── layouts/             # Astro layout wrappers
├── pages/               # Routes & API endpoints
└── styles/              # Global CSS + theme system
```

---

## 🎨 Themes

The site supports 10+ themes — Dark (default), Light, Monokai, Dracula, Cyberpunk, Solarized Dark/Light, Great Wave, Matrix, and System. Accessible via the Settings icon in the activity bar.

---

## 📝 Content

Content is driven by Markdown/MDX files in `src/content/docs/`. Each file uses frontmatter:

```yaml
---
title: Page Title
date: '2026-06-16'
tags: [ai, web, developer]
summary: Brief description for SEO and cards
related:
  - other-page.md
tabs:
  - label: Live Demo
    href: https://example.com
---
```

---

## 📜 Credits

> This portfolio is built on top of the original VS Code-themed portfolio codebase by **[Rody Davis](https://rodydavis.com)**.
>
> Original repository: [github.com/rodydavis/rodydavis](https://github.com/rodydavis/rodydavis)
>
> The structure, VS Code shell layout, component architecture, theme system, and content routing patterns are inspired by and derived from Rody Davis's original work. Thank you for open-sourcing such a great foundation.

---

<p align="center">
  <i>"Quietly building. Slowly mastering. Eventually leading."</i><br/>
  <b>— yash ajay magar</b>
</p>
