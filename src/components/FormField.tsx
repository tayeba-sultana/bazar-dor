import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

export default function FormField({ label, hint, id, ...inputProps }: Props) {
  const inputId = id ?? inputProps.name;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputId} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={inputId}
        className="input h-10 w-full border-base-content/20 bg-base-100 text-sm placeholder:text-base-content/50 focus:border-primary focus:outline-primary"
        {...inputProps}
      />
      {hint && <p className="text-xs text-base-content/60">{hint}</p>}
    </div>
  );
}