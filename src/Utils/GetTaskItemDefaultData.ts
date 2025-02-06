import { ICreateTaskItem } from '@/Interfaces/TaskItems/ItaskItems';

export function getTaskItemDefaultData(
  pathname: string,
  taskListId?: number,
): ICreateTaskItem {
  const defaultData: ICreateTaskItem = {};

  if (taskListId) {
    defaultData.taskListId = taskListId;
  }

  switch (pathname) {
    case '/':
      defaultData.addedToMyDay = new Date();
      return defaultData;
    case '/important':
      defaultData.isImportant = true;
      return defaultData;
    case '/planned':
      return defaultData;
    case '/completed':
      defaultData.isCompleted = true;
      return defaultData;
    case '/all':
      return defaultData;
    default:
      return defaultData;
  }
}
