import { createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';

export function useRouterConf() {
  const router = createBrowserRouter(routes, {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
    },
  });

  return { router };
}
