import { createFileRoute } from '@tanstack/react-router';
import { IDEWorkspace } from '@/components/ide/Workspace';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      {
        title: 'Yash Ajay Magar — AI Enthusiast • Developer • Entrepreneur • Diploma Student',
      },
      {
        name: 'description',
        content:
          'Portfolio of Yash Ajay Magar — AI enthusiast, full-stack developer, and diploma student building AI-driven web products, developer tools, and open-source projects from Pune, India.',
      },
      {
        property: 'og:title',
        content: 'Yash Ajay Magar — AI Enthusiast • Developer • Entrepreneur • Diploma Student',
      },
      {
        property: 'og:description',
        content:
          'Portfolio of Yash Ajay Magar — AI enthusiast, full-stack developer, and diploma student building AI-driven web products, developer tools, and open-source projects from Pune, India.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://magar.xyz/' },
      { name: 'twitter:card', content: 'summary_large_image' },
      {
        name: 'twitter:title',
        content: 'Yash Ajay Magar — AI Enthusiast • Developer • Entrepreneur • Diploma Student',
      },
    ],
    links: [{ rel: 'canonical', href: 'https://magar.xyz/' }],
  }),
  component: Index,
});

function Index() {
  return <IDEWorkspace />;
}
