export interface Vlog {
  slug: string;
  file: string;
  title: string;
  date: string;
  description: string;
  youtubeId: string;
  duration: string;
}

export const vlogs: Vlog[] = [
  {
    slug: "building-college-sahayak-in-a-weekend",
    file: "college-sahayak-weekend.mp4",
    title: "Building College Sahayak in a weekend",
    date: "2025-10-12",
    description: "A time-lapse of shipping the first working version of the WhatsApp bot my batch now uses daily.",
    youtubeId: "dQw4w9WgXcQ",
    duration: "8:42",
  },
  {
    slug: "a-day-in-diploma-life",
    file: "day-in-diploma-life.mp4",
    title: "A day in the life: diploma student + indie dev",
    date: "2025-08-24",
    description: "6am to midnight. Lab sessions, shipping a bugfix on the college wifi, and finding time to write.",
    youtubeId: "dQw4w9WgXcQ",
    duration: "12:07",
  },
  {
    slug: "how-i-write-code",
    file: "how-i-write-code.mp4",
    title: "How I actually write code (tools & rituals)",
    date: "2025-06-11",
    description: "The editor setup, the notebook, the tea, the walk. Nothing groundbreaking, all honest.",
    youtubeId: "dQw4w9WgXcQ",
    duration: "10:34",
  },
];
