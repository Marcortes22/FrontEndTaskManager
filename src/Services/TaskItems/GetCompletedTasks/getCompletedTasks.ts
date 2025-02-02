import { BaseResponse } from '@/Interfaces/BaseResponse';
import { IGetCompletedTaskItems } from '@/Interfaces/TaskItems/ItaskItems';

export async function getCompletedTasks(
  token: string,
): Promise<BaseResponse<IGetCompletedTaskItems>> {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}TaskItem/GetCompletedTasks`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const jsonResponse: BaseResponse<IGetCompletedTaskItems> =
    await response.json();

  if (!response.ok) {
    console.log(response.status);
    throw new Error(` ${jsonResponse.message}`);
  }

  return jsonResponse;
}
