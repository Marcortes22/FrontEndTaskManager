import { getMyTaskList } from '@/Services/TaskLists/GetMyTaskList/getMyTaskList';
import { TaskListType } from '@/Types/TaskList.type';

import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export function useTaskListSelector({
  setCurrentList,
  defaultTaskListId,
}: {
  setCurrentList: (list: TaskListType) => void;
  defaultTaskListId?: number;
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

  const [selectedList, setSelectedList] = useState<TaskListType | null>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    if (
      query.data?.data &&
      query.data.data.length > 1 &&
      selectedList === null
    ) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMenuItemClick = (newCurrent: TaskListType) => {
    setCurrentList(newCurrent);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (defaultTaskListId && query.data?.data) {
      const list = query.data.data.find(
        (taskList) => taskList.id === defaultTaskListId,
      );
      setSelectedList(list || null);
    }
  }, [defaultTaskListId, query?.data?.data]);

  useEffect(() => {
    if (selectedList) {
      setCurrentList(selectedList);
      return;
    }

    if (query.data?.data) {
      setCurrentList(query.data.data[0]);
    }
  }, [
    defaultTaskListId,
    query?.data?.data,
    query.isLoading,
    selectedList,
    setCurrentList,
  ]);

  return {
    open,
    handleClickListItem,
    handleMenuItemClick,
    handleClose,
    anchorEl,
    query,
  };
}
