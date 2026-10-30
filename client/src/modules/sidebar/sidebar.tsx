import { NavLink } from "react-router-dom";

import { NAVIGATION, ROUTES } from "@/constants";

export const Sidebar = () => {
  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col overflow-y-auto bg-[#17172B] px-6 py-8 text-white lg:flex">
      {/* Logo */}
      <div className="mb-12 flex items-center gap-3 px-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-indigo-600 text-xl font-bold shadow-lg shadow-violet-900/40">
          T
        </div>

        <span className="text-xl font-bold tracking-tight">
          TaskFlow<span className="text-violet-400">.</span>
        </span>
      </div>

      <div className="mb-5 px-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
          Workspace
        </p>
      </div>

      <nav className="flex flex-col gap-2">
        {NAVIGATION.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === ROUTES.root}
            className={({ isActive }) =>
              `flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-900/30"
                  : "text-gray-400 hover:translate-x-1 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom card */}
      <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 text-lg text-violet-300">
          ✦
        </div>

        <h3 className="text-sm font-semibold">Upgrade your workflow</h3>

        <p className="mt-2 text-xs leading-5 text-gray-400">
          Keep your projects organized and stay productive.
        </p>

        <button
          type="button"
          className="mt-5 w-full rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold transition hover:bg-violet-500"
        >
          Learn more
        </button>
      </div>
    </aside>
  );
};
