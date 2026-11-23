import { lazy } from "react";

export const Home = lazy(() =>
  import("@/pages/home/home").then((module) => ({ default: module.Home })),
);
export const MyTasks = lazy(() =>
  import("@/pages/my-tasks/my-tasks").then((module) => ({
    default: module.MyTasks,
  })),
);
export const Projects = lazy(() =>
  import("@/pages/projects/projects").then((module) => ({
    default: module.Projects,
  })),
);
export const Settings = lazy(() =>
  import("@/pages/settings/settings").then((module) => ({
    default: module.Settings,
  })),
);

export const Login = lazy(() =>
  import("@/pages/login/login").then((module) => ({ default: module.Login })),
);
export const Register = lazy(() =>
  import("@/pages/register/register").then((module) => ({
    default: module.Register,
  })),
);
