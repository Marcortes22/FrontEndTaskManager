import { ICreateTaskItem } from '@/Interfaces/TaskItems/ItaskItems';
import { createTaskItem } from '@/Services/TaskItems/CreateTaskItem/createTaskItem';
import { TaskListType } from '@/Types/TaskList.type';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export function useTaskInputForm(
  defaultValuePerPage: ICreateTaskItem,
  pageQueryKey: string,
) {
  const location = useLocation();
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();
  const firstDateValue: Dayjs | null = location.pathname.includes('planned')
    ? dayjs()
    : null;

  const [newTitleText, setNewTitleText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [currentList, setCurrentList] = useState<TaskListType>();
  const [dateValue, setDateValue] = useState<Dayjs | null>(firstDateValue);
  const mutation = useMutation({
    mutationFn: createTaskItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['taskListInformation'] });
      queryClient.invalidateQueries({ queryKey: [`${pageQueryKey}`] });
      // query.invalidateQueries(['TaskList', currentList?.id]);
    },
  });

  const handleTextTitleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.target.value.trim().length > 100) {
      return;
    }
    setNewTitleText(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = await getAccessTokenSilently();

    if (newTitleText.trim().length === 0) {
      return;
    }

    const newTaskItem: ICreateTaskItem = {
      title: newTitleText,
      taskListId: currentList?.id,
      dueDate: dateValue ? dateValue.toDate() : null,
      ...defaultValuePerPage,
    };

    mutation.mutate({ token: token, taskItem: newTaskItem });
    setNewTitleText('');
    setDateValue(null);
  };

  return {
    isFocused,
    setIsFocused,
    currentList,
    setCurrentList,
    dateValue,
    setDateValue,
    newTitleText,
    handleTextTitleChange,
    handleSubmit,
  };
}
