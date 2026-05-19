import { useState } from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import Input from "../ui/Input";
import DynamicFieldInput from "./DynamicFieldInput";
import { Lightbulb, X, Check } from "lucide-react";

export default function SolutionForm({ onSubmit, onCancel }) {
  const [summary, setSummary] = useState("");
  const [fields, setFields] = useState([]);

  const handleAddField = () => {
    setFields([...fields, { name: "", value: "" }]);
  };

  const handleRemoveField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleFieldChange = (index, key, value) => {
    const newFields = [...fields];
    newFields[index][key] = value;
    setFields(newFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!summary.trim()) return;
    const activeFields = fields.filter((f) => f.name.trim() && f.value.trim());
    onSubmit({
      summary,
      fields: activeFields,
      createdAt: new Date().toISOString(),
    });
    setSummary("");
    setFields([]);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
            <Lightbulb size={16} className="text-primary-500" />
            New Solution Entry
          </h3>
          {onCancel && (
            <button type="button" onClick={onCancel} className="p-1.5 text-text-tertiary hover:text-text-primary rounded-lg hover:bg-gray-100 transition-colors">
              <X size={18} />
            </button>
          )}
        </div>

        <Input
          label="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="What was the breakthrough or key takeaway?"
          required
          autoFocus
        />

        <DynamicFieldInput
          fields={fields}
          onAddField={handleAddField}
          onRemoveField={handleRemoveField}
          onFieldChange={handleFieldChange}
        />

        <div className="flex gap-3 justify-end pt-2 border-t border-border/60">
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
          <Button type="submit">
            <Check size={14} /> Save Outcome
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
