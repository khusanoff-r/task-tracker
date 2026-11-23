export const QUERY_KEYS = {
  auth: {
    currentUser: ["auth", "current-user"] as const,
  },
  tasks: {
    all: ["tasks"] as const,
    detail: (id: number) => ["tasks", id] as const,
  },
  projects: {
    all: ["projects"] as const,
    detail: (id: number) => ["projects", id] as const,
  },
} as const;
