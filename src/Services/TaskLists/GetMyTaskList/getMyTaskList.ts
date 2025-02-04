import { BaseResponse } from '@/Interfaces/BaseResponse';
import { TaskList } from '@/Types/TaskList.type';

export async function getMyTaskList(
  token: string,
): Promise<BaseResponse<TaskList[]>> {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}TaskList/getMyTaskLists`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const jsonResponse: BaseResponse<TaskList[]> = await response.json();

  if (!response.ok) {
    console.log(response.status);
    throw new Error(` ${jsonResponse.message}`);
  }

  return jsonResponse;
}
