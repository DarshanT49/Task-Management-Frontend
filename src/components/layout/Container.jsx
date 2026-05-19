import { cn } from "../../lib/utils";

export default function Container({ children, className = "" }) {
  return (
    <div className={cn("max-w-5xl mx-auto px-4 sm:px-6 w-full", className)}>
      {children}
    </div>
  );
}
