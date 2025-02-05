import { TaskItemType } from './TaskItem.type';

export type TaskListType = {
  id: number;
  name: string;
  taskItems?: TaskItemType[];
};
