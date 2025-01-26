import Auth from '@/Auth/Auth';
import { Layout } from '@/LayOut/Layout';
import All from '@/Pages/All/All';
import Completed from '@/Pages/Completed/Completed';
import Important from '@/Pages/Important/Important';
import MyDay from '@/Pages/MyDay/MyDay';
import Planned from '@/Pages/Planned/Planned';

export const routes = [
  {
    path: '/',
    element: <Auth children={<Layout />} />,
    children: [
      { path: '', element: <MyDay /> },
      { path: '/Important', element: <Important /> },
      { path: '/Planned', element: <Planned /> },
      { path: '/Completed', element: <Completed /> },
      { path: '/All', element: <All /> },
    ],
  },
];
