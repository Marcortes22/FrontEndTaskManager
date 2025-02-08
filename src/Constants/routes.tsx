import { Layout } from '@/LayOut/Layout';
import All from '@/Pages/All/All';
import Completed from '@/Pages/Completed/Completed';
import Important from '@/Pages/Important/Important';
import MyDay from '@/Pages/MyDay/MyDay';
import Planned from '@/Pages/Planned/Planned';
import TaskLists from '@/Pages/TaskLists/TaskLists';
import ProtectedRoutes from '@/Router/ProtectedRoutes/ProtectedRoutes';

export const routes = [
  {
    path: '/',
    element: (
      <ProtectedRoutes>
        <Layout />
      </ProtectedRoutes>
    ),
    children: [
      { path: '', element: <MyDay /> },
      { path: '/important', element: <Important /> },
      { path: '/planned', element: <Planned /> },
      { path: '/completed', element: <Completed /> },
      { path: '/all', element: <All /> },
      { path: '/taskList/:id', element: <TaskLists /> },
    ],
  },
];
