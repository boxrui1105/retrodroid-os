import React from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '@/store/os-store';
import { X, Trash2, History, ChevronRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';
export const RecentsScreen: React.FC = () => {
  const recentApps = useOSStore((s) => s.recentApps);
  const installedApps = useOSStore((s) => s.installedApps);
  const setActiveApp = useOSStore((s) => s.setActiveApp);
  const setRecentsOpen = useOSStore((s) => s.setRecentsOpen);
  const clearRecents = useOSStore((s) => s.clearRecents);
  const t = useOSStore((s) => s.t);
  const isDarkMode = useOSStore((s) => s.settings.isDarkMode);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(
        "absolute inset-0 z-[60] flex flex-col p-6 backdrop-blur-xl",
        isDarkMode ? "bg-black/80" : "bg-white/70"
      )}
    >
      <div className="flex justify-between items-center mb-10 mt-4">
        <h2 className="text-xl font-bold tracking-tight">{t('nav.recents')}</h2>
        <div className="flex gap-2">
          <button
            onClick={clearRecents}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-500 text-xs font-bold hover:bg-red-500/20 transition-all"
          >
            <Trash2 size={14} /> {t('nav.clear')}
          </button>
          <button
            onClick={() => setRecentsOpen(false)}
            className="p-2 rounded-full hover:bg-zinc-500/10 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 pb-24 px-1">
        {recentApps.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center opacity-30 space-y-4">
            <div className="w-20 h-20 rounded-full bg-zinc-500/20 flex items-center justify-center">
              <History size={40} />
            </div>
            <p className="text-sm font-bold uppercase tracking-widest">{t('nav.empty')}</p>
          </div>
        ) : (
          recentApps.map((appId, index) => {
            const app = installedApps.find(a => a.id === appId);
            if (!app) return null;
            const Icon = (LucideIcons as any)[app.icon] || LucideIcons.HelpCircle;
            return (
              <motion.button
                key={`${appId}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setActiveApp(appId)}
                className={cn(
                  "w-full group relative overflow-hidden rounded-[28px] p-5 flex items-center gap-6 transition-all shadow-sm border",
                  isDarkMode ? "bg-zinc-900 border-zinc-800 hover:bg-zinc-800" : "bg-white border-zinc-200 hover:bg-zinc-50"
                )}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-primary/10 text-primary shadow-inner">
                  <Icon size={32} />
                </div>
                <div className="text-left flex-1">
                  <p className="text-lg font-bold">{t(app.nameKey)}</p>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-tight">System Process #{1000 + index * 12}</p>
                </div>
                <ChevronRight size={20} className="text-muted-foreground opacity-40 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            );
          })
        )}
      </div>
    </motion.div>
  );
};