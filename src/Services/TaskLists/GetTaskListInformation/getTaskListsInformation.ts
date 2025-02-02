import { BaseResponse } from '@/Interfaces/BaseResponse';
import { ITaskListInformation } from '@/Interfaces/TaskLists/ITaskLists';

export async function getTaskListsInformation(
  token: string,
): Promise<BaseResponse<ITaskListInformation[]>> {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}TaskList/getTaskListInformation`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const jsonResponse: BaseResponse<ITaskListInformation[]> =
    await response.json();

  if (!response.ok) {
    console.log(response.status);
    throw new Error(` ${jsonResponse.message}`);
  }

  return jsonResponse;
}
