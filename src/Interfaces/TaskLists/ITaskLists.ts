import { TaskItemType } from '@/Types/TaskItem.type';

export interface ITaskListWithTasks {
  id: number;
  name: string;
  taskItems: TaskItemType[];
}

export interface ITaskListWithCountTasks {
  id: number;
  name: string;
  countOfTasks: number;
}

export interface ITaskListInformation {
  name: string;
  amoundOfTasks: number;
  url: string;
}

export interface ITaskListInformation {
  name: string;
  amoundOfTasks: number;
  url: string;
}

export interface ITaskListById {
  id: number;
  name: string;
  uncompletedTasks: TaskItemType[];
  completedTasks: TaskItemType[];
  completedTaskCount: number;
  totalCount: number;
}
