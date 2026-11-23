import { API, ENDPOINTS } from "@/libs/service";
import type { Project } from "@/types/project.types";

export type ProjectInput = Omit<
  Project,
  "id" | "taskCount" | "completedTasks" | "createdAt"
>;

type ProjectsResponse = {
  status: "success";
  data: {
    projects: Project[];
  };
};

type ProjectResponse = {
  status: "success";
  data: {
    project: Project;
  };
};

type DeleteProjectResponse = {
  status: "success";
  message: string;
};

export const getProjectsAction = async (): Promise<ProjectsResponse> => {
  return API.get(
    ENDPOINTS.projects.getAll,
  ) as unknown as Promise<ProjectsResponse>;
};

export const getProjectByIdAction = async (
  id: number,
): Promise<ProjectResponse> => {
  return API.get(
    ENDPOINTS.projects.getById(id),
  ) as unknown as Promise<ProjectResponse>;
};

export const createProjectAction = async (
  data: ProjectInput,
): Promise<ProjectResponse> => {
  return API.post(
    ENDPOINTS.projects.create,
    data,
  ) as unknown as Promise<ProjectResponse>;
};

export const updateProjectAction = async ({
  id,
  data,
}: {
  id: number;
  data: ProjectInput;
}): Promise<ProjectResponse> => {
  return API.put(
    ENDPOINTS.projects.update(id),
    data,
  ) as unknown as Promise<ProjectResponse>;
};

export const deleteProjectAction = async (
  id: number,
): Promise<DeleteProjectResponse> => {
  return API.delete(
    ENDPOINTS.projects.delete(id),
  ) as unknown as Promise<DeleteProjectResponse>;
};
