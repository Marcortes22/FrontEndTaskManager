import { getPlannedTasks } from '@/Services/TaskItems/GetPlannedTasks/getPlannedTasks';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';

export function usePlanned() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const query = useQuery({
    queryKey: ['PlannedTasks'],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return getPlannedTasks(token);
    },
    enabled: isAuthenticated,
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  const earlierTasksCount = query.data?.data?.earlierTasksCount ?? 0;
  const todayTasksCount = query.data?.data?.todayTasksCount ?? 0;
  const tomorrowTasksCount = query.data?.data?.tomorrowTasksCount ?? 0;
  const thisWeekTasksCount = query.data?.data?.thisWeekTasksCount ?? 0;
  const laterTasksCount = query.data?.data?.laterTasksCount ?? 0;
  const tasksCount = query.data?.data?.tasksCount ?? 0;

  return {
    isAuthenticated,
    handleSubmit,
    query,
    earlierTasksCount,
    todayTasksCount,
    tomorrowTasksCount,
    thisWeekTasksCount,
    laterTasksCount,
    tasksCount,
  };
}
