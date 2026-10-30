import { createBrowserRouter } from "react-router-dom";

import { MainLayout } from "@/layout";

import { routes } from "./routes";

const NotFound = () => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
    <p className="text-6xl font-bold text-violet-600">404</p>
    <p className="text-sm text-gray-500">Page not found</p>
  </div>
);

const filteredRoutes = routes.map(({ path, element }) => ({
  path,
  errorElement: (
    <MainLayout>
      <NotFound />
    </MainLayout>
  ),
  element: <MainLayout>{element}</MainLayout>,
}));

export const router = createBrowserRouter(filteredRoutes);
