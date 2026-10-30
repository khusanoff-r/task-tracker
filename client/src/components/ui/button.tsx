import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-violet-600 text-white shadow-lg shadow-violet-200 hover:bg-violet-700",
  secondary: "border border-gray-200 text-gray-600 hover:bg-gray-50",
  danger: "bg-red-500 text-white hover:bg-red-600",
  ghost: "text-violet-600 hover:bg-violet-50",
};

export const Button = ({
  variant = "primary",
  type = "button",
  className = "",
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none ${variants[variant]} ${className}`}
    {...props}
  />
);
