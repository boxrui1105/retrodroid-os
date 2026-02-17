import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { format } from 'date-fns';
import { Bell, ShieldCheck } from 'lucide-react';
import { useOSStore } from '@/store/os-store';
export const LockScreen: React.FC = () => {
  const systemTime = useOSStore((s) => s.systemTime);
  const setLocked = useOSStore((s) => s.setLocked);
  const accentColor = useOSStore((s) => s.settings.accentColor);
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
      className="absolute inset-0 z-[100] flex flex-col items-center justify-between py-24 px-10 overflow-hidden"
      style={{ 
        background: `linear-gradient(to bottom, ${accentColor}10, #ffffff)`,
        backgroundColor: 'white'
      }}
    >
      <motion.div style={{ opacity, scale }} className="text-center z-10 flex flex-col items-center">
        <h1 className="text-8xl font-black tracking-tighter text-foreground tabular-nums">
          {format(systemTime, 'HH:mm')}
        </h1>
        <p className="text-lg font-bold text-foreground/40 mt-1 uppercase tracking-widest">
          {format(systemTime, 'eeee, MMMM do')}
        </p>
      </motion.div>
      <motion.div style={{ opacity }} className="w-full max-w-sm space-y-3 z-10">
        <div className="p-5 bg-white rounded-[28px] shadow-xl shadow-black/5 border border-black/5 flex gap-4 items-center">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: accentColor }}>
            <ShieldCheck size={24} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-0.5">
              <p className="text-[10px] font-black text-foreground/30 uppercase tracking-widest">System</p>
              <span className="text-[9px] text-foreground/20 font-bold">Just now</span>
            </div>
            <p className="text-sm font-bold text-foreground/80 leading-tight">Pancake OS v11.0 is active and secured by P-Cloud.</p>
          </div>
        </div>
      </motion.div>
      <motion.div
        drag="y"
        dragConstraints={{ top: -300, bottom: 0 }}
        style={{ y }}
        onDragEnd={handleDragEnd}
        className="flex flex-col items-center gap-5 cursor-grab active:cursor-grabbing mb-4"
      >
        <div className="w-14 h-1.5 bg-foreground/10 rounded-full animate-bounce" />
        <span className="text-[10px] font-black text-foreground/20 uppercase tracking-[0.4em] ml-1">
          {t('lock.swipe')}
        </span>
      </motion.div>
      {isUnlocking && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-md transition-all duration-300" />
      )}
    </motion.div>
  );
};