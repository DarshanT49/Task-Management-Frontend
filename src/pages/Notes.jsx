import { useState } from 'react';
import NoteForm from '../components/Note/NoteForm';
import GroupSidebar from '../components/Note/GroupSidebar';

const Notes = ({ 
  notes, groups, addNote, updateNote, deleteNote, 
  addGroup, deleteGroup, updateNoteGroup
}) => {
  const [editingNote, setEditingNote] = useState(null);
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  const handleFormSubmit = (noteData) => {
    if (editingNote) {
      updateNote(noteData);
    } else {
      const newNote = {
        ...noteData,
        groupId: noteData.groupId || selectedGroupId
      };
      addNote(newNote);
      // Optional: select the new note automatically? 
      // Need the ID from addNote, but addNote is likely async or set via state.
    }
  };

  const handleNewNote = () => {
    setEditingNote(null);
  };

  const handleDelete = (noteId) => {
    if (confirm('Are you sure you want to delete this note?')) {
      deleteNote(noteId);
      if (editingNote?.id === noteId) {
        setEditingNote(null);
      }
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-white overflow-hidden">
      {/* Modern Workspace Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Component (Modified for modern full-height look) */}
        <GroupSidebar 
          notes={notes}
          groups={groups}
          selectedGroupId={selectedGroupId}
          onSelectGroup={setSelectedGroupId}
          onAddGroup={addGroup}
          onDeleteGroup={deleteGroup}
          selectedNoteId={editingNote?.id}
          onSelectNote={setEditingNote}
          onNewNote={handleNewNote}
        />

        {/* Main Editor Surface */}
        <main className="flex-1 flex flex-col min-w-0 bg-white relative">
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <div className="max-w-4xl mx-auto h-full">
              <NoteForm
                key={editingNote?.id || 'new'}
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
};

export default Notes;
