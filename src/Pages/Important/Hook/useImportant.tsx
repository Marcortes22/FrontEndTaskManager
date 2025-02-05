import { getImportantTasks } from '@/Services/TaskItems/GetImportantTasks/getImportantTasks';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';

export function useImportant() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const query = useQuery({
    queryKey: ['ImportantTasks'],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return getImportantTasks(token);
    },
    enabled: isAuthenticated,
  });

  const tasksCount = query.data?.data?.tasksCount ?? 0;
  return { isAuthenticated, query, tasksCount };
}
