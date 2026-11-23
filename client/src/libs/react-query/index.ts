export { QUERY_KEYS } from "./query-keys";

export {
  useCurrentUserQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
} from "./auth.queries";

export {
  useTasksQuery,
  useTaskByIdQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from "./task.queries";

export {
  useProjectsQuery,
  useProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from "./project.queries";
