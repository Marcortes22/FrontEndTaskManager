import { TaskItem } from './Task.type';

export type TaskList = {
  id: number;
  name: string;
  taskItems: TaskItem[];
};
