import NoteCard from './NoteCard';

const NoteList = ({ notes, onDelete, onEdit, groups, onUpdateGroup }) => {
  const totalNotes = notes.length;

  if (totalNotes === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300 shadow-inner">
        <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">📝</span>
        </div>
        <p className="text-gray-500 font-medium">No notes found matching your selection.</p>
        <p className="text-gray-400 text-sm mt-1">Try a different group or search query.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          {totalNotes} {totalNotes === 1 ? 'Note' : 'Notes'} found
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onDelete={onDelete}
            onEdit={onEdit}
            groups={groups}
            onUpdateGroup={onUpdateGroup}
          />
        ))}
      </div>
    </div>
  );
};

export default NoteList;
