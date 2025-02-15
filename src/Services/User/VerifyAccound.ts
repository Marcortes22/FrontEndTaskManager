import { BaseResponse } from '@/Interfaces/BaseResponse';
import {
  ICreateUserDto,
  IVerifyAccoundResponse,
} from '@/Interfaces/Users/IUser';

export async function verifyAccound(
  token: string,
  userData: ICreateUserDto,
): Promise<BaseResponse<IVerifyAccoundResponse>> {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}User/verifyAccound`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
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
