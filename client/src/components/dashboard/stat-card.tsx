type StatCardProps = {
  title: string;
  value: number;
  description: string;
  icon: string;
  color: string;
};

export const StatCard = ({
  title,
  value,
  description,
  icon,
  color,
}: StatCardProps) => {
  return (
    <div className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-100 hover:shadow-xl hover:shadow-violet-100/40">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-gray-500">{title}</p>

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${color}`}
        >
          <span className="text-xl">{icon}</span>
        </div>
      </div>

      <h3 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
        {value}
      </h3>

      <p className="mt-2 text-sm leading-5 text-gray-400">{description}</p>
    </div>
  );
};
