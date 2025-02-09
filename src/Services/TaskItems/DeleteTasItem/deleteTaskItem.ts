import { BaseResponse } from '@/Interfaces/BaseResponse';
import { IdReponse } from '@/Interfaces/BaseResponse';

export async function deleteTaskItem({
  taskItemId,
  token,
}: {
  token: string;
  taskItemId: number;
}): Promise<BaseResponse<IdReponse>> {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}TaskItem/${taskItemId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const jsonResponse: BaseResponse<IdReponse> = await response.json();

  if (!response.ok) {
    console.log(response.status);
    throw new Error(` ${jsonResponse.message}`);
  }

  return jsonResponse;
}
