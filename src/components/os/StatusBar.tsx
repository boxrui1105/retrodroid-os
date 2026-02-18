import React from 'react';
import { format } from 'date-fns';
import { Battery, Wifi, SignalHigh } from 'lucide-react';
import { useOSStore } from '@/store/os-store';
export const StatusBar: React.FC = () => {
  const systemTime = useOSStore((s) => s.systemTime);
  const t = useOSStore((s) => s.t);
  return (
    <div className="h-7 px-5 flex items-center justify-between text-[11px] font-medium bg-transparent z-50">
      <div className="flex items-center gap-3">
        <span className="text-foreground/80">{format(systemTime, 'HH:mm')}</span>
        <span className="text-foreground/40 font-bold ml-1 tracking-tight">{t('status.carrier')}</span>
      </div>
      <div className="flex items-center gap-2 text-foreground/80">
        <SignalHigh size={14} strokeWidth={2.5} />
        <Wifi size={14} strokeWidth={2.5} />
        <div className="flex items-center gap-1">
          <span className="text-[10px]">88%</span>
          <Battery size={14} className="rotate-0" strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
};