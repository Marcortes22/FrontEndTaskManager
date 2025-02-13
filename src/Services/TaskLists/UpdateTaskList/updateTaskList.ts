import { BaseResponse } from '@/Interfaces/BaseResponse';
import { IdReponse } from '@/Interfaces/BaseResponse';

export async function updateTaskList({
  taskListId,
  newName,
  token,
}: {
  taskListId: number;
  newName: string;
  token: string;
}): Promise<BaseResponse<IdReponse>> {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}TaskList/${taskListId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newName }),
    },
  );

  const jsonResponse: BaseResponse<IdReponse> = await response.json();

  if (!response.ok) {
    console.log(response.status);
    throw new Error(` ${jsonResponse.message}`);
  }

  return jsonResponse;
}
