import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '@/store/os-store';
const BOOT_LOGS = [
  "INITIALIZING KERNEL...",
  "CHECKING RAM.................. [OK]",
  "MOUNTING /DEV/NVME0N1P2....... [OK]",
  "LOADING NEON_DRIVER_v2.1...... [OK]",
  "ESTABLISHING NEURAL LINK...... [OK]",
  "DECRYPTING USER_SPACE......... [OK]",
  "BYPASSING FIREWALL............ [DONE]",
  "LOADING ASSETS................ [DONE]",
  "BOOTING SHELL...",
];
export const BootSequence: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const setBooting = useOSStore((s) => s.setBooting);
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (current < BOOT_LOGS.length) {
        setLogs(prev => [...prev, BOOT_LOGS[current]]);
        current++;
      } else {
        clearInterval(interval);
        setTimeout(() => setBooting(false), 1000);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [setBooting]);
  return (
    <motion.div 
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black flex flex-col p-8 font-mono text-sm sm:text-base z-[200]"
    >
      <div className="space-y-1">
        {logs.map((log, i) => (
          <div key={i} className="flex gap-2">
            <span className="text-pink-500">[{i.toString().padStart(2, '0')}]</span>
            <span className="text-[#00ff41]">{log}</span>
          </div>
        ))}
        {logs.length < BOOT_LOGS.length && (
          <motion.div 
            animate={{ opacity: [0, 1] }} 
            transition={{ repeat: Infinity, duration: 0.5 }}
            className="inline-block w-2 h-4 bg-[#00ff41] align-middle"
          />
        )}
      </div>
      <div className="mt-auto flex justify-between items-end opacity-30 text-[10px]">
        <div>BIOS V.4.20.69 (C) 2099</div>
        <div>ROM LOADED AT 0x004F2E</div>
      </div>
    </motion.div>
  );
};