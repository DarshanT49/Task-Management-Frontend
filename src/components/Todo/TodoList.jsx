import { motion } from "framer-motion";
import TodoCard from "./TodoCard";
import EmptyState from "../ui/EmptyState";
import Badge from "../ui/Badge";

export default function TodoList({ todos, onToggle, onDelete, onConvertToTask }) {
  if (todos.length === 0) {
    return (
      <EmptyState
        icon="done"
        title="All caught up!"
        description="Add a todo to get started."
      />
    );
  }

  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;
  const allDone = completedCount > 0 && completedCount === totalCount;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-1">
        <Badge variant={allDone ? "success" : "default"} size="sm">
          {completedCount}/{totalCount} done
        </Badge>
      </div>

      <motion.div
        className="space-y-2"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.03 } } }}
      >
        {todos.map((todo) => (
          <motion.div key={todo.id} variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}>
            <TodoCard
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onConvertToTask={onConvertToTask}
            />
          </motion.div>
        ))}
      </motion.div>

      {allDone && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-4 bg-success/10 rounded-xl border border-success/20"
        >
          <p className="text-sm font-bold text-success">All tasks completed! Great job!</p>
        </motion.div>
      )}
    </div>
  );
}
