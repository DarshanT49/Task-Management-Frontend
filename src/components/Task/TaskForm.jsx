import { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import Card from '../common/Card';

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
    <Card className="mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Add New Task</h3>
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Learn React useEffect"
          required
        />
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What do you want to learn or achieve?"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 min-h-[100px]"
          />
        </div>
        <div className="flex gap-2 justify-end">
          {onCancel && (
            <Button variant="secondary" onClick={onCancel}>Cancel</Button>
          )}
          <Button type="submit">Create Task</Button>
        </div>
      </form>
    </Card>
  );
};

export default TaskForm;
