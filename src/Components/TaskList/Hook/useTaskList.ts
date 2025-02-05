import { TaskItemType } from '@/Types/TaskItem.type';
import { useState } from 'react';

export default function useTaskList() {
  const [DrawerState, SetDrawerStateState] = useState(false);
  const [CurrentTask, SetCurrentTask] = useState<TaskItemType | null>(null);

  function handleSwipeableDrawerState(open: boolean) {
    SetDrawerStateState(open);
  }

  function handleTaskClick(newCurrentTask: TaskItemType) {
    SetCurrentTask(newCurrentTask);
  }

  return {
    DrawerState,
    SetDrawerStateState,
    CurrentTask,
    SetCurrentTask,
    handleSwipeableDrawerState,
    handleTaskClick,
  };
}
