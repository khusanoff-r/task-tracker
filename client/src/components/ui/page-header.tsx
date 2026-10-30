import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export const PageHeader = ({ title, description, action }: PageHeaderProps) => (
  <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
    <div className="space-y-2">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        {title}
      </h1>

      <p className="text-sm leading-6 text-gray-500">{description}</p>
    </div>

    {action}
  </div>
);
