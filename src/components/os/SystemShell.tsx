import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOSStore } from '@/store/os-store';
import { StatusBar } from './StatusBar';
import { NavigationBar } from './NavigationBar';
import { Launcher } from './Launcher';
import { AppWindow } from './AppWindow';
import { BootSequence } from './BootSequence';
import { LockScreen } from './LockScreen';
import { RecentsScreen } from './RecentsScreen';
export const SystemShell: React.FC = () => {
  const isBooting = useOSStore((s) => s.isBooting);
  const isLocked = useOSStore((s) => s.isLocked);
  const isRecentsOpen = useOSStore((s) => s.isRecentsOpen);
  const activeAppId = useOSStore((s) => s.activeAppId);
  const updateTime = useOSStore((s) => s.updateTime);
  const initializeOS = useOSStore((s) => s.initializeOS);
  const accentColor = useOSStore((s) => s.settings.accentColor);
  useEffect(() => {
    initializeOS();
    const timer = setInterval(() => updateTime(), 1000);
    return () => clearInterval(timer);
  }, [updateTime, initializeOS]);
  return (
    <div
      className="relative h-screen w-screen bg-[#f8f9fa] dark:bg-[#0d0d0d] overflow-hidden flex flex-col font-sans transition-colors duration-500"
      style={{ '--android-primary': accentColor } as React.CSSProperties}
    >
      <AnimatePresence mode="wait">
        {isBooting ? (
          <BootSequence key="boot" />
        ) : isLocked ? (
          <LockScreen key="lock" />
        ) : (
          <motion.div
            key="os-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col relative z-10"
          >
            <StatusBar />
            <main className="flex-1 relative overflow-hidden">
              <Launcher />
              <AnimatePresence>
                {activeAppId && <AppWindow key={activeAppId} />}
              </AnimatePresence>
              <AnimatePresence>
                {isRecentsOpen && <RecentsScreen key="recents" />}
              </AnimatePresence>
            </main>
            <NavigationBar />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};