import { TaskList } from '@/Types/TaskList.type';
import { Dayjs } from 'dayjs';
import { useRef, useState } from 'react';

export function useTaskInputForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [currentList, setCurrentList] = useState<TaskList>();
  const [dateValue, setDateValue] = useState<Dayjs | null>(null);

  return {
    inputRef,
    isFocused,
    setIsFocused,
    currentList,
    setCurrentList,
    dateValue,
    setDateValue,
  };
}
