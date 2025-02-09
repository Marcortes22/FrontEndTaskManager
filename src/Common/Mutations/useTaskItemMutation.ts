import { ICreateTaskItem } from '@/Interfaces/TaskItems/ItaskItems';
import { createTaskItem } from '@/Services/TaskItems/CreateTaskItem/createTaskItem';
import { deleteTaskItem } from '@/Services/TaskItems/DeleteTasItem/deleteTaskItem';
import { updateTaskItem } from '@/Services/TaskItems/UpdateTaskItem/updateTaskItem';
import { InvalidateQueries } from '@/Utils/InvalidateQueries';
import { Theme } from '@mui/material';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useTaskItemMutation(
  pathName: string,
  theme: Theme,
  queriesToInvalidate?: string[],
) {
  const queryClient = useQueryClient();

  //Mutation to create taskItem
  const createTaskItemMutation = useMutation({
    mutationFn: (data: { token: string; taskItem: ICreateTaskItem }) => {
      return createTaskItem(data);
    },
    onSuccess: () => {
      InvalidateQueries(queryClient, pathName, queriesToInvalidate);
      toast.success('Successfully created!', {
        style: {
          background: theme.palette.background.default,
          color: theme.palette.text.primary,
        },
      });
    },
    onError: () => {
      toast.error('Task creation failed');
    },
  });

  //Mutation to update taskItem
  const updateTaskItemMutation = useMutation({
    mutationFn: (data: {
      taskItemId: number;
      token: string;
      taskItem: ICreateTaskItem;
    }) => {
      return updateTaskItem(data);
    },

    onSuccess: () =>
      InvalidateQueries(queryClient, pathName, queriesToInvalidate),
    onError: () => {
      toast.error('Task update failed');
    },
  });

  //Mutation to delete taskItem
  const deleteTaskItemMutation = useMutation({
    mutationFn: (data: { taskItemId: number; token: string }) => {
      return deleteTaskItem(data);
    },
    onSuccess: () => {
      InvalidateQueries(queryClient, pathName, queriesToInvalidate);
      toast.success('Successfully deleted!', {
        style: {
          background: theme.palette.background.default,
          color: theme.palette.text.primary,
        },
      });
    },
    onError: () => {
      toast.error('Task deletion failed');
    },
  });

  return {
    updateTaskItemMutation,
    createTaskItemMutation,
    deleteTaskItemMutation,
  };
}
