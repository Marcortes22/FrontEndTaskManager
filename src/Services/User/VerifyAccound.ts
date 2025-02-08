import { BaseResponse } from '@/Interfaces/BaseResponse';
import { IVerifyAccoundResponse } from '@/Interfaces/Users/IUser';

export async function verifyAccound(
  token: string,
  timeZone: string,
): Promise<BaseResponse<IVerifyAccoundResponse>> {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}User/verifyAccound`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ timeZone }),
    },
  );

  const jsonResponse: BaseResponse<IVerifyAccoundResponse> =
    await response.json();

  if (!response.ok) {
    console.log(response.status);

    throw new Error(` ${jsonResponse.message}`);
  }

  return jsonResponse;
}
