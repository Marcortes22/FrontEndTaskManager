import { BaseResponse } from '@/Interfaces/BaseResponse';
import { ITaskListById } from '@/Interfaces/TaskLists/ITaskLists';

export async function getTaskListWithTasksById(
  token: string,
  id: number,
): Promise<BaseResponse<ITaskListById>> {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}TaskList/getTaskListById/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const jsonResponse: BaseResponse<ITaskListById> = await response.json();

  if (!response.ok) {
    console.log(response.status);
    throw new Error(` ${jsonResponse.message}`);
  }

  return jsonResponse;
}
