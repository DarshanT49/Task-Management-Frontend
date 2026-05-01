import NoteCard from './NoteCard';

const NoteList = ({ notes, onDelete, onEdit }) => {
  const getCategoryCount = (category) => {
    return notes.filter(n => n.category === category).length;
  };

  const categories = [...new Set(notes.map(n => n.category || 'General'))];
  const totalNotes = notes.length;

  if (totalNotes === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
        <p className="text-gray-500">No notes found. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 justify-between items-center">
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            Total: {totalNotes}
          </span>
          {categories.map(cat => (
            <span key={cat} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
              {cat}: {getCategoryCount(cat)}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default NoteList;
