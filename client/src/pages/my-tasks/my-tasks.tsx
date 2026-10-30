import { useMemo, useState } from "react";

import {
  Button,
  ConfirmDialog,
  EmptyState,
  FilterTab,
  PageHeader,
  TaskCard,
  TaskModal,
} from "@/components";
import {
  FIELD_CLASS,
  MOCK_TASKS,
  TASK_PRIORITY_LABELS,
} from "@/constants";
import type { Task, TaskPriority, TaskStatus } from "@/types";
import { getTaskCounts } from "@/utils";

type StatusFilter = "all" | TaskStatus;
type PriorityFilter = "all" | TaskPriority;

const priorityOptions = Object.keys(TASK_PRIORITY_LABELS) as TaskPriority[];

export const MyTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const counts = useMemo(() => getTaskCounts(tasks), [tasks]);

  const filteredTasks = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return tasks.filter((task) => {
      const matchesSearch = `${task.title} ${task.description}`
        .toLowerCase()
        .includes(searchValue);

      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, search, statusFilter, priorityFilter]);

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setPriorityFilter("all");
  };

  const openCreateModal = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleSaveTask = (updatedTask: Task) => {
    setTasks((previousTasks) => {
      const exists = previousTasks.some((task) => task.id === updatedTask.id);

      return exists
        ? previousTasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task,
          )
        : [updatedTask, ...previousTasks];
    });

    closeModal();
  };

  const handleDeleteTask = () => {
    if (!taskToDelete) return;

    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskToDelete.id),
    );
    setTaskToDelete(null);
  };

  return (
    <section className="mx-auto w-full max-w-360 space-y-8">
      <PageHeader
        title="My Tasks"
        description="Manage and organize all your tasks in one place."
        action={<Button onClick={openCreateModal}>+ Create Task</Button>}
      />

      {/* Status filters */}
      <div className="flex flex-wrap gap-3">
        <FilterTab
          label="All Tasks"
          count={counts.all}
          active={statusFilter === "all"}
          onClick={() => setStatusFilter("all")}
        />
        <FilterTab
          label="In Progress"
          count={counts.inProgress}
          active={statusFilter === "in-progress"}
          onClick={() => setStatusFilter("in-progress")}
        />
        <FilterTab
          label="To Do"
          count={counts.todo}
          active={statusFilter === "todo"}
          onClick={() => setStatusFilter("todo")}
        />
        <FilterTab
          label="Completed"
          count={counts.done}
          active={statusFilter === "done"}
          onClick={() => setStatusFilter("done")}
        />
      </div>

      {/* Search and priority */}
      <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:p-5">
        <div className="relative flex-1">
          <span
            aria-hidden="true"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          >
            ⌕
          </span>

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search tasks..."
            aria-label="Search tasks"
            className={`${FIELD_CLASS} pl-11`}
          />
        </div>

        <select
          value={priorityFilter}
          onChange={(event) =>
            setPriorityFilter(event.target.value as PriorityFilter)
          }
          aria-label="Filter by priority"
          className={`${FIELD_CLASS} sm:w-52`}
        >
          <option value="all">All priorities</option>
          {priorityOptions.map((value) => (
            <option key={value} value={value}>
              {TASK_PRIORITY_LABELS[value]} priority
            </option>
          ))}
        </select>

        <Button variant="ghost" onClick={resetFilters}>
          Reset filters
        </Button>
      </div>

      {/* Task list */}
      <div>
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-gray-900">Task List</h2>

          <p className="text-sm text-gray-400">
            {filteredTasks.length} of {tasks.length} tasks
          </p>
        </div>

        {filteredTasks.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={openEditModal}
                onDelete={setTaskToDelete}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="⌕"
            title="No tasks found"
            description="Try changing your search or filters to find the tasks you need."
            action={
              <Button variant="ghost" onClick={resetFilters}>
                Clear filters
              </Button>
            }
          />
        )}
      </div>

      {isModalOpen && (
        <TaskModal
          key={selectedTask?.id ?? "new-task"}
          task={selectedTask}
          onClose={closeModal}
          onSave={handleSaveTask}
        />
      )}

      {taskToDelete && (
        <ConfirmDialog
          title="Delete task?"
          message={`Are you sure you want to delete "${taskToDelete.title}"? This action cannot be undone.`}
          confirmLabel="Delete Task"
          onConfirm={handleDeleteTask}
          onCancel={() => setTaskToDelete(null)}
        />
      )}
    </section>
  );
};
