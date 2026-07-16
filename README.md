# Yash Ajay Magar — Portfolio

A VS Code-inspired personal portfolio built as an interactive IDE shell — with an explorer sidebar, tab strip, command palette, and status bar.

> **Live site:** [magar.xyz](https://magar.xyz)

---

## About

This portfolio is built as a VS Code 2025-style interface — complete with an explorer sidebar, tab strip, command-center title bar, and status bar — serving as both a portfolio and a content hub for Yash Ajay Magar: AI enthusiast, full-stack developer, and diploma student.

**Sections:**

- 🏠 **README** — Home / about me
- 🛠️ **Skills** — Languages, frameworks, and tools
- 🎓 **Education** — Academic background
- 🚀 **Projects** — Featured work + archive
- 📝 **Blog** — Essays and notes *(coming soon)*
- 🎬 **Vlogs** — Short-form video *(coming soon)*
- ✉️ **Contact** — Message form + social links
- 🔍 **Search** — Full-text search across all content

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [TanStack Start](https://tanstack.com/start) (React Router v7 + SSR) |
| UI | [React 19](https://react.dev) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Language | [TypeScript](https://www.typescriptlang.org) |
| Animations | [Motion](https://motion.dev) (framer-motion v11+) |
| Components | [shadcn/ui](https://ui.shadcn.com) |
| Icons | [Lucide React](https://lucide.dev) |
| Typography | Inter + JetBrains Mono (Google Fonts) |
| Deployment | Cloudflare Workers (via TanStack Start SSR adapter) |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## Project Structure

```
src/
├── components/
│   ├── ide/              # VS Code shell components
│   │   ├── ActivityBar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── TabsBar.tsx
│   │   ├── StatusBar.tsx
│   │   ├── TitleBar.tsx
│   │   ├── Terminal.tsx
│   │   ├── Workspace.tsx
│   │   └── panes/        # Content panes per section
│   └── ui/               # shadcn/ui primitives
├── data/                 # Portfolio content as TypeScript data
│   ├── portfolio.ts      # Profile, skills, education
│   ├── projects.ts       # Featured + archived projects
│   ├── blog.ts           # Blog posts
│   └── vlogs.ts          # Video logs
├── routes/               # TanStack Start file-based routes
│   ├── __root.tsx        # Root shell + global meta
│   └── index.tsx         # Main IDE workspace route
├── lib/                  # Utilities and context
└── styles.css            # Global CSS + Tailwind v4 theme
```

---

## Connect

- **GitHub:** [github.com/yashmagar01](https://github.com/yashmagar01)
- **LinkedIn:** [linkedin.com/in/yash-magar](https://www.linkedin.com/in/yash-magar/)
- **X / Twitter:** [x.com/yashmag50534849](https://x.com/yashmag50534849)
- **Email:** [yashajaymagar10@gmail.com](mailto:yashajaymagar10@gmail.com)

---

<p align="center">
  <i>"Shipping software from a college hostel room."</i><br/>
  <b>— Yash Ajay Magar</b>
</p>
