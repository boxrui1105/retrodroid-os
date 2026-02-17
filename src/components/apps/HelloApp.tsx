import React from 'react';
import { Cpu, Database, HardDrive, Shield, Smartphone, Radio } from 'lucide-react';
import { useOSStore } from '@/store/os-store';
import { Card } from '@/components/ui/card';
export const HelloApp: React.FC = () => {
  const t = useOSStore((s) => s.t);
  const stats = [
    { label: t('device.model'), value: 'Pancake P1 Pro', icon: Smartphone, color: 'text-orange-500' },
    { label: t('device.version'), value: 'Pancake OS 11', icon: Shield, color: 'text-green-500' },
    { label: t('device.processor'), value: 'Pancake Silicon G1', icon: Cpu, color: 'text-purple-500' },
    { label: t('device.ram'), value: '16 GB Unified Memory', icon: Database, color: 'text-blue-500' },
    { label: t('device.storage'), value: '512 GB Pancake SSD', icon: HardDrive, color: 'text-cyan-500' },
    { label: t('device.sim'), value: 'P-Cloud Active', icon: Radio, color: 'text-pink-500' },
  ];
  return (
    <div className="p-6 space-y-6 bg-zinc-50 dark:bg-zinc-950 min-h-full">
      <div className="flex flex-col items-center py-6 space-y-2">
        <div className="w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-500 mb-2">
          <div className="w-10 h-10 rounded-full border-4 border-orange-500/30 bg-orange-500/50" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Pancake OS</h1>
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest bg-zinc-200 dark:bg-zinc-800 px-3 py-1 rounded-full">
          Build 2025.11.0
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
          Pancake OS Simulation v11.0. (c) 2025 Pancake Labs.
        </p>
      </div>
    </div>
  );
};