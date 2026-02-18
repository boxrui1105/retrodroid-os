import React, { useMemo } from 'react';
import { format } from 'date-fns';
import { Battery, BatteryMedium, BatteryFull, Wifi, SignalHigh } from 'lucide-react';
import { useOSStore } from '@/store/os-store';
export const StatusBar: React.FC = () => {
  const systemTime = useOSStore((s) => s.systemTime);
  const t = useOSStore((s) => s.t);
  const accentColor = useOSStore((s) => s.settings.accentColor);
  // Simulate a realistic battery level based on the minute of the hour
  const batteryLevel = useMemo(() => {
    const mins = systemTime.getMinutes();
    return Math.max(15, 100 - Math.floor(mins / 2));
  }, [systemTime]);
  const BatteryIcon = batteryLevel > 80 ? BatteryFull : batteryLevel > 30 ? BatteryMedium : Battery;
  return (
    <div className="h-7 px-5 flex items-center justify-between text-[11px] font-bold bg-transparent z-50 transition-colors duration-300">
      <div className="flex items-center gap-3">
        <span className="text-foreground/90 tabular-nums">{format(systemTime, 'HH:mm')}</span>
        <span className="text-foreground/30 font-black ml-0.5 tracking-tighter uppercase text-[9px]">{t('status.carrier')}</span>
      </div>
      <div className="flex items-center gap-2 text-foreground/80">
        <SignalHigh size={14} strokeWidth={3} style={{ color: accentColor }} />
        <Wifi size={14} strokeWidth={3} />
        <div className="flex items-center gap-1.5 ml-1">
          <span className="text-[10px] tabular-nums font-bold">{batteryLevel}%</span>
          <BatteryIcon size={14} className="rotate-0" strokeWidth={2.5} style={{ color: batteryLevel < 20 ? '#ef4444' : 'inherit' }} />
        </div>
      </div>
    </div>
  );
};