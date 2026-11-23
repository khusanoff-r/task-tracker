export type ProjectStatus = "active" | "completed" | "on-hold";

export type Project = {
  id: number;
  name: string;
  description: string;
  status: ProjectStatus;
  taskCount: number;
  completedTasks: number;
  createdAt: string;
};

export type CreateProjectInput = {
  name: string;
  description: string;
  status: ProjectStatus;
};
