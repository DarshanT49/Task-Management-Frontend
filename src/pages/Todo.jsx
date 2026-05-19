import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TodoList from "../components/Todo/TodoList";
import TodoForm from "../components/Todo/TodoForm";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { Plus, ListTodo } from "lucide-react";

export default function Todo({ todos, addTodo, toggleTodo, deleteTodo, convertTodoToTask }) {
  const [showForm, setShowForm] = useState(false);

  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;

  return (
    <Container>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pt-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
              <ListTodo size={20} />
            </span>
            My Todo List
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            {totalCount > 0
              ? `${completedCount}/${totalCount} completed`
              : "Plan your tasks and convert them to learning tasks when ready."}
          </p>
        </div>
        <AnimatePresence>
          {!showForm && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
              <Button onClick={() => setShowForm(true)} size="lg">
                <Plus size={18} /> Add Todo
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {totalCount > 0 && (
        <div className="w-full bg-gray-50 rounded-full h-2 mb-6 overflow-hidden">
          <div
            className="bg-success h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.round((completedCount / totalCount) * 100)}%` }}
          />
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-8"
          >
            <Card className="border-primary-200 bg-primary-50/30">
              <TodoForm
                onSubmit={(newTodo) => {
                  addTodo(newTodo);
                  setShowForm(false);
                }}
                onCancel={() => setShowForm(false)}
              />
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6">
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onConvertToTask={convertTodoToTask}
        />
      </div>
    </Container>
  );
}
