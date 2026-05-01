import { useState } from 'react';
import Card from '../common/Card';
import { Edit, Trash2, Eye, X } from 'lucide-react';

const NoteCard = ({ note, onDelete, onEdit }) => {
  const [showFullContent, setShowFullContent] = useState(false);

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="h-full flex flex-col hover:border-blue-200 group">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-semibold text-gray-800 text-lg leading-tight flex-1">{note.title}</h4>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(note)}
            title="Edit Note"
            className="text-blue-500 hover:text-blue-700 p-1.5 hover:bg-blue-50 rounded-lg"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(note.id)}
            title="Delete Note"
            className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-lg"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold bg-gray-50 px-2 py-0.5 rounded">
          {formatDate(note.createdAt)}
        </span>
        {note.category && (
          <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
            {note.category}
          </span>
        )}
      </div>

      <div className="flex-1">
        <p className="text-gray-700 text-sm whitespace-pre-wrap line-clamp-3">
          {note.content || 'No content'}
        </p>
        {note.content && note.content.length > 150 && (
          <button
            onClick={() => setShowFullContent(!showFullContent)}
            className="text-blue-600 hover:text-blue-800 text-sm mt-2 font-medium"
          >
            {showFullContent ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>

      {showFullContent && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-gray-700 text-sm whitespace-pre-wrap mb-3">{note.content}</p>
          <button
            onClick={() => setShowFullContent(false)}
            className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm"
          >
            <X size={14} /> Close
          </button>
        </div>
      )}

      {note.tags && note.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2 pt-3 border-t border-gray-100">
          {note.tags.map((tag, index) => (
            <span key={index} className="text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded-md">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </Card>
  );
};

export default NoteCard;
