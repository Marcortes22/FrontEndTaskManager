import { iconsDictionary } from '@/Constants/IconsDictionary';
import { getTaskListsInformation } from '@/Services/TaskLists/GetTaskListInformation/getTaskListsInformation';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router';
export function useSideBarItems() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const location = useLocation();
  const query = useQuery({
    queryKey: ['taskListInformation'],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return getTaskListsInformation(token);
    },
    enabled: isAuthenticated,
  });

  return { query, iconsDictionary, location };
}
