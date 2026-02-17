import React from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '@/store/os-store';
import { HelloApp } from '@/components/apps/HelloApp';
import { TerminalApp } from '@/components/apps/TerminalApp';
import { NotesApp } from '@/components/apps/NotesApp';
import { SettingsApp } from '@/components/apps/SettingsApp';
const AppRegistry: Record<string, React.FC> = {
  HelloApp: HelloApp,
  TerminalApp: TerminalApp,
  NotesApp: NotesApp,
  SettingsApp: SettingsApp,
};
export const AppWindow: React.FC = () => {
  const activeAppId = useOSStore((s) => s.activeAppId);
  const installedApps = useOSStore((s) => s.installedApps);
  const setActiveApp = useOSStore((s) => s.setActiveApp);
  const appConfig = installedApps.find(a => a.id === activeAppId);
  if (!appConfig) return null;
  const AppComponent = AppRegistry[appConfig.component] || (() => <div className="p-4">Error: Component {appConfig.component} not found.</div>);
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.2 } }}
      className="absolute inset-0 bg-[#0d0d0d] z-40 flex flex-col"
    >
      <div className="h-10 px-4 bg-[#00ff41] text-black flex items-center justify-between font-bold text-xs shrink-0">
        <span className="tracking-widest uppercase truncate max-w-[70%]">{appConfig.name}</span>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveApp(null)}
            className="w-4 h-4 border-2 border-black flex items-center justify-center hover:bg-black/10"
          >
            <div className="w-2 h-[2px] bg-black" />
          </button>
          <button 
            onClick={() => setActiveApp(null)}
            className="w-4 h-4 border-2 border-black flex items-center justify-center bg-black text-[#00ff41] text-[8px]"
          >
            X
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto relative">
        <AppComponent />
      </div>
    </motion.div>
  );
};