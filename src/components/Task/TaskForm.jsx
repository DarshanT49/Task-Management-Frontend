import { useState } from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { Plus, X, Type, AlignLeft } from "lucide-react";

export default function TaskForm({ onSubmit, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title, description, status: "In Progress", solutions: [] });
    setTitle("");
    setDescription("");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
            <Plus size={16} className="text-primary-500" />
            New Learning Task
          </h3>
          {onCancel && (
            <button type="button" onClick={onCancel} className="p-1.5 text-text-tertiary hover:text-text-primary rounded-lg hover:bg-gray-100 transition-colors">
              <X size={18} />
            </button>
          )}
        </div>

        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Master React Concurrency"
          required
          autoFocus
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-text-primary flex items-center gap-1.5">
            <AlignLeft size={14} /> Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Define your learning objective..."
            className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 placeholder:text-text-tertiary resize-none min-h-[80px] leading-relaxed"
          />
        </div>

        <div className="flex gap-3 justify-end pt-2">
          <Button type="submit">Create Task</Button>
        </div>
      </form>
    </motion.div>
  );
}
