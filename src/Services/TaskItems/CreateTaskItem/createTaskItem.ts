import { BaseResponse } from '@/Interfaces/BaseResponse';
import { ICreateTaskItem } from '@/Interfaces/TaskItems/ItaskItems';
import { TaskItemType } from '@/Types/TaskItem.type';

export async function createTaskItem({
  token,
  taskItem,
}: {
  token: string;
  taskItem: ICreateTaskItem;
}): Promise<BaseResponse<TaskItemType>> {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}TaskItem`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskItem),
  });

  const jsonResponse: BaseResponse<TaskItemType> = await response.json();

  if (!response.ok) {
    throw new Error(` ${jsonResponse.message}`);
  }

  return jsonResponse;
}
