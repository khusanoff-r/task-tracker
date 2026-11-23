import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createProjectAction,
  deleteProjectAction,
  getProjectByIdAction,
  getProjectsAction,
  updateProjectAction,
} from "@/libs/actions";
import type { ProjectInput } from "@/libs/actions";
import { QUERY_KEYS } from "./query-keys";

export const useProjectsQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.projects.all,
    queryFn: getProjectsAction,
    select: (response) => response.data.projects,
  });
};

export const useProjectByIdQuery = (id: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.projects.detail(id),
    queryFn: () => getProjectByIdAction(id),
    select: (response) => response.data.project,
    enabled: id > 0,
  });
};

export const useCreateProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProjectInput) => createProjectAction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.projects.all,
      });
    },
  });
};

export const useUpdateProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProjectInput }) =>
      updateProjectAction({ id, data }),
    onSuccess: (response) => {
      queryClient.setQueryData(
        QUERY_KEYS.projects.detail(response.data.project.id),
        response.data.project,
      );

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.projects.all,
      });
    },
  });
};

export const useDeleteProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteProjectAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.projects.all,
      });
    },
  });
};
