import { TaskItemType } from '@/Types/TaskItem.type';

export interface IGetTodayTaskItems {
  uncompletedTasks: TaskItemType[];
  totalCount: number;
  completedTasks: TaskItemType[];
  completedCount: number;
}

export interface IGetImportantTaskItems {
  tasks: TaskItemType[];
  tasksCount: number;
}

export interface IGetCompletedTaskItems {
  completedTasks: TaskItemType[];
  tasksCount: number;
}

export interface IGetPlannedTaskItems {
  earlierTasks: TaskItemType[];
  earlierTasksCount: number;
  todayTasks: TaskItemType[];
  todayTasksCount: number;
  tomorrowTaks: TaskItemType[];
  tomorrowTasksCount: number;
  thisWeekTasks: TaskItemType[];
  thisWeekTasksCount: number;
  laterTasks: TaskItemType[];
  laterTasksCount: number;
  tasksCount: number;
}

export interface ICreateTaskItem {
  title?: string;
  isCompleted?: boolean;
  isImportant?: boolean;
  dueDate?: Date | null | string;
  note?: string;
  addedToMyDay?: string | null | Date;
  taskListId?: number;
}
