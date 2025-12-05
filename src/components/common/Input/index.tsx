import type { InputHTMLAttributes } from "react";
import clsx from "classnames";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, ...rest }: InputProps) {
  return (
    <label className="flex flex-col gap-2">
      {label && (
        <span className="text-sm font-medium text-industrial-300">{label}</span>
      )}
      <input
        className={clsx(
          "input-industrial",
          error && "border-error-500/50 focus:border-error-500 focus:ring-error-500/20",
          className,
        )}
        {...rest}
      />
      {error && (
        <span className="text-xs font-medium text-error-400 animate-slide-up">
          {error}
        </span>
      )}
    </label>
  );
}


