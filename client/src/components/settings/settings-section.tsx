import type { PropsWithChildren } from "react";

type SettingsSectionProps = PropsWithChildren<{
  title: string;
  description: string;
}>;

export const SettingsSection = ({
  title,
  description,
  children,
}: SettingsSectionProps) => (
  <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
    <div className="mb-6">
      <h2 className="text-base font-bold text-gray-900">{title}</h2>
      <p className="mt-1.5 text-sm text-gray-500">{description}</p>
    </div>

    {children}
  </section>
);
