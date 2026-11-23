import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createTaskAction,
  deleteTaskAction,
  getTaskByIdAction,
  getTasksAction,
  updateTaskAction,
} from "@/libs/actions";
import type { TaskInput } from "@/libs/actions";
import { QUERY_KEYS } from "./query-keys";

export const useTasksQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.tasks.all,
    queryFn: getTasksAction,
    select: (response) => response.data.tasks,
  });
};

export const useTaskByIdQuery = (id: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.tasks.detail(id),
    queryFn: () => getTaskByIdAction(id),
    select: (response) => response.data.task,
    enabled: id > 0,
  });
};

export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TaskInput) => createTaskAction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.tasks.all,
      });
    },
  });
};

export const useUpdateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: TaskInput }) =>
      updateTaskAction({ id, data }),
    onSuccess: (response) => {
      queryClient.setQueryData(
        QUERY_KEYS.tasks.detail(response.data.task.id),
        response.data.task,
      );

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.tasks.all,
      });
    },
  });
};

export const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTaskAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.tasks.all,
      });
    },
  });
};
