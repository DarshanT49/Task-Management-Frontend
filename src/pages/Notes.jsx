import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "../hooks/useMediaQuery";
import NoteForm from "../components/Note/NoteForm";
import GroupSidebar from "../components/Note/GroupSidebar";
import Button from "../components/ui/Button";
import { Menu, X } from "lucide-react";

export default function Notes({
  notes, groups, addNote, updateNote, deleteNote,
  addGroup, deleteGroup, updateNoteGroup
}) {
  const [editingNote, setEditingNote] = useState(null);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");

  const handleFormSubmit = async (noteData) => {
    if (editingNote) {
      updateNote(noteData);
    } else {
      const created = await addNote({ ...noteData, groupId: noteData.groupId || selectedGroupId });
      if (created) {
        setEditingNote(created);
      }
    }
  };

  const handleNewNote = () => {
    setEditingNote(null);
    setSidebarOpen(false);
  };

  const handleDelete = (noteId) => {
    deleteNote(noteId);
    if (editingNote?.id === noteId) setEditingNote(null);
  };

  const handleSelectNote = (note) => {
    setEditingNote(note);
    setSidebarOpen(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] md:h-[calc(100vh-64px)] bg-white overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile sidebar toggle */}
        {isMobile && (
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="fixed bottom-20 right-4 z-40 w-12 h-12 rounded-full bg-primary-600 text-white shadow-modal flex items-center justify-center"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        )}

        {/* Sidebar */}
        <AnimatePresence mode="wait">
          {(sidebarOpen || !isMobile) && (
            <motion.div
              initial={isMobile ? { x: -320 } : false}
              animate={isMobile ? { x: 0 } : false}
              exit={isMobile ? { x: -320 } : false}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`${isMobile ? "fixed inset-y-0 left-0 z-30 w-72" : "relative w-64 flex-shrink-0"} border-r border-border/60 bg-surface-hover`}
            >
              <GroupSidebar
                notes={notes}
                groups={groups}
                selectedGroupId={selectedGroupId}
                onSelectGroup={setSelectedGroupId}
                onAddGroup={addGroup}
                onDeleteGroup={deleteGroup}
                selectedNoteId={editingNote?.id}
                onSelectNote={handleSelectNote}
                onNewNote={handleNewNote}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Overlay for mobile sidebar */}
        {isMobile && sidebarOpen && (
          <div className="fixed inset-0 z-20 bg-black/30" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main Editor Surface */}
        <main className="flex-1 flex flex-col min-w-0 bg-white relative">
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            <div className="max-w-4xl mx-auto h-full">
              <NoteForm
                key="note-editor"
                onSubmit={handleFormSubmit}
                onDelete={handleDelete}
                initialData={editingNote}
                groups={groups}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
