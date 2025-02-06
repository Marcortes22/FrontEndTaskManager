import { ICreateTaskItem } from '@/Interfaces/TaskItems/ItaskItems';
import { updateTaskItem } from '@/Services/TaskItems/UpdateTaskItem/updateTaskItem';
import { GetCurrentPageQueryKey } from '@/Utils/GetCurrentPageQueryKey';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useTaskItemMutation(pathName: string) {
  const { queryKey, queryKeyId } = GetCurrentPageQueryKey(pathName);

  const queryClient = useQueryClient();
  const updateTaskItemMutation = useMutation({
    mutationFn: (data: {
      taskItemId: number;
      token: string;
      taskItem: ICreateTaskItem;
    }) => {
      return updateTaskItem(data);
    },

    onSuccess: () => {
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey: ['taskListInformation'] });

        if (queryKeyId) {
          queryClient.invalidateQueries({ queryKey: [queryKey, queryKeyId] });
          console.log('entre');
          return;
        }
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      }
    },
    onError: () => {
      toast.error('Task update failed');
    },
  });

  const updateOnSubmit = (data: {
    taskItemId: number;
    token: string;
    taskItem: ICreateTaskItem;
  }) => {
    updateTaskItemMutation.mutate(data);
  };

  return { updateTaskItemMutation, updateOnSubmit };
}
