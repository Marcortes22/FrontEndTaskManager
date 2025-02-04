import { TaskItem } from '@/Types/TaskItem.type';
import { format, isBefore, isEqual } from '@formkit/tempo';

export function validateTodayTask(TaskDate: Date): boolean {
  const date = new Date();
  return (
    TaskDate &&
    isEqual(format(TaskDate, 'YYYY-MM-DD'), format(date, 'YYYY-MM-DD'))
  );
}

export function isOlder(taskDate: Date): boolean {
  const date = new Date();
  return isBefore(format(taskDate, 'YYYY-MM-DD'), format(date, 'YYYY-MM-DD'));
}

export function getTodayTasks(tasks: TaskItem[]) {
  const date = new Date();

  return tasks.filter(
    (item) =>
      item.dueDate &&
      isEqual(format(item.dueDate, 'YYYY-MM-DD'), format(date, 'YYYY-MM-DD')),
  );
}
