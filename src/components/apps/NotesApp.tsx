import React, { useState } from 'react';
import { useOSStore } from '@/store/os-store';
import { Plus, Trash2, FileText } from 'lucide-react';
import { format } from 'date-fns';
export const NotesApp: React.FC = () => {
  const notes = useOSStore((s) => s.notes);
  const addNote = useOSStore((s) => s.addNote);
  const updateNote = useOSStore((s) => s.updateNote);
  const deleteNote = useOSStore((s) => s.deleteNote);
  const [selectedId, setSelectedId] = useState<string | null>(notes[0]?.id || null);
  const activeNote = notes.find(n => n.id === selectedId);
  const handleCreate = () => {
    const newNote = { title: 'NEW_NOTE.TXT', content: '' };
    addNote(newNote);
  };
  return (
    <div className="h-full flex flex-col md:flex-row bg-[#0d0d0d] text-sm">
      {/* Sidebar */}
      <div className="w-full md:w-64 border-r border-[#00ff41]/20 flex flex-col bg-black/40">
        <div className="p-4 border-b border-[#00ff41]/20 flex items-center justify-between">
          <span className="font-bold text-[10px] tracking-widest opacity-50 uppercase">Directory</span>
          <button 
            onClick={handleCreate}
            className="p-1 hover:bg-[#00ff41]/10 text-[#00ff41] border border-[#00ff41]/30"
          >
            <Plus size={16} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {notes.map((note) => (
            <button
              key={note.id}
              onClick={() => setSelectedId(note.id)}
              className={`w-full p-4 flex flex-col gap-1 text-left border-b border-[#00ff41]/10 transition-all ${
                selectedId === note.id ? 'bg-[#00ff41]/10 border-l-4 border-l-[#ff00ff]' : 'hover:bg-[#00ff41]/5'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText size={12} className={selectedId === note.id ? 'text-[#ff00ff]' : 'text-[#00ff41]'} />
                <span className="font-bold truncate">{note.title}</span>
              </div>
              <span className="text-[9px] opacity-40">{format(note.updatedAt, 'yyyy-MM-dd HH:mm')}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Editor */}
      <div className="flex-1 flex flex-col relative bg-black/20">
        {activeNote ? (
          <>
            <div className="p-4 border-b border-[#00ff41]/10 flex justify-between items-center">
              <span className="retro-text-pink font-bold text-xs uppercase">{activeNote.title}</span>
              <button 
                onClick={() => {
                  deleteNote(activeNote.id);
                  setSelectedId(null);
                }}
                className="text-red-500 hover:text-red-400 p-1"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <textarea
              value={activeNote.content}
              onChange={(e) => updateNote(activeNote.id, e.target.value)}
              className="flex-1 p-6 bg-transparent outline-none resize-none font-mono text-[#00ff41] placeholder:opacity-20 caret-[#ff00ff]"
              placeholder="Start typing..."
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center opacity-20">
            <div className="text-center">
              <FileText size={48} className="mx-auto mb-4" />
              <p className="text-xs font-bold uppercase tracking-widest">No File Selected</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};