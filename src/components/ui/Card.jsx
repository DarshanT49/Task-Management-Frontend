import { cn } from "../../lib/utils";

export default function Card({ children, className = "", onClick, hover = false, padding = "md" }) {
  const paddings = { sm: "p-4", md: "p-5", lg: "p-6" };

  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white rounded-xl border border-border/60 transition-all duration-200",
        paddings[padding],
        onClick || hover
          ? "cursor-pointer hover:shadow-elevated hover:border-primary-200 hover:-translate-y-0.5"
          : "shadow-soft",
        className
      )}
    >
      {children}
    </div>
  );
}
