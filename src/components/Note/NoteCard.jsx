import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Modal from "../ui/Modal";
import { Edit, Trash2, Folder, Calendar } from "lucide-react";
import { formatDateFull } from "../../lib/utils";

export default function NoteCard({ note, onDelete, onEdit, groups, onUpdateGroup }) {
  const [showFullContent, setShowFullContent] = useState(false);
  const group = groups.find((g) => g.id === note.groupId);

  return (
    <Card padding="md" hover className="border-l-[3px] border-l-primary-400 h-full flex flex-col group relative">
      <div className="flex justify-between items-start mb-3">
        <Badge variant={group ? "primary" : "default"} size="sm" className="flex items-center gap-1">
          <Folder size={10} />
          {group ? group.name : "No Group"}
        </Badge>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(note)} className="p-1 text-text-tertiary hover:text-primary-600 hover:bg-primary-50 rounded transition-colors">
            <Edit size={14} />
          </button>
          <button onClick={() => onDelete(note.id)} className="p-1 text-text-tertiary hover:text-danger hover:bg-red-50 rounded transition-colors">
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <button onClick={() => setShowFullContent(true)} className="text-left flex-1">
        <h4 className="font-bold text-text-primary text-base leading-tight mb-2 group-hover:text-primary-600 transition-colors">
          {note.title}
        </h4>
        <div 
          className="text-text-secondary text-sm whitespace-pre-wrap line-clamp-4 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: note.content || "No content" }}
        />
      </button>

      <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-[10px] text-text-tertiary font-bold uppercase tracking-widest">
        <span className="flex items-center gap-1">
          <Calendar size={10} /> {formatDateFull(note.createdAt)}
        </span>
        {note.tags && note.tags.length > 0 && (
          <div className="flex gap-1 overflow-hidden max-w-[120px]">
            {note.tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="truncate">#{tag}</span>
            ))}
            {note.tags.length > 2 && <span>+{note.tags.length - 2}</span>}
          </div>
        )}
      </div>

      <Modal open={showFullContent} onClose={() => setShowFullContent(false)} title={note.title}>
        <div className="mb-4 flex items-center gap-4 text-xs text-text-tertiary">
          <span className="flex items-center gap-1"><Calendar size={12} /> {formatDateFull(note.createdAt)}</span>
          {group && <span className="flex items-center gap-1"><Folder size={12} /> {group.name}</span>}
        </div>
        <div className="bg-yellow-50/50 rounded-xl p-5 border border-yellow-100">
          <div 
            className="text-text-secondary text-base leading-relaxed whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: note.content || "No content" }}
          />
        </div>
        {note.tags && note.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {note.tags.map((tag, index) => (
              <Badge key={index} variant="primary" size="sm">#{tag}</Badge>
            ))}
          </div>
        )}
      </Modal>
    </Card>
  );
}
