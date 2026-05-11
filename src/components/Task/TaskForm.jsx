import { useState } from 'react';
import Button from '../common/Button';
import { Plus, X, Type, AlignLeft } from 'lucide-react';

const TaskForm = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title, description, status: 'In Progress', solutions: [] });
    setTitle('');
    setDescription('');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden mb-8 max-w-2xl mx-auto border-t-4 border-t-blue-500">
      <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
        <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
          <Plus size={16} className="text-blue-500" /> New Learning Task
        </h3>
        {onCancel && (
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-900 transition-colors">
            <X size={18} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
            <Type size={12} /> Title
          </label>
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Master React Concurrency"
            className="w-full bg-transparent border-none text-lg font-bold text-gray-900 placeholder-gray-200 focus:outline-none"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
            <AlignLeft size={12} /> Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Define your learning objective..."
            className="w-full bg-transparent border-none text-sm text-gray-600 placeholder-gray-200 focus:outline-none resize-none min-h-[80px] leading-relaxed"
          />
        </div>

        <div className="flex gap-3 justify-end pt-2">
          <Button type="submit" className="px-8 shadow-lg shadow-blue-100">
            Create Task
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
