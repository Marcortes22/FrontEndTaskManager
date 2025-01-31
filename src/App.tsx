import { RouterProvider } from 'react-router-dom';
import { useRouterConf } from './Routes/useRouterConf';

export default function App() {
  const { router } = useRouterConf();

  return (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  );
}
