import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './Routes/routes';

export default function App() {
  const router = createBrowserRouter(routes, {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
    },
  });
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
