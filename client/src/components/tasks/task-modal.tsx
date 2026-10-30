import { useState, type FormEvent } from "react";

import { FIELD_CLASS, TASK_PRIORITY_LABELS, TASK_STATUS_LABELS } from "@/constants";
import type { Task, TaskPriority, TaskStatus } from "@/types";

import { Button, FormField, Modal } from "../ui";

type TaskModalProps = {
  task?: Task | null;
  onClose: () => void;
  onSave: (task: Task) => void;
};

const statusOptions = Object.keys(TASK_STATUS_LABELS) as TaskStatus[];
const priorityOptions = Object.keys(TASK_PRIORITY_LABELS) as TaskPriority[];

export const TaskModal = ({ task, onClose, onSave }: TaskModalProps) => {
  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [status, setStatus] = useState<TaskStatus>(task?.status ?? "todo");
  const [priority, setPriority] = useState<TaskPriority>(
    task?.priority ?? "medium",
  );
  const [dueDate, setDueDate] = useState(task?.dueDate ?? "");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSave({
      id: task?.id ?? Date.now(),
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      dueDate,
    });
  };

  return (
    <Modal
      title={task ? "Edit Task" : "Create New Task"}
      description={
        task
          ? "Update your task details."
          : "Fill in the details to create a new task."
      }
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormField label="Task Title *" htmlFor="task-title">
          <input
            id="task-title"
            type="text"
            required
            maxLength={100}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter task title"
            className={FIELD_CLASS}
          />
        </FormField>

        <FormField label="Description" htmlFor="task-description">
          <textarea
            id="task-description"
            rows={4}
            maxLength={1000}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Describe your task..."
            className={`${FIELD_CLASS} resize-none`}
          />
        </FormField>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField label="Status" htmlFor="task-status">
            <select
              id="task-status"
              value={status}
              onChange={(event) => setStatus(event.target.value as TaskStatus)}
              className={FIELD_CLASS}
            >
              {statusOptions.map((value) => (
                <option key={value} value={value}>
                  {TASK_STATUS_LABELS[value]}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Priority" htmlFor="task-priority">
            <select
              id="task-priority"
              value={priority}
              onChange={(event) =>
                setPriority(event.target.value as TaskPriority)
              }
              className={FIELD_CLASS}
            >
              {priorityOptions.map((value) => (
                <option key={value} value={value}>
                  {TASK_PRIORITY_LABELS[value]}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        <FormField label="Due Date *" htmlFor="task-date">
          <input
            id="task-date"
            type="date"
            required
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            className={FIELD_CLASS}
          />
        </FormField>

        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit" disabled={!title.trim() || !dueDate}>
            {task ? "Save Changes" : "Create Task"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
