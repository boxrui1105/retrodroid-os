import React from 'react';
import { ChevronLeft, Circle, Square } from 'lucide-react';
import { useOSStore } from '@/store/os-store';
import { cn } from '@/lib/utils';
export const NavigationBar: React.FC = () => {
  const setActiveApp = useOSStore((s) => s.setActiveApp);
  const setRecentsOpen = useOSStore((s) => s.setRecentsOpen);
  const activeAppId = useOSStore((s) => s.activeAppId);
  const isRecentsOpen = useOSStore((s) => s.isRecentsOpen);
  return (
    <div className="h-14 bg-black/80 border-t border-current/30 flex items-center justify-around z-50">
      <button
        onClick={() => {
          if (isRecentsOpen) setRecentsOpen(false);
          else if (activeAppId) setActiveApp(null);
        }}
        className="p-3 hover:bg-current/10 active:scale-90 transition-all rounded-full group"
      >
        <ChevronLeft className="group-hover:text-[#ff00ff]" size={24} />
      </button>
      <button
        onClick={() => {
          setActiveApp(null);
          setRecentsOpen(false);
        }}
        className="p-3 hover:bg-current/10 active:scale-90 transition-all rounded-full group"
      >
        <Circle className={cn("group-hover:text-[#ff00ff]", !activeAppId && !isRecentsOpen && "fill-current")} size={20} />
      </button>
      <button
        onClick={() => setRecentsOpen(!isRecentsOpen)}
        className="p-3 hover:bg-current/10 active:scale-90 transition-all rounded-full group"
      >
        <Square className={cn("group-hover:text-[#ff00ff]", isRecentsOpen && "fill-current")} size={18} />
      </button>
    </div>
  );
};