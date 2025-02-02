import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTaskListWithTasksById } from '@/Services/TaskLists/GetTaskListWithTasksById/getTaskListWithTasksById';

export function useTaskLists() {
  const { id } = useParams();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const query = useQuery({
    queryKey: ['TaskList', id],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return getTaskListWithTasksById(token, Number(id));
    },
    enabled: isAuthenticated,
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  const completedTaskCount = query.data?.data?.completedTaskCount ?? 0;
  const allTaskCount = query.data?.data?.totalCount ?? 0;
  console.log(completedTaskCount, allTaskCount);

  return {
    isAuthenticated,
    handleSubmit,
    query,
    completedTaskCount,
    allTaskCount,
  };
}
