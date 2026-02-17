import React, { useState } from 'react';
import { useOSStore } from '@/store/os-store';
import { Plus, Trash2, FileText, ChevronLeft } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
export const NotesApp: React.FC = () => {
  const notes = useOSStore((s) => s.notes);
  const addNote = useOSStore((s) => s.addNote);
  const updateNote = useOSStore((s) => s.updateNote);
  const deleteNote = useOSStore((s) => s.deleteNote);
  const language = useOSStore((s) => s.settings.language);
  const t = useOSStore((s) => s.t);
  const [selectedId, setSelectedId] = useState<string | null>(notes[0]?.id || null);
  const activeNote = notes.find(n => n.id === selectedId);
  const handleCreate = () => {
    const newTitle = t('notes.new') + ' ' + (notes.length + 1);
    addNote({ title: newTitle, content: '' });
  };
  return (
    <div className="h-full flex flex-col md:flex-row bg-zinc-50 dark:bg-zinc-950">
      {/* Sidebar List */}
      <div className={cn(
        "w-full md:w-80 border-r dark:border-zinc-800 flex flex-col bg-white dark:bg-zinc-900 transition-all",
        selectedId && "hidden md:flex"
      )}>
        <div className="p-6 border-b dark:border-zinc-800 flex items-center justify-between">
          <h2 className="font-bold text-xl">{t('notes.sidebar')}</h2>
          <Button
            size="icon"
            onClick={handleCreate}
            className="rounded-full bg-primary text-primary-foreground shadow-lg"
          >
            <Plus size={20} />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {notes.length === 0 ? (
            <div className="p-10 text-center text-muted-foreground text-sm italic">
              {t('notes.empty')}
            </div>
          ) : (
            notes.map((note) => (
              <button
                key={note.id}
                onClick={() => setSelectedId(note.id)}
                className={cn(
                  "w-full p-4 flex flex-col gap-1 text-left rounded-2xl transition-all",
                  selectedId === note.id
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
                )}
              >
                <span className="font-semibold truncate">{note.title || 'Untitled'}</span>
                <span className="text-[11px] opacity-60 font-medium">
                  {format(note.updatedAt, 'MMM d, HH:mm')}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
      {/* Editor Area */}
      <div className={cn(
        "flex-1 flex flex-col bg-zinc-50 dark:bg-zinc-950",
        !selectedId && "hidden md:flex"
      )}>
        {activeNote ? (
          <>
            <div className="p-4 border-b dark:border-zinc-800 flex justify-between items-center bg-white dark:bg-zinc-900 md:bg-transparent">
              <div className="flex items-center gap-2 flex-1">
                <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSelectedId(null)}>
                  <ChevronLeft size={20} />
                </Button>
                <input
                  value={activeNote.title}
                  onChange={(e) => updateNote(activeNote.id, { title: e.target.value })}
                  className="bg-transparent border-none outline-none font-bold text-lg w-full focus:ring-0"
                  placeholder="Note title..."
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  deleteNote(activeNote.id);
                  setSelectedId(null);
                }}
                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Trash2 size={18} />
              </Button>
            </div>
            <textarea
              value={activeNote.content}
              onChange={(e) => updateNote(activeNote.id, { content: e.target.value })}
              className="flex-1 p-8 bg-transparent outline-none resize-none text-base leading-relaxed text-foreground placeholder:opacity-30"
              placeholder={t('notes.placeholder')}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto">
                <FileText size={32} />
              </div>
              <p className="text-sm font-medium">{t('notes.empty')}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};