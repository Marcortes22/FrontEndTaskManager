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
  isDefault?: boolean;
  id: number;
}

export interface ITaskListById {
  id: number;
  name: string;
  uncompletedTasks: TaskItemType[];
  completedTasks: TaskItemType[];
  completedTaskCount: number;
  totalCount: number;
}

export interface ICreateTaskList {
  name: string;
}
