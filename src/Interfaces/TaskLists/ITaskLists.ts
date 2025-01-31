// export interface TaskList {
//   id: number;
//   name: string;
//   userId: string;
//   isDefault: boolean;
//   taskItems: ITaskItem[];
// }

export interface TaskListWithCountTasks {
  id: number;
  name: string;
  countOfTasks: number;
}

export interface TaskListInformation {
  name: string;
  amoundOfTasks: number;
  url: string;
}
