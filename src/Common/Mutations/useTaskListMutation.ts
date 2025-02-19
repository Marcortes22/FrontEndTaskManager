import { ThemeContext } from '@/Contexts/index';
import { ICreateTaskList } from '@/Interfaces/TaskLists/ITaskLists';
import { createTaskList } from '@/Services/TaskLists/CreateTaskList/createTaskList';
import { deleteTaskList } from '@/Services/TaskLists/DeleteTaskList/DeleteTaskList';
import { updateTaskList } from '@/Services/TaskLists/UpdateTaskList/updateTaskList';
import { InvalidateQueries } from '@/Utils/InvalidateQueries';
import { Theme } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import toast from 'react-hot-toast';

export function useTaskListMutation(theme: Theme, pathName: string) {
  const queryClient = useQueryClient();
  const { setIsLoading } = useContext(ThemeContext);

  //Mutation to create taskList
  const createTaskListMutation = useMutation({
    mutationFn: (data: { token: string; taskList: ICreateTaskList }) => {
      return createTaskList(data);
    },

    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ['taskListInformation'] });
      InvalidateQueries(queryClient, pathName, ['AllTasksLists']);
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
      InvalidateQueries(queryClient, pathName, ['AllTasksLists']);
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
      // queryClient.invalidateQueries({ queryKey: ['taskListInformation'] });
      setIsLoading(false);
    },
  });

  const updateTaskListMutation = useMutation({
    mutationFn: (data: {
      token: string;
      taskListId: number;
      newName: string;
    }) => {
      return updateTaskList(data);
    },
    onSuccess: () => {
      InvalidateQueries(queryClient, pathName, ['AllTasksLists']);
      // queryClient.invalidateQueries({ queryKey: ['taskListInformation'] });
      toast.success('Successfully updated!', {
        style: {
          background: theme.palette.background.default,
          color: theme.palette.text.primary,
        },
      });
    },
    onError: () => {
      toast.error('Task List update failed', {
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

  return {
    createTaskListMutation,
    deleteTaskListMutation,
    updateTaskListMutation,
  };
}
