import { useMemo, useState } from "react";

import { MOCK_PROJECTS } from "@/constants";
import { ProjectModal } from "@/components";
import type { Project, ProjectStatus } from "@/types";

const statusLabels: Record<ProjectStatus, string> = {
  active: "Active",
  completed: "Completed",
  "on-hold": "On Hold",
};

const statusStyles: Record<ProjectStatus, string> = {
  active: "bg-blue-50 text-blue-600",
  completed: "bg-green-50 text-green-600",
  "on-hold": "bg-amber-50 text-amber-600",
};

type ProjectCardProps = {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
};

const ProjectCard = ({ project, onEdit, onDelete }: ProjectCardProps) => {
  const progress =
    project.taskCount > 0
      ? Math.round((project.completedTasks / project.taskCount) * 100)
      : 0;

  return (
    <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-xl text-violet-600">
          ▦
        </div>

        <span
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${statusStyles[project.status]}`}
        >
          {statusLabels[project.status]}
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

        <div className="h-2 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-violet-600 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
        <div>
          <p className="text-sm font-semibold text-gray-900">
            {project.completedTasks}/{project.taskCount}
          </p>
          <p className="text-xs text-gray-400">Tasks completed</p>
        </div>

        <div className="flex gap-3">
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

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const stats = useMemo(
    () => ({
      total: projects.length,
      active: projects.filter((project) => project.status === "active").length,
      completed: projects.filter((project) => project.status === "completed")
        .length,
    }),
    [projects],
  );

  const handleCreate = () => {
    setSelectedProject(null);
    setIsModalOpen(true);
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleSave = (updatedProject: Project) => {
    setProjects((previousProjects) => {
      const exists = previousProjects.some(
        (project) => project.id === updatedProject.id,
      );

      if (exists) {
        return previousProjects.map((project) =>
          project.id === updatedProject.id ? updatedProject : project,
        );
      }

      return [updatedProject, ...previousProjects];
    });

    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleDelete = () => {
    if (!projectToDelete) return;

    setProjects((previousProjects) =>
      previousProjects.filter((project) => project.id !== projectToDelete.id),
    );

    setProjectToDelete(null);
  };

  return (
    <section className="mx-auto w-full max-w-360">
      {/* Page heading */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="mt-2 text-sm text-gray-500">
            Organize your work and track project progress.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreate}
          className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700"
        >
          <span className="text-lg">+</span>
          Create Project
        </button>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Total Projects", value: stats.total, icon: "▦" },
          { label: "Active Projects", value: stats.active, icon: "◷" },
          { label: "Completed Projects", value: stats.completed, icon: "✓" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{stat.label}</p>
              <span className="text-xl text-violet-500">{stat.icon}</span>
            </div>

            <p className="mt-3 text-3xl font-bold text-gray-900">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Projects heading */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">All Projects</h2>
        <p className="mt-1 text-sm text-gray-400">
          {projects.length} projects in your workspace
        </p>
      </div>

      {/* Project cards */}
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleEdit}
              onDelete={setProjectToDelete}
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-2xl text-violet-500">
            ▦
          </div>

          <h3 className="text-base font-semibold text-gray-900">
            No projects yet
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Create your first project to start organizing your work.
          </p>

          <button
            type="button"
            onClick={handleCreate}
            className="mt-5 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
          >
            Create Project
          </button>
        </div>
      )}

      {/* Create / Edit modal */}
      {isModalOpen && (
        <ProjectModal
          key={selectedProject?.id ?? "new-project"}
          project={selectedProject}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProject(null);
          }}
          onSave={handleSave}
        />
      )}

      {/* Delete confirmation */}
      {projectToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-project-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
          >
            <h2
              id="delete-project-title"
              className="text-lg font-bold text-gray-900"
            >
              Delete project?
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Are you sure you want to delete "{projectToDelete.name}"? This
              action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setProjectToDelete(null)}
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
              >
                Delete Project
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
