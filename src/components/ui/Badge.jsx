import { cn } from "../../lib/utils";

const variants = {
  default: "bg-gray-100 text-text-secondary",
  primary: "bg-primary-50 text-primary-700",
  success: "bg-green-50 text-green-700",
  warning: "bg-yellow-50 text-yellow-700",
  danger: "bg-red-50 text-red-700",
};

const sizes = {
  sm: "px-1.5 py-0.5 text-[10px]",
  md: "px-2 py-1 text-xs",
};

export default function Badge({ children, variant = "default", size = "md", className = "", dot = false }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-bold uppercase tracking-wider rounded-md",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
