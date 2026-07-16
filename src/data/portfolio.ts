export type { Project, ProjectCategory } from './projects';
export type { Post } from './blog';
export type { Vlog } from './vlogs';

export interface Skill {
  name: string;
  category: 'Language' | 'Framework' | 'Tool' | 'Design';
  level: 1 | 2 | 3 | 4 | 5;
  publisher: string;
}

export const profile = {
  name: 'Yash Ajay Magar',
  handle: '@yashmagar',
  role: 'AI Enthusiast • Developer • Entrepreneur • Diploma Student',
  location: 'Pune, India',
  tagline: 'shipping software from a college hostel room',
  email: 'yashajaymagar10@gmail.com',
  github: 'https://github.com/yashmagar01',
  linkedin: 'https://www.linkedin.com/in/yash-magar/',
  twitter: 'https://x.com/yashmag50534849',
  branch: 'main/shipping-in-public',
  bio: `I'm Yash Ajay Magar — a Diploma in Computer Engineering student at Government Polytechnic Awasari, Pune, and an independent developer building real software for clients, friends, and myself.

I work across the stack: React and TypeScript on the front, Node and Supabase on the back, Flutter when a project wants to live on a phone. I care about interfaces that feel obvious, code that stays kind to future me, and shipping small things quickly instead of talking about big things for years.

Outside of code I write essays, film short vlogs about the process, and try to keep learning in public.`,
};

export const education = [
  {
    school: 'Government Polytechnic Awasari',
    program: 'Diploma in Computer Engineering',
    period: '2023 — Present',
    detail: 'Currently in third year. Focus on data structures, web systems, and applied projects.',
  },
  {
    school: 'New English School Maan',
    program: 'SSC',
    period: '2023-2024',
    detail: 'Distinction. First introduction to programming through a event organised by Infosys.',
  },
];

export const skills: Skill[] = [
  { name: 'TypeScript', category: 'Language', level: 5, publisher: 'Microsoft' },
  { name: 'React', category: 'Framework', level: 5, publisher: 'Meta' },
  { name: 'Next.js', category: 'Framework', level: 4, publisher: 'Vercel' },
  { name: 'TanStack Start', category: 'Framework', level: 4, publisher: 'TanStack' },
  { name: 'Node.js', category: 'Language', level: 4, publisher: 'OpenJS' },
  { name: 'Python', category: 'Language', level: 4, publisher: 'PSF' },
  { name: 'Flutter', category: 'Framework', level: 3, publisher: 'Google' },
  { name: 'Supabase', category: 'Tool', level: 4, publisher: 'Supabase Inc.' },
  { name: 'PostgreSQL', category: 'Tool', level: 4, publisher: 'PostgreSQL Global' },
  { name: 'Tailwind CSS', category: 'Framework', level: 5, publisher: 'Tailwind Labs' },
  { name: 'Figma', category: 'Design', level: 4, publisher: 'Figma' },
  { name: 'Framer Motion', category: 'Framework', level: 4, publisher: 'Framer' },
];

export { projects } from './projects';
export { posts } from './blog';
export { vlogs } from './vlogs';
