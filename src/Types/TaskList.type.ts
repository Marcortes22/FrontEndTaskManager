import { TaskItem } from './TaskItem.type';

export type TaskList = {
  id: number;
  name: string;
  taskItems?: TaskItem[];
};
