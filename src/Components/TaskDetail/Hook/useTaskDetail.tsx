import { useTaskItemMutation } from '@/Common/Mutations/useTaskItemMutation';
import {
  ICreateTaskItem,
  IUpdateTaskItem,
} from '@/Interfaces/TaskItems/ItaskItems';
import { getTaskItemById } from '@/Services/TaskItems/GetTaskItemById/getTaskItemById';
import { TaskItemType } from '@/Types/TaskItem.type';
import { useAuth0 } from '@auth0/auth0-react';
import { useTheme } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function useTaskDetail(
  taskId: number,
  DrawerState: boolean,
  handleSwipeableDrawerState: (open: boolean) => void,
) {
  //Auth0 functions
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const location = useLocation();
  //QueryClient to invalidate the query
  const queryClient = useQueryClient();
  const theme = useTheme();

  //Query
  const query = useQuery({
    queryKey: ['taskById'],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return getTaskItemById(token, taskId);
    },

    enabled: isAuthenticated && DrawerState && taskId !== undefined,
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  //States to manage if the title or note is being edited
  const [noteIsEditing, setNoteIsEditing] = useState(false);
  const [titleIsEditing, setTitleIsEditing] = useState(true);

  //States to manage the text of the title and note
  const [noteText, setNoteText] = useState(query.data?.data?.note ?? '');
  const [titleText, setTitleText] = useState(query.data?.data?.title ?? '');

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  //State to manage current task
  const [task, setTask] = useState(query.data?.data);

  //Functions

  //Mutations to update taskItem
  const { updateTaskItemMutation } = useTaskItemMutation(
    location.pathname,
    theme,
    ['taskById'],
  );
  const { deleteTaskItemMutation } = useTaskItemMutation(
    location.pathname,
    theme,
  );

  function handleTitleChange(open: boolean) {
    setTitleIsEditing(open);
    if (!open && titleText !== task?.title && task && titleText.trim() !== '') {
      handleUpdateTaskItemDetail(task, { title: titleText });
    }
  }

  function handleTitleTextChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    if (e.target.value.trim().length > 100) {
      return;
    }

    setTitleText(e.target.value);
  }

  function handleNoteChange(open: boolean) {
    setNoteIsEditing(open);
    if (!open && noteText !== task?.note && task) {
      handleUpdateTaskItemDetail(task, { note: noteText });
    }
  }

  function handleTextNoteChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    if (e.target.value.trim().length > 150) {
      return;
    }
    setNoteText(e.target.value);
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDateSelector = () => {
    setAnchorEl(null);
  };

  function handleDateChange(date: Dayjs | null, task: TaskItemType) {
    if (
      date &&
      date?.isValid() &&
      date.format('YYYY-MM-DD') !== task.dueDate?.toString()
    ) {
      handleUpdateTaskItemDetail(task, {
        dueDate: date.format('YYYY-MM-DD'),
      });
    }
  }

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['taskById'] });
  }, [queryClient, taskId]);

  useEffect(() => {
    if (query.data?.data && DrawerState) {
      setTask(query.data.data);
      setTitleText(query.data.data.title);
      setNoteText(query.data.data.note ?? '');
    }
  }, [DrawerState, query.data?.data]);

  async function handleUpdateTaskItemDetail(
    task: TaskItemType,
    newData: IUpdateTaskItem,
  ) {
    const token = await getAccessTokenSilently();

    const newTask: ICreateTaskItem = {
      ...task,
      ...newData,
    };

    updateTaskItemMutation.mutate({
      taskItemId: task.id,
      token,
      taskItem: newTask,
    });
  }

  async function handleDeleteTaskItem(task: TaskItemType) {
    if (task && task.id) {
      const token = await getAccessTokenSilently();
      deleteTaskItemMutation.mutate({ taskItemId: task.id, token });
      handleSwipeableDrawerState(false);
    }
  }

  return {
    noteIsEditing,
    noteText,
    titleIsEditing,
    titleText,
    handleTitleChange,
    handleTitleTextChange,
    handleNoteChange,
    handleTextNoteChange,
    task,
    query,
    anchorEl,
    open,
    handleCloseDateSelector,
    handleClick,
    handleUpdateTaskItemDetail,
    handleDateChange,
    handleDeleteTaskItem,
    openDeleteModal,
    setOpenDeleteModal,
  };
}
