import { useTaskListMutation } from '@/Common/Mutations/useTaskListMutation';
import ThemeContext from '@/Contexts/ThemeContext/ThemeContext';
import { useAuth0 } from '@auth0/auth0-react';
import { useTheme } from '@mui/material';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

export function useUpdateTaskListDialog(taskListId: number) {
  const theme = useTheme();
  const localtion = useLocation();
  const { updateTaskListMutation } = useTaskListMutation(
    theme,
    localtion.pathname,
  );
  const { getAccessTokenSilently } = useAuth0();
  const { setIsLoading } = useContext(ThemeContext);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const taskListName = formData.get('taskListName') as string;
    if (taskListName) {
      setIsLoading(true);
      const token = await getAccessTokenSilently();
      updateTaskListMutation.mutate({
        token,
        taskListId,
        newName: taskListName,
      });
    }
  }

  return { handleSubmit };
}
