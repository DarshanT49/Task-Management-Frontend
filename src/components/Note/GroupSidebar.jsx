import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Folder, Search, FileText, ChevronDown, Trash2, Hash } from "lucide-react";
import { cn, formatDate } from "../../lib/utils";

export default function GroupSidebar({
  notes, groups, selectedGroupId, onSelectGroup, onAddGroup, onDeleteGroup,
  selectedNoteId, onSelectNote, onNewNote
}) {
  const [isAddingGroup, setIsAddingGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [noteSearchQuery, setNoteSearchQuery] = useState("");
  const [showGroupDropdown, setShowGroupDropdown] = useState(false);

  const handleAddGroup = (e) => {
    e.preventDefault();
    if (newGroupName.trim()) {
      onAddGroup(newGroupName.trim());
      setNewGroupName("");
      setIsAddingGroup(false);
    }
  };

  const filteredNotes = notes.filter((note) => {
    const matchesGroup =
      !selectedGroupId ||
      (selectedGroupId === "uncategorized" ? !note.groupId : note.groupId === selectedGroupId);
    const matchesSearch = note.title.toLowerCase().includes(noteSearchQuery.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  const activeGroup = groups.find((g) => g.id === selectedGroupId);

  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Search & Actions */}
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-text-primary tracking-tight">Notes</h2>
          <button
            onClick={onNewNote}
            className="w-8 h-8 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-all flex items-center justify-center"
            title="Create New Note"
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" size={14} />
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
            value={noteSearchQuery}
            onChange={(e) => setNoteSearchQuery(e.target.value)}
          />
        </div>

        {/* Group Selector */}
        <div className="relative">
          <button
            onClick={() => setShowGroupDropdown(!showGroupDropdown)}
            className="w-full px-3.5 py-2 bg-white border border-border rounded-lg text-sm flex items-center justify-between hover:border-gray-300 transition-all"
          >
            <div className="flex items-center gap-2 text-text-primary font-semibold text-xs uppercase tracking-wider">
              <Folder size={14} className="text-primary-500" />
              <span className="truncate">
                {activeGroup ? activeGroup.name : selectedGroupId === "uncategorized" ? "Uncategorized" : "All Notes"}
              </span>
            </div>
            <ChevronDown size={14} className={cn("text-text-tertiary transition-transform duration-300", showGroupDropdown && "rotate-180")} />
          </button>

          <AnimatePresence>
            {showGroupDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-xl shadow-elevated z-50 py-2"
              >
                {[
                  { id: null, label: "All Notes", icon: Hash },
                  { id: "uncategorized", label: "Uncategorized", icon: Folder },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id || "all"}
                    onClick={() => {
                      onSelectGroup(id);
                      setShowGroupDropdown(false);
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors",
                      selectedGroupId === id ? "bg-primary-50 text-primary-700 font-bold" : "text-text-secondary hover:bg-surface-hover"
                    )}
                  >
                    <Icon size={14} />
                    {label}
                  </button>
                ))}
                <div className="px-4 py-1.5 text-[10px] font-bold text-text-tertiary uppercase tracking-widest mt-1">Groups</div>
                {groups.map((group) => (
                  <div key={group.id} className="flex items-center group/item px-1">
                    <button
                      onClick={() => {
                        onSelectGroup(group.id);
                        setShowGroupDropdown(false);
                      }}
                      className={cn(
                        "flex-1 text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center gap-2",
                        selectedGroupId === group.id ? "bg-primary-50 text-primary-700 font-bold" : "text-text-secondary hover:bg-surface-hover"
                      )}
                    >
                      <Folder size={14} className={selectedGroupId === group.id ? "text-primary-500" : "text-text-tertiary"} />
                      {group.name}
                    </button>
                    <button
                      onClick={() => onDeleteGroup(group.id)}
                      className="p-1.5 opacity-0 group-hover/item:opacity-100 text-text-tertiary hover:text-danger hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
                <div className="border-t border-border/60 mt-2 pt-2 px-2">
                  {!isAddingGroup ? (
                    <button
                      onClick={() => setIsAddingGroup(true)}
                      className="w-full text-left px-3 py-2 text-sm text-primary-600 font-bold hover:bg-primary-50 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <Plus size={14} /> New Group
                    </button>
                  ) : (
                    <form onSubmit={handleAddGroup} className="flex gap-2">
                      <input
                        autoFocus
                        className="flex-1 px-3 py-1.5 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                        placeholder="Group name..."
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                      />
                    </form>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {filteredNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-text-tertiary p-6 text-center">
            <div className="w-10 h-10 bg-surface-subtle rounded-xl flex items-center justify-center mb-2">
              <FileText size={20} />
            </div>
            <p className="text-sm font-medium">No notes found</p>
          </div>
        ) : (
          <div className="px-2 pb-4 space-y-0.5">
            {filteredNotes.map((note) => (
              <button
                key={note.id}
                onClick={() => onSelectNote(note)}
                className={cn(
                  "w-full text-left p-3 rounded-xl transition-all group relative",
                  selectedNoteId === note.id
                    ? "bg-white shadow-soft border border-border/80"
                    : "hover:bg-surface-hover"
                )}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className={cn(
                      "text-sm font-bold truncate flex-1",
                      selectedNoteId === note.id ? "text-text-primary" : "text-text-secondary"
                    )}>
                      {note.title || "Untitled Note"}
                    </h4>
                    <span className="text-[10px] font-bold text-text-tertiary whitespace-nowrap uppercase">
                      {formatDate(note.createdAt)}
                    </span>
                  </div>
                  <p className={cn(
                    "text-xs line-clamp-2 leading-relaxed",
                    selectedNoteId === note.id ? "text-text-secondary" : "text-text-tertiary"
                  )}>
                    {stripHtml(note.content) || "No content yet..."}
                  </p>
                  {note.tags && note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {note.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="text-[9px] font-bold text-primary-600 bg-primary-50 px-1.5 py-0.5 rounded uppercase tracking-wider">
                          #{tag}
                        </span>
                      ))}
                      {note.tags.length > 2 && (
                        <span className="text-[9px] font-bold text-text-tertiary">+{note.tags.length - 2}</span>
                      )}
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
}
