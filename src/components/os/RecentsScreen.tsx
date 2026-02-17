import React from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '@/store/os-store';
import { X, Trash2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
export const RecentsScreen: React.FC = () => {
  const recentApps = useOSStore((s) => s.recentApps);
  const installedApps = useOSStore((s) => s.installedApps);
  const setActiveApp = useOSStore((s) => s.setActiveApp);
  const setRecentsOpen = useOSStore((s) => s.setRecentsOpen);
  const clearRecents = useOSStore((s) => s.clearRecents);
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      className="absolute inset-0 bg-black/90 backdrop-blur-md z-[60] flex flex-col p-6"
    >
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <h2 className="text-xl font-black tracking-widest uppercase">Recents_Task_Manager</h2>
        <div className="flex gap-4">
          <button 
            onClick={clearRecents}
            className="p-2 hover:bg-red-500/20 text-red-500 border border-red-500/30 transition-all flex items-center gap-2 text-[10px]"
          >
            <Trash2 size={14} /> CLEAR_ALL
          </button>
          <button 
            onClick={() => setRecentsOpen(false)}
            className="p-2 hover:bg-white/10 border border-white/30"
          >
            <X size={20} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-6 pb-20">
        {recentApps.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center opacity-20">
            <LucideIcons.History size={64} className="mb-4" />
            <p className="text-sm font-bold uppercase tracking-[0.2em]">No Recent Activity</p>
          </div>
        ) : (
          recentApps.map((appId, index) => {
            const app = installedApps.find(a => a.id === appId);
            if (!app) return null;
            const Icon = (LucideIcons as any)[app.icon] || LucideIcons.HelpCircle;
            return (
              <motion.button
                key={`${appId}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setActiveApp(appId)}
                className="w-full group relative overflow-hidden border border-white/20 bg-white/5 p-4 flex items-center gap-6 hover:bg-white/10 transition-all"
              >
                <div className="w-16 h-16 border-2 border-current flex items-center justify-center bg-black">
                  <Icon size={32} />
                </div>
                <div className="text-left">
                  <p className="text-lg font-bold uppercase tracking-tighter">{app.name}</p>
                  <p className="text-[10px] opacity-50 uppercase">Process ID: {Math.floor(Math.random() * 9999)}</p>
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <LucideIcons.ChevronRight size={24} />
                </div>
              </motion.button>
            );
          })
        )}
      </div>
    </motion.div>
  );
};