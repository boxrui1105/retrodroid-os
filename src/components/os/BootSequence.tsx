import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '@/store/os-store';
export const BootSequence: React.FC = () => {
  const setBooting = useOSStore((s) => s.setBooting);
  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 2500);
    return () => clearTimeout(timer);
  }, [setBooting]);
  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[200]"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center gap-12"
      >
        <div className="text-4xl font-bold tracking-tighter text-slate-800 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-android-green animate-pulse" />
          <span>Android</span>
        </div>
        <div className="w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="h-full bg-android-blue"
          />
        </div>
      </motion.div>
      <div className="absolute bottom-12 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
        Powered by Material Design
      </div>
    </motion.div>
  );
};