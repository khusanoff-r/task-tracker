import { lazy } from "react";

export const Home = lazy(() =>
  import("@/pages").then((module) => ({ default: module.Home })),
);

export const MyTasks = lazy(() =>
  import("@/pages").then((module) => ({ default: module.MyTasks })),
);

export const Projects = lazy(() =>
  import("@/pages").then((module) => ({ default: module.Projects })),
);

export const Settings = lazy(() =>
  import("@/pages").then((module) => ({ default: module.Settings })),
);
