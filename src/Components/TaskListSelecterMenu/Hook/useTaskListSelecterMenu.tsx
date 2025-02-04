import { getMyTaskList } from '@/Services/TaskLists/GetMyTaskList/getMyTaskList';
import { TaskList } from '@/Types/TaskList.type';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export function useTaskListSelecterMenu({
  setCurrentList,
}: {
  setCurrentList: (list: TaskList) => void;
}) {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const query = useQuery({
    queryKey: ['AllTasksLists'],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return getMyTaskList(token);
    },
    enabled: isAuthenticated,
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    if (query.data?.data && query.data.data.length > 1) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMenuItemClick = (newCurrent: TaskList) => {
    setCurrentList(newCurrent);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (query.data?.data) {
      setCurrentList(query.data.data[0]);
    }
  }, [query?.data?.data, query.isLoading, setCurrentList]);

  return {
    open,
    handleClickListItem,
    handleMenuItemClick,
    handleClose,
    anchorEl,
    query,
  };
}
