import { TaskItem } from '@/Types/Task.type';

export interface ITaskListWithTasks {
  id: number;
  name: string;
  taskItems: TaskItem[];
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
  uncompletedTasks: TaskItem[];
  completedTasks: TaskItem[];
  completedTaskCount: number;
  totalCount: number;
}
