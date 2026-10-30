import type { Task, TaskPriority, TaskStatus } from "@/types";

export const MOCK_TASKS: Task[] = [
  {
    id: 1,
    title: "Configure Docker environment",
    description: "Prepare Docker setup for the application",
    status: "in-progress",
    priority: "high",
    dueDate: "2026-10-31",
  },
  {
    id: 2,
    title: "Create authentication API",
    description: "Implement JWT authentication",
    status: "todo",
    priority: "high",
    dueDate: "2026-11-02",
  },
  {
    id: 3,
    title: "Design dashboard",
    description: "Create the main dashboard interface",
    status: "done",
    priority: "medium",
    dueDate: "2026-10-28",
  },
  {
    id: 4,
    title: "Connect PostgreSQL",
    description: "Configure database connection",
    status: "todo",
    priority: "medium",
    dueDate: "2026-11-04",
  },
  {
    id: 5,
    title: "Write API documentation",
    description: "Configure Swagger documentation",
    status: "in-progress",
    priority: "low",
    dueDate: "2026-11-06",
  },
];

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  todo: "To Do",
  "in-progress": "In Progress",
  done: "Completed",
};

export const TASK_STATUS_STYLES: Record<TaskStatus, string> = {
  todo: "bg-gray-100 text-gray-600 ring-1 ring-gray-200",
  "in-progress": "bg-blue-50 text-blue-700 ring-1 ring-blue-100",
  done: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
};

export const TASK_PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export const TASK_PRIORITY_STYLES: Record<TaskPriority, string> = {
  low: "bg-gray-100 text-gray-600",
  medium: "bg-amber-50 text-amber-700",
  high: "bg-red-50 text-red-600",
};
