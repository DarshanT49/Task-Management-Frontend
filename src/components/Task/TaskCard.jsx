import { motion } from "framer-motion";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { CheckCircle2, Circle, MessageSquare, ArrowUpRight } from "lucide-react";
import { getStatusColor } from "../../lib/utils";

export default function TaskCard({ task, onClick }) {
  const isCompleted = task.status === "completed";
  const statusColor = getStatusColor(task.status);

  return (
    <motion.div layout>
      <Card
        onClick={() => onClick(task.id)}
        hover
        padding="sm"
        className="group relative overflow-hidden border-l-[3px]"
        style={{ borderLeftColor: isCompleted ? "var(--color-success)" : "var(--color-primary-500)" }}
      >
        <div className="flex items-start gap-3">
          <div className={`mt-0.5 flex-shrink-0 ${isCompleted ? "text-success" : "text-primary-500"}`}>
            {isCompleted ? <CheckCircle2 size={18} /> : <Circle size={18} className="animate-pulse-soft" />}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start gap-2">
              <h3
                className={`text-sm font-bold truncate leading-tight transition-colors ${
                  isCompleted ? "text-text-tertiary line-through" : "text-text-primary group-hover:text-primary-600"
                }`}
              >
                {task.title}
              </h3>
              <ArrowUpRight
                size={14}
                className="text-text-tertiary/50 group-hover:text-primary-500 transition-all"
              />
            </div>

            <p className="text-xs text-text-secondary line-clamp-1 mt-1 font-medium">
              {task.description || "No description provided."}
            </p>

            <div className="mt-3 flex items-center gap-3">
              <Badge variant={isCompleted ? "success" : "primary"} size="sm" dot>
                {task.status || "In Progress"}
              </Badge>
              <div className="flex items-center gap-1 text-[10px] font-bold text-text-tertiary uppercase tracking-widest">
                <MessageSquare size={12} />
                {task.solutions?.length || 0}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
