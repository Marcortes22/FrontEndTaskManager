import { RouterProvider } from 'react-router-dom';
import { useAuthToken } from './Hooks/useAuthToken';
import { useRouterConf } from './Routes/useRouterConf';

export default function App() {
  const { router } = useRouterConf();

  useAuthToken();

  return <RouterProvider router={router} />;
}
