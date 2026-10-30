import { ROUTES } from "@/constants";

import { Home, MyTasks, Projects, Settings } from "./lazy.route";

export const routes = [
  {
    path: ROUTES.root,
    element: <Home />,
  },
  {
    path: ROUTES.myTasks,
    element: <MyTasks />,
  },
  {
    path: ROUTES.projects,
    element: <Projects />,
  },
  {
    path: ROUTES.settings,
    element: <Settings />,
  },
];
