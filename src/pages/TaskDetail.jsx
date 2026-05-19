import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Card from "../components/ui/Card";
import EmptyState from "../components/ui/EmptyState";
import Modal from "../components/ui/Modal";
import SolutionForm from "../components/Solution/SolutionForm";
import SolutionCard from "../components/Solution/SolutionCard";
import { useToast } from "../context/ToastContext";
import { ArrowLeft, CheckCircle2, Circle, Plus, Archive, ChevronRight } from "lucide-react";
import { getStatusColor, formatDateFull } from "../lib/utils";

export default function TaskDetail({ tasks, addSolution, toggleTaskStatus, convertTaskToNote }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [showSolutionForm, setShowSolutionForm] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);

  const task = tasks.find((t) => String(t.id) === id);
  const isCompleted = task?.status === "completed";
  const statusColor = getStatusColor(task?.status);

  if (!task) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <EmptyState
            title="Task not found"
            description="This task may have been deleted or the link is invalid."
            action={<Button onClick={() => navigate("/")}>Back to Dashboard</Button>}
          />
        </div>
      </Container>
    );
  }

  const handleConvertToNote = () => {
    convertTaskToNote(task);
    navigate("/notes");
    toast.success("Task archived as note");
  };

  const handleToggleStatus = () => {
    const newStatus = isCompleted ? "In Progress" : "completed";
    toggleTaskStatus(task.id);
    toast.success(newStatus === "completed" ? "Task marked as completed!" : "Task reopened");
  };

  return (
    <div className="min-h-screen pb-10">
      {/* Task Header */}
      <div className="bg-white border-b border-border/60">
        <Container>
          <div className="py-4 sm:py-5">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs font-bold text-text-tertiary uppercase tracking-widest mb-3">
              <button onClick={() => navigate("/")} className="hover:text-primary-600 transition-colors">Dashboard</button>
              <ChevronRight size={10} />
              <span className="text-text-primary">Task</span>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-3">
                  <button onClick={handleToggleStatus} className="mt-0.5 flex-shrink-0">
                    {isCompleted ? (
                      <CheckCircle2 size={24} className="text-success" />
                    ) : (
                      <Circle size={24} className="text-primary-400 animate-pulse-soft" />
                    )}
                  </button>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-black text-text-primary tracking-tight truncate">{task.title}</h1>
                    <p className="text-sm text-text-secondary mt-1 max-w-3xl">
                      {task.description || "No description provided."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pl-11 sm:pl-0">
                <Badge variant={isCompleted ? "success" : "primary"} dot>
                  {isCompleted ? "Completed" : "In Progress"}
                </Badge>
                <Button
                  variant={isCompleted ? "secondary" : "primary"}
                  size="sm"
                  onClick={handleToggleStatus}
                >
                  {isCompleted ? "Reopen" : "Complete"}
                </Button>
                {isCompleted && (
                  <Button variant="ghost" size="sm" onClick={() => setShowArchiveModal(true)}>
                    <Archive size={14} />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Solutions Section */}
      <Container className="mt-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-bold text-text-primary flex items-center gap-2">
              Solution Log
              <Badge size="sm">{task.solutions?.length || 0}</Badge>
            </h2>
            <AnimatePresence>
              {!showSolutionForm && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <Button size="sm" onClick={() => setShowSolutionForm(true)}>
                    <Plus size={14} /> New Entry
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {showSolutionForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-6"
              >
                <Card className="border-primary-200 bg-primary-50/30">
                  <SolutionForm
                    onSubmit={(solution) => {
                      addSolution(task.id, solution);
                      setShowSolutionForm(false);
                      toast.success("Solution added!");
                    }}
                    onCancel={() => setShowSolutionForm(false)}
                  />
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-3">
            {task.solutions && task.solutions.length > 0 ? (
              <motion.div className="space-y-3" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.05 } } }}>
                {task.solutions.map((solution, i) => (
                  <motion.div
                    key={solution.id}
                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                  >
                    <SolutionCard solution={solution} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <EmptyState icon="empty" title="No solutions yet" description="Add your first learning solution to track what you've learned." />
            )}
          </div>
        </div>
      </Container>

      {/* Archive Confirmation Modal */}
      <Modal open={showArchiveModal} onClose={() => setShowArchiveModal(false)} title="Archive this task?">
        <p className="text-sm text-text-secondary mb-6">
          This task will be archived as a note. You can find it in the Notes section.
        </p>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={() => setShowArchiveModal(false)}>Cancel</Button>
          <Button
            onClick={() => {
              handleConvertToNote();
              setShowArchiveModal(false);
            }}
          >
            Archive
          </Button>
        </div>
      </Modal>
    </div>
  );
}
