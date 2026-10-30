type FilterTabProps = {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
};

export const FilterTab = ({ label, count, active, onClick }: FilterTabProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
      active
        ? "bg-violet-600 text-white shadow-md shadow-violet-200"
        : "bg-white text-gray-500 hover:bg-violet-50 hover:text-violet-600"
    }`}
  >
    {label}

    <span
      className={`rounded-md px-2 py-0.5 text-xs ${
        active ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
      }`}
    >
      {count}
    </span>
  </button>
);
