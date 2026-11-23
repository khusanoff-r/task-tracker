import { ROUTES } from "@/constants";

import {
  Home,
  Login,
  MyTasks,
  Projects,
  Register,
  Settings,
} from "./lazy.route";

export const routes = {
  public: [
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ],
  private: [
    { path: ROUTES.root, element: <Home /> },
    { path: ROUTES.myTasks, element: <MyTasks /> },
    { path: ROUTES.projects, element: <Projects /> },
    { path: ROUTES.settings, element: <Settings /> },
  ],
};
