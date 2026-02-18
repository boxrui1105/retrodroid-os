import React from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '@/store/os-store';
import { HelloApp } from '@/components/apps/HelloApp';
import { TerminalApp } from '@/components/apps/TerminalApp';
import { NotesApp } from '@/components/apps/NotesApp';
import { SettingsApp } from '@/components/apps/SettingsApp';
import { BrowserApp } from '@/components/apps/BrowserApp';
import { X } from 'lucide-react';
const AppRegistry: Record<string, React.FC> = {
  HelloApp: HelloApp,
  TerminalApp: TerminalApp,
  NotesApp: NotesApp,
  SettingsApp: SettingsApp,
  BrowserApp: BrowserApp,
};
export const AppWindow: React.FC = () => {
  const activeAppId = useOSStore((s) => s.activeAppId);
  const installedApps = useOSStore((s) => s.installedApps);
  const setActiveApp = useOSStore((s) => s.setActiveApp);
  const t = useOSStore((s) => s.t);
  const appConfig = installedApps.find(a => a.id === activeAppId);
  if (!appConfig) return null;
  const AppComponent = AppRegistry[appConfig.component] || (() => <div className="p-4">Error: Component {appConfig.component} not found.</div>);
  return (
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-background z-40 flex flex-col rounded-t-[28px] overflow-hidden shadow-2xl border-t border-black/5"
    >
      {/* Title Bar / Handle */}
      <div className="h-14 px-6 flex items-center justify-between shrink-0 bg-transparent">
        <span className="font-semibold text-foreground/90 tracking-tight text-lg">
          {t(appConfig.nameKey)}
        </span>
        <button
          onClick={() => setActiveApp(null)}
          className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center hover:bg-foreground/10 active:scale-90 transition-all"
        >
          <X size={18} className="text-foreground/60" strokeWidth={2.5} />
        </button>
      </div>
      {/* Content Area */}
      <div className="flex-1 overflow-auto relative bg-white dark:bg-zinc-950">
        <AppComponent />
      </div>
    </motion.div>
  );
};