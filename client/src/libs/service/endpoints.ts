export const ENDPOINTS = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    logout: "/auth/logout",
    me: "/auth/me",
  },
  tasks: {
    getAll: "/tasks",
    getById: (id: number) => `/tasks/${id}`,
    create: "/tasks",
    update: (id: number) => `/tasks/${id}`,
    delete: (id: number) => `/tasks/${id}`,
  },
  projects: {
    getAll: "/projects",
    getById: (id: number) => `/projects/${id}`,
    create: "/projects",
    update: (id: number) => `/projects/${id}`,
    delete: (id: number) => `/projects/${id}`,
  },
} as const;
