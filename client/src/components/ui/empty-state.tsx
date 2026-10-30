import type { ReactNode } from "react";

type EmptyStateProps = {
  icon: string;
  title: string;
  description: string;
  action?: ReactNode;
};

export const EmptyState = ({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) => (
  <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-14 text-center">
    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-2xl text-violet-500">
      {icon}
    </div>

    <h3 className="text-base font-semibold text-gray-900">{title}</h3>

    <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
      {description}
    </p>

    {action && <div className="mt-6">{action}</div>}
  </div>
);
