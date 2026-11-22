import type { CreateTaskInput } from "../types/task.types";

export const isValidTask = (data: unknown): data is CreateTaskInput => {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return false;
  }

  const task = data as Record<string, unknown>;

  return (
    typeof task.title === "string" &&
    task.title.trim().length > 0 &&
    typeof task.description === "string" &&
    ["todo", "in-progress", "done"].includes(String(task.status)) &&
    ["low", "medium", "high"].includes(String(task.priority)) &&
    typeof task.dueDate === "string" &&
    !Number.isNaN(Date.parse(task.dueDate))
  );
};
