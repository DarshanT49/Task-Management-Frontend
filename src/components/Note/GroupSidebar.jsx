import { Plus, Folder, Search, FileText, ChevronDown, Trash2, Clock, Hash } from 'lucide-react';
import { useState } from 'react';

const GroupSidebar = ({ 
  notes, 
  groups, 
  selectedGroupId, 
  onSelectGroup, 
  onAddGroup, 
  onDeleteGroup,
  selectedNoteId,
  onSelectNote,
  onNewNote
}) => {
  const [isAddingGroup, setIsAddingGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [noteSearchQuery, setNoteSearchQuery] = useState('');
  const [showGroupDropdown, setShowGroupDropdown] = useState(false);

  const handleAddGroup = (e) => {
    e.preventDefault();
    if (newGroupName.trim()) {
      onAddGroup(newGroupName.trim());
      setNewGroupName('');
      setIsAddingGroup(false);
    }
  };

  const filteredNotes = notes.filter(note => {
    const matchesGroup = !selectedGroupId || 
                        (selectedGroupId === 'uncategorized' ? !note.groupId : note.groupId === selectedGroupId);
    const matchesSearch = note.title.toLowerCase().includes(noteSearchQuery.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  const activeGroup = groups.find(g => g.id === selectedGroupId);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const stripHtml = (html) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <div className="w-80 flex-shrink-0 flex flex-col bg-[#f9fafb] border-r border-gray-200 h-full overflow-hidden">
      {/* Search & Actions */}
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Notes</h2>
          <button 
            onClick={onNewNote}
            className="p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm active:scale-95"
            title="Create New Note"
          >
            <Plus size={18} />
          </button>
        </div>

        {/* Note Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text"
            placeholder="Search all notes..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-sm"
            value={noteSearchQuery}
            onChange={(e) => setNoteSearchQuery(e.target.value)}
          />
        </div>

        {/* Group Selector Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowGroupDropdown(!showGroupDropdown)}
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm flex items-center justify-between hover:border-gray-300 transition-all shadow-sm"
          >
            <div className="flex items-center gap-2.5 text-gray-700 font-semibold">
              <Folder size={18} className="text-blue-500" />
              <span className="truncate">
                {activeGroup ? activeGroup.name : selectedGroupId === 'uncategorized' ? 'Uncategorized' : 'All My Notes'}
              </span>
            </div>
            <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${showGroupDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showGroupDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 py-2 overflow-hidden border-t-4 border-t-blue-500">
              <button 
                onClick={() => { onSelectGroup(null); setShowGroupDropdown(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 transition-colors ${!selectedGroupId ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Hash size={14} /> All My Notes
              </button>
              <button 
                onClick={() => { onSelectGroup('uncategorized'); setShowGroupDropdown(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 transition-colors ${selectedGroupId === 'uncategorized' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Folder size={14} /> Uncategorized
              </button>
              <div className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Groups</div>
              {groups.map(group => (
                <div key={group.id} className="flex items-center group/item px-1">
                  <button 
                    onClick={() => { onSelectGroup(group.id); setShowGroupDropdown(false); }}
                    className={`flex-1 text-left px-3 py-2 text-sm rounded-xl transition-colors flex items-center gap-2 ${selectedGroupId === group.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Folder size={14} className={selectedGroupId === group.id ? 'text-blue-500' : 'text-gray-400'} />
                    {group.name}
                  </button>
                  <button 
                    onClick={() => onDeleteGroup(group.id)}
                    className="p-2 opacity-0 group-hover/item:opacity-100 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
              <div className="border-t border-gray-100 mt-2 p-2">
                {!isAddingGroup ? (
                  <button 
                    onClick={() => setIsAddingGroup(true)}
                    className="w-full text-left px-3 py-2 text-sm text-blue-600 font-bold hover:bg-blue-50 rounded-xl flex items-center gap-2"
                  >
                    <Plus size={16} /> New Group
                  </button>
                ) : (
                  <form onSubmit={handleAddGroup} className="flex gap-2">
                    <input
                      autoFocus
                      className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                      placeholder="Group name..."
                      value={newGroupName}
                      onChange={(e) => setNewGroupName(e.target.value)}
                    />
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {filteredNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400 p-8 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mb-3">
              <FileText size={24} />
            </div>
            <p className="text-sm font-medium">No notes found</p>
          </div>
        ) : (
          <div className="px-3 pb-4 space-y-1">
            {filteredNotes.map(note => (
              <button
                key={note.id}
                onClick={() => onSelectNote(note)}
                className={`w-full text-left p-4 rounded-2xl transition-all group relative overflow-hidden ${
                  selectedNoteId === note.id 
                    ? 'bg-white shadow-md border-l-4 border-l-blue-500' 
                    : 'hover:bg-gray-100/50'
                }`}
              >
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className={`text-sm font-bold truncate flex-1 ${
                      selectedNoteId === note.id ? 'text-gray-900' : 'text-gray-700'
                    }`}>
                      {note.title || 'Untitled Note'}
                    </h4>
                    <span className="text-[10px] font-bold text-gray-400 whitespace-nowrap bg-gray-100/50 px-1.5 py-0.5 rounded uppercase">
                      {formatDate(note.createdAt)}
                    </span>
                  </div>
                  <p className={`text-xs line-clamp-2 leading-relaxed ${
                    selectedNoteId === note.id ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {stripHtml(note.content) || 'No content yet...'}
                  </p>
                  
                  {note.tags && note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {note.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="text-[9px] font-bold text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded uppercase tracking-wider">
                          #{tag}
                        </span>
                      ))}
                      {note.tags.length > 2 && <span className="text-[9px] font-bold text-gray-400">+{note.tags.length - 2}</span>}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupSidebar;
