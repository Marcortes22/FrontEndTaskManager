import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from '@/Constants/routes';

export function AppRouter() {
  const router = createBrowserRouter(routes, {
    future: {
      v7_fetcherPersist: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
      v7_normalizeFormMethod: true,
    },
  });

  return (
    <>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </>
  );
}
