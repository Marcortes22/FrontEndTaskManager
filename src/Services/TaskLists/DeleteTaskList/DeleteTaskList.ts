import { BaseResponse } from '@/Interfaces/BaseResponse';
import { IdReponse } from '@/Interfaces/BaseResponse';

export async function deleteTaskList({
  taskListId,
  token,
}: {
  token: string;
  taskListId: number;
}): Promise<BaseResponse<IdReponse>> {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}TaskList/${taskListId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const jsonResponse: BaseResponse<IdReponse> = await response.json();

  if (!response.ok) {
    throw new Error(` ${jsonResponse.message}`);
  }

  return jsonResponse;
}
