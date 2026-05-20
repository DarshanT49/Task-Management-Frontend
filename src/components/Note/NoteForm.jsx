import { useState, useEffect, useRef } from "react";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { Folder, Trash2, Calendar, Check, Clock, Bold, Type, Palette } from "lucide-react";
import { formatDateFull } from "../../lib/utils";

export default function NoteForm({ onSubmit, onDelete, initialData, groups }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [groupId, setGroupId] = useState(initialData?.groupId || "");
  const [isSaved, setIsSaved] = useState(true);
  const editorRef = useRef(null);

  const prevIdRef = useRef(initialData?.id);

  useEffect(() => {
    if (initialData?.id !== prevIdRef.current) {
      if (title !== (initialData?.title || "")) {
        setTitle(initialData?.title || "");
      }
      if (groupId !== (initialData?.groupId || "")) {
        setGroupId(initialData?.groupId || "");
      }
      if (editorRef.current && editorRef.current.innerHTML !== (initialData?.content || "")) {
        editorRef.current.innerHTML = initialData?.content || "";
      }
      setIsSaved(true);
      prevIdRef.current = initialData?.id;
    }
  }, [initialData]);

  const handleSave = () => {
    const content = editorRef.current?.innerHTML || "";
    if (!title.trim() && !content.trim()) return;
    
    onSubmit({
      id: initialData?.id,
      title: title || "Untitled Note",
      content,
      groupId: groupId || null,
      tags: initialData?.tags || [],
      createdAt: initialData?.createdAt || new Date().toISOString(),
    });
    setIsSaved(true);
  };

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

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Sticky Toolbar */}
      <div className="sticky top-0 z-10 bg-white border-b border-border/60 px-4 sm:px-6 py-2 flex items-center justify-between shadow-soft">
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Badge variant="default" size="sm" className="hidden sm:flex">
              <Calendar size={10} />
              <span>{formatDateFull(initialData?.createdAt)}</span>
            </Badge>
            <div className="flex items-center gap-1 bg-surface-hover px-2 py-1 rounded-lg border border-border/60">
              <Folder size={12} className="text-primary-500" />
              <select
                value={groupId}
                onChange={(e) => {
                  setGroupId(e.target.value);
                  setIsSaved(false);
                }}
                className="text-[10px] font-bold text-text-secondary uppercase tracking-widest bg-transparent border-none focus:outline-none cursor-pointer hover:text-text-primary transition-colors"
              >
                <option value="">No Group</option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="h-5 w-px bg-border" />

          <div className="flex items-center gap-1">
            <button
              onMouseDown={(e) => {
                e.preventDefault();
                execCommand("bold");
              }}
              className="p-1.5 rounded-lg text-text-tertiary hover:bg-surface-hover hover:text-text-primary transition-all"
              title="Bold"
            >
              <Bold size={14} />
            </button>
            <div className="flex items-center gap-1 bg-surface-hover px-1.5 py-1 rounded-lg border border-border/60">
              <Type size={12} className="text-text-tertiary" />
              <select
                onChange={(e) => {
                  e.preventDefault();
                  execCommand("fontSize", e.target.value);
                }}
                className="text-[10px] bg-transparent border-none focus:outline-none font-bold text-text-secondary uppercase tracking-widest cursor-pointer"
                defaultValue="3"
              >
                <option value="1">Small</option>
                <option value="3">Normal</option>
                <option value="5">Large</option>
                <option value="7">Huge</option>
              </select>
            </div>
            <div className="flex items-center gap-1 bg-surface-hover px-1.5 py-1 rounded-lg border border-border/60">
              <Palette size={12} className="text-text-tertiary" />
              <div className="flex gap-1">
                {[
                  { name: "Black", value: "#374151" },
                  { name: "Blue", value: "#2563eb" },
                  { name: "Red", value: "#dc2626" },
                ].map((color) => (
                  <button
                    key={color.value}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      execCommand("foreColor", color.value);
                    }}
                    className="w-3 h-3 rounded-full border border-white shadow-sm transition-transform hover:scale-125"
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            disabled={isSaved}
            className={`flex items-center gap-1 text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider transition-all ${
              isSaved
                ? "text-success bg-success/10 cursor-not-allowed"
                : "text-white bg-primary-600 hover:bg-primary-700 shadow-md shadow-primary-500/20"
            }`}
          >
            {isSaved ? (
              <>
                <Check size={12} /> Saved
              </>
            ) : (
              "Save Note"
            )}
          </button>
          <div className="h-5 w-px bg-border" />
          {initialData && (
            <button
              onClick={() => onDelete(initialData.id)}
              className="p-1.5 text-text-tertiary hover:text-danger hover:bg-red-50 rounded-lg transition-all"
              title="Delete Note"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Editor Surface */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-4 sm:px-8 md:px-12 py-6 sm:py-8 max-w-4xl mx-auto w-full">
        <input
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              editorRef.current?.focus();
            }
          }}
          placeholder="Note Title"
          className="w-full bg-transparent border-none text-2xl sm:text-3xl font-bold text-text-primary placeholder:text-text-tertiary/40 focus:outline-none mb-6"
        />

        <div
          ref={editorRef}
          contentEditable="true"
          onInput={handleEditorChange}
          className="w-full bg-transparent border-none focus:outline-none leading-relaxed text-base sm:text-lg text-text-secondary outline-none whitespace-pre-wrap min-h-[40vh] sm:min-h-[500px]"
          role="textbox"
          aria-multiline="true"
          aria-label="Note content editor"
        />
      </div>

      {/* Bottom Status Bar */}
      <div className="px-4 sm:px-8 py-2 bg-white border-t border-border/60 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[10px] font-bold text-text-tertiary uppercase tracking-widest">
          <Clock size={12} />
          {isSaved ? "All changes saved" : "Unsaved changes"}
        </div>
      </div>
    </div>
  );
}
