export type ProjectCategory = 'web' | 'mobile' | 'tool' | 'ai';

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
    slug: 'the-future-you',
    file: 'the-future-you.tsx',
    title: 'The Future You',
    tagline:
      'AI-powered reflection & self-growth companion using private video-based emotional analysis.',
    description:
      'The Future You is an AI companion that helps you grow by recording short video reflections and analyzing your emotional patterns privately. It surfaces insights about your mood, habits, and self-talk over time — giving you a mirror that actually remembers what you said last month.',
    problem:
      'Most self-improvement apps ask you to fill out forms or rate your mood on a scale. But growth comes from reflection — real, spoken, unfiltered thought. No app was doing that privately and intelligently.',
    approach:
      'Users record short video logs; the app runs emotion analysis and transcription on-device or via a privacy-respecting edge function. A Supabase-backed timeline stores structured insight data. The AI layer surfaces recurring themes and gentle nudges across sessions.',
    tech: ['Next.js', 'TypeScript', 'AI', 'Supabase', 'Tailwind CSS'],
    category: 'ai',
    repoUrl: 'https://github.com/yashmagar01/The-Future-You',
    liveUrl: 'https://the-future-you.vercel.app',
    featured: true,
    year: 2025,
    highlights: [
      'Private, video-based emotional analysis',
      'Longitudinal insight tracking across sessions',
      'On-device processing for sensitive data',
    ],
  },
  {
    slug: 'persona',
    file: 'persona.tsx',
    title: 'Persona',
    tagline: 'AI-driven identity & behavior toolkit for structured contextual interactions.',
    description:
      "Persona lets you define structured AI personas with memory, tone, and contextual rules — then interact with them in a clean, distraction-free interface. It's a toolkit for builders who need consistent, reproducible AI behavior across different use cases.",
    problem:
      'Building reliable AI-powered workflows requires consistent persona behavior. Prompt engineering alone is fragile — the same instruction gives different results across sessions. Persona solves this with a structured identity layer.',
    approach:
      'Each persona is defined as a typed object: goals, constraints, tone, memory scope, and fallback behavior. The UI exposes a conversation interface and a persona editor. Personas are stored in Supabase and versioned for reproducibility.',
    tech: ['Next.js', 'TypeScript', 'AI', 'Tailwind CSS'],
    category: 'ai',
    repoUrl: 'https://github.com/yashmagar01/Persona',
    liveUrl: 'https://personanew.vercel.app',
    featured: true,
    year: 2025,
    highlights: [
      'Typed persona definitions with memory scope',
      'Versioned persona history for reproducibility',
      'Clean interaction UI with no distractions',
    ],
  },
  {
    slug: 'generation-tools',
    file: 'generation-tools.tsx',
    title: 'Generation Tools',
    tagline:
      'A clean 12-in-1 utility suite for developers — UUIDs, CSS gradients, placeholder images, dummy text.',
    description:
      'Generation Tools is a single-page developer utility suite with 12 mini-tools in one place: UUID generator, CSS gradient builder, placeholder image generator, lorem ipsum, color picker, base64 encoder, JSON formatter, and more. No login, no ads, just tools.',
    problem:
      'Developers waste minutes every day hopping between tabs to generate a UUID here, format JSON there, build a gradient somewhere else. A single fast tool for all of these was missing.',
    approach:
      'Built as a Vite + React SPA with a tab-based layout. Each tool is a self-contained component with zero external API calls. The app is deployed to Vercel and loads in under a second.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    category: 'tool',
    repoUrl: 'https://github.com/yashmagar01/Generation-Tools',
    liveUrl: 'https://generations-tools.vercel.app',
    featured: true,
    year: 2025,
    highlights: [
      '12 tools in a single fast SPA',
      'Zero API calls — everything runs client-side',
      'Sub-second load time on Vercel edge',
    ],
  },
  {
    slug: 'anicafe',
    file: 'anicafe.tsx',
    title: 'AniCafe',
    tagline: "Café billing & inventory PWA built for a friend's café in Pune.",
    description:
      "AniCafe is a Progressive Web App I built for my friend Aniket's café in Pune. It handles order billing, item management, and daily sales tracking — replacing the paper-and-cash chaos with a fast, offline-capable interface that works on any phone or tablet behind the counter.",
    problem:
      'Aniket was manually tracking every order on paper and reconciling cash at end of day. Mistakes were frequent, and there was no way to see which items were selling well without re-counting everything by hand.',
    approach:
      "Kept the stack minimal: a PWA so it works offline and installs to the homescreen without an app store. Built a simple admin flow for adding and editing menu items and a billing screen optimised for one-handed use at the counter. Sales data is persisted locally with a lightweight sync to a Supabase table for end-of-day reports.",
    tech: ['React', 'TypeScript', 'Supabase', 'Tailwind CSS', 'PWA'],
    category: 'web',
    repoUrl: 'https://github.com/yashmagar01/anicafe',
    featured: true,
    year: 2025,
    highlights: [
      'Offline-first PWA — works even when café Wi-Fi drops',
      'One-handed billing UI optimised for phone screens behind the counter',
      'Daily sales summary replaces end-of-day manual cash count',
    ],
  },
  {
    slug: 'college-sahayak',
    file: 'college-sahayak.tsx',
    title: 'College Sahayak',
    tagline: "A student assistant that knows your college's calendar better than you do.",
    description:
      "A WhatsApp-first assistant built for my batch. Answers questions about timetables, upcoming submissions, exam dates, and staff office hours by parsing the department's ugly PDF notices into structured data.",
    problem:
      'Every important notice in college arrives as a badly scanned PDF pasted into a WhatsApp group. Everyone re-asks the same three questions.',
    approach:
      'Wrote a small ingestion pipeline that OCRs new notices, extracts entities with a lightweight LLM prompt, and stores them in Postgres. A WhatsApp Business API bot answers natural language queries against that structured index.',
    tech: ['Node.js', 'PostgreSQL', 'WhatsApp API', 'Tesseract', 'OpenAI'],
    category: 'tool',
    repoUrl: 'https://github.com/yashmagar01/college-sahayak',
    featured: true,
    year: 2025,
    highlights: [
      'Used daily by ~180 classmates across three departments',
      "Reduces 'when is the submission?' spam by ~70%",
      'Custom prompt cache brings per-query cost under 1/10 of a rupee',
    ],
  },
  {
    slug: 'quizforge',
    file: 'quizforge.tsx',
    title: 'QuizForge',
    tagline: 'Turn any PDF into a study quiz in about ten seconds.',
    description:
      'Drop in a chapter PDF, pick a difficulty, and QuizForge generates a mixed set of MCQs, short-answer, and fill-in-the-blank questions with answer keys and explanations.',
    problem:
      "Diploma students revise from 40-page PDFs the night before. There's no time to write practice questions, and pre-made ones rarely match the syllabus.",
    approach:
      'Chunk the PDF, embed it, then use a retrieval-augmented prompt to generate questions with grounded citations back to the source paragraph. Difficulty tuning is a temperature + prompt-template combo.',
    tech: ['Next.js', 'OpenAI', 'pgvector', 'Supabase'],
    category: 'ai',
    repoUrl: 'https://github.com/yashmagar01/quizforge',
    featured: true,
    year: 2024,
    highlights: [
      'Citations link every question back to its source paragraph',
      'Difficulty presets calibrated on ~200 real exam questions',
      'Costs about ₹2 to generate a 20-question quiz',
    ],
  },
  // Archive — non-featured projects
  {
    slug: 'gpa-lms',
    file: 'gpa-lms.tsx',
    title: 'GPA LMS',
    tagline: "A tiny learning management system I built for my department's mock tests.",
    description:
      'A no-nonsense LMS: teachers upload PDFs, create timed tests, and get an auto-graded leaderboard. Students see only what they need. No enterprise bloat.',
    problem:
      'The official portal is slow, ugly, and mostly used to distribute PDFs. Teachers wanted something they could actually run a mock test on.',
    approach:
      'Server components for the read-heavy dashboard, a simple role model (student / teacher), and a proctoring-lite mode that flags tab-switches during timed tests.',
    tech: ['Next.js', 'PostgreSQL', 'Supabase Auth', 'Tailwind CSS'],
    category: 'web',
    repoUrl: 'https://github.com/yashmagar01/gpa-lms',
    featured: false,
    year: 2024,
    highlights: [
      'Adopted by two departments for internal mock exams',
      'Sub-second dashboard load thanks to RSC + edge caching',
      'Auto-grading for MCQs, manual rubric UI for descriptive answers',
    ],
  },
  {
    slug: 'cafe-menu',
    file: 'cafe-menu.tsx',
    title: 'Cafe Menu',
    tagline: "QR-code digital menu for a roadside café — still running two years later.",
    description:
      "A static digital menu accessible via QR code, built over a weekend for a friend's roadside café. The owner can update items via a simple admin form without touching any code. No backend, no database — just a fast static page that has cost zero to run since the day it shipped.",
    problem:
      'Printed menus were always sticky, out of date, and expensive to reprint every time a price changed. The owner needed a way to update items on the fly without calling anyone.',
    approach:
      'Single Astro static page with an admin form that rewrites a JSON file and triggers a Cloudflare Pages redeploy via a deploy hook. Updates go live in under 60 seconds. The whole thing took a weekend to build and has needed zero maintenance since.',
    tech: ['Astro', 'Cloudflare Pages'],
    category: 'web',
    featured: false,
    year: 2023,
    highlights: [
      'Live for 2+ years with zero maintenance or redeployments',
      'Zero hosting cost on Cloudflare Pages free tier',
      'Owner updates menu themselves via a 30-second form — no dev needed',
    ],
  },
  {
    slug: 'attendance-bot',
    file: 'attendance-bot.py',
    title: 'Attendance Bot',
    tagline: 'Telegram bot that pings our batch the moment attendance is being marked.',
    description:
      "A practical little utility that turned out to be surprisingly load-bearing. The bot watches a shared Google Sheet our department uses to log attendance and fires a Telegram notification the moment a new row is added — giving students a 2–3 minute window to walk in before it's marked absent.",
    problem:
      "Attendance in our department was chaotic. Teachers would mark it at unpredictable times, sometimes mid-lecture. Students who arrived slightly late would miss it entirely and fall below the 75% threshold that determines whether you're allowed to sit exams.",
    approach:
      "Python script on a free-tier VM. A cron job polls the Google Sheets API every 2 minutes. When a new attendance row appears, it fires a message to the batch Telegram group via the Bot API. The whole thing is under 80 lines of Python — no framework, no database, just the two APIs and a cron.",
    tech: ['Python', 'Telegram API', 'Google Sheets API'],
    category: 'tool',
    featured: false,
    year: 2023,
    highlights: [
      '100+ daily active users across the batch',
      'Under 80 lines of Python — zero framework overhead',
      'Running on a free-tier VM with zero downtime in 18+ months',
    ],
  },
];
