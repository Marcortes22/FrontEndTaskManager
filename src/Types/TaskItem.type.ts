import { TaskListType } from './TaskList.type';

export type TaskItemType = {
  title: string;
  isCompleted: boolean;
  isImportant: boolean;
  createdDate: Date;
  reminderDate?: Date | null;
  dueDate?: Date | null;
  completedDate?: Date | null;
  note?: string;
  addedToMyDay: Date | null;
  taskListId?: number;
  taskList?: TaskListType;
};
