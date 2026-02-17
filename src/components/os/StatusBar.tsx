import React from 'react';
import { format } from 'date-fns';
import { Battery, Wifi, SignalHigh } from 'lucide-react';
import { useOSStore } from '@/store/os-store';
export const StatusBar: React.FC = () => {
  const systemTime = useOSStore((s) => s.systemTime);
  return (
    <div className="h-8 px-4 flex items-center justify-between text-[10px] bg-black/40 border-b border-[#00ff41]/20 backdrop-blur-sm z-50">
      <div className="flex items-center gap-3">
        <span className="retro-text-green font-bold tracking-widest">NEON_DROID_V1.0</span>
        <div className="flex items-center gap-1 opacity-70">
          <SignalHigh size={12} />
          <Wifi size={12} />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="tabular-nums font-bold">
          {format(systemTime, 'HH:mm:ss')}
        </span>
        <div className="flex items-center gap-1">
          <span className="opacity-70">88%</span>
          <Battery size={12} className="rotate-90" />
        </div>
      </div>
    </div>
  );
};