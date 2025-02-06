import { ICreateTaskItem } from '@/Interfaces/TaskItems/ItaskItems';
import { createTaskItem } from '@/Services/TaskItems/CreateTaskItem/createTaskItem';
import { TaskListType } from '@/Types/TaskList.type';
import { getTaskItemDefaultData } from '@/Utils/GetTaskItemDefaultData';
import { useAuth0 } from '@auth0/auth0-react';
import { useTheme } from '@mui/material';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

export function useTaskInputForm(
  pageQueryKey: string,
  defaultTaskListId?: number,
) {
  //Auth0
  const { getAccessTokenSilently } = useAuth0();

  //Location
  const location = useLocation();

  //First Date Value if the location is planned
  const firstDateValue: Dayjs | null = location.pathname.includes('planned')
    ? dayjs()
    : null;

  //States
  const [newTitleText, setNewTitleText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [currentList, setCurrentList] = useState<TaskListType>();
  const [dateValue, setDateValue] = useState<Dayjs | null>(firstDateValue);
  const theme = useTheme();
  //REACT QUERY
  const queryClient = useQueryClient();

  //MUTATION
  const mutation = useMutation({
    mutationFn: (data: { token: string; taskItem: ICreateTaskItem }) => {
      return createTaskItem(data);
    },
    onSuccess: () => {
      invalidateQueries();
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

  //Invalidate Queries function
  function invalidateQueries() {
    queryClient.invalidateQueries({ queryKey: ['taskListInformation'] });

    if (location.pathname.includes('taskList') && defaultTaskListId) {
      queryClient.invalidateQueries({
        queryKey: [`${pageQueryKey}`, `${defaultTaskListId}`],
      });

      return;
    }

    queryClient.invalidateQueries({ queryKey: [`${pageQueryKey}`] });
  }

  //Handlers

  //Handle Text Title Change
  const handleTextTitleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.target.value.trim().length > 100) {
      return;
    }
    setNewTitleText(e.target.value);
  };

  //Handle Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsFocused(false);

    const token = await getAccessTokenSilently();

    if (newTitleText.trim().length === 0) {
      return;
    }

    const defaultData = getTaskItemDefaultData(
      location.pathname,
      currentList?.id,
    );

    const newTaskItem: ICreateTaskItem = {
      title: newTitleText,
      taskListId: currentList?.id,
      dueDate: dateValue ? dateValue.format('YYYY-MM-DD') : null,
      ...defaultData,
    };

    mutation.mutate({ token: token, taskItem: newTaskItem });
    setNewTitleText('');
    if (!firstDateValue) {
      setDateValue(null);
    }
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
    mutation,
  };
}
