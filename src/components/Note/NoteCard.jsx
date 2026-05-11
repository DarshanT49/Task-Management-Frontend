import { useState } from 'react';
import Card from '../common/Card';
import { Edit, Trash2, X, Folder, Calendar, Tag as TagIcon } from 'lucide-react';

const NoteCard = ({ note, onDelete, onEdit, groups, onUpdateGroup }) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const [showGroupSelector, setShowGroupSelector] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const group = groups.find(g => g.id === note.groupId);

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-all duration-300 border-l-4 border-l-blue-400 group relative">
      {/* Group Tag */}
      <div className="flex justify-between items-start mb-4">
        <div className="relative">
          <button
            onClick={() => setShowGroupSelector(!showGroupSelector)}
            className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded flex items-center gap-1 transition-colors ${
              group ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
            }`}
          >
            <Folder size={10} />
            {group ? group.name : 'No Group'}
          </button>

          {showGroupSelector && (
            <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-xl z-20 p-1">
              <button
                onClick={() => { onUpdateGroup(note.id, null); setShowGroupSelector(false); }}
                className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 rounded text-gray-600"
              >
                No Group
              </button>
              {groups.map(g => (
                <button
                  key={g.id}
                  onClick={() => { onUpdateGroup(note.id, g.id); setShowGroupSelector(false); }}
                  className="w-full text-left px-3 py-1.5 text-xs hover:bg-blue-50 rounded text-gray-700 font-medium"
                >
                  {g.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(note)}
            className="text-gray-400 hover:text-blue-600 p-1 hover:bg-blue-50 rounded"
            title="Edit"
          >
            <Edit size={14} />
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="text-gray-400 hover:text-red-600 p-1 hover:bg-red-50 rounded"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <h4 className="font-bold text-gray-900 text-lg leading-tight mb-2 group-hover:text-blue-600 transition-colors">
        {note.title}
      </h4>

      <div className="flex-1">
        <p className="text-gray-600 text-sm whitespace-pre-wrap line-clamp-4 leading-relaxed">
          {note.content || 'No content'}
        </p>
        {note.content && note.content.length > 200 && (
          <button
            onClick={() => setShowFullContent(!showFullContent)}
            className="text-blue-500 hover:text-blue-700 text-xs mt-2 font-bold uppercase tracking-wider"
          >
            {showFullContent ? 'Show less' : 'Read full note'}
          </button>
        )}
      </div>

      {showFullContent && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#fef9c3] w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-xl shadow-2xl p-8 relative border-2 border-[#fde047]">
            <button 
              onClick={() => setShowFullContent(false)}
              className="absolute top-4 right-4 p-2 hover:bg-black/5 rounded-full text-gray-500"
            >
              <X size={20} />
            </button>
            <div className="mb-6">
               <span className="text-[10px] uppercase tracking-widest font-bold text-yellow-800 bg-yellow-200 px-2 py-0.5 rounded">
                Full View
               </span>
               <h2 className="text-3xl font-black text-gray-900 mt-2">{note.title}</h2>
               <div className="flex items-center gap-4 mt-2 text-gray-500 text-sm">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {formatDate(note.createdAt)}</span>
                  {group && <span className="flex items-center gap-1"><Folder size={14} /> {group.name}</span>}
               </div>
            </div>
            <div className="prose prose-yellow max-w-none">
              <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap pl-6 border-l-2 border-red-200">
                {note.content}
              </p>
            </div>
            {note.tags && note.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2 pt-6 border-t border-yellow-200">
                {note.tags.map((tag, index) => (
                  <span key={index} className="text-xs font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-[10px] text-gray-400 font-bold uppercase tracking-widest">
        <span className="flex items-center gap-1">
          <Calendar size={10} /> {formatDate(note.createdAt)}
        </span>
        
        {note.tags && note.tags.length > 0 && (
          <div className="flex gap-1 overflow-hidden max-w-[100px]">
            {note.tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="truncate">#{tag}</span>
            ))}
            {note.tags.length > 2 && <span>+{note.tags.length - 2}</span>}
          </div>
        )}
      </div>
    </Card>
  );
};

export default NoteCard;
