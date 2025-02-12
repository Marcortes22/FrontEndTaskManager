import { GetTaskListWithCompletedTasks } from '@/Services/TaskLists/GetTaskListWithCompletedTasks/GetTaskListWithCompletedTasks';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';

export function useCompleted() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  // Query to get all completed tasks
  const query = useQuery({
    queryKey: ['CompletedTasks'],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return GetTaskListWithCompletedTasks(token);
    },
    enabled: isAuthenticated,
  });

  let completedTasksCount = 0;

  query.data?.data?.forEach((item) => {
    completedTasksCount += item.taskItems.length;
  });

  return { isAuthenticated, query, completedTasksCount };
}
