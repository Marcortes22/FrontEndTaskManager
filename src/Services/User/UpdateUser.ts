import { BaseResponse } from '@/Interfaces';

export type updateUserType = {
  newBackGroundImage: string;
};

export async function updateUser({
  token,
  userData,
}: {
  token: string;
  userData: updateUserType;
}): Promise<BaseResponse<boolean>> {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}User`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const jsonResponse: BaseResponse<boolean> = await response.json();

  if (!response.ok) {
    console.log(response.status);
    throw new Error(` ${jsonResponse.message}`);
  }

  return jsonResponse;
}
