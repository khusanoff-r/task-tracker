import {
  TASK_PRIORITY_LABELS,
  TASK_PRIORITY_STYLES,
  TASK_STATUS_LABELS,
  TASK_STATUS_STYLES,
} from "@/constants";
import type { Task } from "@/types";
import { formatDate } from "@/utils";

/** Единая сетка для заголовка таблицы и строк */
export const TASK_ROW_GRID =
  "sm:grid-cols-[minmax(0,1fr)_130px_100px_120px]";

type TaskRowProps = {
  task: Task;
};

export const TaskRow = ({ task }: TaskRowProps) => (
  <div
    className={`grid grid-cols-1 gap-3 border-b border-gray-100 px-6 py-5 transition-colors duration-200 last:border-0 hover:bg-violet-50/40 sm:grid sm:items-center sm:gap-4 sm:px-8 ${TASK_ROW_GRID}`}
  >
    <div className="min-w-0">
      <h4 className="truncate text-sm font-semibold text-gray-800">
        {task.title}
      </h4>

      <p className="mt-1.5 truncate text-xs leading-5 text-gray-400">
        {task.description}
      </p>
    </div>

    <div>
      <span
        className={`inline-flex rounded-full px-3 py-1.5 text-xs font-medium ${TASK_STATUS_STYLES[task.status]}`}
      >
        {TASK_STATUS_LABELS[task.status]}
      </span>
    </div>

    <div>
      <span
        className={`inline-flex rounded-md px-2.5 py-1 text-xs font-semibold ${TASK_PRIORITY_STYLES[task.priority]}`}
      >
        {TASK_PRIORITY_LABELS[task.priority]}
      </span>
    </div>

    <div>
      <span className="text-xs font-medium text-gray-500">
        {formatDate(task.dueDate)}
      </span>
    </div>
  </div>
);
