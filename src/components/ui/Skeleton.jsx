import { cn } from "../../lib/utils";

export default function Skeleton({ className = "", as: Component = "div", ...props }) {
  return (
    <Component
      className={cn("rounded-lg bg-gray-100 animate-pulse-soft", className)}
      {...props}
    />
  );
}

export function CardSkeleton({ lines = 3 }) {
  return (
    <div className="bg-white rounded-xl border border-border/60 p-5 space-y-3 animate-fade-in">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      {Array.from({ length: lines - 2 }).map((_, i) => (
        <Skeleton key={i} className="h-3 w-full" />
      ))}
    </div>
  );
}
