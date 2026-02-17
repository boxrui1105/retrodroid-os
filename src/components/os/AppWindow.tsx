import React from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '@/store/os-store';
import { HelloApp } from '@/components/apps/HelloApp';
const AppRegistry: Record<string, React.FC> = {
  HelloApp: HelloApp,
  TerminalApp: () => <div className="p-4 text-pink-500">TERMINAL NOT IMPLEMENTED</div>,
  NotesApp: () => <div className="p-4 text-pink-500">NOTES NOT IMPLEMENTED</div>,
  SettingsApp: () => <div className="p-4 text-pink-500">SETTINGS NOT IMPLEMENTED</div>,
};
export const AppWindow: React.FC = () => {
  const activeAppId = useOSStore((s) => s.activeAppId);
  const installedApps = useOSStore((s) => s.installedApps);
  const appConfig = installedApps.find(a => a.id === activeAppId);
  if (!appConfig) return null;
  const AppComponent = AppRegistry[appConfig.component] || (() => <div>Error Loading App</div>);
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.2 } }}
      className="absolute inset-0 bg-[#0d0d0d] z-40 flex flex-col"
    >
      <div className="h-10 px-4 bg-[#00ff41] text-black flex items-center justify-between font-bold text-xs">
        <span className="tracking-widest uppercase">{appConfig.name}</span>
        <div className="flex gap-2">
          <div className="w-3 h-3 border-2 border-black" />
          <div className="w-3 h-3 border-2 border-black bg-black" />
        </div>
      </div>
      <div className="flex-1 overflow-auto relative">
        <AppComponent />
      </div>
    </motion.div>
  );
};