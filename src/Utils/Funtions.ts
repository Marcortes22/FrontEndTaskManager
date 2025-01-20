import { Task } from '@/Types/Task.type';
import { format, isEqual } from '@formkit/tempo';

export function validateTodayTask(task: Task) {
  const date = new Date();
  return (
    task?.dueDate &&
    isEqual(format(task?.dueDate, 'YYYY-MM-DD'), format(date, 'YYYY-MM-DD'))
  );
}

export function getTodayTasks(tasks: Task[]) {
  const date = new Date();

  return tasks.filter(
    (item) =>
      item.dueDate &&
      isEqual(format(item.dueDate, 'YYYY-MM-DD'), format(date, 'YYYY-MM-DD')),
  );
}
