import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOSStore } from '@/store/os-store';
import { StatusBar } from './StatusBar';
import { NavigationBar } from './NavigationBar';
import { Launcher } from './Launcher';
import { AppWindow } from './AppWindow';
import { BootSequence } from './BootSequence';
import { LockScreen } from './LockScreen';
export const SystemShell: React.FC = () => {
  const isBooting = useOSStore((s) => s.isBooting);
  const isLocked = useOSStore((s) => s.isLocked);
  const activeAppId = useOSStore((s) => s.activeAppId);
  const updateTime = useOSStore((s) => s.updateTime);
  const glitchIntensity = useOSStore((s) => s.settings.glitchIntensity);
  const crtFlicker = useOSStore((s) => s.settings.crtFlicker);
  useEffect(() => {
    const timer = setInterval(() => updateTime(), 1000);
    return () => clearInterval(timer);
  }, [updateTime]);
  return (
    <div className="relative h-screen w-screen bg-[#0d0d0d] text-[#00ff41] overflow-hidden flex flex-col font-mono selection:bg-[#00ff41] selection:text-black">
      {/* CRT Effects */}
      <div className="crt-overlay" />
      <div className="scanline" />
      <AnimatePresence mode="wait">
        {isBooting ? (
          <BootSequence key="boot" />
        ) : isLocked ? (
          <LockScreen key="lock" />
        ) : (
          <motion.div
            key="os-body"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              filter: `contrast(${1 + glitchIntensity * 0.1}) brightness(${1 + glitchIntensity * 0.05})` 
            }}
            className={`flex-1 flex flex-col relative z-10 ${crtFlicker ? 'flicker' : ''}`}
          >
            <StatusBar />
            <main className="flex-1 relative overflow-hidden">
              <Launcher />
              <AnimatePresence>
                {activeAppId && <AppWindow key={activeAppId} />}
              </AnimatePresence>
            </main>
            <NavigationBar />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
    </div>
  );
};