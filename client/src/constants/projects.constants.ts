import type { Project, ProjectStatus } from "@/types";

export const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    name: "Task Tracker",
    description: "A task management application built with React and Express.",
    status: "active",
    taskCount: 12,
    completedTasks: 7,
    createdAt: "2026-10-20",
  },
  {
    id: 2,
    name: "Portfolio Website",
    description:
      "Personal portfolio website with projects and contact information.",
    status: "completed",
    taskCount: 8,
    completedTasks: 8,
    createdAt: "2026-09-15",
  },
  {
    id: 3,
    name: "E-commerce Platform",
    description: "Online store with product catalog and shopping cart.",
    status: "active",
    taskCount: 20,
    completedTasks: 9,
    createdAt: "2026-10-10",
  },
  {
    id: 4,
    name: "DevOps Learning",
    description: "Learning Docker, Linux, Nginx and deployment workflows.",
    status: "on-hold",
    taskCount: 10,
    completedTasks: 3,
    createdAt: "2026-10-25",
  },
];

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  active: "Active",
  completed: "Completed",
  "on-hold": "On Hold",
};

export const PROJECT_STATUS_STYLES: Record<ProjectStatus, string> = {
  active: "bg-blue-50 text-blue-700 ring-1 ring-blue-100",
  completed: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
  "on-hold": "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
};
