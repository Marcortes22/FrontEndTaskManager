import { ICreateTaskItem } from '@/Interfaces/TaskItems/ItaskItems';

export const myDayDefaultData: ICreateTaskItem = {
  addedToMyDay: new Date().toISOString(),
};

export const importantDefaultData: ICreateTaskItem = {
  isImportant: true,
};

export const plannedDefaultData: ICreateTaskItem = {};

export const completedDefaultData: ICreateTaskItem = {
  isCompleted: true,
};
export const allDefaultData: ICreateTaskItem = {};

export function getTaskListDefaultData(taskListId: number): ICreateTaskItem {
  const taskListDefaultData: ICreateTaskItem = {
    taskListId: taskListId,
  };

  return taskListDefaultData;
}
