import React from 'react';
import { Cpu, Database, HardDrive, Shield } from 'lucide-react';
export const HelloApp: React.FC = () => {
  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 border-b border-[#00ff41]/20 pb-4">
        <h1 className="text-3xl font-bold retro-text-pink">SYSTEM_HELLO</h1>
        <p className="text-sm opacity-70 italic">Retrodroid OS Kernel 1.0.4-NEON</p>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {[
          { label: 'PROCESSOR', value: 'NEURAL-CORE X8', icon: Cpu },
          { label: 'MEMORY', value: '64TB CRYPT-RAM', icon: Database },
          { label: 'STORAGE', value: '1.2PB SOLID-STATE', icon: HardDrive },
          { label: 'SECURITY', value: 'BIO-ENCRYPTED', icon: Shield },
        ].map((stat, i) => (
          <div key={i} className="flex items-center gap-4 p-3 border border-[#00ff41]/30 bg-[#00ff41]/5">
            <stat.icon size={20} className="retro-text-green" />
            <div>
              <p className="text-[10px] opacity-50 font-bold">{stat.label}</p>
              <p className="text-sm font-mono">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-pink-500/10 border border-pink-500/30 text-xs leading-relaxed">
        <p className="retro-text-pink mb-2 font-bold">WARNING_OVERRIDE:</p>
        Unauthorized access to this terminal is punishable by memory wipe. Ensure your bio-signature is registered with the central hub.
      </div>
      <div className="text-[10px] opacity-30 text-center uppercase tracking-[0.2em] pt-8">
        (c) 2099 Neon-Dynamic Systems
      </div>
    </div>
  );
};