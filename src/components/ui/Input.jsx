import { cn } from "../../lib/utils";

export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  className = "",
  error,
  required = false,
  ...props
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label className="text-sm font-semibold text-text-primary">
          {label}
          {required && <span className="text-danger ml-0.5">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={cn(
          "w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500",
          "placeholder:text-text-tertiary",
          error
            ? "border-danger focus:ring-red-500/20 focus:border-danger"
            : "border-border hover:border-gray-300"
        )}
        {...props}
      />
      {error && <p className="text-xs text-danger mt-0.5">{error}</p>}
    </div>
  );
}
