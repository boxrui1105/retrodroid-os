import React from 'react';
import { Cpu, Database, HardDrive, Shield, Smartphone, Terminal, Radio } from 'lucide-react';
import { useOSStore } from '@/store/os-store';
import { Card } from '@/components/ui/card';
export const HelloApp: React.FC = () => {
  const t = useOSStore((s) => s.t);
  const stats = [
    { label: t('device.model'), value: 'Pixel 9 Pro Simulation', icon: Smartphone, color: 'text-blue-500' },
    { label: t('device.version'), value: 'Android 15 (Material UI)', icon: Shield, color: 'text-green-500' },
    { label: t('device.processor'), value: 'Tensor G4 Neural Engine', icon: Cpu, color: 'text-purple-500' },
    { label: t('device.ram'), value: '12 GB LPDDR5X', icon: Database, color: 'text-orange-500' },
    { label: t('device.storage'), value: '256 GB NVMe Simulation', icon: HardDrive, color: 'text-cyan-500' },
    { label: t('device.sim'), value: '5G Active / Web Worker', icon: Radio, color: 'text-pink-500' },
  ];
  return (
    <div className="p-6 space-y-6 bg-zinc-50 dark:bg-zinc-950 min-h-full">
      <div className="flex flex-col items-center py-6 space-y-2">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-2">
          <Smartphone size={40} />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Android 15</h1>
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest bg-zinc-200 dark:bg-zinc-800 px-3 py-1 rounded-full">
          OS Build 2025.4.24
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {stats.map((stat, i) => (
          <Card key={i} className="flex items-center gap-4 p-4 border-none shadow-sm rounded-2xl bg-white dark:bg-zinc-900">
            <div className={`p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 ${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{stat.label}</p>
              <p className="text-sm font-semibold">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-8 p-4 rounded-2xl bg-zinc-200 dark:bg-zinc-800/50 text-center">
        <p className="text-[11px] text-muted-foreground font-medium italic">
          Material OS Simulation v1.0. Final release. (c) 2025
        </p>
      </div>
    </div>
  );
};