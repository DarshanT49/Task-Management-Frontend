import { motion } from "framer-motion";
import TaskCard from "./TaskCard";
import EmptyState from "../ui/EmptyState";
import { ClipboardList } from "lucide-react";

export default function TaskList({ tasks, onTaskClick }) {
  if (tasks.length === 0) {
    return (
      <EmptyState
        icon="empty"
        title="Your workspace is clear"
        description="Start by adding your first learning task."
      />
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
    >
      {tasks.map((task) => (
        <motion.div key={task.id} variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
          <TaskCard task={task} onClick={onTaskClick} />
        </motion.div>
      ))}
    </motion.div>
  );
}
