import type { Task } from "@/types";

export type TaskCounts = {
  all: number;
  todo: number;
  inProgress: number;
  done: number;
};

export const getTaskCounts = (tasks: Task[]): TaskCounts => ({
  all: tasks.length,
  todo: tasks.filter((task) => task.status === "todo").length,
  inProgress: tasks.filter((task) => task.status === "in-progress").length,
  done: tasks.filter((task) => task.status === "done").length,
});
