import { useTaskItemMutation } from '@/Common/Mutations/useTaskItemMutation';
import { ThemeContext } from '@/Contexts/index';
import { TaskItemType } from '@/Types/index';
import { useAuth0 } from '@auth0/auth0-react';
import { useTheme } from '@mui/material';
import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ICreateTaskItem, IUpdateTaskItem } from '@/Interfaces/index';

export default function useTaskList() {
  //Constansts
  const location = useLocation();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const theme = useTheme();

  //States
  const { getAccessTokenSilently } = useAuth0();
  const { setIsLoading } = useContext(ThemeContext);
  const [DrawerState, SetDrawerStateState] = useState(false);
  const [CurrentTaskId, SetCurrentTaskId] = useState<number>();

  //Mutation to update taskItem
  const { updateTaskItemMutation } = useTaskItemMutation(
    location.pathname,
    theme,
  );

  //Functions
  function handleSwipeableDrawerState(open: boolean) {
    SetDrawerStateState(open);
  }

  function handleTaskClick(newCurrentTask: TaskItemType) {
    SetCurrentTaskId(newCurrentTask.id);
  }

  //Function to any field update taskItem
  async function handleUpdateTaskItem(
    task: TaskItemType,
    newData: IUpdateTaskItem,
  ) {
    const token = await getAccessTokenSilently();

    const newTask: ICreateTaskItem = {
      ...task,
      ...newData,
    };
    setIsLoading(true);
    updateTaskItemMutation.mutate({
      taskItemId: task.id,
      token,
      taskItem: newTask,
    });
  }

  return {
    DrawerState,
    SetDrawerStateState,
    CurrentTaskId,
    SetCurrentTaskId,
    handleSwipeableDrawerState,
    handleTaskClick,
    timeZone,
    handleUpdateTaskItem,
    theme,
  };
}
