import { useTaskListMutation } from '@/Common/Mutations/useTaskListMutation';
import ThemeContext from '@/Contexts/ThemeContext/ThemeContext';
import { useAuth0 } from '@auth0/auth0-react';
import { useTheme } from '@mui/material';
import { useContext } from 'react';

export function useDeleteTaskListModal(taskListId: number) {
  const { setIsLoading } = useContext(ThemeContext);
  const { getAccessTokenSilently } = useAuth0();
  const theme = useTheme();
  const { deleteTaskListMutation } = useTaskListMutation(theme);

  async function handleDeleteTaskList() {
    if (taskListId) {
      const token = await getAccessTokenSilently();
      setIsLoading(true);
      deleteTaskListMutation.mutate({ token, taskListId });
    }
  }

  return { handleDeleteTaskList };
}
