import React from 'react';
import { ChevronLeft, Circle, Square } from 'lucide-react';
import { useOSStore } from '@/store/os-store';
import { cn } from '@/lib/utils';
export const NavigationBar: React.FC = () => {
  const setActiveApp = useOSStore((s) => s.setActiveApp);
  const activeAppId = useOSStore((s) => s.activeAppId);
  return (
    <div className="h-14 bg-black/80 border-t border-[#00ff41]/30 flex items-center justify-around z-50">
      <button 
        onClick={() => activeAppId && setActiveApp(null)}
        className="p-3 hover:bg-[#00ff41]/10 active:scale-90 transition-all rounded-full group"
      >
        <ChevronLeft className="group-hover:text-[#ff00ff]" size={24} />
      </button>
      <button 
        onClick={() => setActiveApp(null)}
        className="p-3 hover:bg-[#00ff41]/10 active:scale-90 transition-all rounded-full group"
      >
        <Circle className={cn("group-hover:text-[#ff00ff]", !activeAppId && "fill-[#00ff41]")} size={20} />
      </button>
      <button 
        className="p-3 hover:bg-[#00ff41]/10 active:scale-90 transition-all rounded-full group"
      >
        <Square className="group-hover:text-[#ff00ff]" size={18} />
      </button>
    </div>
  );
};