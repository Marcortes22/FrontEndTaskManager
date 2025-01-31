import { Layout } from '@/LayOut/Layout';
import All from '@/Pages/All/All';
import Completed from '@/Pages/Completed/Completed';
import Important from '@/Pages/Important/Important';
import MyDay from '@/Pages/MyDay/MyDay';
import Planned from '@/Pages/Planned/Planned';
import TaskList from '@/Pages/TaskList/TaskList';

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <MyDay /> },
      { path: '/important', element: <Important /> },
      { path: '/planned', element: <Planned /> },
      { path: '/completed', element: <Completed /> },
      { path: '/all', element: <All /> },
      { path: '/taskList/:id', element: <TaskList /> },
    ],
  },
];
