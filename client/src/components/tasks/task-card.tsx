import {
  TASK_PRIORITY_LABELS,
  TASK_PRIORITY_STYLES,
  TASK_STATUS_LABELS,
  TASK_STATUS_STYLES,
} from "@/constants";
import type { Task } from "@/types";
import { formatDate } from "@/utils";

type TaskCardProps = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
};

export const TaskCard = ({ task, onEdit, onDelete }: TaskCardProps) => (
  <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-gray-900">{task.title}</h3>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          {task.description || "No description provided."}
        </p>
      </div>

      <span
        className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${TASK_STATUS_STYLES[task.status]}`}
      >
        {TASK_STATUS_LABELS[task.status]}
      </span>
    </div>

    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-5">
      <span
        className={`rounded-md px-2.5 py-1 text-xs font-semibold ${TASK_PRIORITY_STYLES[task.priority]}`}
      >
        {TASK_PRIORITY_LABELS[task.priority]} priority
      </span>

      <div className="flex flex-wrap items-center gap-4">
        <p className="text-xs text-gray-400">Due: {formatDate(task.dueDate)}</p>

        <button
          type="button"
          onClick={() => onEdit(task)}
          className="text-xs font-semibold text-violet-600 transition hover:text-violet-800"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(task)}
          className="text-xs font-semibold text-red-500 transition hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  </article>
);
