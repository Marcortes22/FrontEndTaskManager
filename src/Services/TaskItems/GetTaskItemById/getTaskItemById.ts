import { BaseResponse } from '@/Interfaces/BaseResponse';
import { TaskItemType } from '@/Types/TaskItem.type';

export async function getTaskItemById(
  token: string,
  taskItemId: number,
): Promise<BaseResponse<TaskItemType>> {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}TaskItem/${taskItemId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const jsonResponse: BaseResponse<TaskItemType> = await response.json();

  if (!response.ok) {
    console.log(response.status);
    throw new Error(` ${jsonResponse.message}`);
  }

  return jsonResponse;
}

// import { BaseResponse } from '@/Interfaces/BaseResponse';
// import { IGetTodayTaskItems } from '@/Interfaces/TaskItems/ItaskItems';

// export async function getMyDayTasks(
//   token: string,
// ): Promise<BaseResponse<IGetTodayTaskItems>> {
//   const response = await fetch(
//     `${import.meta.env.VITE_BACKEND_URL}TaskItem/GetMyDayTasks`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     },
//   );

//   const jsonResponse: BaseResponse<IGetTodayTaskItems> = await response.json();

//   if (!response.ok) {
//     console.log(response.status);
//     throw new Error(` ${jsonResponse.message}`);
//   }

//   return jsonResponse;
// }
