import { iconsDictionary } from '@/Constants/IconsDictionary';
import { getTaskListsInformation } from '@/Services/TaskLists/TaskListService';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';
export function useSideBarItems() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const query = useQuery({
    queryKey: ['taskList'],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return getTaskListsInformation(token);
    },
    enabled: isAuthenticated,
  });

  return { query, iconsDictionary };
}
