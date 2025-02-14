import { useTaskListMutation } from '@/Common/Mutations/useTaskListMutation';
import ThemeContext from '@/Contexts/ThemeContext/ThemeContext';
import { useAuth0 } from '@auth0/auth0-react';
import { useTheme } from '@mui/material';
import { useContext } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export function useDeleteTaskListModal(taskListId: number) {
  const { id: pageTaskListId } = useParams();

  const { setIsLoading } = useContext(ThemeContext);
  const { getAccessTokenSilently } = useAuth0();
  const theme = useTheme();
  const localtion = useLocation();
  const { deleteTaskListMutation } = useTaskListMutation(
    theme,
    localtion.pathname,
  );
  const navigate = useNavigate();

  async function handleDeleteTaskList() {
    if (taskListId) {
      const token = await getAccessTokenSilently();
      setIsLoading(true);
      if (taskListId === Number(pageTaskListId)) {
        navigate('/');
      }
      deleteTaskListMutation.mutate({ token, taskListId });
    }
  }

  return { handleDeleteTaskList };
}
