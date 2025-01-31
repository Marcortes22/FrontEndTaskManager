import { BaseResponse, IdReponse } from '@/Interfaces/BaseResponse';

export async function verifyAccound(
  token: string,
): Promise<BaseResponse<IdReponse>> {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}User/verifyAccound`,
    {
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
