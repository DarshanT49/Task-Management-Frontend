import { motion } from "framer-motion";
import Card from "../ui/Card";
import { Trash2, CheckCircle, Circle, ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";

export default function TodoCard({ todo, onToggle, onDelete, onConvertToTask }) {
  return (
    <motion.div layout>
      <Card
        className={cn(
          "group transition-all duration-200 border-l-[3px]",
          todo.completed ? "border-l-success opacity-70" : "border-l-transparent hover:border-l-primary-400"
        )}
        padding="sm"
      >
        <div className="flex items-start gap-3">
          <button
            onClick={() => onToggle(todo.id)}
            className={cn(
              "mt-0.5 flex-shrink-0 transition-colors",
              todo.completed ? "text-success" : "text-text-tertiary hover:text-primary-500"
            )}
            aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
          >
            {todo.completed ? <CheckCircle size={20} /> : <Circle size={20} />}
          </button>

          <div className="flex-1 min-w-0 flex items-center">
            <p
              className={cn(
                "text-sm font-medium transition-all",
                todo.completed ? "text-text-tertiary line-through" : "text-text-primary"
              )}
            >
              {todo.text}
            </p>
          </div>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {!todo.completed && onConvertToTask && (
              <button
                onClick={() => onConvertToTask(todo)}
                title="Convert to Task"
                className="p-1.5 text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
              >
                <ArrowRight size={16} />
              </button>
            )}
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1.5 text-text-tertiary hover:text-danger hover:bg-red-50 rounded-lg transition-colors"
              aria-label="Delete todo"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
