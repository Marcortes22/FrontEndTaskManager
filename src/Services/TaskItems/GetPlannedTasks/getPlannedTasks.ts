import { BaseResponse } from '@/Interfaces/BaseResponse';
import { IGetPlannedTaskItems } from '@/Interfaces/TaskItems/ItaskItems';

export async function getPlannedTasks(
  token: string,
): Promise<BaseResponse<IGetPlannedTaskItems>> {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}TaskItem/GetPlannedTasks`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const jsonResponse: BaseResponse<IGetPlannedTaskItems> =
    await response.json();

  if (!response.ok) {
    console.log(response.status);
    throw new Error(` ${jsonResponse.message}`);
  }

  return jsonResponse;
}
