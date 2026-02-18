import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { format } from 'date-fns';
import { Bell } from 'lucide-react';
import { useOSStore } from '@/store/os-store';
export const LockScreen: React.FC = () => {
  const systemTime = useOSStore((s) => s.systemTime);
  const setLocked = useOSStore((s) => s.setLocked);
  const language = useOSStore((s) => s.settings.language);
  const t = useOSStore((s) => s.t);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, -200], [1, 0]);
  const scale = useTransform(y, [0, -200], [1, 1.05]);
  const handleDragEnd = () => {
    if (y.get() < -150) {
      setIsUnlocking(true);
      setTimeout(() => setLocked(false), 200);
    } else {
      y.set(0);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="absolute inset-0 z-[100] bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-between py-24 px-10 overflow-hidden"
    >
      <motion.div style={{ opacity, scale }} className="text-center z-10 flex flex-col items-center">
        <h1 className="text-8xl font-medium tracking-tight text-foreground/90 tabular-nums">
          {format(systemTime, 'HH:mm')}
        </h1>
        <p className="text-lg font-medium text-foreground/50 mt-2">
          {format(systemTime, 'eeee, MMMM do')}
        </p>
      </motion.div>
      <motion.div style={{ opacity }} className="w-full max-w-sm space-y-4 z-10">
        <div className="p-5 bg-white rounded-[24px] shadow-sm border border-black/5 flex gap-4 items-center">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-android-blue">
            <Bell size={20} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-foreground/40">SYSTEM</p>
            <p className="text-sm font-medium text-foreground/80 leading-snug">Android OS is up to date.</p>
          </div>
        </div>
      </motion.div>
      <motion.div
        drag="y"
        dragConstraints={{ top: -300, bottom: 0 }}
        style={{ y }}
        onDragEnd={handleDragEnd}
        className="flex flex-col items-center gap-4 cursor-grab active:cursor-grabbing"
      >
        <div className="w-12 h-1.5 bg-foreground/10 rounded-full" />
        <span className="text-xs font-bold text-foreground/30 uppercase tracking-[0.2em]">
          {t('lock.swipe')}
        </span>
      </motion.div>
      {isUnlocking && (
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm transition-all" />
      )}
    </motion.div>
  );
};