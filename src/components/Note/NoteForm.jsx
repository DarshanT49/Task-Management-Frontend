import { useState, useEffect, useRef } from 'react';
import Button from '../common/Button';
import { Folder, Trash2, Calendar, MoreVertical, Check, Clock, Bold, Type, Palette } from 'lucide-react';

const NoteForm = ({ onSubmit, onDelete, initialData, groups }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [groupId, setGroupId] = useState(initialData?.groupId || '');
  const [isSaved, setIsSaved] = useState(true);
  
  const editorRef = useRef(null);

  // Initialize editor content
  useEffect(() => {
    setTitle(initialData?.title || '');
    setGroupId(initialData?.groupId || '');
    if (editorRef.current) {
      editorRef.current.innerHTML = initialData?.content || '';
    }
    setIsSaved(true);
  }, [initialData]);

  // Autosave logic
  useEffect(() => {
    if (isSaved) return;

    const timeoutId = setTimeout(() => {
      const content = editorRef.current?.innerHTML || '';
      if (!title.trim() && !content.trim()) return;

      onSubmit({
        id: initialData?.id,
        title: title || 'Untitled Note',
        content,
        groupId: groupId || null,
        tags: initialData?.tags || [],
        createdAt: initialData?.createdAt || new Date().toISOString()
      });
      setIsSaved(true);
    }, 1000); // 1 second debounce

    return () => clearTimeout(timeoutId);
  }, [title, groupId, isSaved, initialData, onSubmit]);

  const handleTitleChange = (value) => {
    setTitle(value);
    setIsSaved(false);
  };

  const handleEditorChange = () => {
    setIsSaved(false);
  };

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
    setIsSaved(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Just now';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric'
    });
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Integrated Premium Header & Toolbar (Sticky) */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-2.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          {/* Metadata & Group */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded-md">
              <Calendar size={12} className="text-blue-500" />
              {formatDate(initialData?.createdAt)}
            </div>
            <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
              <Folder size={12} className="text-blue-500" />
              <select
                value={groupId}
                onChange={(e) => { setGroupId(e.target.value); setIsSaved(false); }}
                className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-transparent border-none focus:outline-none cursor-pointer hover:text-gray-900 transition-colors"
              >
                <option value="">No Group</option>
                {groups.map(group => (
                  <option key={group.id} value={group.id}>{group.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="h-6 w-[1px] bg-gray-200"></div>

          {/* Formatting Tools */}
          <div className="flex items-center gap-1.5">
            <button 
              onMouseDown={(e) => { e.preventDefault(); execCommand('bold'); }}
              className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-all"
              title="Bold"
            >
              <Bold size={16} />
            </button>
            
            <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
              <Type size={14} className="text-gray-400" />
              <select 
                onChange={(e) => { e.preventDefault(); execCommand('fontSize', e.target.value); }}
                className="text-[10px] bg-transparent border-none focus:outline-none font-bold text-gray-500 uppercase tracking-widest cursor-pointer"
                defaultValue="3"
              >
                <option value="1">Small</option>
                <option value="3">Normal</option>
                <option value="5">Large</option>
                <option value="7">Huge</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
              <Palette size={14} className="text-gray-400" />
              <div className="flex gap-1">
                {[
                  { name: 'Black', value: '#374151' },
                  { name: 'Blue', value: '#2563eb' },
                  { name: 'Red', value: '#dc2626' }
                ].map(color => (
                  <button
                    key={color.value}
                    onMouseDown={(e) => { e.preventDefault(); execCommand('foreColor', color.value); }}
                    className="w-3.5 h-3.5 rounded-full border border-white shadow-sm transition-transform hover:scale-125"
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isSaved ? (
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-full uppercase tracking-wider">
              <Check size={10} /> Saved
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full uppercase tracking-wider">
              <Clock size={10} className="animate-pulse" /> Saving...
            </div>
          )}
          
          <div className="h-6 w-[1px] bg-gray-200 mx-1"></div>
          
          <div className="relative group/more">
            <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all">
              <MoreVertical size={18} />
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 opacity-0 invisible group-hover/more:opacity-100 group-hover/more:visible transition-all z-20">
              <button 
                onClick={() => initialData && onDelete(initialData.id)}
                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 flex items-center gap-2 font-medium"
              >
                <Trash2 size={16} /> Delete Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Editor Surface */}
      <div className="flex-1 overflow-y-auto px-8 md:px-12 py-8 max-w-5xl mx-auto w-full">
        {/* Title Input */}
        <input
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              editorRef.current?.focus();
            }
          }}
          placeholder="Note Title"
          className="w-full bg-transparent border-none text-2xl md:text-3xl font-bold text-gray-900 placeholder-gray-200 focus:outline-none mb-6"
        />

        {/* contentEditable Editor Area */}
        <div
          ref={editorRef}
          contentEditable="true"
          onInput={handleEditorChange}
          className="w-full bg-transparent border-none focus:outline-none leading-relaxed min-h-[500px] text-lg text-gray-700 outline-none whitespace-pre-wrap"
          style={{ minHeight: '500px' }}
        />
      </div>

      {/* Bottom Status Bar */}
      <div className="px-8 py-2 bg-white border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <Clock size={12} />
          {isSaved ? 'All changes saved' : 'Unsaved changes'}
        </div>
      </div>
    </div>
  );
};

export default NoteForm;
