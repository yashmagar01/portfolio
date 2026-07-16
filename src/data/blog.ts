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

export const posts: Post[] = [];
