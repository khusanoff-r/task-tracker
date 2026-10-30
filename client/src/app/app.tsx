import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";

export const App = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-sm text-gray-500">
          Loading...
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
};
