import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskList from "../components/Task/TaskList";
import TaskForm from "../components/Task/TaskForm";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import EmptyState from "../components/ui/EmptyState";
import { CardSkeleton } from "../components/ui/Skeleton";
import { Plus, LayoutGrid } from "lucide-react";

export default function Dashboard({ tasks, addTask, onTaskClick, loading }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <Container>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pt-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
              <LayoutGrid size={20} />
            </span>
            My Learning Dashboard
          </h1>
          <p className="text-sm text-text-secondary mt-1">Track your progress and key takeaways from each task.</p>
        </div>
        <AnimatePresence>
          {!showForm && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
              <Button onClick={() => setShowForm(true)} size="lg">
                <Plus size={18} /> Add Task
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-8"
          >
            <Card className="border-primary-200 bg-primary-50/30">
              <TaskForm
                onSubmit={(newTask) => {
                  addTask(newTask);
                  setShowForm(false);
                }}
                onCancel={() => setShowForm(false)}
              />
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} lines={3} />
            ))}
          </div>
        ) : (
          <TaskList tasks={tasks} onTaskClick={onTaskClick} />
        )}
      </div>
    </Container>
  );
}
