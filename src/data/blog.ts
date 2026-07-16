export interface Post {
  slug: string;
  file: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingMinutes: number;
  body: string;
}

export const posts: Post[] = [
  {
    slug: "shipping-from-a-hostel",
    file: "shipping-from-a-hostel.md",
    title: "Shipping software from a college hostel room",
    date: "2025-11-04",
    excerpt: "Notes on building for real users while enrolled full-time in a diploma program.",
    tags: ["writing", "process"],
    readingMinutes: 6,
    body: `# Shipping software from a college hostel room

There's a specific kind of quiet that hostel rooms have at 2am — the kind where you can hear the exhaust fan two floors up. That's when most of my code gets written.

## The constraint is the feature

I have maybe three focused hours a day between classes, mess, and the walk down to the tea stall. That forces me to build small, sharp things. If a project can't be described in a single sentence, it won't survive next week.

## What actually helps

- **A boring stack.** I use the same tools across almost every project so I never lose an evening to setup.
- **Public deadlines.** Telling five friends "it's live Sunday" beats any productivity system.
- **One tab open.** Really.

I'll keep posting notes like this as I ship. If you're in a similar boat, [say hi](mailto:yash@example.com).`,
  },
  {
    slug: "why-i-build-in-public",
    file: "why-i-build-in-public.md",
    title: "Why I build in public (even when it's cringe)",
    date: "2025-09-18",
    excerpt: "Every half-finished demo I've posted has taught me more than the finished ones I kept hidden.",
    tags: ["writing", "process"],
    readingMinutes: 4,
    body: `# Why I build in public

It's easier to hide work until it's perfect. It's also slower, lonelier, and — this is the important part — the version you eventually ship is worse.

Building in public means:

1. Friends catch bugs before your users do.
2. The next opportunity finds you instead of the other way around.
3. You stop precious-ifying half-baked ideas.

The trade is that a lot of your public work looks unfinished. That's fine. Unfinished is a signal you're still moving.`,
  },
  {
    slug: "notes-on-ide-design",
    file: "notes-on-ide-design.md",
    title: "Notes on designing an interface that isn't shy",
    date: "2025-07-02",
    excerpt: "Why I keep coming back to editor UIs as an inspiration for personal software.",
    tags: ["design", "ui"],
    readingMinutes: 5,
    body: `# Notes on designing an interface that isn't shy

Editor UIs — VS Code, Sublime, JetBrains — are dense, opinionated, and unafraid to show you a hundred things at once. That's a feature.

Most portfolios and personal sites default to a hero, three sections, and a footer. Fine, but forgettable. An interface that borrows editor idioms gets to be:

- **Dense without being cluttered**, because everything has its assigned lane.
- **Persistent**, because tabs and sidebars keep context around.
- **Fast to search**, because a command palette is one keystroke away.

The trick is stealing the affordances without stealing the ugliness.`,
  },
];
