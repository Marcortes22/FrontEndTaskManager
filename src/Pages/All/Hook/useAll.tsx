import { GetTaskListWithTasks } from '@/Services/TaskLists/GetTaskListsWithTasks/getTaskListWithTasks';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';

export function useAll() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const query = useQuery({
    queryKey: ['AllTasks'],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return GetTaskListWithTasks(token);
    },
    enabled: isAuthenticated,
  });

  const allTasksCount =
    query.data?.data?.reduce((sum, item) => sum + item.taskItems.length, 0) ??
    0;

  return { isAuthenticated, query, allTasksCount };
}
