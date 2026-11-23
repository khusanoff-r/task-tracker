import type { CreateProjectInput } from "../types/project.types";

export const isValidProject = (data: unknown): data is CreateProjectInput => {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return false;
  }

  const project = data as Record<string, unknown>;

  return (
    typeof project.name === "string" &&
    project.name.trim().length > 0 &&
    project.name.trim().length <= 150 &&
    typeof project.description === "string" &&
    ["active", "completed", "on-hold"].includes(String(project.status))
  );
};
