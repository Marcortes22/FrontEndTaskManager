import { useTaskItemMutation } from '@/Common/Mutations/useTaskItemMutation';
import {
  ICreateTaskItem,
  IUpdateTaskItem,
} from '@/Interfaces/TaskItems/ItaskItems';
import { TaskItemType } from '@/Types/TaskItem.type';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function useTaskList() {
  //Constansts
  const location = useLocation();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  //Auth0
  const { getAccessTokenSilently } = useAuth0();

  //States
  const [DrawerState, SetDrawerStateState] = useState(false);
  const [CurrentTaskId, SetCurrentTaskId] = useState<number>();

  //Mutations to update taskItem
  const { updateOnSubmit } = useTaskItemMutation(location.pathname);

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

    updateOnSubmit({
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
  };
}
