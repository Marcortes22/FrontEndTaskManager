import { TaskItem } from '@/Types/TaskItem.type';
import { useState } from 'react';

export default function useTaskList() {
  const [DrawerState, SetDrawerStateState] = useState(false);
  const [CurrentTask, SetCurrentTask] = useState<TaskItem | null>(null);

  function handleSwipeableDrawerState(open: boolean) {
    SetDrawerStateState(open);
  }

  function handleTaskClick(newCurrentTask: TaskItem) {
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
