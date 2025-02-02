export type TaskItem = {
  title: string;
  isCompleted: boolean;
  isImportant: boolean;
  createdDate: Date;
  reminderDate?: Date | null;
  dueDate?: Date | null;
  completedDate?: Date | null;
  note?: string;
};
