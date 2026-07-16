export type ProjectCategory = "web" | "mobile" | "tool" | "ai";

export interface Project {
  slug: string;
  file: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  approach: string;
  tech: string[];
  category: ProjectCategory;
  repoUrl?: string;
  liveUrl?: string;
  featured: boolean;
  year: number;
  highlights: string[];
  bannerImage?: string;
  screenshots?: string[];
}

export const projects: Project[] = [
  {
    slug: "anicafe",
    file: "anicafe.tsx",
    title: "AniCafe",
    tagline: "A cozy anime tracking app for people who forget where they left off.",
    description:
      "AniCafe is a personal watch-tracker for anime with a clean, cafe-inspired UI. It syncs with AniList, remembers seasonal picks, and gently nudges you back into shows you paused three months ago.",
    problem:
      "Existing trackers feel like spreadsheets. I wanted something that felt like a warm cafe corner where you'd sit down and remember what you were watching.",
    approach:
      "Started with a mood board of coffee shops and stationery. Built the read model around 'shelves' rather than lists, so a paused show sits on a warmer shelf than a completed one. Auth via Supabase, data hydration from AniList's public GraphQL API, edge-cached at the route level.",
    tech: ["Next.js", "TypeScript", "Supabase", "GraphQL", "Tailwind CSS"],
    category: "web",
    repoUrl: "https://github.com/yash/anicafe",
    liveUrl: "https://anicafe.example.com",
    featured: true,
    year: 2025,
    highlights: [
      "Shelf-based data model instead of flat lists",
      "Offline-first with local drafts synced on reconnect",
      "Ships at ~90KB gzipped for the initial route",
    ],
  },
  {
    slug: "college-sahayak",
    file: "college-sahayak.tsx",
    title: "College Sahayak",
    tagline: "A student assistant that knows your college's calendar better than you do.",
    description:
      "A WhatsApp-first assistant built for my batch. Answers questions about timetables, upcoming submissions, exam dates, and staff office hours by parsing the department's ugly PDF notices into structured data.",
    problem:
      "Every important notice in college arrives as a badly scanned PDF pasted into a WhatsApp group. Everyone re-asks the same three questions.",
    approach:
      "Wrote a small ingestion pipeline that OCRs new notices, extracts entities with a lightweight LLM prompt, and stores them in Postgres. A WhatsApp Business API bot answers natural language queries against that structured index.",
    tech: ["Node.js", "PostgreSQL", "WhatsApp API", "Tesseract", "OpenAI"],
    category: "tool",
    repoUrl: "https://github.com/yash/college-sahayak",
    featured: true,
    year: 2025,
    highlights: [
      "Used daily by ~180 classmates across three departments",
      "Reduces 'when is the submission?' spam by ~70%",
      "Custom prompt cache brings per-query cost under 1/10 of a rupee",
    ],
  },
  {
    slug: "getreel",
    file: "getreel.tsx",
    title: "GetReel",
    tagline: "Paste a link. Get a shareable, silent-friendly reel.",
    description:
      "A tiny web tool that takes a public video URL and returns a properly formatted vertical clip with burned-in captions — because half of everyone watches with sound off.",
    problem:
      "Repurposing a talking-head video for Reels/Shorts is a fifteen-minute chore of cropping, subtitling and re-exporting.",
    approach:
      "ffmpeg.wasm in the browser handles the crop and export so nothing leaves the device. Captions come from Whisper via a small serverless endpoint, then get styled and burned in on the client.",
    tech: ["React", "ffmpeg.wasm", "Whisper", "Vercel Edge"],
    category: "tool",
    repoUrl: "https://github.com/yash/getreel",
    liveUrl: "https://getreel.example.com",
    featured: true,
    year: 2024,
    highlights: [
      "100% client-side processing after transcription",
      "Handles 4K source down-scaled to 1080x1920 in one pass",
      "Zero backend storage — privacy by design",
    ],
  },
  {
    slug: "quizforge",
    file: "quizforge.tsx",
    title: "QuizForge",
    tagline: "Turn any PDF into a study quiz in about ten seconds.",
    description:
      "Drop in a chapter PDF, pick a difficulty, and QuizForge generates a mixed set of MCQs, short-answer, and fill-in-the-blank questions with answer keys and explanations.",
    problem:
      "Diploma students revise from 40-page PDFs the night before. There's no time to write practice questions, and pre-made ones rarely match the syllabus.",
    approach:
      "Chunk the PDF, embed it, then use a retrieval-augmented prompt to generate questions with grounded citations back to the source paragraph. Difficulty tuning is a temperature + prompt-template combo.",
    tech: ["Next.js", "OpenAI", "pgvector", "Supabase"],
    category: "ai",
    repoUrl: "https://github.com/yash/quizforge",
    featured: true,
    year: 2024,
    highlights: [
      "Citations link every question back to its source paragraph",
      "Difficulty presets calibrated on ~200 real exam questions",
      "Costs about ₹2 to generate a 20-question quiz",
    ],
  },
  {
    slug: "gpa-lms",
    file: "gpa-lms.tsx",
    title: "GPA LMS",
    tagline: "A tiny learning management system I built for my department's mock tests.",
    description:
      "A no-nonsense LMS: teachers upload PDFs, create timed tests, and get an auto-graded leaderboard. Students see only what they need. No enterprise bloat.",
    problem:
      "The official portal is slow, ugly, and mostly used to distribute PDFs. Teachers wanted something they could actually run a mock test on.",
    approach:
      "Server components for the read-heavy dashboard, a simple role model (student / teacher), and a proctoring-lite mode that flags tab-switches during timed tests.",
    tech: ["Next.js", "PostgreSQL", "Supabase Auth", "Tailwind CSS"],
    category: "web",
    repoUrl: "https://github.com/yash/gpa-lms",
    featured: true,
    year: 2024,
    highlights: [
      "Adopted by two departments for internal mock exams",
      "Sub-second dashboard load thanks to RSC + edge caching",
      "Auto-grading for MCQs, manual rubric UI for descriptive answers",
    ],
  },
  // Archive — non-featured projects
  {
    slug: "notesync",
    file: "notesync.ts",
    title: "NoteSync",
    tagline: "Sync markdown notes between devices with a single git-like command.",
    description: "CLI + tiny sync server. Never got past personal use, but it taught me a lot about conflict resolution.",
    problem: "Wanted something between Obsidian sync and a raw git repo.",
    approach: "Content-addressable chunks with a Merkle-tree diff.",
    tech: ["Rust", "SQLite"],
    category: "tool",
    repoUrl: "https://github.com/yash/notesync",
    featured: false,
    year: 2023,
    highlights: ["Learned Rust the hard way", "First real CLI I've shipped"],
  },
  {
    slug: "cafe-menu",
    file: "cafe-menu.tsx",
    title: "Cafe Menu",
    tagline: "QR-code menu for a friend's roadside cafe.",
    description: "Shipped over a weekend. Still running.",
    problem: "Printed menus were sticky and out of date.",
    approach: "A single static page + admin form. That's it.",
    tech: ["Astro", "Cloudflare Pages"],
    category: "web",
    featured: false,
    year: 2023,
    highlights: ["Live for 2 years without a redeploy"],
  },
  {
    slug: "attendance-bot",
    file: "attendance-bot.py",
    title: "Attendance Bot",
    tagline: "Telegram bot that reminds our batch when attendance is being taken.",
    description: "A silly little utility that turned out to be surprisingly load-bearing.",
    problem: "Attendance in our department is chaos.",
    approach: "Cron + Telegram Bot API + a shared Google Sheet.",
    tech: ["Python", "Telegram API"],
    category: "tool",
    featured: false,
    year: 2023,
    highlights: ["100+ daily active users"],
  },
];
