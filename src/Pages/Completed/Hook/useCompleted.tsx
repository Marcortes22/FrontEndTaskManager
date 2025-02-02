import { GetTaskListWithCompletedTasks } from '@/Services/TaskLists/GetTaskListWithCompletedTasks/GetTaskListWithCompletedTasks';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';

export function useCompleted() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const query = useQuery({
    queryKey: ['CompletedTasks'],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return GetTaskListWithCompletedTasks(token);
    },
    enabled: isAuthenticated,
  });

  console.log(query.data?.data);
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  let completedTasksCount = 0;

  query.data?.data?.forEach((item) => {
    completedTasksCount += item.taskItems.length;
  });

  return { isAuthenticated, handleSubmit, query, completedTasksCount };
}
