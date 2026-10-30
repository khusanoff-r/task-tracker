import { ROUTES } from "./route.constants";

export type NavigationItem = {
  label: string;
  icon: string;
  to: string;
  /** Заголовок страницы в шапке */
  breadcrumb: string;
};

export const NAVIGATION: NavigationItem[] = [
  { label: "Dashboard", icon: "◫", to: ROUTES.root, breadcrumb: "Overview" },
  { label: "My Tasks", icon: "✓", to: ROUTES.myTasks, breadcrumb: "Tasks" },
  { label: "Projects", icon: "▦", to: ROUTES.projects, breadcrumb: "Projects" },
  {
    label: "Settings",
    icon: "⚙",
    to: ROUTES.settings,
    breadcrumb: "Preferences",
  },
];
