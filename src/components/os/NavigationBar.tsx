import React from 'react';
import { useOSStore } from '@/store/os-store';
import { cn } from '@/lib/utils';
export const NavigationBar: React.FC = () => {
  const setActiveApp = useOSStore((s) => s.setActiveApp);
  const setRecentsOpen = useOSStore((s) => s.setRecentsOpen);
  const activeAppId = useOSStore((s) => s.activeAppId);
  const isRecentsOpen = useOSStore((s) => s.isRecentsOpen);
  return (
    <div className="h-12 bg-transparent flex items-center justify-around z-50 px-10">
      {/* Back Button - Caret left */}
      <button
        onClick={() => {
          if (isRecentsOpen) setRecentsOpen(false);
          else if (activeAppId) setActiveApp(null);
        }}
        className="w-10 h-10 flex items-center justify-center rounded-full active:bg-foreground/10 transition-colors"
      >
        <div className="w-3 h-3 border-l-2 border-b-2 border-foreground rotate-45 ml-1" />
      </button>
      {/* Home Button - Circle */}
      <button
        onClick={() => {
          setActiveApp(null);
          setRecentsOpen(false);
        }}
        className="w-10 h-10 flex items-center justify-center rounded-full active:bg-foreground/10 transition-colors"
      >
        <div className={cn(
          "w-3.5 h-3.5 rounded-full border-2 border-foreground transition-all",
          !activeAppId && !isRecentsOpen && "bg-foreground"
        )} />
      </button>
      {/* Recents Button - Square */}
      <button
        onClick={() => setRecentsOpen(!isRecentsOpen)}
        className="w-10 h-10 flex items-center justify-center rounded-full active:bg-foreground/10 transition-colors"
      >
        <div className={cn(
          "w-3.5 h-3.5 rounded-sm border-2 border-foreground transition-all",
          isRecentsOpen && "bg-foreground"
        )} />
      </button>
    </div>
  );
};