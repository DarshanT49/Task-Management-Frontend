import { motion } from "framer-motion";
import { Plus, Trash2, Hash } from "lucide-react";

export default function DynamicFieldInput({ fields, onAddField, onRemoveField, onFieldChange }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-text-primary flex items-center gap-1.5">
          <Hash size={14} />
          Supporting Evidence
        </label>
        <button
          type="button"
          onClick={onAddField}
          className="inline-flex items-center gap-1 text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors bg-primary-50 px-2.5 py-1.5 rounded-lg"
        >
          <Plus size={12} /> Add Field
        </button>
      </div>

      <div className="space-y-2">
        {fields.map((field, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="flex gap-2 items-start"
          >
            <div className="flex-1">
              <input
                value={field.name}
                onChange={(e) => onFieldChange(index, "name", e.target.value)}
                placeholder="Label (e.g. Link)"
                className="w-full px-3 py-2 rounded-lg border border-border text-xs font-semibold text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
              />
            </div>
            <div className="flex-[2]">
              <input
                value={field.value}
                onChange={(e) => onFieldChange(index, "value", e.target.value)}
                placeholder="Value (e.g. https://...)"
                className="w-full px-3 py-2 rounded-lg border border-border text-sm text-text-secondary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
              />
            </div>
            <button
              type="button"
              onClick={() => onRemoveField(index)}
              className="p-2 text-text-tertiary hover:text-danger transition-colors"
              title="Remove Field"
            >
              <Trash2 size={14} />
            </button>
          </motion.div>
        ))}
      </div>

      {fields.length === 0 && (
        <div className="py-6 border-2 border-dashed border-border/40 rounded-xl flex items-center justify-center">
          <p className="text-xs font-medium text-text-tertiary italic">
            No extra metadata added — click "Add Field" to include links, images, or notes
          </p>
        </div>
      )}
    </div>
  );
}
