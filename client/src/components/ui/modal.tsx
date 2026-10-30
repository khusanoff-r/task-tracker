import { useEffect, useId, type PropsWithChildren } from "react";

type ModalProps = PropsWithChildren<{
  title: string;
  description?: string;
  size?: "md" | "xl";
  onClose: () => void;
}>;

const sizes = {
  md: "max-w-md",
  xl: "max-w-xl",
};

export const Modal = ({
  title,
  description,
  size = "xl",
  onClose,
  children,
}: ModalProps) => {
  const titleId = useId();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`my-auto w-full ${sizes[size]} rounded-2xl bg-white p-6 shadow-2xl sm:p-8`}
      >
        <div className="mb-7 flex items-start justify-between gap-4">
          <div>
            <h2 id={titleId} className="text-xl font-bold text-gray-900">
              {title}
            </h2>

            {description && (
              <p className="mt-1.5 text-sm text-gray-500">{description}</p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};
