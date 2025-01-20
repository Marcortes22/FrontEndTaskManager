import { Task } from '@/Types/Task.type';
import { useState } from 'react';

export default function useTaskList() {
  const [DrawerState, SetDrawerStateState] = useState(false);
  const [CurrentTask, SetCurrentTask] = useState<Task | null>(null);

  function handleSwipeableDrawerState(open: boolean) {
    SetDrawerStateState(open);
  }

  function handleTaskClick(newCurrentTask: Task) {
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
