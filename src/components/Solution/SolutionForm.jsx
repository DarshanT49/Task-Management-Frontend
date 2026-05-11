import { useState } from 'react';
import Button from '../common/Button';
import DynamicFieldInput from './DynamicFieldInput';
import { Lightbulb, Check } from 'lucide-react';

const SolutionForm = ({ onSubmit, onCancel }) => {
  const [summary, setSummary] = useState('');
  const [fields, setFields] = useState([]);

  const handleAddField = () => {
    setFields([...fields, { name: '', value: '' }]);
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
    
    // Filter out empty fields
    const activeFields = fields.filter(f => f.name.trim() && f.value.trim());
    
    onSubmit({ 
      id: Date.now().toString(),
      summary, 
      fields: activeFields,
      createdAt: new Date().toISOString()
    });
    
    setSummary('');
    setFields([]);
  };

  return (
    <div className="bg-white border-2 border-blue-500 rounded-2xl shadow-2xl overflow-hidden">
      <div className="px-6 py-3 bg-blue-500 flex items-center justify-between">
        <h3 className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
          <Lightbulb size={14} /> New Solution Entry
        </h3>
        <button onClick={onCancel} className="text-blue-100 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest">
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">Summary</label>
          <input
            autoFocus
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="What was the breakthrough or key takeaway?"
            className="w-full bg-transparent border-none text-lg font-bold text-gray-900 placeholder-gray-200 focus:outline-none"
            required
          />
        </div>

        <div className="pt-2">
          <DynamicFieldInput
            fields={fields}
            onAddField={handleAddField}
            onRemoveField={handleRemoveField}
            onFieldChange={handleFieldChange}
          />
        </div>

        <div className="flex gap-3 justify-end pt-4 border-t border-gray-50">
          <button 
            type="submit" 
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
          >
            <Check size={14} /> Save Outcome
          </button>
        </div>
      </form>
    </div>
  );
};

export default SolutionForm;
