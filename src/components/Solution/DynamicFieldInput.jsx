import { Plus, Trash2, Hash, FileText } from 'lucide-react';

const DynamicFieldInput = ({ fields, onAddField, onRemoveField, onFieldChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
          <Hash size={12} /> Supporting Evidence / Notes
        </label>
        <button 
          type="button" 
          onClick={onAddField}
          className="flex items-center gap-1.5 text-[10px] font-bold text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-widest bg-blue-50 px-2 py-1 rounded-md"
        >
          <Plus size={12} /> Add Field
        </button>
      </div>

      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={index} className="flex gap-2 items-center bg-gray-50/50 p-2 rounded-xl border border-gray-100 group animate-in fade-in slide-in-from-left-2 duration-200">
            <div className="flex-1 flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg shadow-sm">
              <span className="text-[10px] font-black text-gray-400 uppercase border-r border-gray-100 pr-2 min-w-[60px]">Label</span>
              <input
                value={field.name}
                onChange={(e) => onFieldChange(index, 'name', e.target.value)}
                placeholder="e.g. Link"
                className="flex-1 bg-transparent border-none text-xs font-bold text-gray-700 placeholder-gray-300 focus:outline-none"
              />
            </div>
            
            <div className="flex-[2] flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg shadow-sm">
              <span className="text-[10px] font-black text-gray-400 uppercase border-r border-gray-100 pr-2 min-w-[60px]">Value</span>
              <input
                value={field.value}
                onChange={(e) => onFieldChange(index, 'value', e.target.value)}
                placeholder="e.g. https://..."
                className="flex-1 bg-transparent border-none text-xs font-medium text-gray-600 placeholder-gray-300 focus:outline-none"
              />
            </div>

            <button
              type="button"
              onClick={() => onRemoveField(index)}
              className="p-2 text-gray-300 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
              title="Remove Field"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      {fields.length === 0 && (
        <div className="py-4 border-2 border-dashed border-gray-50 rounded-xl flex items-center justify-center">
          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest italic">No extra metadata added</p>
        </div>
      )}
    </div>
  );
};

export default DynamicFieldInput;
