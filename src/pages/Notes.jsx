import { useState } from 'react';
import NoteList from '../components/Note/NoteList';
import NoteForm from '../components/Note/NoteForm';
import Container from '../components/layout/Container';
import Button from '../components/common/Button';
import { Plus, FileText } from 'lucide-react';

const Notes = ({ notes, addNote, deleteNote, convertTaskToNote }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [showArchiveInfo, setShowArchiveInfo] = useState(false);

  const handleEdit = (note) => {
    setEditingNote(note);
    setShowForm(true);
  };

  const handleDelete = (noteId) => {
    if (confirm('Are you sure you want to delete this note?')) {
      deleteNote(noteId);
    }
  };

  const handleFormSubmit = (noteData) => {
    if (editingNote) {
      // Update existing note
      deleteNote(editingNote.id);
      addNote({ ...noteData, id: editingNote.id });
      setEditingNote(null);
    } else {
      // Create new note
      addNote(noteData);
    }
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingNote(null);
  };

  return (
    <Container>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            <FileText className="text-blue-500" /> My Notes
          </h1>
          <p className="text-gray-500 mt-1">Store your learnings, ideas, and reference material.</p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
            <Plus size={20} /> Add Note
          </Button>
        )}
      </div>

      {showForm && (
        <NoteForm
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          initialData={editingNote}
        />
      )}

      <div className="mt-8">
        <NoteList notes={notes} onDelete={handleDelete} onEdit={handleEdit} />
      </div>

      {notes.length > 0 && (
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div
            className="flex items-center gap-2 cursor-pointer mb-4"
            onClick={() => setShowArchiveInfo(!showArchiveInfo)}
          >
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FileText className="text-gray-400" /> Completed Tasks Archive
            </h2>
            <span className="text-sm text-gray-500">
              {showArchiveInfo ? 'Hide' : 'Show'} Info
            </span>
          </div>

          {showArchiveInfo && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-3">
                Go to any task and mark it as completed to convert it to a note automatically.
              </p>
              <p className="text-xs text-gray-500">
                When you convert a task to a note, it will be removed from your active tasks and added to this archive.
              </p>
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default Notes;
