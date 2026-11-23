import { useState, type FormEvent } from "react";

import { FIELD_CLASS, PROJECT_STATUS_LABELS } from "@/constants";
import type { Project, ProjectStatus } from "@/types";

import { Button, FormField, Modal } from "../ui";

export type ProjectFormData = {
  name: string;
  description: string;
  status: ProjectStatus;
};

type ProjectModalProps = {
  project?: Project | null;
  onClose: () => void;
  onSave: (data: ProjectFormData) => void;
  isSaving?: boolean;
};

const statusOptions = Object.keys(PROJECT_STATUS_LABELS) as ProjectStatus[];

export const ProjectModal = ({
  project,
  onClose,
  onSave,
  isSaving = false,
}: ProjectModalProps) => {
  const [name, setName] = useState(project?.name ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [status, setStatus] = useState<ProjectStatus>(
    project?.status ?? "active",
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSave({
      name: name.trim(),
      description: description.trim(),
      status,
    });
  };

  return (
    <Modal
      title={project ? "Edit Project" : "Create Project"}
      description={
        project
          ? "Update your project details."
          : "Fill in the details to create a new project."
      }
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormField label="Project Name *" htmlFor="project-name">
          <input
            id="project-name"
            type="text"
            required
            maxLength={150}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter project name"
            className={FIELD_CLASS}
          />
        </FormField>

        <FormField label="Description" htmlFor="project-description">
          <textarea
            id="project-description"
            rows={4}
            maxLength={500}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Describe your project..."
            className={`${FIELD_CLASS} resize-none`}
          />
        </FormField>

        <FormField label="Status" htmlFor="project-status">
          <select
            id="project-status"
            value={status}
            onChange={(event) => setStatus(event.target.value as ProjectStatus)}
            className={FIELD_CLASS}
          >
            {statusOptions.map((value) => (
              <option key={value} value={value}>
                {PROJECT_STATUS_LABELS[value]}
              </option>
            ))}
          </select>
        </FormField>

        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>

          <Button type="submit" disabled={!name.trim() || isSaving}>
            {isSaving
              ? "Saving..."
              : project
                ? "Save Changes"
                : "Create Project"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
