import { BaseResponse } from '@/Interfaces/BaseResponse';
import { IGetImportantTaskItems } from '@/Interfaces/TaskItems/ItaskItems';

export async function getImportantTasks(
  token: string,
): Promise<BaseResponse<IGetImportantTaskItems>> {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}TaskItem/GetImportantTasks`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const jsonResponse: BaseResponse<IGetImportantTaskItems> =
    await response.json();

  if (!response.ok) {
    console.log(response.status);
    throw new Error(` ${jsonResponse.message}`);
  }

  return jsonResponse;
}
