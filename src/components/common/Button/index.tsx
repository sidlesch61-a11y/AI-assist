import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  children: ReactNode;
}

export function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-industrial-950 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 active:scale-95 touch-target";
  const variants: Record<string, string> = {
    primary:
      "bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-glow focus:ring-primary-500",
    secondary:
      "bg-industrial-700 hover:bg-industrial-600 text-industrial-100 border border-industrial-600 shadow-md hover:shadow-lg focus:ring-industrial-600",
    ghost:
      "bg-transparent text-industrial-300 hover:bg-industrial-800/50 hover:text-industrial-100 focus:ring-industrial-600",
    danger:
      "bg-error-500 hover:bg-error-600 text-white shadow-lg hover:shadow-error-500/20 focus:ring-error-500",
  };

  return (
    <button
      className={clsx(base, variants[variant], className)}
      {...rest}
    >
      {children}
    </button>
  );
}


