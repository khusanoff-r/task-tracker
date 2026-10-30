import type { Task } from "@/types";

type TaskRowProps = {
  task: Task;
};

const statusStyles = {
  todo: "bg-gray-100 text-gray-600 ring-1 ring-gray-200",
  "in-progress": "bg-blue-50 text-blue-700 ring-1 ring-blue-100",
  done: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
};

const statusLabels = {
  todo: "To do",
  "in-progress": "In progress",
  done: "Completed",
};

const priorityStyles = {
  low: "text-gray-500",
  medium: "text-amber-600",
  high: "text-red-500",
};

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export const TaskRow = ({ task }: TaskRowProps) => {
  return (
    <div className="grid grid-cols-1 gap-3 border-b border-gray-100 px-6 py-5 sm:px-8 transition-colors duration-200 last:border-0 hover:bg-violet-50/40 sm:grid-cols-[minmax(0,1fr)_130px_100px_120px] sm:items-center sm:gap-4">
      {/* Task */}
      <div className="min-w-0">
        <h4 className="truncate text-sm font-semibold text-gray-800">
          {task.title}
        </h4>

        <p className="mt-1.5 truncate text-xs leading-5 text-gray-400">
          {task.description}
        </p>
      </div>

      {/* Status */}
      <div>
        <span
          className={`inline-flex rounded-full px-3 py-1.5 text-xs font-medium ${statusStyles[task.status]}`}
        >
          {statusLabels[task.status]}
        </span>
      </div>

      {/* Priority */}
      <div>
        <span
          className={`text-xs font-semibold capitalize ${priorityStyles[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      {/* Due date */}
      <div>
        <span className="text-xs font-medium text-gray-500">
          {formatDate(task.dueDate)}
        </span>
      </div>
    </div>
  );
};
