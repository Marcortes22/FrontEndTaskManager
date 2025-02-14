import { useTaskListMutation } from '@/Common/Mutations/useTaskListMutation';

import ThemeContext from '@/Contexts/ThemeContext/ThemeContext';
import { ICreateTaskList } from '@/Interfaces/TaskLists/ITaskLists';
import { useAuth0 } from '@auth0/auth0-react';
import { useTheme } from '@mui/material';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

export function useCreateNewTaskListDialog(
  handleCreateTaskListDialogClose: () => void,
) {
  const localtion = useLocation();
  const { setIsLoading } = useContext(ThemeContext);
  const theme = useTheme();
  const { createTaskListMutation } = useTaskListMutation(
    theme,
    localtion.pathname,
  );
  const { getAccessTokenSilently } = useAuth0();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(formData);
    const formJson = Object.fromEntries(formData.entries());
    const taskListName = formJson.taskListName;
    if (!taskListName) return;
    const token = await getAccessTokenSilently();
    const newTaskList: ICreateTaskList = {
      name: taskListName.toString(),
    };
    setIsLoading(true);
    createTaskListMutation.mutate({
      token: token,
      taskList: newTaskList,
    });
    handleCreateTaskListDialogClose();
  };

  return {
    handleSubmit,
  };
}
