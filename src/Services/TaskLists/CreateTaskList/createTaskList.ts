import { BaseResponse } from '@/Interfaces/BaseResponse';
import { ICreateTaskList } from '@/Interfaces/TaskLists/ITaskLists';

export async function createTaskList({
  token,
  taskList,
}: {
  token: string;
  taskList: ICreateTaskList;
}): Promise<BaseResponse<ICreateTaskList>> {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}TaskList/createTaskList`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskList),
    },
  );

  const jsonResponse: BaseResponse<ICreateTaskList> = await response.json();

  if (!response.ok) {
    console.log(response.status);
    console.log(jsonResponse);
    throw new Error(` ${jsonResponse.message}`);
  }

  return jsonResponse;
}
