import { TaskItem } from '@/Types/Task.type';

export interface IGetTodayTaskItems {
  uncompletedTasks: TaskItem[];
  totalCount: number;
  completedTasks: TaskItem[];
  completedCount: number;
}

export interface IGetImportantTaskItems {
  tasks: TaskItem[];
  tasksCount: number;
}

export interface IGetCompletedTaskItems {
  completedTasks: TaskItem[];
  tasksCount: number;
}

export interface IGetPlannedTaskItems {
  earlierTasks: TaskItem[];
  earlierTasksCount: number;
  todayTasks: TaskItem[];
  todayTasksCount: number;
  tomorrowTaks: TaskItem[];
  tomorrowTasksCount: number;
  thisWeekTasks: TaskItem[];
  thisWeekTasksCount: number;
  laterTasks: TaskItem[];
  laterTasksCount: number;
  tasksCount: number;
}
