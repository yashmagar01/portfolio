import { QueryClient } from '@tanstack/react-query';
import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

export const getRouter = () => {
  const queryClient = new QueryClient();

  const isBrowser = typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: isBrowser,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
