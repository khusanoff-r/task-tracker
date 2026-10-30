import { PROJECT_STATUS_LABELS, PROJECT_STATUS_STYLES } from "@/constants";
import type { Project } from "@/types";

type ProjectCardProps = {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
};

export const ProjectCard = ({ project, onEdit, onDelete }: ProjectCardProps) => {
  const progress =
    project.taskCount > 0
      ? Math.round((project.completedTasks / project.taskCount) * 100)
      : 0;

  return (
    <article className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-7">
      <div className="mb-6 flex items-start justify-between gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-xl text-violet-600">
          ▦
        </div>

        <span
          className={`rounded-full px-3 py-1.5 text-xs font-medium ${PROJECT_STATUS_STYLES[project.status]}`}
        >
          {PROJECT_STATUS_LABELS[project.status]}
        </span>
      </div>

      <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>

      <p className="mt-2 min-h-12 text-sm leading-6 text-gray-500">
        {project.description || "No description provided."}
      </p>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500">
            Project progress
          </span>

          <span className="text-xs font-bold text-violet-600">{progress}%</span>
        </div>

        <div
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-2 overflow-hidden rounded-full bg-gray-100"
        >
          <div
            className="h-full rounded-full bg-violet-600 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
        <div>
          <p className="text-sm font-semibold text-gray-900">
            {project.completedTasks}/{project.taskCount}
          </p>
          <p className="mt-0.5 text-xs text-gray-400">Tasks completed</p>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => onEdit(project)}
            className="text-xs font-semibold text-violet-600 transition hover:text-violet-800"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(project)}
            className="text-xs font-semibold text-red-500 transition hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};
