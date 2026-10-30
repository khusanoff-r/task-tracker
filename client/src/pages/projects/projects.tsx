import { useMemo, useState } from "react";

import {
  Button,
  ConfirmDialog,
  EmptyState,
  PageHeader,
  ProjectCard,
  ProjectModal,
} from "@/components";
import { MOCK_PROJECTS } from "@/constants";
import type { Project } from "@/types";

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const stats = useMemo(
    () => [
      { label: "Total Projects", value: projects.length, icon: "▦" },
      {
        label: "Active Projects",
        value: projects.filter((project) => project.status === "active").length,
        icon: "◷",
      },
      {
        label: "Completed Projects",
        value: projects.filter((project) => project.status === "completed")
          .length,
        icon: "✓",
      },
    ],
    [projects],
  );

  const openCreateModal = () => {
    setSelectedProject(null);
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleSave = (updatedProject: Project) => {
    setProjects((previousProjects) => {
      const exists = previousProjects.some(
        (project) => project.id === updatedProject.id,
      );

      return exists
        ? previousProjects.map((project) =>
            project.id === updatedProject.id ? updatedProject : project,
          )
        : [updatedProject, ...previousProjects];
    });

    closeModal();
  };

  const handleDelete = () => {
    if (!projectToDelete) return;

    setProjects((previousProjects) =>
      previousProjects.filter((project) => project.id !== projectToDelete.id),
    );
    setProjectToDelete(null);
  };

  return (
    <section className="mx-auto w-full max-w-360 space-y-8">
      <PageHeader
        title="Projects"
        description="Organize your work and track project progress."
        action={<Button onClick={openCreateModal}>+ Create Project</Button>}
      />

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-gray-500">{stat.label}</p>
              <span className="text-xl text-violet-500">{stat.icon}</span>
            </div>

            <p className="mt-4 text-3xl font-bold text-gray-900">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div>
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-900">All Projects</h2>

          <p className="mt-1.5 text-sm text-gray-400">
            {projects.length} projects in your workspace
          </p>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={openEditModal}
                onDelete={setProjectToDelete}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="▦"
            title="No projects yet"
            description="Create your first project to start organizing your work."
            action={<Button onClick={openCreateModal}>Create Project</Button>}
          />
        )}
      </div>

      {isModalOpen && (
        <ProjectModal
          key={selectedProject?.id ?? "new-project"}
          project={selectedProject}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}

      {projectToDelete && (
        <ConfirmDialog
          title="Delete project?"
          message={`Are you sure you want to delete "${projectToDelete.name}"? This action cannot be undone.`}
          confirmLabel="Delete Project"
          onConfirm={handleDelete}
          onCancel={() => setProjectToDelete(null)}
        />
      )}
    </section>
  );
};
