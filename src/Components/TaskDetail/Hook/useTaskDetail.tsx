import { TaskItemType } from '@/Types/TaskItem.type';
import { useEffect, useState } from 'react';

export function useTaskDetail(task: TaskItemType | null) {
  const [noteIsEditing, setNoteIsEditing] = useState(false);
  const [noteText, setNoteText] = useState(task?.note ?? '');

  const [titleIsEditing, setTitleIsEditing] = useState(true);
  const [titleText, setTitleText] = useState(task?.title ?? '');

  function handleTitleChange(open: boolean) {
    setTitleIsEditing(open);
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
  }

  function handleTextNoteChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    if (e.target.value.trim().length > 150) {
      return;
    }
    setNoteText(e.target.value);
  }
  useEffect(() => {
    setTitleText(task?.title ?? '');
    handleTitleChange(true);
  }, [task]);

  return {
    noteIsEditing,
    noteText,
    titleIsEditing,
    titleText,
    handleTitleChange,
    handleTitleTextChange,
    handleNoteChange,
    handleTextNoteChange,
  };
}
