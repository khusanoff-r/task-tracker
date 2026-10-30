import { NavLink, useLocation } from "react-router-dom";

import { NAVIGATION, ROUTES } from "@/constants";

export const Header = () => {
  const { pathname } = useLocation();

  const current = NAVIGATION.find((item) => item.to === pathname);

  return (
    <header className="sticky top-0 z-20 border-b border-gray-100 bg-white shadow-sm">
      <div className="flex min-h-20 items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-10 xl:px-14">
        {/* Page title */}
        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-gray-400">
            Workspace / {current?.breadcrumb ?? "Not found"}
          </p>

          <h2 className="mt-1 truncate text-lg font-bold text-gray-900">
            {current?.label ?? "Page not found"}
          </h2>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          {/* Search */}
          <div className="hidden md:block">
            <input
              type="text"
              placeholder="Search tasks..."
              aria-label="Search tasks"
              className="w-64 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition-all placeholder:text-gray-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
            />
          </div>

          {/* Notifications */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-11 w-11 items-center justify-center rounded-xl text-gray-500 transition hover:bg-gray-100 hover:text-violet-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3 border-l border-gray-100 pl-4 sm:pl-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-violet-500 to-indigo-600 font-semibold text-white shadow-md shadow-violet-200">
              JD
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-gray-900">John Doe</p>
              <p className="mt-0.5 text-xs text-gray-400">Administrator</p>
            </div>
          </div>
        </div>
      </div>

      {/* Навигация для экранов без сайдбара */}
      <nav className="flex gap-2 overflow-x-auto border-t border-gray-100 px-4 py-3 sm:px-6 lg:hidden">
        {NAVIGATION.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === ROUTES.root}
            className={({ isActive }) =>
              `shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-violet-600 text-white"
                  : "text-gray-500 hover:bg-violet-50 hover:text-violet-600"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};
