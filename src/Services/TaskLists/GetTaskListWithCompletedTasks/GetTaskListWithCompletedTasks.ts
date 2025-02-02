import { BaseResponse } from '@/Interfaces/BaseResponse';
import { ITaskListWithTasks } from '@/Interfaces/TaskLists/ITaskLists';

export async function GetTaskListWithCompletedTasks(
  token: string,
): Promise<BaseResponse<ITaskListWithTasks[]>> {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}TaskList/getTaskListWithCompletedTasks`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const jsonResponse: BaseResponse<ITaskListWithTasks[]> =
    await response.json();

  if (!response.ok) {
    console.log(response.status);
    throw new Error(` ${jsonResponse.message}`);
  }

  return jsonResponse;
}
