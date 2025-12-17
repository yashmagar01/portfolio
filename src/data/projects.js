// Project data for portfolio
export const projects = [
  {
    id: 1,
    slug: 'the-future-you',
    title: 'The Future You',
    subtitle: 'AI-Powered Personal Development Platform',
    description: 'An innovative AI-driven platform that helps users visualize and plan their future selves through personalized insights and goal tracking.',
    category: 'Web App',
    year: '2024',
    tags: ['React', 'AI/ML', 'Node.js', 'MongoDB'],
    thumbnail: '/images/projects/the-future-you.jpg',
    images: ['/images/projects/the-future-you-1.jpg', '/images/projects/the-future-you-2.jpg'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    color: '#6366f1'
  },
  {
    id: 2,
    slug: 'persona',
    title: 'Persona',
    subtitle: 'Identity & Profile Management',
    description: 'A comprehensive identity management solution that allows users to create, manage, and share their digital personas across platforms.',
    category: 'Web App',
    year: '2024',
    tags: ['React', 'TypeScript', 'Firebase', 'Tailwind'],
    thumbnail: '/images/projects/persona.jpg',
    images: ['/images/projects/persona-1.jpg', '/images/projects/persona-2.jpg'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    color: '#8b5cf6'
  },
  {
    id: 3,
    slug: 'generations-tool',
    title: 'Generations Tool',
    subtitle: 'Generative AI Content Creation',
    description: 'A powerful tool for generating creative content using cutting-edge AI models, from images to text and beyond.',
    category: 'AI Tool',
    year: '2024',
    tags: ['Python', 'OpenAI', 'React', 'FastAPI'],
    thumbnail: '/images/projects/generations-tool.jpg',
    images: ['/images/projects/generations-tool-1.jpg', '/images/projects/generations-tool-2.jpg'],
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
    color: '#ec4899'
  },
  {
    id: 4,
    slug: 'quantihub',
    title: 'Quantihub',
    subtitle: 'Quantitative Analysis Platform',
    description: 'A sophisticated platform for quantitative analysis and data visualization, designed for researchers and analysts.',
    category: 'Data Platform',
    year: '2024',
    tags: ['Python', 'React', 'D3.js', 'PostgreSQL'],
    thumbnail: '/images/projects/quantihub.jpg',
    images: ['/images/projects/quantihub-1.jpg', '/images/projects/quantihub-2.jpg'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    color: '#14b8a6'
  },
  {
    id: 5,
    slug: 'wpd',
    title: 'WPD',
    subtitle: 'Web Project Dashboard',
    description: 'An all-in-one web project dashboard for managing tasks, tracking progress, and collaborating with team members.',
    category: 'Dashboard',
    year: '2023',
    tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    thumbnail: '/images/projects/wpd.jpg',
    images: ['/images/projects/wpd-1.jpg', '/images/projects/wpd-2.jpg'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    color: '#f59e0b'
  },
  {
    id: 6,
    slug: 'library-management-system',
    title: 'Library Management System',
    subtitle: 'Academic Library Solution',
    description: 'A comprehensive library management system for academic institutions, featuring book tracking, user management, and automated notifications.',
    category: 'Enterprise',
    year: '2023',
    tags: ['Python', 'Flask', 'SQLite', 'Bootstrap'],
    thumbnail: '/images/projects/library-management.jpg',
    images: ['/images/projects/library-management-1.jpg', '/images/projects/library-management-2.jpg'],
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
    color: '#3b82f6'
  }
]

// Skills data
export const skills = [
  { name: 'React', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'Flask', category: 'Backend' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Firebase', category: 'Cloud' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'Git', category: 'DevOps' }
]

// Social links
export const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/yash', icon: 'Github' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/yash', icon: 'Linkedin' },
  { name: 'Twitter', url: 'https://twitter.com/yash', icon: 'Twitter' },
  { name: 'Email', url: 'mailto:yash@example.com', icon: 'Mail' }
]

// Navigation links
export const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' }
]
