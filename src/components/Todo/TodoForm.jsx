import { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import Card from '../common/Card';

const TodoForm = ({ onSubmit, onCancel }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit({ text, completed: false });
    setText('');
  };

  return (
    <Card className="mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Add Todo Item</h3>
        <Input
          label="Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What do you want to do?"
          required
        />
        <div className="flex gap-2 justify-end">
          {onCancel && (
            <Button variant="secondary" onClick={onCancel}>Cancel</Button>
          )}
          <Button type="submit">Add Todo</Button>
        </div>
      </form>
    </Card>
  );
};

export default TodoForm;
