import { useTaskItemMutation } from '@/Common/Mutations/useTaskItemMutation';
import { ICreateTaskItem } from '@/Interfaces/TaskItems/ItaskItems';
import { TaskListType } from '@/Types/TaskList.type';
import { getTaskItemDefaultData } from '@/Utils/GetTaskItemDefaultData';
import { useAuth0 } from '@auth0/auth0-react';
import { useTheme } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export function useTaskInputForm(pageQueryKey: string) {
  //Auth0
  const { getAccessTokenSilently } = useAuth0();
  const theme = useTheme();
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

  const { createTaskItemMutation } = useTaskItemMutation(
    location.pathname,
    theme,
    [pageQueryKey],
  );

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

    createTaskItemMutation.mutate({ token: token, taskItem: newTaskItem });
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
  };
}
