type ToggleProps = {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

export const Toggle = ({
  label,
  description,
  checked,
  onChange,
}: ToggleProps) => (
  <div className="flex items-center justify-between gap-6 py-5 first:pt-0 last:pb-0">
    <div>
      <p className="text-sm font-medium text-gray-800">{label}</p>
      <p className="mt-1 text-xs text-gray-400">{description}</p>
    </div>

    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        checked ? "bg-violet-600" : "bg-gray-200"
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all ${
          checked ? "left-6" : "left-1"
        }`}
      />
    </button>
  </div>
);
