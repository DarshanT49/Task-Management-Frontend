import { useState } from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { Plus } from "lucide-react";

export default function TodoForm({ onSubmit, onCancel }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit({ text, completed: false });
    setText("");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
          <Plus size={16} className="text-primary-500" />
          Add Todo Item
        </h3>
        <Input
          label="Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What do you want to do?"
          required
          autoFocus
        />
        <div className="flex gap-2 justify-end">
          {onCancel && (
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit">Add Todo</Button>
        </div>
      </form>
    </motion.div>
  );
}
