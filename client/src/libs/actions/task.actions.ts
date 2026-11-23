import { API, ENDPOINTS } from "@/libs/service";
import type { Task } from "@/types/task.types";

export type TaskInput = Omit<Task, "id">;

type TasksResponse = {
  status: "success";
  data: {
    tasks: Task[];
  };
};

type TaskResponse = {
  status: "success";
  data: {
    task: Task;
  };
};

type DeleteTaskResponse = {
  status: "success";
  message: string;
};

export const getTasksAction = async (): Promise<TasksResponse> => {
  return API.get(ENDPOINTS.tasks.getAll) as unknown as Promise<TasksResponse>;
};

export const getTaskByIdAction = async (id: number): Promise<TaskResponse> => {
  return API.get(
    ENDPOINTS.tasks.getById(id),
  ) as unknown as Promise<TaskResponse>;
};

export const createTaskAction = async (
  data: TaskInput,
): Promise<TaskResponse> => {
  return API.post(
    ENDPOINTS.tasks.create,
    data,
  ) as unknown as Promise<TaskResponse>;
};

export const updateTaskAction = async ({
  id,
  data,
}: {
  id: number;
  data: TaskInput;
}): Promise<TaskResponse> => {
  return API.put(
    ENDPOINTS.tasks.update(id),
    data,
  ) as unknown as Promise<TaskResponse>;
};

export const deleteTaskAction = async (
  id: number,
): Promise<DeleteTaskResponse> => {
  return API.delete(
    ENDPOINTS.tasks.delete(id),
  ) as unknown as Promise<DeleteTaskResponse>;
};
