import { useMemo, useState } from "react";

import {
  Button,
  ConfirmDialog,
  EmptyState,
  PageHeader,
  ProjectCard,
  ProjectModal,
} from "@/components";

import {
  useProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from "@/libs/react-query";

import type { Project } from "@/types";
import type { ProjectFormData } from "@/components/projects/project-modal";

export const Projects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const { data: projects = [], isLoading, isError } = useProjectsQuery();

  const createProject = useCreateProjectMutation();
  const updateProject = useUpdateProjectMutation();
  const deleteProject = useDeleteProjectMutation();

  const isSaving = createProject.isPending || updateProject.isPending;

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

  const handleSave = async (data: ProjectFormData) => {
    try {
      if (selectedProject) {
        await updateProject.mutateAsync({
          id: selectedProject.id,
          data,
        });
      } else {
        await createProject.mutateAsync(data);
      }

      closeModal();
    } catch (error) {
      console.error("Failed to save project:", error);
    }
  };

  const handleDelete = async () => {
    if (!projectToDelete) return;

    try {
      await deleteProject.mutateAsync(projectToDelete.id);
      setProjectToDelete(null);
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  if (isLoading) {
    return (
      <section className="mx-auto w-full max-w-360">
        <p className="py-10 text-center text-gray-500">Loading projects...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mx-auto w-full max-w-360">
        <p className="py-10 text-center text-red-500">
          Failed to load projects. Please try again.
        </p>
      </section>
    );
  }

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
          isSaving={isSaving}
        />
      )}

      {projectToDelete && (
        <ConfirmDialog
          title="Delete project?"
          message={`Are you sure you want to delete "${projectToDelete.name}"? This action cannot be undone.`}
          confirmLabel={
            deleteProject.isPending ? "Deleting..." : "Delete Project"
          }
          onConfirm={handleDelete}
          onCancel={() => setProjectToDelete(null)}
        />
      )}
    </section>
  );
};
