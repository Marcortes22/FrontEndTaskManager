import { ThemeContext } from '@/Contexts/index';
import { ICreateTaskList } from '@/Interfaces/TaskLists/ITaskLists';
import { createTaskList } from '@/Services/TaskLists/CreateTaskList/createTaskList';
import { deleteTaskList } from '@/Services/TaskLists/DeleteTaskList/DeleteTaskList';
import { Theme } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import toast from 'react-hot-toast';

export function useTaskListMutation(theme: Theme) {
  const queryClient = useQueryClient();
  const { setIsLoading } = useContext(ThemeContext);

  //Mutation to create taskList
  const createTaskListMutation = useMutation({
    mutationFn: (data: { token: string; taskList: ICreateTaskList }) => {
      return createTaskList(data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['taskListInformation'] });
      toast.success('Successfully created!', {
        style: {
          background: theme.palette.background.default,
          color: theme.palette.text.primary,
        },
      });
    },
    onError: () => {
      toast.error('Task list creation failed', {
        style: {
          background: theme.palette.background.default,
          color: theme.palette.text.primary,
        },
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const deleteTaskListMutation = useMutation({
    mutationFn: (data: { token: string; taskListId: number }) => {
      return deleteTaskList(data);
    },
    onSuccess: () => {
      toast.success('Successfully deleted!', {
        style: {
          background: theme.palette.background.default,
          color: theme.palette.text.primary,
        },
      });
    },
    onError: () => {
      toast.error('Task List deletion failed', {
        style: {
          background: theme.palette.background.default,
          color: theme.palette.text.primary,
        },
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['taskListInformation'] });
      setIsLoading(false);
    },
  });

  return {
    createTaskListMutation,
    deleteTaskListMutation,
  };
}
