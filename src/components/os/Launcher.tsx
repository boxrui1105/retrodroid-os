import React from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '@/store/os-store';
import * as LucideIcons from 'lucide-react';
export const Launcher: React.FC = () => {
  const apps = useOSStore((s) => s.installedApps);
  const setActiveApp = useOSStore((s) => s.setActiveApp);
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };
  const item = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    show: { opacity: 1, scale: 1, y: 0 }
  };
  return (
    <div className="p-6 h-full w-full overflow-y-auto">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-4 gap-6"
      >
        {apps.map((app) => {
          const Icon = (LucideIcons as any)[app.icon] || LucideIcons.HelpCircle;
          return (
            <motion.button
              key={app.id}
              variants={item}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9, rotate: 2 }}
              onClick={() => setActiveApp(app.id)}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-14 h-14 bg-black border-2 border-[#00ff41] flex items-center justify-center shadow-[4px_4px_0px_#00ff41] group-hover:shadow-[0_0_15px_#00ff41] group-hover:bg-[#00ff41]/10 transition-all">
                <Icon size={28} className="group-hover:text-[#ff00ff]" />
              </div>
              <span className="text-[10px] font-bold text-center tracking-tighter truncate w-full uppercase">
                {app.name}
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};