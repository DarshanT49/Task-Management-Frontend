import Input from '../common/Input';
import { Plus, Trash2 } from 'lucide-react';

const DynamicFieldInput = ({ fields, onAddField, onRemoveField, onFieldChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 font-semibold">Additional Fields</label>
        <button 
          type="button" 
          onClick={onAddField}
          className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
        >
          <Plus size={14} /> Add Field
        </button>
      </div>

      {fields.map((field, index) => (
        <div key={index} className="flex gap-2 items-end bg-gray-50 p-3 rounded-lg border border-gray-100 relative">
          <Input
            label="Field Name"
            value={field.name}
            onChange={(e) => onFieldChange(index, 'name', e.target.value)}
            placeholder="e.g. Link, Note"
            className="flex-1"
          />
          <Input
            label="Value"
            value={field.value}
            onChange={(e) => onFieldChange(index, 'value', e.target.value)}
            placeholder="e.g. https://..."
            className="flex-[2]"
          />
          <button
            type="button"
            onClick={() => onRemoveField(index)}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}

      {fields.length === 0 && (
        <p className="text-xs text-gray-400 italic">No extra fields added yet.</p>
      )}
    </div>
  );
};

export default DynamicFieldInput;
