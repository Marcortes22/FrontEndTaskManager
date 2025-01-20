export type Task = {
  title: string;
  isCompleted: boolean;
  isImportant: boolean;
  createdDate: Date;
  reminderDate?: Date | null;
  dueDate?: Date | null;
  completedDate?: Date | null;
  tags?: Tag[];
};

export type Tag = {
  name: string;
  color: string;
};
