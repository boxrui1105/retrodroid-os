import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { format } from 'date-fns';
import { Lock, ChevronRight, Bell } from 'lucide-react';
import { useOSStore } from '@/store/os-store';
export const LockScreen: React.FC = () => {
  const systemTime = useOSStore((s) => s.systemTime);
  const setLocked = useOSStore((s) => s.setLocked);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const x = useMotionValue(0);
  const opacity = useTransform(x, [0, 200], [1, 0]);
  const scale = useTransform(x, [0, 200], [1, 0.95]);
  const handleDragEnd = () => {
    if (x.get() > 150) {
      setIsUnlocking(true);
      setTimeout(() => setLocked(false), 300);
    } else {
      x.set(0);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      className="absolute inset-0 z-[100] bg-black/90 flex flex-col items-center justify-between p-12 overflow-hidden"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-[#00ff41]/10 rounded-full animate-pulse pointer-events-none" />
      {/* Clock Area */}
      <motion.div style={{ opacity, scale }} className="text-center mt-12 z-10">
        <h1 className="text-8xl font-black tracking-tighter retro-text-green tabular-nums">
          {format(systemTime, 'HH:mm')}
        </h1>
        <p className="text-xl opacity-50 font-bold uppercase tracking-[0.3em]">
          {format(systemTime, 'eeee, MMM do')}
        </p>
      </motion.div>
      {/* Notifications */}
      <motion.div style={{ opacity }} className="w-full max-w-sm space-y-3 z-10">
        <div className="p-4 border border-[#00ff41]/20 bg-[#00ff41]/5 flex gap-4 items-start">
          <Bell size={18} className="retro-text-pink shrink-0 mt-1" />
          <div>
            <p className="text-[10px] font-bold retro-text-pink">SYSTEM_KERNEL</p>
            <p className="text-xs">NEON_DROID_V1.0 is ready for uplink. Initialize secure handshake.</p>
          </div>
        </div>
        <div className="p-4 border border-[#00ff41]/20 bg-[#00ff41]/5 flex gap-4 items-start opacity-60">
          <Lock size={18} className="retro-text-green shrink-0 mt-1" />
          <div>
            <p className="text-[10px] font-bold retro-text-green">SECURITY_MODULE</p>
            <p className="text-xs">Bio-scan complete. Identify: USER_GUEST_01</p>
          </div>
        </div>
      </motion.div>
      {/* Slider Area */}
      <div className="w-full max-w-xs relative h-16 bg-[#00ff41]/5 border border-[#00ff41]/20 rounded-full flex items-center px-2 mb-12">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[10px] font-bold tracking-[0.2em] opacity-40 uppercase">Slide to unlock</span>
        </div>
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 240 }}
          style={{ x }}
          onDragEnd={handleDragEnd}
          className="w-12 h-12 bg-[#00ff41] flex items-center justify-center cursor-grab active:cursor-grabbing z-20 shadow-[0_0_15px_#00ff41]"
        >
          <ChevronRight className="text-black" />
        </motion.div>
      </div>
      {isUnlocking && (
        <div className="absolute inset-0 bg-white/10 mix-blend-overlay animate-pulse" />
      )}
    </motion.div>
  );
};