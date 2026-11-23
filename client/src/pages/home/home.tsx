import { Link } from "react-router-dom";

import { StatCard, PageHeader, TASK_ROW_GRID, TaskRow } from "@/components";
import { ROUTES } from "@/constants";
import { useTasksQuery } from "@/libs/react-query";
import { getTaskCounts } from "@/utils";

const createTaskLinkClass =
  "inline-flex items-center justify-center rounded-xl bg-linear-to-br from-violet-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-300 active:translate-y-0";

export const Home = () => {
  const { data: tasks = [], isLoading, isError } = useTasksQuery();

  const counts = getTaskCounts(tasks);

  const recentTasks = [...tasks].sort((a, b) => b.id - a.id).slice(0, 5);

  return (
    <div className="mx-auto w-full max-w-360 space-y-8 lg:space-y-10">
      <PageHeader
        title="Overview"
        description="Track your team's progress and manage your tasks."
        action={
          <Link to={ROUTES.myTasks} className={createTaskLinkClass}>
            + Create task
          </Link>
        }
      />

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6 xl:grid-cols-4">
        <StatCard
          title="Total tasks"
          value={counts.all}
          description="All tasks in your workspace"
          icon="▤"
          color="bg-violet-100 text-violet-600"
        />

        <StatCard
          title="Completed"
          value={counts.done}
          description="Successfully completed"
          icon="✓"
          color="bg-emerald-100 text-emerald-600"
        />

        <StatCard
          title="In progress"
          value={counts.inProgress}
          description="Currently being worked on"
          icon="◷"
          color="bg-blue-100 text-blue-600"
        />

        <StatCard
          title="To do"
          value={counts.todo}
          description="Waiting to be started"
          icon="○"
          color="bg-orange-100 text-orange-600"
        />
      </section>

      <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 px-6 py-6 sm:px-8">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Recent tasks</h2>

            <p className="mt-1.5 text-sm text-gray-400">
              Manage and track your recent activities
            </p>
          </div>

          <Link
            to={ROUTES.myTasks}
            className="rounded-lg px-3 py-2 text-sm font-semibold text-violet-600 transition hover:bg-violet-50"
          >
            View all
          </Link>
        </div>

        <div
          className={`hidden gap-4 bg-gray-50 px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-400 sm:grid sm:px-8 ${TASK_ROW_GRID}`}
        >
          <span>Task</span>
          <span>Status</span>
          <span>Priority</span>
          <span>Due date</span>
        </div>

        <div>
          {isLoading ? (
            <p className="px-6 py-8 text-center text-sm text-gray-500">
              Loading tasks...
            </p>
          ) : isError ? (
            <p className="px-6 py-8 text-center text-sm text-red-500">
              Failed to load tasks. Please try again.
            </p>
          ) : recentTasks.length === 0 ? (
            <p className="px-6 py-8 text-center text-sm text-gray-500">
              No tasks yet. Create your first task.
            </p>
          ) : (
            recentTasks.map((task) => <TaskRow key={task.id} task={task} />)
          )}
        </div>
      </section>
    </div>
  );
};
