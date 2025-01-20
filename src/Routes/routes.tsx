import { Layout } from '@/LayOut/Layout';
import All from '@/Pages/All/All';
import Completed from '@/Pages/Completed/Completed';
import Important from '@/Pages/Important/Important';
import MyDay from '@/Pages/MyDay/MyDay';
import Planned from '@/Pages/Planned/Planned';

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <MyDay /> },
      { path: '/Important', element: <Important /> },
      { path: '/Planned', element: <Planned /> },
      { path: '/Completed', element: <Completed /> },
      { path: '/All', element: <All /> },
    ],
  },
];

export default routes;
