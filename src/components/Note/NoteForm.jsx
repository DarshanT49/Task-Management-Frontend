import { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import Card from '../common/Card';
import { Plus, Tag } from 'lucide-react';

const NoteForm = ({ onSubmit, onCancel, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [category, setCategory] = useState(initialData?.category || '');
  const [tags, setTags] = useState(initialData?.tags?.join(', ') || '');
  const [showAdvanced, setShowAdvanced] = useState(initialData ? true : false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tagArray = tags.split(',').map(t => t.trim()).filter(t => t);

    onSubmit({
      id: initialData?.id,
      title,
      content,
      category: category || 'General',
      tags: tagArray,
      createdAt: initialData?.createdAt || new Date().toISOString()
    });

    setTitle('');
    setContent('');
    setCategory('');
    setTags('');
    setShowAdvanced(false);
  };

  return (
    <Card className="mb-6 border-blue-100 bg-blue-50/10">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {initialData ? 'Edit Note' : 'New Note'}
        </h3>

        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          required
        />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note here..."
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 min-h-[100px] font-normal"
          />
        </div>

        {showAdvanced ? (
          <div className="space-y-3 pt-2 border-t border-gray-200">
            <Input
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Learning, Work, Ideas"
            />
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <Tag size={14} /> Tags (comma separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="react, javascript, learn"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowAdvanced(true)}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            <Plus size={14} /> Add category and tags
          </button>
        )}

        <div className="flex gap-2 justify-end pt-2">
          {onCancel && (
            <Button variant="secondary" onClick={onCancel}>
              {initialData ? 'Cancel' : 'Cancel'}
            </Button>
          )}
          <Button type="submit">
            {initialData ? 'Update Note' : 'Save Note'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default NoteForm;
