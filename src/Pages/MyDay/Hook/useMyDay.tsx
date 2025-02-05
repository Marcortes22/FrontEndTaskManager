import { getMyDayTasks } from '@/Services/TaskItems/GetMyDayTasks/getMyDayTasks';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';

export default function useMyDay() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const query = useQuery({
    queryKey: ['MyDayTasks'],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return getMyDayTasks(token);
    },
    enabled: isAuthenticated,
  });

  const todayDate = new Date();

  const tasksCount = query.data?.data?.totalCount ?? 0;

  return { isAuthenticated, todayDate, query, tasksCount };
}
